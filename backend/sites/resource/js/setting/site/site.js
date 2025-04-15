function ajaxEditSiteSeo (name, $el)
{
    tempDisabledElem($el, true);
    $.ajax({
        dataType: 'json',
        url: '/sites/' + getMetaIdSite() + '/api',
        data: {
            method: 'editSiteSeo',
            title: name,
        },
        method: 'PUT',
        success: (response) =>
        {
            if(response.status) showConfirm('Изменено');
            else showConfirm(Object.values(response.errors).join('<br>'));
            tempDisabledElem($el, false);
        },
        error: () => showConfirm('Внештатная ошибка'),
    });
}

function showConfirm (msg)
{
    $.confirm({
        backgroundDismiss: true,
        boxWidth: '25%',
        useBootstrap: false,
        title: '',
        content: msg,
        buttons: {
            'ok': {
                btnClass: 'btn-noks-yes',
            },
        },
        onClose: () => {

        },
    });
}

(function ()
{
    $(document).off('click', '[data-save]');
    $(document).on('click', '[data-save]', (el) => ajaxEditSiteSeo(
        $('[name="title"]').val(),
        $(el.currentTarget)
    ));
})();
