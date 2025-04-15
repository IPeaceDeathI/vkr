<?php

/**
 * @param \Noks\Template\Controller\IndexTemplate
 * @param \Noks\Middleware\WEB\Template\TemplateWEB
 */
route(
    'GET',
    '/templates',
    '\Noks\Template\Controller\IndexTemplate@index',
    '\Noks\Middleware\WEB\Template\TemplateWEB@main'
);

/**
 * @param \Noks\Template\Controller\EditTemplate
 * @param \Noks\Middleware\WEB\Template\TemplateWEB
 */
route(
    'GET',
    '/templates/edit/{int_unsigned}',
    '\Noks\Template\Controller\EditTemplate@index',
    '\Noks\Middleware\WEB\Template\TemplateWEB@edit'
);

/**
 * @param \Noks\Template\Controller\ShowTemplate
 * @param \Noks\Middleware\WEB\Template\TemplateWEB
 */
route(
    'GET',
    '/templates/show/{int_unsigned}',
    '\Noks\Template\Controller\ShowTemplate@index',
    '\Noks\Middleware\WEB\Template\TemplateWEB@show'
);

/**
 * @param \Noks\RESTAPI\Templates
 * @param \Noks\Middleware\API\Template\TemplateAPI
 */
route(
    'PUT',
    '/api/templates/{int_unsigned}',
    '\Noks\RESTAPI\Templates@update',
    '\Noks\Middleware\API\Template\TemplateAPI@update'
);

/**
 * @param \Noks\RESTAPI\Templates
 * @param \Noks\Middleware\API\Template\TemplateAPI
 */
route(
    'DELETE',
    '/api/templates/{int_unsigned}',
    '\Noks\RESTAPI\Templates@delete',
    '\Noks\Middleware\API\Template\TemplateAPI@delete'
);

/**
 * @param \Noks\RESTAPI\Templates
 * @param \Noks\Middleware\API\Template\TemplateAPI
 */
route(
    'GET|PUT',
    '/api/templates/method',
    '\Noks\RESTAPI\Templates@method',
    '\Noks\Middleware\API\Template\TemplateAPI@method'
);

/**
 * @param \Noks\RESTAPI\Templates
 * @param \Noks\Middleware\API\Template\TemplateAPI
 */
route(
    'POST',
    '/api/templates/{int_unsigned}/method',
    '\Noks\RESTAPI\Templates@method',
    '\Noks\Middleware\API\Template\TemplateAPI@method'
);
