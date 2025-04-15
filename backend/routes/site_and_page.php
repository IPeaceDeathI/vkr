<?php

use Noks\Error\Errors;

// ------------------------------------------------------------------
// api
// ------------------------------------------------------------------

/**
 * @param \Noks\RESTAPI\Sites
 * @param \Noks\Middleware\Site
 */
route(
    'GET',
    '/api/sites',
    '\Noks\RESTAPI\Sites@index',
    '\Noks\Middleware\Site@api',
);
/**
 * @param \Noks\RESTAPI\Sites
 * @param \Noks\Middleware\Site
 */
route(
    'GET',
    '/api/sites/{int_unsigned}',
    '\Noks\RESTAPI\Sites@index',
    '\Noks\Middleware\Site@api_site'
);
/**
 * @param \Noks\RESTAPI\Sites
 * @param \Noks\Middleware\Site
 */
route(
    'DELETE',
    '/api/sites/{int_unsigned}',
    '\Noks\RESTAPI\Sites@delete',
    '\Noks\Middleware\Site@api_site',
);
/**
 * @param \Noks\RESTAPI\RoistatWebHook
 * @param \Noks\Middleware\Site
 */
route(
    'POST',
    '/api/sites/{int_unsigned}/roistat_webhook',
    '\Noks\RESTAPI\RoistatWebHook@store',
    '\Noks\Middleware\Site@api_site',
);
/**
 * @param \Noks\RESTAPI\RoistatWebHook
 * @param \Noks\Middleware\Site
 */
route(
    'PUT',
    '/api/sites/{int_unsigned}/roistat_webhook',
    '\Noks\RESTAPI\RoistatWebHook@update',
    '\Noks\Middleware\Site@api_site',
);
/**
 * @param \Noks\RESTAPI\RoistatProxyLead
 * @param \Noks\Middleware\Site
 */
route(
    'PUT',
    '/api/sites/{int_unsigned}/roistat_proxy_lead',
    '\Noks\RESTAPI\RoistatProxyLead@update',
    '\Noks\Middleware\Site@api_site',
);
/**
 * @param \Noks\RESTAPI\SiteSettings
 * @param \Noks\Middleware\Site
 */
route(
    'PUT',
    '/api/sites/{int_unsigned}/activity',
    '\Noks\RESTAPI\SiteSettings@activity',
    '\Noks\Middleware\Site@api_site',
);
/**
 * @param \Noks\RESTAPI\Pages
 * @param \Noks\Middleware\Site
 */
route(
    'GET',
    '/api/sites/{int_unsigned}/pages',
    '\Noks\RESTAPI\Pages@site_index',
    '\Noks\Middleware\Site@api_site',
);
/**
 * @param \Noks\RESTAPI\Pages
 * @param \Noks\Middleware\Site
 */
route(
    'GET',
    '/api/sites/{int_unsigned}/pages/{int_unsigned}',
    '\Noks\RESTAPI\Pages@site_index',
    '\Noks\Middleware\Site@api_site_page',
);
/**
 * @param \Noks\Controller\API\Site\Page\Setting\SwitchEditor
 * @param \Noks\Middleware\Site
 */
route(
    'PUT',
    '/api/sites/{int_unsigned}/pages/{int_unsigned}/switch_editor',
    '\Noks\Controller\API\Site\Page\Setting\SwitchEditor@update',
    '\Noks\Middleware\Site@api_site_page',
);
/**
 * @param \Noks\RESTAPI\Pages
 * @param \Noks\Middleware\Site
 */
route(
    'GET',
    '/api/pages',
    '\Noks\RESTAPI\Pages@index',
    '\Noks\Middleware\Site@api',
);
/**
 * @param \Noks\RESTAPI\Pages
 * @param \Noks\Middleware\Site
 */
route(
    'GET',
    '/api/pages/{int_unsigned}',
    '\Noks\RESTAPI\Pages@index',
    '\Noks\Middleware\Site@api_page'
);
/**
 * @param \Noks\RESTAPI\Pages
 * @param \Noks\Middleware\Site
 */
route(
    'DELETE',
    '/api/pages/{int_unsigned}',
    '\Noks\RESTAPI\Pages@delete',
    '\Noks\Middleware\Site@api_page',
);
/**
 * @param \Noks\SitePage\API\Controller\Page
 * @param \Noks\Middleware\Site
 * TODO :D
 */
