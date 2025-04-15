function ajaxSwitchEditor ($el, data)
{
    tempDisabledElem($el, true);
    $.ajax({
        dataType: 'json',
        data: {
            'version_editor' : data
        },
        url: '/api/sites/' + getMetaIdSite() + '/pages/' + getMetaIdPage() + '/switch_editor',
        method: 'PUT',
        success: (response) =>
        {
            tempDisabledElem($el, false);
        },
        error: (response) => {
            confirmNotice(Object.values(response.errors).join('<br>'));
            tempDisabledElem($el, false);
        },
    });
}


(function ()
{
    $(document).off('change', '[data-put]');
    $(document).on( 'change', '[data-put]', (el) => {
        el = $(el.currentTarget);
        let res = Number(el.is(':checked')) + 1;
        el = el.parent();
        ajaxSwitchEditor(el, res);
    });
})()