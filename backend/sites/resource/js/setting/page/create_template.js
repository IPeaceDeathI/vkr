function ajaxCreateTemplate(data, $el) {
    tempDisabledElem($el, true);
    $.ajax({
        dataType: 'json',
        url: '/sites/' + getMetaIdSite() + '/page/' + getMetaIdPage() + '/api',
        data: {
            method: 'createTemplate',
            title: data.title,
            id_category: data.id_category,
        },
        method: 'POST',
        success: (response) => {
            if (response.status) redirect(window.location.origin + '/templates');
            else showConfirm(Object.values(response.errors).join('<br>'));
            tempDisabledElem($el, false);
        },
        error: () => showConfirm('Внештатная ошибка'),
    });
}

function showConfirm(msg, status = false) {
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
            if (!status) return;
            redirect(window.location.origin + '/templates');
        },
    });
}

(function () {
    $(document).off('click', '[data-save]');
    $(document).on('click', '[data-save]', (el) => {
        ajaxCreateTemplate(
            {
                title: $('[name="title"]').val(),
                id_category: $('[name="id_category"]').val(),
            }, $(el.currentTarget)
        );
    });
})();
