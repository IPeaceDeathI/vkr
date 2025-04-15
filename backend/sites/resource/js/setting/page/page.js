function ajaxEditPageSeo (data, $el)
{
    tempDisabledElem($el, true);
    $.ajax({
        dataType: 'json',
        url: '/sites/' + getMetaIdSite() + '/page/' + getMetaIdPage() + '/api',
        data: {
            method: 'editPageSeo',
            uri: data.uri,
            title: data.title,
            desc: data.desc,
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
    $(document).on('click', '[data-save]', (el) =>
    {
        ajaxEditPageSeo(
            {
                uri: $('[name="uri"]').val(),
                title: $('[name="title"]').val(),
                desc: $('[name="desc"]').val(),
            }, $(el.currentTarget)
        );
    });
})();
