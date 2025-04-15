function ajaxDeleteSite ($el)
{
    tempDisabledElem($el, true);
    $.ajax({
        dataType: 'json',
        url: '/api/sites/' + getMetaIdSite(),
        method: 'DELETE',
        success: (response) =>
        {
            if(response.status) redirect(window.location.origin + '/admin/sites');
            else confirmNotice(Object.values(response.errors).join('<br>'));
            tempDisabledElem($el, false);
        },
        error: () => confirmNotice('Внештатная ошибка'),
    });
}


(function ()
{
    $(document).off('click', '[data-delete]');
    $(document).on('click', '[data-delete]', (el) => ajaxDeleteSite($(el.currentTarget)));
})()