<?php

/**
 * @param \Noks\Controller\API\Constructor\CategoryBlockStore
 */
route('POST', '/api/constructor/categories_blocks', '\Noks\Controller\API\Constructor\CategoryBlockStore@store');
/**
 * @param \Noks\Controller\API\Constructor\CategoryBlockIndex
 */
route('GET',  '/api/constructor/categories_blocks', '\Noks\Controller\API\Constructor\CategoryBlockIndex@index');

// ------------------------------------------------------------------
// MIDDLEWARE
// ------------------------------------------------------------------
/**
 * @param \Noks\Middleware\API\Constructor\CategoryBlock
 */
middleware('POST', '/api/constructor/categories_blocks', '\Noks\Middleware\API\Constructor\CategoryBlock@store');
middleware('GET',  '/api/constructor/categories_blocks', '\Noks\Middleware\API\Constructor\CategoryBlock@index');