route(
    'PUT',
    '/sites/{int_unsigned}/page/{int_unsigned}/api',
    '\Noks\SitePage\API\Controller\Page@update',
    '\Noks\Middleware\Site@api_site_page',
);
/**
 * @param \Noks\SitePage\API\Controller\Page
 * @param \Noks\Middleware\Site
 * TODO :D
 */
route(
    'POST',
    '/sites/{int_unsigned}/page/{int_unsigned}/api',
    '\Noks\SitePage\API\Controller\Page@store',
    '\Noks\Middleware\Site@api_site_page',
);
/**
 * @param \Noks\Site\API\Controller\Site
 * @param \Noks\Middleware\Site
 */
route(
    'PUT',
    '/sites/{int_unsigned}/api',
    '\Noks\Site\API\Controller\Site@update',
    '\Noks\Middleware\Site@api_site',
);

/**
 * @param \Noks\Controller\API\Site\Method\SiteMethodChangeStatusesForLeads
 * @param \Noks\Middleware\Site
 */
route(
    'PUT',
    '/api/site/{int_unsigned}/setting/method/change_statuses_for_leads',
    '\Noks\Controller\API\Site\Method\SiteMethodChangeStatusesForLeads@__invoke',
    '\Noks\Middleware\Site@api_site',
);

/**
 * @param \Noks\Controller\API\Site\Method\AddDomainSite
 * @param \Noks\Middleware\API\Site\SiteAPI
 */
route(
    'POST',
    '/api/sites/{int_unsigned}/domain/add',
    '\Noks\Controller\API\Site\Method\AddDomainSite@__invoke',
    '\Noks\Middleware\API\Site\SiteAPI@site',
);
/**
 * @param \Noks\Site\API\Controller\Domain
 * @param \Noks\Middleware\Site
 */
route(
    'PUT',
    '/sites/{int_unsigned}/api/domain',
    '\Noks\Site\API\Controller\Domain@update',
    '\Noks\Middleware\Site@api_site',
);
/**
 * @param \Noks\Site\API\Controller\AmoCRM
 * @param \Noks\Middleware\Site
 */
route(
    'PUT',
    '/sites/{int_unsigned}/api/amo_crm',
    '\Noks\Site\API\Controller\AmoCRM@update',
    '\Noks\Middleware\Site@api_site',
);
/**
 * @param \Noks\Site\API\Controller\AmoCRM
 * @param \Noks\Middleware\Site
 */
route(
    'DELETE',
    '/sites/{int_unsigned}/api/amo_crm',
    '\Noks\Site\API\Controller\AmoCRM@destroy',
    '\Noks\Middleware\Site@api_site',
);
/**
 * @param \Noks\Site\API\Controller\Application
 * @param \Noks\Middleware\Site
 */
route(
    'PUT',
    '/sites/{int_unsigned}/api/application',
    '\Noks\Site\API\Controller\Application@update',
    '\Noks\Middleware\Site@api_site',
);

/**
 * @param \Noks\Controller\API\Site\Page\AddPage
 * @param \Noks\Middleware\API\Site\SiteAPI
 */
route(
    'POST',
    '/api/sites/{int_unsigned}/add_page',
    '\Noks\Controller\API\Site\Page\AddPage@__invoke',
    '\Noks\Middleware\API\Site\SiteAPI@site',
);

/**
 * @param \Noks\Controller\API\Site\Page\AddPageAdmin
 * @param \Noks\Middleware\API\Site\SiteAPI
 */
route(
    'POST',
    '/api/sites/add_page',
    '\Noks\Controller\API\Site\Page\AddPageAdmin@__invoke',
    '\Noks\Middleware\API\Site\SiteAPI@siteWithoutSiteID',
);

/**
 * @param \Noks\Controller\API\Site\Method\SiteMethodAddSite
 */
route(
    'POST',
    '/api/site/method/add_site',
    '\Noks\Controller\API\Site\Method\SiteMethodAddSite@__invoke'
);
/**
 * @param \Noks\Controller\API\Site\Page\Method\SitePageMethodClonePage
 * @param \Noks\Middleware\API\Site\Page\Method\SitePageMethodAPI
 */
