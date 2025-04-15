<?php

/**
 * @param \Noks\Controller\API\Constructor\LogStore
 * @param \Noks\Middleware\API\Constructor\Log
 */
route(
    'POST',
    '/api/constructor/log',
    '\Noks\Controller\API\Constructor\LogStore@__invoke',
    '\Noks\Middleware\API\Constructor\Log@store',
);
