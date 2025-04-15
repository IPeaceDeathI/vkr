<?php

/**
 * @param \Noks\Controller\API\Constructor\BlockStore
 */
route('POST',   '/api/constructor/blocks',                '\Noks\Controller\API\Constructor\BlockStore@store');
/**
 * @param \Noks\Controller\API\Constructor\BlockIndex
 */
route('GET',    '/api/constructor/blocks',                '\Noks\Controller\API\Constructor\BlockIndex@__invoke');
route('GET',    '/api/constructor/blocks/{int_unsigned}', '\Noks\Controller\API\Constructor\BlockIndex@__invoke');
/**
 * @param \Noks\Controller\API\Constructor\BlockDelete
 */
route('DELETE', '/api/constructor/blocks/{int_unsigned}', '\Noks\Controller\API\Constructor\BlockDelete@delete');
/**
 * @param \Noks\Controller\API\Constructor\BlockUpdate
 */
route('PUT',    '/api/constructor/blocks/{int_unsigned}', '\Noks\Controller\API\Constructor\BlockUpdate@update');

// ------------------------------------------------------------------
// MIDDLEWARE
// ------------------------------------------------------------------
/**
 * @param \Noks\Middleware\API\Constructor\Block
 */
middleware('POST',   '/api/constructor/blocks',                '\Noks\Middleware\API\Constructor\Block@store');
middleware('GET',    '/api/constructor/blocks',                '\Noks\Middleware\API\Constructor\Block@index');
middleware('GET',    '/api/constructor/blocks/{int_unsigned}', '\Noks\Middleware\API\Constructor\Block@index');
middleware('DELETE', '/api/constructor/blocks/{int_unsigned}', '\Noks\Middleware\API\Constructor\Block@delete');
middleware('PUT',    '/api/constructor/blocks/{int_unsigned}', '\Noks\Middleware\API\Constructor\Block@update');
