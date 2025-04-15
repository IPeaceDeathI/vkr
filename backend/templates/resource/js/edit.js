function ajaxSaveTpl(data, $el) {
    tempDisabledElem($el, true);
    $.ajax({
        dataType: 'json',
        url: '/api/templates/' + data.tpl_id,
        data: data,
        method: 'PUT',
        success: (response) => {
            if (response.status) {
                if (response.data) $.smackbar({ message: "Сохранено" }); //redirect( window.location.origin + '/templates' );
            }
            else confirmNotice(Object.values(response.errors).join('<br>'));
            tempDisabledElem($el, false);
        },
        error: () => confirmNotice('Внештатная ошибка'),
    });
}

function ajaxCopyToPublic(tpl_id, $el) {
    tempDisabledElem($el, true);
    $.ajax({
        dataType: 'json',
        url: '/api/templates/' + tpl_id + '/method?method=CopyToPublic',
        method: 'POST',
        success: (response) => {
            if (response.status) {
                if (response.data) redirect(window.location.origin + '/templates');
            }
            else confirmNotice(Object.values(response.errors).join('<br>'));
            tempDisabledElem($el, false);
        },
        error: () => confirmNotice('Внештатная ошибка'),
    });
}

async function ajaxDeleteTpl(tpl_id, $el) {
    if (await asyncConfirm({})) {
        tempDisabledElem($el, true);
        $.ajax({
            dataType: 'json',
            url: '/api/templates/' + tpl_id,
            method: 'DELETE',
            success: (response) => {
                if (response.status) {
                    if (response.data) redirect(window.location.origin + '/templates');
                }
                else confirmNotice(Object.values(response.errors).join('<br>'));
                tempDisabledElem($el, false);
            },
            error: () => confirmNotice('Внештатная ошибка'),
        });
    }
}

(function () {
    $(document).off('click', '[data-delete]');
    $(document).on('click', '[data-delete]', (el) => {
        el.preventDefault();
        ajaxDeleteTpl(
            $('[name="tpl_id"]').val(),
            $(el.currentTarget)
        );
    });

    $(document).off('click', '[data-copy-to-public]');
    $(document).on('click', '[data-copy-to-public]', (el) => {
        el.preventDefault();
        ajaxCopyToPublic(
            $('[name="tpl_id"]').val(),
            $(el.currentTarget)
        );
    });

    $(document).off('click', '[data-save]');
    $(document).on('click', '[data-save]', (el) => {
        el.preventDefault();
        let $el = $(el.currentTarget);
        let data = {
            tpl_title: $('[name="tpl_title"]').val(),
            tpl_id_category: $('[name="tpl_id_category"]').val(),
            tpl_id: $('[name="tpl_id"]').val(),
            tmp: $('[name="tpl_status"]').val()
        };
        if (data.tmp) data.tpl_status = data.tmp;
        ajaxSaveTpl(data, $el);
    });
})();