<?php

/**
 * @param \Noks\Controller\API\Constructor\WidgetStore
 */
route('POST', '/api/constructor/page/{int_unsigned}/widget',                 '\Noks\Controller\API\Constructor\WidgetStore@store');
/**
 * @param \Noks\Controller\API\Constructor\WidgetUpdate
 */
route('PUT',   '/api/constructor/page/{int_unsigned}/widget/{int_unsigned}', '\Noks\Controller\API\Constructor\WidgetUpdate@update');
/**
 * @param \Noks\Controller\API\Constructor\WidgetSortingUpdate
 */
route('PUT',   '/api/constructor/page/{int_unsigned}/widget/sorting',        '\Noks\Controller\API\Constructor\WidgetSortingUpdate@update');
/**
 * @param \Noks\Controller\API\Constructor\WidgetDelete
 */
route('DELETE', '/api/constructor/page/{int_unsigned}/widget/{int_unsigned}', '\Noks\Controller\API\Constructor\WidgetDelete@delete');
/**
 * @param \Noks\Controller\API\Constructor\WidgetIndex
 */
route('GET',   '/api/constructor/page/{int_unsigned}/widget',                 '\Noks\Controller\API\Constructor\WidgetIndex@index');

// ------------------------------------------------------------------
// MIDDLEWARE
// ------------------------------------------------------------------

/**
 * @param \Noks\Middleware\API\Constructor\Page\Widget
 */
middleware('POST',   '/api/constructor/page/{int_unsigned}/widget',                '\Noks\Middleware\API\Constructor\Page\Widget@store');
middleware('PUT',    '/api/constructor/page/{int_unsigned}/widget/{int_unsigned}', '\Noks\Middleware\API\Constructor\Page\Widget@update');
middleware('PUT',    '/api/constructor/page/{int_unsigned}/widget/sorting',        '\Noks\Middleware\API\Constructor\Page\Widget@update');
middleware('DELETE', '/api/constructor/page/{int_unsigned}/widget/{int_unsigned}', '\Noks\Middleware\API\Constructor\Page\Widget@delete');
middleware('GET',    '/api/constructor/page/{int_unsigned}/widget',                '\Noks\Middleware\API\Constructor\Page\Widget@index');
