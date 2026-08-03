const crypto = require("crypto");

const SESSION_COOKIE = "ic_admin_session";
const sessions = new Map();

function getAdminPassword() {
  return process.env.ADMIN_PASSWORD || "change-me";
}

function createSession() {
  const token = crypto.randomBytes(32).toString("hex");
  sessions.set(token, { createdAt: Date.now() });
  return token;
}

function destroySession(token) {
  if (token) sessions.delete(token);
}

function isAuthenticated(req) {
  const token = req.cookies?.[SESSION_COOKIE];
  return Boolean(token && sessions.has(token));
}

function requireAuth(req, res, next) {
  if (!isAuthenticated(req)) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  return next();
}

function login(password) {
  if (password !== getAdminPassword()) return null;
  return createSession();
}

module.exports = {
  SESSION_COOKIE,
  isAuthenticated,
  requireAuth,
  login,
  destroySession,
};
