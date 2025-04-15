function ajaxDeletePage ($el)
{
    tempDisabledElem($el, true);
    $.ajax({
        dataType: 'json',
        url: '/api/pages/' + getMetaIdPage(),
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
    $(document).on('click', '[data-delete]', (el) => ajaxDeletePage($(el.currentTarget)));
})()