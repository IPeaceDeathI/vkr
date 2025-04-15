<?php

/**
 * @param \Noks\Controller\API\User\UserUpdate
 */
route('PUT', '/api/users/{int_unsigned}', '\Noks\Controller\API\User\UserUpdate@update');
/**
 * @param \Noks\Controller\API\User\UserRightsIndex
 */
route('GET', '/api/users/rights',        '\Noks\Controller\API\User\UserRightsIndex@index');

// ------------------------------------------------------------------
// middleware
// ------------------------------------------------------------------

/**
 * @param \Noks\Middleware\API\User\UserAPI
 */
middleware('PUT', '/api/users/{int_unsigned}', '\Noks\Middleware\API\User\UserAPI@update');
middleware('GET', '/api/users/rights',         '\Noks\Middleware\API\User\UserAPI@index');
