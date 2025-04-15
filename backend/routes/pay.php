<?php

/**
 * @param \Noks\Pay\Controller\Index
 */
\route('GET', '/pay', '\Noks\Pay\Controller\Index@main');
// route('GET', '/admin/pay', '\Noks\Pay\Controller\Index@main');
/**
 * @param \Noks\Pay\Controller\Tariff
 */
\route(
    'GET',
    '/pay/payment/tariff/{int_unsigned}',
    '\Noks\Pay\Controller\Tariff@main'
);
/**
 * @param \Noks\Controller\WEB\Pay\Balance
 */
\route(
    'GET',
    '/pay/payment/balance/{int_unsigned}',
    '\Noks\Controller\WEB\Pay\Balance@__invoke',
);
/**
 * @param \Noks\Controller\WEB\Pay\Result
 * middleware не нужен | робокасса туда долбится
 */
\route(
    'GET|POST',
    '/pay/result',
    '\Noks\Controller\WEB\Pay\Result@__invoke',
);
/**
 * @param \Noks\Pay\Controller\Fail
 */
\route('GET|POST', '/pay/fail', '\Noks\Pay\Controller\Fail@__invoke');
/**
 * @param \Noks\Pay\Controller\Success
 */
\route('GET|POST', '/pay/success', '\Noks\Pay\Controller\Success@__invoke');
/**
 * @param \Noks\Pay\Controller\Trial
 */
\route('GET', '/pay/trial', '\Noks\Pay\Controller\Trial@__invoke');
/**
 * @param \Noks\Controller\WEB\Pay\ChangeTariff
 */
\route(
    'GET',
    '/pay/change/{int_unsigned}',
    '\Noks\Controller\WEB\Pay\ChangeTariff@__invoke',
);
/**
 * @param \Noks\Pay\Controller\Error
 */
\route('GET', '/pay/error', '\Noks\Pay\Controller\Error@main');

// ------------------------------------------------------------------
// MIDDLEWARE
// ------------------------------------------------------------------

/**
 * @param \Noks\Middleware\WEB\Pay\PayWeb
 */
\middleware('GET',      '/pay',                                '\Noks\Middleware\WEB\Pay\PayWeb@index');
\middleware('GET',      '/pay/payment/tariff/{int_unsigned}',  '\Noks\Middleware\WEB\Pay\PayWeb@index');
\middleware('GET',      '/pay/payment/balance/{int_unsigned}', '\Noks\Middleware\WEB\Pay\PayWeb@index');
\middleware('GET|POST', '/pay/fail',                           '\Noks\Middleware\WEB\Pay\PayWeb@index');
\middleware('GET|POST', '/pay/success',                        '\Noks\Middleware\WEB\Pay\PayWeb@index');
\middleware('GET',      '/pay/trial',                          '\Noks\Middleware\WEB\Pay\PayWeb@index');
\middleware('GET',      '/pay/change/{int_unsigned}',          '\Noks\Middleware\WEB\Pay\PayWeb@index');
\middleware('GET',      '/pay/error',                          '\Noks\Middleware\WEB\Pay\PayWeb@index');
