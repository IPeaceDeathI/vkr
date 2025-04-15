<?php

/**
 * @param \Noks\Controller\API\Constructor\TemplateIndex
 */
route('GET', '/api/constructor/template',                '\Noks\Controller\API\Constructor\TemplateIndex@main');
route('GET', '/api/constructor/template/{int_unsigned}', '\Noks\Controller\API\Constructor\TemplateIndex@main');
/**
 * @param \Noks\Controller\API\Constructor\TemplateUpdate
 * для админов и создателей шаблонов
 */
route('PUT', '/api/constructor/template/{int_unsigned}',  '\Noks\Controller\API\Constructor\TemplateUpdate@main');
/**
 * @param \Noks\Controller\API\Constructor\TemplateDelete
 */
route('DELETE', '/api/constructor/template/{int_unsigned}',  '\Noks\Controller\API\Constructor\TemplateDelete@main');
/**
 * @param \Noks\Controller\API\Constructor\TemplateStore
 * для админов и создателей шаблонов
 */
route('POST', '/api/constructor/template',                '\Noks\Controller\API\Constructor\TemplateStore@main');



/**
 * @param \Noks\Controller\API\Constructor\MyTemplateIndex
 */
route('GET', '/api/constructor/my/template',                '\Noks\Controller\API\Constructor\MyTemplateIndex@main');
route('GET', '/api/constructor/my/template/{int_unsigned}', '\Noks\Controller\API\Constructor\MyTemplateIndex@main');
/**
 * @param \Noks\Controller\API\Constructor\MyTemplateDelete
 */
route('DELETE', '/api/constructor/my/template/{int_unsigned}', '\Noks\Controller\API\Constructor\MyTemplateDelete@main');
/**
 * @param \Noks\Controller\API\Constructor\MyTemplateUpdate
 */
route('PUT', '/api/constructor/my/template/{int_unsigned}', '\Noks\Controller\API\Constructor\MyTemplateUpdate@main');
/**
 * @param \Noks\Controller\API\Constructor\MyTemplateStore
 */
route('POST', '/api/constructor/my/template', '\Noks\Controller\API\Constructor\MyTemplateStore@main');




/**
 * @param \Noks\Controller\API\Constructor\TemplateCategoryIndex
 */
route('GET', '/api/constructor/template_category',          '\Noks\Controller\API\Constructor\TemplateCategoryIndex@main');

// ------------------------------------------------------------------
// MIDDLEWARE
// ------------------------------------------------------------------

/**
 * @param \Noks\Middleware\API\Constructor\TemplateAPI
 */
middleware('GET',    '/api/constructor/template',                 '\Noks\Middleware\API\Constructor\TemplateAPI@index');
middleware('GET',    '/api/constructor/template/{int_unsigned}',  '\Noks\Middleware\API\Constructor\TemplateAPI@index');
middleware('PUT',    '/api/constructor/template/{int_unsigned}',  '\Noks\Middleware\API\Constructor\TemplateAPI@update');
middleware('DELETE', '/api/constructor/template/{int_unsigned}',  '\Noks\Middleware\API\Constructor\TemplateAPI@delete');
middleware('POST',   '/api/constructor/template',                 '\Noks\Middleware\API\Constructor\TemplateAPI@store');

/**
 * @param \Noks\Middleware\API\Constructor\MyTemplateAPI
 */
middleware('GET',    '/api/constructor/my/template',                 '\Noks\Middleware\API\Constructor\MyTemplateAPI@index');
middleware('GET',    '/api/constructor/my/template/{int_unsigned}',  '\Noks\Middleware\API\Constructor\MyTemplateAPI@index');
middleware('PUT',    '/api/constructor/my/template/{int_unsigned}',  '\Noks\Middleware\API\Constructor\MyTemplateAPI@update');
middleware('DELETE', '/api/constructor/my/template/{int_unsigned}',  '\Noks\Middleware\API\Constructor\MyTemplateAPI@delete');
middleware('POST',   '/api/constructor/my/template',                 '\Noks\Middleware\API\Constructor\MyTemplateAPI@store');
/**
 * @param \
 */
// middleware('GET', '/api/constructor/template_category',          '\@main');
