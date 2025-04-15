function validKey(urlOrKey) {
    urlOrKey = urlOrKey.replace('https', '').replace('http', '').replace('://cloud.roistat.com/integration/webhook?key=', '');
    return urlOrKey.length == 32;
}
function getKey() {
    return $('[name="urlOrKey"]').val();
}
function ajaxSave(data, $el, method = 'POST') {
    tempDisabledElem($el, true);
    $.ajax({
        dataType: 'json',
        url: '/api/sites/' + getMetaIdSite() + '/roistat_webhook',
        data: data,
        method: method,
        success: (response) => {
            if (!response.status) confirmNotice(Object.values(response.errors).join('<br>'));
            else $.smackbar({ message: 'Готово' });
            tempDisabledElem($el, false);
        },
        error: () => confirmNotice('Внештатная ошибка'),
    });
}

(function () {
    $(document).off('click', '[data-active]');
    $(document).on('click', '[data-active]', function (e) {
        e.preventDefault();
        let el = $(this);
        let key = getKey();
        if (validKey(key)) {
            ajaxSave({
                'urlOrKey': key,
                'status': 1,
            }, el, 'PUT');
        }
        else confirmNotice('Некорректная URL/Ключ');
    });

    $(document).off('click', '[data-inactive]');
    $(document).on('click', '[data-inactive]', function (e) {
        e.preventDefault();
        let el = $(this);
        let key = getKey();
        if (validKey(key)) {
            ajaxSave({
                'urlOrKey': key,
                'status': 2,
            }, el, 'PUT');
        }
        else confirmNotice('Некорректная URL/Ключ');
    });

    $(document).off('click', '[data-save]');
    $(document).on('click', '[data-save]', function (e) {
        e.preventDefault();
        let key = getKey();
        if (validKey(key)) ajaxSave({
            'urlOrKey': key
        }, $(this));
        else confirmNotice('Некорректная URL/Ключ');
    });

    $(document).off('click', '[data-update]');
    $(document).on('click', '[data-update]', function (e) {
        e.preventDefault();
        let key = getKey();
        if (validKey(key)) ajaxSave({
            'urlOrKey': key
        }, $(this), 'PUT');
        else confirmNotice('Некорректная URL/Ключ');
    });
})();