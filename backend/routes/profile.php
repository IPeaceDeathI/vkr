<?php

/**
 * @param \Noks\Controller\WEB\Profile\Reg
 * @param \Noks\Middleware\WEB\Profile\ProfileWEB
 */
\route(
    'GET',
    '/profile/reg',
    '\Noks\Controller\WEB\Profile\Reg@__invoke',
    '\Noks\Middleware\WEB\Profile\ProfileWEB@reg'
);

/**
 * @param \Noks\Controller\WEB\Profile\RegStore
 * @param \Noks\Middleware\WEB\Profile\ProfileWEB
 */
\route(
    'POST',
    '/profile/reg',
    '\Noks\Controller\WEB\Profile\RegStore@__invoke',
    '\Noks\Middleware\WEB\Profile\ProfileWEB@reg'
);

/**
 * @param \Noks\Controller\WEB\Profile\AuthCheck
 * @param \Noks\Middleware\WEB\Profile\ProfileWEB
 */
\route(
    'POST',
    '/profile/auth',
    '\Noks\Controller\WEB\Profile\AuthCheck@__invoke',
    '\Noks\Middleware\WEB\Profile\ProfileWEB@auth'
);

/**
 * @param \Noks\Controller\WEB\Profile\Auth
 * @param \Noks\Middleware\WEB\Profile\ProfileWEB
 */
\route(
    'GET',
    '/profile/auth',
    '\Noks\Controller\WEB\Profile\Auth@__invoke',
    '\Noks\Middleware\WEB\Profile\ProfileWEB@auth'
);

/**
 * @param \Noks\Controller\WEB\Profile\ResetCheck
 * @param \Noks\Middleware\WEB\Profile\ProfileWEB
 */
\route(
    'POST',
    '/profile/reset',
    '\Noks\Controller\WEB\Profile\ResetCheck@__invoke',
    '\Noks\Middleware\WEB\Profile\ProfileWEB@reset'
);

/**
 * @param \Noks\Controller\WEB\Profile\Reset
 * @param \Noks\Middleware\WEB\Profile\ProfileWEB
 */
\route(
    'GET',
    '/profile/reset',
    '\Noks\Controller\WEB\Profile\Reset@__invoke',
    '\Noks\Middleware\WEB\Profile\ProfileWEB@reset'
);





/**
 * @param \Noks\Controller\API\Profile\RespawnProfile
 */
\route(
    'POST',
    '/api/profile/respawn',
    '\Noks\Controller\API\Profile\RespawnProfile@__invoke'
);





/**
 * @param \Noks\Profile\Controller\RespawnReplaceProfile
 */
\route(
    'GET|POST',
    '/profile/respawn_replace',
    '\Noks\Profile\Controller\RespawnReplaceProfile@__invoke'
);

/**
 * @param \Noks\Profile\Controller\Logout
 */
\route('GET', '/profile/logout', '\Noks\Profile\Controller\Logout@__invoke');

// ------------------------------------------------------------------
// ------------------------------------------------------------------
// ------------------------------------------------------------------
// middleware
// ------------------------------------------------------------------
// ------------------------------------------------------------------
// ------------------------------------------------------------------

\middleware('GET', '/profile(.*)', function ($o) {
    if (
        \userAuth() &&
        $o == 'respawn_replace'
    )
        \redirect('/admin/sites');
});
