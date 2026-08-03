/**
 * Pure-JS SQLite wrapper (sql.js) with a better-sqlite3-like sync API.
 * Avoids native addons so Hostinger Node.js deploys do not need Python/node-gyp.
 */

const fs = require("fs");
const path = require("path");

function isPlainObject(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function normalizeBind(sql, args) {
  if (!args.length) return null;
  if (args.length === 1 && isPlainObject(args[0])) {
    const out = {};
    for (const [key, value] of Object.entries(args[0])) {
      if (key.startsWith("@") || key.startsWith("$") || key.startsWith(":")) {
        out[key] = value;
        continue;
      }
      if (sql.includes(`@${key}`)) out[`@${key}`] = value;
      else if (sql.includes(`:${key}`)) out[`:${key}`] = value;
      else if (sql.includes(`$${key}`)) out[`$${key}`] = value;
      else out[`@${key}`] = value;
    }
    return out;
  }
  return args;
}

class Statement {
  constructor(database, sql) {
    this.database = database;
    this.sql = sql;
  }

  run(...args) {
    const stmt = this.database.raw.prepare(this.sql);
    try {
      const params = normalizeBind(this.sql, args);
      if (params) stmt.bind(params);
      stmt.step();
    } finally {
      stmt.free();
    }
    const changes = this.database.raw.getRowsModified();
    const lastInsertRowid = this.database.lastInsertRowid();
    this.database.persist();
    return { changes, lastInsertRowid };
  }

  get(...args) {
    const stmt = this.database.raw.prepare(this.sql);
    try {
      const params = normalizeBind(this.sql, args);
      if (params) stmt.bind(params);
      if (!stmt.step()) return undefined;
      return stmt.getAsObject();
    } finally {
      stmt.free();
    }
  }

  all(...args) {
    const stmt = this.database.raw.prepare(this.sql);
    try {
      const params = normalizeBind(this.sql, args);
      if (params) stmt.bind(params);
      const rows = [];
      while (stmt.step()) rows.push(stmt.getAsObject());
      return rows;
    } finally {
      stmt.free();
    }
  }
}

class FileDatabase {
  constructor(raw, filePath) {
    this.raw = raw;
    this.filePath = filePath;
    this._inTransaction = false;
  }

  prepare(sql) {
    return new Statement(this, sql);
  }

  exec(sql) {
    this.raw.exec(sql);
    this.persist();
    return this;
  }

  pragma(source) {
    try {
      this.raw.run(`PRAGMA ${source}`);
      if (!/^\s*journal_mode\s*=/i.test(source)) this.persist();
    } catch (error) {
      if (!/journal_mode/i.test(source)) throw error;
    }
    return this;
  }

  lastInsertRowid() {
    const stmt = this.raw.prepare("SELECT last_insert_rowid() AS id");
    try {
      stmt.step();
      const row = stmt.getAsObject();
      return Number(row.id || 0);
    } finally {
      stmt.free();
    }
  }

  transaction(fn) {
    return (...args) => {
      this.raw.run("BEGIN");
      this._inTransaction = true;
      try {
        const result = fn(...args);
        this._inTransaction = false;
        this.raw.run("COMMIT");
        this.persist();
        return result;
      } catch (error) {
        this._inTransaction = false;
        try {
          this.raw.run("ROLLBACK");
        } catch {
          /* ignore */
        }
        throw error;
      }
    };
  }

  persist() {
    if (this._inTransaction) return;
    const data = this.raw.export();
    fs.writeFileSync(this.filePath, Buffer.from(data));
  }
}

async function openSqlite(filePath) {
  const initSqlJs = require("sql.js");
  const sqlJsRoot = path.dirname(require.resolve("sql.js/package.json"));
  const SQL = await initSqlJs({
    locateFile: (file) => path.join(sqlJsRoot, "dist", file),
  });

  let raw;
  if (fs.existsSync(filePath)) {
    raw = new SQL.Database(fs.readFileSync(filePath));
  } else {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    raw = new SQL.Database();
  }

  const db = new FileDatabase(raw, filePath);
  db.persist();
  return db;
}

module.exports = { openSqlite };
