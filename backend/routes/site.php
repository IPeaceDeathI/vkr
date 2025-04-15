<?php

/**
 * @param \Noks\Controller\API\Site\Setting\SiteSettingIndex
 */
route(
    'GET',
    '/api/site/{int_unsigned}/setting',
    '\Noks\Controller\API\Site\Setting\SiteSettingIndex@main'
);
/**
 * @param \Noks\Controller\API\Site\Setting\SiteSettingUpdate
 */
route(
    'PUT',
    '/api/site/{int_unsigned}/setting',
    '\Noks\Controller\API\Site\Setting\SiteSettingUpdate@main'
);

// ------------------------------------------------------------------
// middleware
// ------------------------------------------------------------------

/**
 * @param \Noks\Middleware\API\Site\Setting\SiteSettingAPI
 */
middleware(
    'GET',
    '/api/site/{int_unsigned}/setting',
    '\Noks\Middleware\API\Site\Setting\SiteSettingAPI@index'
);
/**
 * @param \Noks\Middleware\API\Site\Setting\SiteSettingAPI
 */
middleware(
    'PUT',
    '/api/site/{int_unsigned}/setting',
    '\Noks\Middleware\API\Site\Setting\SiteSettingAPI@update'
);
