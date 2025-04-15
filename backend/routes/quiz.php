<?php

// ------------------------------------------------------------------
// API
// ------------------------------------------------------------------

/**
 * @param \Noks\RESTAPI\Quiz
 * @param \Noks\Middleware\API\Quiz\QuizAPI
 */
route(
    'DELETE',
    '/api/quiz/{int_unsigned}',
    '\Noks\RESTAPI\Quiz@delete',
    '\Noks\Middleware\API\Quiz\QuizAPI@delete'
);
/**
 * @param \Noks\Quiz\Controller\SaveQuiz
 * @param \Noks\Middleware\API\Quiz\QuizAPI
 */
route(
    'POST',
    '/api/quiz/save/quiz',
    '\Noks\Quiz\Controller\SaveQuiz@main',
    '\Noks\Middleware\API\Quiz\QuizAPI@add'
);
/**
 * middleware не нужен
 * @param \Noks\Quiz\Controller\SaveStep
 */
route(
    'POST',
    '/api/quiz/save/step',
    '\Noks\Quiz\Controller\SaveStep@main'
);
/**
 * @param \Noks\Quiz\Controller\SaveLead
 * middleware не нужен
 */
route(
    'POST',
    '/api/quiz/save/lead',
    '\Noks\Quiz\Controller\SaveLead@__invoke'
);


// ------------------------------------------------------------------
// WEB
// ------------------------------------------------------------------

/**
 * @param \Noks\Quiz\Controller\Index
 * @param \Noks\Middleware\WEB\Quiz\QuizWEB
 */
route(
    'GET',
    '/quiz',
    '\Noks\Quiz\Controller\Index@main',
    '\Noks\Middleware\WEB\Quiz\QuizWEB@index'
);

/**
 * @param \Noks\Quiz\Controller\Add
 * @param \Noks\Middleware\WEB\Quiz\QuizWEB
 */
route(
    'GET',
    '/quiz/add',
    '\Noks\Quiz\Controller\Add@main',
    '\Noks\Middleware\WEB\Quiz\QuizWEB@add'
);

/**
 * @param \Noks\Quiz\Controller\Add
 * @param \Noks\Middleware\WEB\Quiz\QuizWEB
 */
route(
    'GET',
    '/quiz/add(/frame)?',
    '\Noks\Quiz\Controller\Add@main',
    '\Noks\Middleware\WEB\Quiz\QuizWEB@add'
);

/**
 * @param \Noks\Quiz\Controller\Edit
 * @param \Noks\Middleware\WEB\Quiz\QuizWEB
 */
route(
    'GET',
    '/quiz/edit/{int_unsigned}(/frame)?',
    '\Noks\Quiz\Controller\Edit@main',
    '\Noks\Middleware\WEB\Quiz\QuizWEB@edit'
);

/**
 * @param \Noks\Quiz\Controller\Preview
 */
route(
    'GET',
    '/quiz/preview/{int_unsigned}',
    '\Noks\Quiz\Controller\Preview@__invoke',
    '\Noks\Middleware\WEB\Quiz\QuizWEB@preview'
);

/**
 * @param \Noks\Quiz\Controller\Show
 * middleware не нужен
 */
route(
    'GET',
    '/quiz/show/{int_unsigned}',
    '\Noks\Quiz\Controller\Show@__invoke'
);
