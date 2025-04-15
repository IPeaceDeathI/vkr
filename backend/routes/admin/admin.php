<?php

// ------------------------------------------------------------------
// RaitingQualityPage
// ------------------------------------------------------------------

/**
 * @param \Noks\Controller\API\QualityPage\RaitingQualityPage
 * @param \Noks\Middleware\API\SitePage\QualityPageAPI
 */
route(
    'GET',
    '/api/raiting_quality_page/{int_unsigned}',
    '\Noks\Controller\API\QualityPage\RaitingQualityPage@main',
    '\Noks\Middleware\API\SitePage\QualityPageAPI@index',
);


// ------------------------------------------------------------------
// TableUsers
// ------------------------------------------------------------------

/**
 * @param \Noks\Controller\API\UsersAnalytics\TableUsers
 * @param \Noks\Middleware\API\User\UserAPI
 */
route(
    'GET',
    '/api/table_users/',
    '\Noks\Controller\API\UsersAnalytics\TableUsers@main',
    '\Noks\Middleware\API\User\UserAPI@index',
);


// ------------------------------------------------------------------
// admin
// ------------------------------------------------------------------

// route('GET', '/admin/sites', '\Noks\Controller\WEB\Admin\Site@index');
// route('GET', '/admin/pages', '\Noks\Controller\WEB\Admin\Page@index');
// route('GET', '/admin/lead', '\Noks\Controller\WEB\Admin\Lead@index');

// ------------------------------------------------------------------
// settings
// ------------------------------------------------------------------

// /**
//  * @param \Noks\Controller\WEB\Admin\Settings\General
//  */
// route(
//     'GET',
//     '/admin/settings/general',
//     '\Noks\Controller\WEB\Admin\Settings\General@index',
// );

// /**
//  * @param \Noks\Controller\WEB\Admin\Settings\Domain
//  */
// route(
//     'GET',
//     '/admin/settings/domains',
//     '\Noks\Controller\WEB\Admin\Settings\Domain@index',
// );

// /**
//  * @param \Noks\Controller\WEB\Admin\Settings\Notify
//  */
// route(
//     'GET',
//     '/admin/settings/notify',
//     '\Noks\Controller\WEB\Admin\Settings\Notify@index',
// );

// /**
//  * @param \Noks\Controller\WEB\Admin\Settings\Code
//  */
// route(
//     'GET',
//     '/admin/settings/code',
//     '\Noks\Controller\WEB\Admin\Settings\Code@index',
// );

// route('GET', '/admin/settings/access', '\Noks\Controller\WEB\Admin\Settings\Access@index');
// route('GET', '/admin/settings/integration_counters', '\Noks\Controller\WEB\Admin\Settings\IntegrationCounters@index');
// route('GET', '/admin/settings/integration_crm', '\Noks\Controller\WEB\Admin\Settings\IntegrationCrm@index');

// ------------------------------------------------------------------
// user
// ------------------------------------------------------------------

// route('GET', '/admin/user/profile', '\Noks\Controller\WEB\Admin\UserProfile@index');
// route('GET', '/admin/user/pay', '\Noks\Controller\WEB\Admin\UserPay@index');
// route('GET', '/admin/user/pay_plan', '\Noks\Controller\WEB\Admin\UserPayPlan@index');
// route('GET', '/admin/user/pay_invoices', '\Noks\Controller\WEB\Admin\User\UserPayInvoice@index');




// ------------------------------------------------------------------
// ADMIN
// ------------------------------------------------------------------


/**
 * @param \Noks\Controller\API\Admin\SitesIndex
 * @param \Noks\Middleware\API\Site\SiteAPI
 */
route(
    'GET',
    '/api/admin/sites',
    '\Noks\Controller\API\Admin\SitesIndex@__invoke',
    '\Noks\Middleware\API\Site\SiteAPI@auth'
);

