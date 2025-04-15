<?php

/**
 * @param \Noks\Controller\API\Constructor\PageStore
 */
route('POST', '/api/constructor/pages/{int_unsigned}', '\Noks\Controller\API\Constructor\PageStore@__invoke');
/**
 * @param \Noks\Controller\API\Constructor\PageIndex
 */
route('GET',  '/api/constructor/pages/{int_unsigned}', '\Noks\Controller\API\Constructor\PageIndex@__invoke');
/**
 * @param \Noks\Controller\API\Constructor\PageUpdate
 */
route('PUT',  '/api/constructor/pages/{int_unsigned}', '\Noks\Controller\API\Constructor\PageUpdate@update');
/**
 * @param \Noks\Controller\API\Constructor\SaveLead
 */
route('POST', '/api/constructor/save/lead', '\Noks\Controller\API\Constructor\SaveLead@__invoke');
// ------------------------------------------------------------------
// MIDDLEWARE
// ------------------------------------------------------------------
/**
 * @param \Noks\Middleware\API\Constructor\Page
 */
\middleware('POST', '/api/constructor/pages/{int_unsigned}', '\Noks\Middleware\API\Constructor\Page@store');
\middleware('GET',  '/api/constructor/pages/{int_unsigned}', '\Noks\Middleware\API\Constructor\Page@index');
\middleware('PUT',  '/api/constructor/pages/{int_unsigned}', '\Noks\Middleware\API\Constructor\Page@update');
