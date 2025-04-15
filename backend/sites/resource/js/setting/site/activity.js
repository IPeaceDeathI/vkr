function ajaxEditSiteSettings(data, $el) {
    tempDisabledElem($el, true);
    $.ajax({
        dataType: 'json',
        url: '/api/sites/' + getMetaIdSite() + '/activity',
        data: data,
        method: 'PUT',
        success: (response) => {
            if (response.status) $.smackbar({ message: "Изменено" });
            else confirmNotice(Object.values(response.errors).join('<br>'));
            tempDisabledElem($el, false);
        },
        error: () => confirmNotice('Внештатная ошибка'),
    });
}

(function () {
    $(document).off('click', '[data-save]');
    $(document).on('click', '[data-save]', (el) => {
        ajaxEditSiteSettings(
            {
                active: $('[name="active"]').val(),
                need: $('[name="need"]').val(),
                checkTime: $('[name="checkTime"]').val() ?? '',
                loop: $('[name="loop"]').val() ?? '',
                target_name: $('[name="target_name"]').val(),
            },
            $(el.currentTarget)
        );
    });
})();
