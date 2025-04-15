function InsertCodeAjax ($el)
{
    tempDisabledElem($el, true);
    let data, id_site;
    data = {
        code_head: $('[data-head]').val(),
        code_body: $('[data-body]').val(),
        method: 'editCodeInsert',
    };
    id_site = $('[data-id_site]').val();

    $.ajax({
        dataType: 'json',
        url: '/sites/' + id_site + '/api',
        data: data,
        method: 'PUT',
        success: (response) =>
        {
            if(response.status) ShowConfirm('Сохранено');
            else ShowConfirm(Object.values(response.errors).join('<br>'));
            tempDisabledElem($el, false);
        },
        error: () => ShowConfirm('Внештатная ошибка'),
    });
}

function ShowConfirm (msg)
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
                action: function (){}
            },
        }
    });
}

$(function()
{
    $(document).off('click', '[data-save]');
    $(document).on('click', '[data-save]', (el) => InsertCodeAjax($(el.currentTarget)));
});