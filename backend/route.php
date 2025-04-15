<?php

require __DIR__ . '/vendor/autoload.php';

use Noks\Helper\Random;
use Noks\Env;
use Noks\Error\Errors;
use Noks\ExecRoute;
use Noks\Init\Route\Route;
use Noks\ErrorHandler;

\cors_headers();

// переопределяет поведение выброса ошибок
ErrorHandler::register();
// ------------------------------------------------------------------
// headers
// ------------------------------------------------------------------
\header('X-Powered-By: Noks');
\header("Cache-Control: no-cache, must-revalidate");
\header("Cache-Control: post-check=0,pre-check=0", false);
\header("Cache-Control: max-age=0", false);
\header("Pragma: no-cache");
// ------------------------------------------------------------------
// INI
// ------------------------------------------------------------------
\ini_set('display_errors', 1);
\ini_set('display_startup_errors', 1);
// 2592000 - месяц
\ini_set('session.gc_maxlifetime', 2592000);
\ini_set("session.gc_probability", 0);

// ------------------------------------------------------------------
// Сессии
// ------------------------------------------------------------------
\session()->init(
	options: [
		// 'cookie_samesite' => 'none',
		// 'cookie_secure' => '1',
	],
	auto_commit: true,
	cookie_params: [
		'lifetime' => 2592000,
		'path'     => '/',
		'domain'   => '.' . SITE_DOMAIN,
		// 'httponly' => false, // По дефолту false | Если задано true, cookie будут доступны только через HTTP-протокол. То есть cookie не будут доступны скриптовым языкам наподобие JavaScript. Было высказано предположение, что этот параметр в состоянии эффективно уменьшить кражу личных данных через XSS-атаку (хотя он поддерживается не всеми браузерами), но это утверждение часто оспаривается. Может принимать значения true или false.
		// 'secure'   => false, // По дефолту false | Указывает на то, что значение cookie должно передаваться от клиента по защищённому соединению HTTPS. Если задано true, cookie от клиента будут переданы на сервер, только если установлено защищённое соединение. При передаче cookie от сервера клиенту программист веб-сервера должен следить за тем, чтобы cookie этого типа передавались по защищённому каналу (например, с учётом значения суперглобальной переменной $_SERVER["HTTPS"]).
		// TODO возможно изза samesite, куки не передаются в поддомены и на оборот, проверить это не могу, из-за отсутствия SSL на локалке...
		// 'samesite' => 'Lax',
		// 'samesite' => 'None',
	]
);

// ------------------------------------------------------------------
// Переменные для экшенов TODO на удаление
// ------------------------------------------------------------------

// Переменные для ссылок
Env::$params['site_login']    = $site_login = SITE_LOGIN; // Для cookies нужно без точки
Env::$params['site_domain']   = $site_domain = SITE_DOMAIN;
Env::$params['site_name']     = $site_name = SITE_NAME;
Env::$params['site_url']      = $site_url = SITE_URL; // https
Env::$params['site_desc']     = $site_desc = 'Конструктор сайтов';
Env::$params['tlgrm_channel'] = $tlgrm_channel = 'noks_ru';
// Meta данные для head страниц
Env::$params['title']       = $title = 'Конструктор сайтов';
Env::$params['description'] = $description = 'Создай свой продающий сайт за 7 минут без навыков в маркетинге и программировании';
Env::$params['keywords']    = $keywords = '';

$user_id = getCurUser();
$hash    = Random::self()->generateCode(6);

\addHeadJS(SITE_URL . 'config.js');

// для отладки
// route('GET|POST|PUT|DELETE', '/api/test', function () {
// 	dd(Env::$router->getRequestMethod());
// 	dde(getRequestMethod());
// });

Env::$_SPLIT = $_SPLIT = \explode('/', $_GET['p'] ?? '');

// ------------------------------------------------------------------
// регистрируем роуты
// ------------------------------------------------------------------
(new Route)->__invoke();

(new ExecRoute)->__invoke();

// ------------------------------------------------------------------
// TODO когда экшенов не станет, внизу все удалить
// ------------------------------------------------------------------


try {
	$_SPLIT = \explode('/', $_GET['p']);
	$_PAGE = $_SPLIT[0];
	// $fn = VERSION . '/index.php';
	$fn = '';
	if (\file_exists(VERSION . '/' . $_SPLIT[0] . '.php'))
		$fn = VERSION . '/' . $_SPLIT[0] . '.php';
	if (\file_exists(VERSION . '/' . $_SPLIT[0] . '/index.php'))
		$fn = VERSION . '/' . $_SPLIT[0] . '/index.php';

	if (
		$_SPLIT[0] == 'style'
		or $_SPLIT[0] == 'script'
		or $_SPLIT[0] == 'post'
		or \strpos(
			$_GET['p'],
			'.php'
		) !== false
		or \strpos(
			$_GET['p'],
			'.js'
		) !== false
	) { // С версией скриптов
		$fn = './' . VERSION . '/' . $_GET['p'];
	} else if (
		$_SPLIT[0] == 'images'
		or (isset($_SPLIT[1]) && $_SPLIT[1] == 'images')
		or (isset($_SPLIT[1]) && $_SPLIT[1] == 'zadarma')
	) { // Папки из корня, без версии скриптов
		$fn = $_GET['p'];
	}


	if (\file_exists($fn)) {
		Env::$params['use_action'] = $fn;
		require $fn;
	} else {
		Errors::_404();
	}
} catch (\Throwable $e) {
	\writeLog('route_action', [$e]);
	Errors::_404();
}
