<?php

/**
 * @param \Noks\Controller\Analytics\Index
 */
route('GET', '/analytics', '\Noks\Controller\Analytics\Index@main');

/**
 * @param \Noks\Controller\API\Analytics\AnalyticsUser
 */
route('GET', '/analytics/api/users', '\Noks\Controller\API\Analytics\AnalyticsUser@user');
/**
 * @param \Noks\Controller\API\Analytics\AnalyticsSite
 */
route('GET', '/analytics/api/sites', '\Noks\Controller\API\Analytics\AnalyticsSite@site');
/**
 * @param \Noks\Controller\API\Analytics\AnalyticsPage
 */
route('GET', '/analytics/api/pages', '\Noks\Controller\API\Analytics\AnalyticsPage@page');

// ------------------------------------------------------------------
// middleware
// ------------------------------------------------------------------

/**
 * @param \Noks\Middleware\API\Analytics\AnalyticsAPI
 */
middleware('GET', '/analytics/api/users', '\Noks\Middleware\API\Analytics\AnalyticsAPI@user');
middleware('GET', '/analytics/api/sites', '\Noks\Middleware\API\Analytics\AnalyticsAPI@site');
middleware('GET', '/analytics/api/pages', '\Noks\Middleware\API\Analytics\AnalyticsAPI@page');

/**
 * @param \Noks\Middleware\WEB\Analytics\AnalyticsWeb
 */
middleware('GET', '/analytics', '\Noks\Middleware\WEB\Analytics\AnalyticsWeb@main');
