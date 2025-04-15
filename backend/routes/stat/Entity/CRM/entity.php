<?php

// TODO на удаление, после рефакторинга
// TODO надо отказываться от полиморфных апи

// ------------------------------------------------------------------
// pipeline
// ------------------------------------------------------------------

/**
 * @param \Noks\Controller\API\Stat\Entity\CRM\PipelineIndex
 * @param \Noks\Middleware\API\Stat\CRM\PipelineAPI
 */
// route(
//     'GET',
//     'api/stat/{int_unsigned}/crm/{int_unsigned}/pipeline',
//     '\Noks\Controller\API\Stat\Entity\CRM\PipelineIndex@main',
//     '\Noks\Middleware\API\Stat\CRM\PipelineAPI@all'
// );
/**
 * @param \Noks\Controller\API\Stat\Entity\CRM\PipelineOneIndex
 * @param \Noks\Middleware\API\Stat\CRM\PipelineAPI
 */
// route(
//     'GET',
//     'api/stat/{int_unsigned}/crm/{int_unsigned}/pipeline/{int_unsigned}',
//     '\Noks\Controller\API\Stat\Entity\CRM\PipelineOneIndex@main',
//     '\Noks\Middleware\API\Stat\CRM\PipelineAPI@one'
// );

// ------------------------------------------------------------------
// status
// ------------------------------------------------------------------

/**
 * @param \Noks\Controller\API\Stat\Entity\CRM\StatusIndex
 * @param \Noks\Middleware\API\Stat\CRM\StatusAPI
 */
// route(
//     'GET',
//     'api/stat/{int_unsigned}/crm/{int_unsigned}/status',
//     '\Noks\Controller\API\Stat\Entity\CRM\StatusIndex@main',
//     '\Noks\Middleware\API\Stat\CRM\StatusAPI@all'
// );

/**
 * @param \Noks\Controller\API\Stat\Entity\CRM\StatusByPipelineIndex
 * @param \Noks\Middleware\API\Stat\CRM\StatusAPI
 */
// route(
//     'GET',
//     'api/stat/{int_unsigned}/crm/{int_unsigned}/status/pipeline/{int_unsigned}',
//     '\Noks\Controller\API\Stat\Entity\CRM\StatusByPipelineIndex@main',
//     '\Noks\Middleware\API\Stat\CRM\StatusAPI@byPipelineID'
// );

// ------------------------------------------------------------------
// user
// ------------------------------------------------------------------

/**
 * @param \Noks\Controller\API\Stat\Entity\CRM\UserIndex
 * @param \Noks\Middleware\API\Stat\CRM\UserAPI
 */
// route(
//     'GET',
//     'api/stat/{int_unsigned}/crm/{int_unsigned}/user',
//     '\Noks\Controller\API\Stat\Entity\CRM\UserIndex@main',
//     '\Noks\Middleware\API\Stat\CRM\UserAPI@all'
// );

/**
 * @param \Noks\Controller\API\Stat\Entity\CRM\UserOneIndex
 * @param \Noks\Middleware\API\Stat\CRM\UserAPI
 */
// route(
//     'GET',
//     'api/stat/{int_unsigned}/crm/{int_unsigned}/user/{int_unsigned}',
//     '\Noks\Controller\API\Stat\Entity\CRM\UserOneIndex@main',
//     '\Noks\Middleware\API\Stat\CRM\UserAPI@one'
// );

// ------------------------------------------------------------------
// Field
// ------------------------------------------------------------------

/**
 * @param \Noks\Controller\API\Stat\Entity\CRM\FieldIndex
 * @param \Noks\Middleware\API\Stat\CRM\FieldAPI
 */
// route(
//     'GET',
//     'api/stat/{int_unsigned}/crm/{int_unsigned}/field',
//     '\Noks\Controller\API\Stat\Entity\CRM\FieldIndex@main',
//     '\Noks\Middleware\API\Stat\CRM\FieldAPI@all'
// );

// ------------------------------------------------------------------
// lead
// ------------------------------------------------------------------

/**
 * @param \Noks\Controller\API\Stat\Entity\CRM\LeadIndex
 * @param \Noks\Middleware\API\Stat\CRM\LeadAPI
 */
// route(
//     'GET',
//     'api/stat/{int_unsigned}/crm/{int_unsigned}/lead',
//     '\Noks\Controller\API\Stat\Entity\CRM\LeadIndex@main',
//     '\Noks\Middleware\API\Stat\CRM\LeadAPI@all'
// );

/**
 * @param \Noks\Controller\API\Stat\Entity\CRM\LeadOneIndex
 * @param \Noks\Middleware\API\Stat\CRM\LeadAPI
 */
// route(
//     'GET',
//     'api/stat/{int_unsigned}/crm/{int_unsigned}/lead/{int_unsigned}',
//     '\Noks\Controller\API\Stat\Entity\CRM\LeadOneIndex@main',
//     '\Noks\Middleware\API\Stat\CRM\LeadAPI@one'
// );

/**
 * @param \Noks\Controller\API\Stat\Entity\CRM\LeadByUserIndex
 * @param \Noks\Middleware\API\Stat\CRM\LeadAPI
 */
// route(
//     'GET',
//     'api/stat/{int_unsigned}/crm/{int_unsigned}/lead/user/{int_unsigned}',
//     '\Noks\Controller\API\Stat\Entity\CRM\LeadByUserIndex@main',
//     '\Noks\Middleware\API\Stat\CRM\LeadAPI@byUserID'
// );

/**
 * @param \Noks\Controller\API\Stat\Entity\CRM\LeadByPipelineIndex
 * @param \Noks\Middleware\API\Stat\CRM\LeadAPI
 */
// route(
//     'GET',
//     'api/stat/{int_unsigned}/crm/{int_unsigned}/lead/pipeline/{int_unsigned}',
//     '\Noks\Controller\API\Stat\Entity\CRM\LeadByPipelineIndex@main',
//     '\Noks\Middleware\API\Stat\CRM\LeadAPI@byPipelineID'
// );

/**
 * @param \Noks\Controller\API\Stat\Entity\CRM\LeadByStatusIndex
 * @param \Noks\Middleware\API\Stat\CRM\LeadAPI
 */
// route(
//     'GET',
//     'api/stat/{int_unsigned}/crm/{int_unsigned}/lead/status/{int_unsigned}',
//     '\Noks\Controller\API\Stat\Entity\CRM\LeadByStatusIndex@main',
//     '\Noks\Middleware\API\Stat\CRM\LeadAPI@byStatusID'
// );
