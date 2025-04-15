<?php

use Noks\Error\Errors;

// Quiz
/**
 * @param \Noks\Constructor\API\Controller\Quiz
 */
\route('GET', '/constructor/api/quizs', '\Noks\Constructor\API\Controller\Quiz@index');
// Pages
/**
 * @param \Noks\Constructor\API\Controller\Page
 */
\route('POST', '/constructor/api/pages', '\Noks\Constructor\API\Controller\Page@store');
// Notice
/**
 * @param \Noks\Constructor\API\Controller\Notice
 */
\route('POST', '/constructor/api/notices', '\Noks\Constructor\API\Controller\Notice@store');

// ------------------------------------------------------------------
// ------------------------------------------------------------------
// ------------------------------------------------------------------
// middleware
// ------------------------------------------------------------------
// ------------------------------------------------------------------
// ------------------------------------------------------------------

\middleware('GET|POST|PUT|DELETE', '/constructor/api(.*)', function ($o) {
    \checkExistUserAPI();
});


// ------------------------------------------------------------------
// ------------------------------------------------------------------
// ------------------------------------------------------------------
// constructor 2
// ------------------------------------------------------------------
// ------------------------------------------------------------------
// ------------------------------------------------------------------

/**
 * @param \Noks\Controller\Constructor\Page\PreviewPage
 * TODO превью теперь у нас это ссылка на поддомен с uri
 */
\route('GET', '/constructor_2/preview', '\Noks\Controller\Constructor\Page\PreviewPage@main');
/**
 * @param \Noks\Controller\Constructor\Page\EditPage
 */
\route('GET', '/constructor_2/edit', '\Noks\Controller\Constructor\Page\EditPage@__invoke');

// ------------------------------------------------------------------
// middleware constructor 2
// ------------------------------------------------------------------

\middleware('GET|POST|PUT|DELETE', '/constructor_2(.*)', function () {
    if (!\userAuth()) Errors::_403();
    $params = \getCurrentQuery();
    $id = $params['site_page_id'] ?? null;
    if (!isset($id) || !\isInt($id)) Errors::_400();
    $id = \int($id);
    if (!\pageMatching($id)) Errors::_404();
});