route(
    'POST',
    '/api/site/{int_unsigned}/page/{int_unsigned}/method/clone_page',
    '\Noks\Controller\API\Site\Page\Method\SitePageMethodClonePage@main',
    '\Noks\Middleware\API\Site\Page\Method\SitePageMethodAPI@clone_page',
);


// ------------------------------------------------------------------
// WEB
// ------------------------------------------------------------------


/**
 * @param \Noks\Site\Controller\Index
 */
route(
    'GET',
    '/sites', // --> redirect /admin/sites
    '\Noks\Site\Controller\Index@__invoke',
);
/**
 * @param \Noks\Site\Controller\AddSite
 */
route(
    'GET',
    '/sites/add',
    '\Noks\Site\Controller\AddSite@__invoke',
);

/**
 * @param \Noks\Site\Controller\Application
 * @param \Noks\Middleware\WEB\Site\SiteWEB
 */
route(
    'GET',
    '/sites/{int_unsigned}/application',
    '\Noks\Site\Controller\Application@__invoke',
    '\Noks\Middleware\WEB\Site\SiteWEB@index',
);

/**
 * @param \Noks\Site\Controller\Site
 * @param \Noks\Middleware\WEB\Site\SiteWEB
 */
route(
    'GET',
    '/sites/{int_unsigned}',
    '\Noks\Site\Controller\Site@__invoke',
    '\Noks\Middleware\WEB\Site\SiteWEB@index',
);

/**
 * @param \Noks\Site\Controller\Domain
 * @param \Noks\Middleware\WEB\Site\SiteWEB
 */
route(
    'GET',
    '/sites/{int_unsigned}/domain',
    '\Noks\Site\Controller\Domain@__invoke',
    '\Noks\Middleware\WEB\Site\SiteWEB@index',
);

/**
 * @param \Noks\Site\Controller\Domain
 * @param \Noks\Middleware\WEB\Site\SiteWEB
 */
route(
    'GET',
    '/sites/{int_unsigned}/settings/domain',
    '\Noks\Site\Controller\Domain@__invoke',
    '\Noks\Middleware\WEB\Site\SiteWEB@index',
);

/**
 * @param \Noks\Site\Controller\AddPage
 * @param \Noks\Middleware\WEB\Site\SiteWEB
 */
route(
    'GET',
    '/sites/{int_unsigned}/page/add',
    '\Noks\Site\Controller\AddPage@__invoke',
    '\Noks\Middleware\WEB\Site\SiteWEB@index',
);

/**
 * @param \Noks\Site\Controller\Setting\Site
 * @param \Noks\Middleware\WEB\Site\SiteWEB
 */
route(
    'GET',
    '/sites/{int_unsigned}/settings',
    '\Noks\Site\Controller\Setting\Site@__invoke',
    '\Noks\Middleware\WEB\Site\SiteWEB@index',
);

/**
 * @param \Noks\Site\Controller\Setting\Site
 * @param \Noks\Middleware\WEB\Site\SiteWEB
 */
route(
    'GET',
    '/sites/settings',
    '\Noks\Site\Controller\Setting\Site@main_admin',
    '\Noks\Middleware\WEB\Site\SiteWEB@indexWithoutSiteID',
);

/**
 * @param \Noks\Site\Controller\Setting\Site
 * @param \Noks\Middleware\WEB\Site\SiteWEB
 */
route(
    'GET',
    '/admin/sites/{int_unsigned}/settings',
    '\Noks\Site\Controller\Setting\Site@__invoke',
    '\Noks\Middleware\WEB\Site\SiteWEB@index',
);

/**
 * @param \Noks\Site\Controller\Setting\SiteAdmin
 * @param \Noks\Middleware\WEB\Site\SiteWEB
 */
route(
    'GET',
    '/admin/sites/settings',
    '\Noks\Site\Controller\Setting\SiteAdmin@__invoke',
    '\Noks\Middleware\WEB\Site\SiteWEB@indexWithoutSiteID',
);

/**
 * @param \Noks\Site\Controller\Setting\ApplicationStatuses
 * @param \Noks\Middleware\WEB\Site\SiteWEB
 */
route(
    'GET',
    '/sites/{int_unsigned}/settings/application_statuses',
    '\Noks\Site\Controller\Setting\ApplicationStatuses@__invoke',
    '\Noks\Middleware\WEB\Site\SiteWEB@index',
);

