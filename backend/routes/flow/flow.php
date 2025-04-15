<?php

/**
 * @param \Noks\Controller\WEB\Flow\Flow
 * @param \Noks\Middleware\WEB\Flow\FlowWEB
 */
route(
    'GET',
    '/flows',
    '\Noks\Controller\WEB\Flow\Flow@main',
    '\Noks\Middleware\WEB\Flow\FlowWEB@main',
);
