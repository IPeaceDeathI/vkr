<?php

/**
 * @param \Noks\Controller\API\Site\Page\Setting\SettingUpdate
 * @param \Noks\Middleware\API\Site\Page\Setting\SitePageSettingAPI
 */
route(
    'PUT',
    '/api/site/{int_unsigned}/page/{int_unsigned}/setting',
    '\Noks\Controller\API\Site\Page\Setting\SettingUpdate@update',
    '\Noks\Middleware\API\Site\Page\Setting\SitePageSettingAPI@update'
);
