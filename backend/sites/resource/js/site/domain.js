function ajaxChangeStatusDomain (id_domain, status, $el)
{
    tempDisabledElem($el, true);
    $.ajax({
        dataType: 'json',
        url: '/sites/' + getMetaIdSite() + '/api/domain?id_domain=' + id_domain + '&status=' + status + '&method=changeStatusDomain',
        method: 'PUT',
        success: (response) =>
        {
            if(!response.status)
            {
                $el.prop('checked', !status);
                showConfirm(Object.values(response.errors).join('<br>'));
            }
            tempDisabledElem($el, false);
        },
        error: () => showConfirm('Внештатная ошибка')
    });
}

function ajaxAddDomain (name, $el)
{
    tempDisabledElem($el, true);
    $.ajax({
        dataType: 'json',
        // /api/sites/{int_unsigned}/domain/add
        url: '/api/sites/' + getMetaIdSite() + '/domain/add',
        data: {
            domain: name,
        },
        method: 'POST',
        success: (res) =>
        {
            showConfirm('Добавлено', true);
            tempDisabledElem($el, false);
        },
        error: (res) => {
            showConfirm(Object.values(res.responseJSON.errors).join('<br>'));
            tempDisabledElem($el, false);
        },
    });
}

function showConfirm (msg, status = false)
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
            if(!status) return;
            location.reload();
        },
    });
}

(function ()
{
    $(document).off('click', '[data-save]');
    $(document).on('click', '[data-save]', (el) => ajaxAddDomain(
        $('[name="domain"]').val(),
        $(el.currentTarget)
    ));
})();

// blockSubmitAddDomain
(function ()
{
    let form = document.querySelector('div.wrapper-input');
    let submit = document.querySelector('div.wrapper-input input[type="submit"]');
    form.addEventListener('submit', function ()
    {
        submit.setAttribute('disabled', 'disabled');
    });
})();

// listenerCheckboxDomain
(function ()
{
    let inputs = document.querySelectorAll('.item-domain label input');
    inputs.forEach(function (input)
    {
        $(input).on('click', function ()
        {
            let inp = $(this);
            let id_domain = inp.attr('data-id_domain');
            // активировать
            if(inp.is(':checked')) ajaxChangeStatusDomain(id_domain, 1, inp);
            // деактивировать
            else ajaxChangeStatusDomain(id_domain, 0, inp);
        });
    });
})();