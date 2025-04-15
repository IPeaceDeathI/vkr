<?php

/**
 * старая реализация через webhook
 * @param \Noks\Controller\API\Telegram\AcceptUser
 */
// route(
//     'GET|POST',
//     '/telegram/webhooks/([0-9]{8,10}:[a-zA-Z0-9_-]{35})',
//     '\Noks\Controller\API\Telegram\AcceptUser@main'
// );

/**
 * @param \Noks\Controller\API\Telegram\AcceptUser
 * @param \Noks\Middleware\WEB\Profile\TelegramAcceptUserWEB
 */
route(
    'GET',
    '/telegram/callback',
    '\Noks\Controller\API\Telegram\AcceptUser@main',
    '\Noks\Middleware\WEB\Profile\TelegramAcceptUserWEB@main'
);
