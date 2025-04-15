<?php

/**
 * Время когда был запущен скрипт
 */
define('START_APP', time());

define('VERSION', 'v0020');
define('SITE_LOGIN', 'noks');
define('SITE_DOMAIN', 'localhost');
define('SITE_NAME', 'Noks.ru');
/**
 * '//' . SITE_DOMAIN . '/'
 */
define('SITE_URL', '//' . SITE_DOMAIN . '/');
/**
 * '//' . SITE_DOMAIN . '/' . VERSION
 */
define('MAIN_URL', SITE_URL . VERSION);
define('TELEGRAM_KEY', '');
define('SUPER_PASSWORD', '48cf9e48bd461c68a56462085fafcb41e4bc3de6');

/**
 * \_\_DIR\_\_ / VERSION
 */
define('MAIN_DIR', str_replace('\\', '/', __DIR__) . '/' . VERSION);
/**
 * \_\_DIR\_\_
 */
define('ROOT_DIR', str_replace('\\', '/', __DIR__));
/**
 * \_\_DIR\_\_ корня сайта, без обработок
 */
define('DEFAULT_ROOT_DIR', __DIR__);
/**
 * путь до папки с логами
 * MAIN_DIR . '/logs'
 */
define('DIR_LOGS', MAIN_DIR . '/logs');
/**
 * путь до папки с вьюхами
 * ROOT_DIR . '/resource/views/'
 */
define('DIR_VIEWS', ROOT_DIR . '/resource/views/');
/**
 * Управляющий проект
 */
define('MAIN_FLOW', 1);