/**
 * @param \Noks\Controller\API\Admin\PagesIndex
 * @param \Noks\Middleware\API\Site\SiteAPI
 */
route(
    'GET',
    '/api/admin/pages',
    '\Noks\Controller\API\Admin\PagesIndex@__invoke',
    '\Noks\Middleware\API\Site\SiteAPI@siteWithoutSiteID'
);

// ------------------------------------------------------------------
// CRM
// ------------------------------------------------------------------

/**
 * @param \Noks\Controller\API\CRM\LeadsIndex
 * @param \Noks\Middleware\API\User\UserAPI
 */
route(
    'GET',
    '/api/crm/leads',
    '\Noks\Controller\API\CRM\LeadsIndex@__invoke',
    '\Noks\Middleware\API\User\UserAPI@index',
);

/**
 * @param \Noks\Controller\API\CRM\LeadIndex
 * @param \Noks\Middleware\API\User\UserAPI
 */
route(
    'PUT',
    '/api/crm/lead',
    '\Noks\Controller\API\CRM\LeadIndex@main',
    '\Noks\Middleware\API\User\UserAPI@update',
);

/**
 * @param \Noks\Controller\API\CRM\AddLeadFromCRM
 * @param \Noks\Middleware\API\User\UserAPI
 */
route(
    'GET',
    '/api/crm/add_lead',
    '\Noks\Controller\API\CRM\AddLeadFromCRM@__invoke',
    '\Noks\Middleware\API\User\UserAPI@index',
);



/**
 * @param \Noks\Controller\API\CRM\StatusChangeIndex
 * @param \Noks\Middleware\API\User\UserAPI
 */
route(
    'PUT',
    '/api/crm/lead_status_change',
    '\Noks\Controller\API\CRM\StatusChangeIndex@main',
    '\Noks\Middleware\API\User\UserAPI@update',
);

/**
 * @param \Noks\Controller\API\CRM\StatusesIndex
 * @param \Noks\Middleware\API\User\UserAPI
 */
route(
    'GET',
    '/api/crm/leads_statuses',
    '\Noks\Controller\API\CRM\StatusesIndex@main',
    '\Noks\Middleware\API\User\UserAPI@index',
);



/**
 * @param \Noks\Controller\API\CRM\NotesIndex
 * @param \Noks\Middleware\API\User\UserAPI
 */
route(
    'PUT',
    '/api/crm/notes',
    '\Noks\Controller\API\CRM\NotesIndex@__invoke',
    '\Noks\Middleware\API\User\UserAPI@update',
);

/**
 * @param \Noks\Controller\API\CRM\NoteAddIndex
 * @param \Noks\Middleware\API\User\UserAPI
 */
route(
    'PUT',
    '/api/crm/note_add',
    '\Noks\Controller\API\CRM\NoteAddIndex@main',
    '\Noks\Controller\API\User\Profile@index',
);


// ------------------------------------------------------------------
// USER
// ------------------------------------------------------------------

/**
 * @param \Noks\Controller\API\User\Profile
 * @param \Noks\Middleware\API\User\UserAPI
 */
route(
    'GET',
    '/api/user/profile',
    '\Noks\Controller\API\User\Profile@main',
    '\Noks\Controller\API\User\Profile@index',
);

/**
 * @param \Noks\Controller\API\User\ProfileUpdate
 * @param \Noks\Middleware\API\User\UserAPI
 */
\route(
    'PUT',
    '/api/user/profile',
    '\Noks\Controller\API\User\ProfileUpdate@__invoke',
    '\Noks\Middleware\API\User\UserAPI@update',
);


/**
 * @param \Noks\Controller\API\User\PayPlan
 * @param \Noks\Middleware\API\User\UserAPI
 */
route(
    'GET',
    '/api/user/pay_plan',
    '\Noks\Controller\API\User\PayPlan@main',
    '\Noks\Middleware\API\User\UserAPI@index',
);
