<?php

if (!defined('ABSPATH')) {
    exit;
}

add_action('init', 'iclp_register_post_types');

function iclp_register_post_types()
{
    register_post_type('ic_landing', array(
        'labels' => array(
            'name' => __('Landing Pages', 'instacertify-lp'),
            'singular_name' => __('Landing Page', 'instacertify-lp'),
            'add_new_item' => __('Add Landing Page', 'instacertify-lp'),
            'edit_item' => __('Edit Landing Page', 'instacertify-lp'),
            'new_item' => __('New Landing Page', 'instacertify-lp'),
            'view_item' => __('View Landing Page', 'instacertify-lp'),
            'search_items' => __('Search Landing Pages', 'instacertify-lp'),
            'not_found' => __('No landing pages found', 'instacertify-lp'),
            'menu_name' => __('IC Landing Pages', 'instacertify-lp'),
        ),
        'public' => true,
        'has_archive' => false,
        'publicly_queryable' => true,
        'rewrite' => array('slug' => 'lp', 'with_front' => false),
        'show_in_rest' => false,
        'menu_icon' => 'dashicons-welcome-widgets-menus',
        'supports' => array('title', 'thumbnail'),
        'capability_type' => 'post',
        'map_meta_cap' => true,
    ));
}
