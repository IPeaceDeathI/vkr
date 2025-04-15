async function ajaxReplace(hash_id, $el) {
    if (await asyncConfirm({ message: 'Если вы решили применить старую версию, тогда она заменится на текущую без возможности возврата. Выполнить действие?' })) {
        tempDisabledElem($el, true);
        $.ajax({
            dataType: 'json',
            url: '/sites/' + getMetaIdSite() + '/page/' + getMetaIdPage() + '/api',
            data: {
                method: 'ControleVersionPage',
                hash_id: hash_id,
            },
            method: 'PUT',
            success: (response) => {
                if (response.status) {
                    $.smackbar({ message: "Готово" });
                    $el.parent().remove();
                }
                else {
                    confirmNotice(Object.values(response.errors).join('<br>'));
                    tempDisabledElem($el, false);
                }
            },
            error: () => confirmNotice('Внештатная ошибка'),
        });
    }
}

(function () {
    $(document).off('click', '[data-replace]');
    $(document).on('click', '[data-replace]', (el) => {
        el.preventDefault();
        let $el = $(el.currentTarget);
        ajaxReplace($el.data('hash_id'), $el);
    });
})();
