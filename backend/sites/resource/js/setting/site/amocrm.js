function showConfirm (msg)
{
    defaultConfirm({
        content: msg,
        buttons: {
            'ok': {
                action: () => {}
            },
        }
    });
}

function eventSaveSetData ()
{
    $(document).off('click', '[data-save]');
    $(document).on('click', '[data-save]', (el) => ajaxSaveSetData(
        {
            pipeline_id: $('[name="pipeline_id"]').val(),
            crm_user_id: $('[name="crm_user_id"]').val(),
        }, $(el.currentTarget)
    ));
}

function eventRefreshData ()
{
    $(document).off('click', '[data-refresh-data]');
    $(document).on('click', '[data-refresh-data]', (el) => ajaxRefreshData($(el.currentTarget)));
}

function eventUnsetLink ()
{
    $(document).off('click', '[data-unset-link]');
    $(document).on('click', '[data-unset-link]', (el) => ajaxUnsetLink($(el.currentTarget)));
}

function ajaxUnsetLink ($el)
{
    tempDisabledElem($el, true);
    $.ajax({
        url: '/sites/' + getMetaIdSite() + '/api/amo_crm',
        dataType: 'json',
        method: 'DELETE',
        data: {
            'method': 'unsetLinkAmoCRM',
        },
        success: (response) =>
        {
            if(response.status)
            {
                showConfirm('Готово');
                $('select[name="pipeline_id"]').prop('selectedIndex', 0);
                $('select[name="crm_user_id"]').prop('selectedIndex', 0);
            }
            else showConfirm(Object.values(response.errors).join('<br>'));
            tempDisabledElem($el, false);
        },
        error: () => showConfirm('Внештатная ошибка'),
    });
}

function ajaxRefreshData ($el)
{
    tempDisabledElem($el, true);
    $.ajax({
        url: '/sites/' + getMetaIdSite() + '/api/amo_crm',
        dataType: 'json',
        method: 'PUT',
        data: {
            'method': 'refreshDataAmoCRM',
        },
        success: (response) =>
        {
            if(response.status) showConfirm('Готово');
            else showConfirm(Object.values(response.errors).join('<br>'));
            tempDisabledElem($el, false);
        },
        error: () => showConfirm('Внештатная ошибка'),
    });
}

function ajaxSaveSetData (data, $el)
{
    tempDisabledElem($el, true);
    $.ajax({
        url: '/sites/' + getMetaIdSite() + '/api/amo_crm',
        method: 'PUT',
        dataType: 'json',
        data: {
            'method': 'saveSetDataAmoCRM',
            'pipeline_id': data.pipeline_id,
            'crm_user_id': data.crm_user_id,
        },
        success: (response) =>
        {
            if(response.status) showConfirm('Готово');
            else showConfirm(Object.values(response.errors).join('<br>'));
            tempDisabledElem($el, false);
        },
        error: () => showConfirm('Внештатная ошибка'),
    });
}

eventSaveSetData();
eventRefreshData();
eventUnsetLink();