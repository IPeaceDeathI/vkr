<?php

/**
 * @param \Noks\Controller\API\Constructor\Old\Method\BlockMethodGetBlock
 */
route('GET',    '/api/blocks/method/get_block',              '\Noks\Controller\API\Constructor\Old\Method\BlockMethodGetBlock@main');
/**
 * @param \Noks\Controller\API\Constructor\Old\Method\BlockMethodGetBlocksByCategory
 */
route('GET',    '/api/blocks/method/get_blocks_by_category', '\Noks\Controller\API\Constructor\Old\Method\BlockMethodGetBlocksByCategory@main');
/**
 * @param \Noks\Controller\API\Constructor\Old\Method\BlockMethodGetAllPublishedIDs
 */
route('GET',    '/api/blocks/method/get_all_published_ids',  '\Noks\Controller\API\Constructor\Old\Method\BlockMethodGetAllPublishedIDs@main');
/**
 * @param \Noks\Controller\API\Constructor\Old\BlockDelete
 */
route('DELETE', '/api/blocks/{int_unsigned}',                '\Noks\Controller\API\Constructor\Old\BlockDelete@delete');
/**
 * @param \Noks\Controller\API\Constructor\Old\BlockUpdate
 */
route('PUT',    '/api/blocks/{int_unsigned}',                '\Noks\Controller\API\Constructor\Old\BlockUpdate@update');
/**
 * @param \Noks\Controller\API\Constructor\Old\BlockStore
 */
route('POST',   '/api/blocks',                               '\Noks\Controller\API\Constructor\Old\BlockStore@store');
/**
 * @param \Noks\Controller\API\Constructor\Old\Favourite\BlockFavouriteStore
 */
route('POST',   '/api/blocks/{int_unsigned}/favourites', '\Noks\Controller\API\Constructor\Old\Favourite\BlockFavouriteStore@store');
/**
 * @param \Noks\Controller\API\Constructor\Old\Favourite\BlockFavouriteDelete
 */
route('DELETE', '/api/blocks/{int_unsigned}/favourites', '\Noks\Controller\API\Constructor\Old\Favourite\BlockFavouriteDelete@delete');

// ------------------------------------------------------------------
// middleware
// ------------------------------------------------------------------

/**
 * @param \Noks\Middleware\API\Constructor\Old\Block\Method\BlockMethodAPI
 */
middleware('GET',    '/api/blocks/method/get_block',              '\Noks\Middleware\API\Constructor\Old\Block\Method\BlockMethodAPI@get_block');
middleware('GET',    '/api/blocks/method/get_blocks_by_category', '\Noks\Middleware\API\Constructor\Old\Block\Method\BlockMethodAPI@get_blocks_by_category');
middleware('GET',    '/api/blocks/method/get_all_published_ids',  '\Noks\Middleware\API\Constructor\Old\Block\Method\BlockMethodAPI@get_all_published_ids');
/**
 * @param \Noks\Middleware\API\Constructor\Old\Block\BlockAPI
 */
middleware('DELETE', '/api/blocks/{int_unsigned}',                '\Noks\Middleware\API\Constructor\Old\Block\BlockAPI@delete');
middleware('PUT',    '/api/blocks/{int_unsigned}',                '\Noks\Middleware\API\Constructor\Old\Block\BlockAPI@update');
middleware('POST',   '/api/blocks',                               '\Noks\Middleware\API\Constructor\Old\Block\BlockAPI@store');

/**
 * @param \Noks\Middleware\API\Constructor\Old\Block\Favourite\BlockFavouriteAPI
 */
middleware('POST',   '/api/blocks/{int_unsigned}/favourites', '\Noks\Middleware\API\Constructor\Old\Block\Favourite\BlockFavouriteAPI@store');
middleware('DELETE', '/api/blocks/{int_unsigned}/favourites', '\Noks\Middleware\API\Constructor\Old\Block\Favourite\BlockFavouriteAPI@delete');
