<?php

/**
 * @param \Noks\Controller\API\Constructor\FavouriteBlockStore
 */
route('POST',   '/api/constructor/favourites_blocks/{int_unsigned}', '\Noks\Controller\API\Constructor\FavouriteBlockStore@store');
/**
 * @param \Noks\Controller\API\Constructor\FavouriteBlockDelete
 */
route('DELETE', '/api/constructor/favourites_blocks/{int_unsigned}', '\Noks\Controller\API\Constructor\FavouriteBlockDelete@delete');

// ------------------------------------------------------------------
// MIDDLEWARE
// ------------------------------------------------------------------

/**
 * @param \Noks\Middleware\API\Constructor\FavouriteBlock
 */
middleware('POST',   '/api/constructor/favourites_blocks/{int_unsigned}', '\Noks\Middleware\API\Constructor\FavouriteBlock@store');
middleware('DELETE', '/api/constructor/favourites_blocks/{int_unsigned}', '\Noks\Middleware\API\Constructor\FavouriteBlock@delete');