/**
 * @param \Noks\Site\Controller\Setting\CodeInsert
 * @param \Noks\Middleware\WEB\Site\SiteWEB
 */
route(
    'GET',
    '/sites/{int_unsigned}/settings/code_insert',
    '\Noks\Site\Controller\Setting\CodeInsert@__invoke',
    '\Noks\Middleware\WEB\Site\SiteWEB@index',
);

/**
 * @param \Noks\Site\Controller\Setting\AmoCRM
 * @param \Noks\Middleware\WEB\Site\SiteWEB
 */
route(
    'GET',
    '/sites/{int_unsigned}/settings/amo_crm',
    '\Noks\Site\Controller\Setting\AmoCRM@__invoke',
    '\Noks\Middleware\WEB\Site\SiteWEB@index',
);

/**
 * @param \Noks\Site\Controller\Setting\RoiStatWebHook
 * @param \Noks\Middleware\WEB\Site\SiteWEB
 */
route(
    'GET',
    '/sites/{int_unsigned}/settings/roistat_webhook',
    '\Noks\Site\Controller\Setting\RoiStatWebHook@__invoke',
    '\Noks\Middleware\WEB\Site\SiteWEB@index',
);

/**
 * @param \Noks\Site\Controller\Setting\ActivitySite
 * @param \Noks\Middleware\WEB\Site\SiteWEB
 */
route(
    'GET',
    '/sites/{int_unsigned}/settings/activity',
    '\Noks\Site\Controller\Setting\ActivitySite@__invoke',
    '\Noks\Middleware\WEB\Site\SiteWEB@index',
);
/**
 * @param \Noks\Controller\Site\Setting\AccessCode
 * @param \Noks\Middleware\WEB\Site\SiteWEB
 */
route(
    'GET',
    '/sites/{int_unsigned}/settings/access_code',
    '\Noks\Controller\Site\Setting\AccessCode@__invoke',
    '\Noks\Middleware\WEB\Site\SiteWEB@index',
);
/**
 * @param \Noks\Controller\Site\Setting\SubDomain
 * @param \Noks\Middleware\WEB\Site\SiteWEB
 */
route(
    'GET',
    '/sites/{int_unsigned}/settings/sub_domain',
    '\Noks\Controller\Site\Setting\SubDomain@__invoke',
    '\Noks\Middleware\WEB\Site\SiteWEB@index',
);

/**
 * @param \Noks\Controller\Site\Setting\ChangeSubDomain
 * TODO нужно придумать мидлвейр
 */
route(
    'POST',
    '/sites/{int_unsigned}/settings/sub_domain',
    '\Noks\Controller\Site\Setting\ChangeSubDomain@__invoke',
);

/**
 * @param \Noks\Site\Controller\Setting\DeleteSite
 * @param \Noks\Middleware\WEB\Site\SiteWEB
 */
route(
    'GET',
    '/sites/{int_unsigned}/settings/delete_site',
    '\Noks\Site\Controller\Setting\DeleteSite@main',
    '\Noks\Middleware\WEB\Site\SiteWEB@index',
);

/**
 * @param \Noks\Site\Controller\Setting\RoiStatProxyLead
 * @param \Noks\Middleware\WEB\Site\SiteWEB
 */
route(
    'GET',
    '/sites/{int_unsigned}/settings/roistat_proxy_lead',
    '\Noks\Site\Controller\Setting\RoiStatProxyLead@main',
    '\Noks\Middleware\WEB\Site\SiteWEB@index',
);

/**
 * @param \Noks\SitePage\Controller\Setting\Page
 * @param \Noks\Middleware\WEB\Site\Page\Setting\SitePageSettingWeb
 */
route(
    'GET',
    '/sites/{int_unsigned}/page/{int_unsigned}/settings',
    '\Noks\SitePage\Controller\Setting\Page@index',
    '\Noks\Middleware\WEB\Site\Page\Setting\SitePageSettingWeb@index',
);

/**
 * @param \Noks\SitePage\Controller\Setting\Page
 * @param \Noks\Middleware\WEB\Site\Page\Setting\SitePageSettingWeb
 */
route(
    'GET',
    '/admin/sites/{int_unsigned}/page/{int_unsigned}/settings',
    '\Noks\SitePage\Controller\Setting\Page@index',
    '\Noks\Middleware\WEB\Site\Page\Setting\SitePageSettingWeb@index',
);

/**
 * @param \Noks\SitePage\Controller\Setting\CreateTemplate
 * @param \Noks\Middleware\WEB\Site\Page\Setting\SitePageSettingWeb
 */
route(
    'GET',
    '/sites/{int_unsigned}/page/{int_unsigned}/settings/create_tpl',
    '\Noks\SitePage\Controller\Setting\CreateTemplate@__invoke',
    '\Noks\Middleware\WEB\Site\Page\Setting\SitePageSettingWeb@create_tpl',
);

/**
 * @param \Noks\SitePage\Controller\Setting\ClonePage
 * @param \Noks\Middleware\WEB\Site\Page\Setting\SitePageSettingWeb
 */
route(
    'GET',
    '/sites/{int_unsigned}/page/{int_unsigned}/settings/clone_page',
    '\Noks\SitePage\Controller\Setting\ClonePage@index',
    '\Noks\Middleware\WEB\Site\Page\Setting\SitePageSettingWeb@clone_page',
);

/**
 * @param \Noks\SitePage\Controller\Setting\DeletePage
 * @param \Noks\Middleware\WEB\Site\Page\Setting\SitePageSettingWeb
 */
route(
    'GET',
    '/sites/{int_unsigned}/page/{int_unsigned}/settings/delete_page',
    '\Noks\SitePage\Controller\Setting\DeletePage@index',
    '\Noks\Middleware\WEB\Site\Page\Setting\SitePageSettingWeb@delete_page',
);

/**
 * @param \Noks\SitePage\Controller\Setting\ControleVersionPage
 * @param \Noks\Middleware\WEB\Site\Page\Setting\SitePageSettingWeb
 */
route(
    'GET',
    '/sites/{int_unsigned}/page/{int_unsigned}/settings/controle_version_page',
    '\Noks\SitePage\Controller\Setting\ControleVersionPage@index',
    '\Noks\Middleware\WEB\Site\Page\Setting\SitePageSettingWeb@controle_version_page',
);
/**
 * @param \Noks\SitePage\Controller\Setting\Version
 * @param \Noks\Middleware\WEB\Site\Page\Setting\SitePageSettingWeb
 */
route(
    'GET',
    '/sites/{int_unsigned}/page/{int_unsigned}/settings/version/{int_unsigned}',
    '\Noks\SitePage\Controller\Setting\Version@index',
    '\Noks\Middleware\WEB\Site\Page\Setting\SitePageSettingWeb@version',
);
/**
 * @param \Noks\Controller\SitePage\Setting\SwitchVersionEditor
 * @param \Noks\Middleware\WEB\Site\Page\Setting\SitePageSettingWeb
 */
route(
    'GET',
    '/sites/{int_unsigned}/page/{int_unsigned}/settings/switch_editor',
    '\Noks\Controller\SitePage\Setting\SwitchVersionEditor@main',
    '\Noks\Middleware\WEB\Site\Page\Setting\SitePageSettingWeb@switch_editor',
);



// middleware('GET', '/sites/{int_unsigned}/page/{int_unsigned}/settings(.*)', function ($site_id, $page_id, $o) {
//     if (!primaryMatching($site_id, $page_id))
//         Errors::_403();
// });



middleware('GET', '/sites/{int_unsigned}/page/{int_unsigned}/((?!api)[a-z_]+)(/[a-z_]+)?', function ($site_id, $page_id, $o) {
    if (!primaryMatching($site_id, $page_id))
        Errors::_403();
});
middleware('GET', '/sites/{int_unsigned}/((?!api)[a-z_]+)(/[a-z_]+)?', function ($site_id) {
    if (!primaryMatching($site_id))
        Errors::_403();
});
middleware('GET', '/sites/{int_unsigned}/page/add', function ($site_id) {
    if (!primaryMatching($site_id))
        Errors::_403();
});
middleware('GET', '/sites/{int_unsigned}', function ($site_id) {
    if (!primaryMatching($site_id))
        Errors::_403();
});
middleware('GET', '/sites(/add)?', function () {
    checkExistUserElseRedirect();
});
