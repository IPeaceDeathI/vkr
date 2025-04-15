function ajaxSave($el, data) {
    tempDisabledElem($el, true);
    $.ajax({
        dataType: 'json',
        url: '/api/sites/' + getMetaIdSite() + '/roistat_proxy_lead',
        method: 'PUT',
        data: {
            proxylead: data,
        },
        success: (response) => {
            if (response.status) $.smackbar({ message: 'Готово' });
            else confirmNotice(Object.values(response.errors).join('<br>'));
            tempDisabledElem($el, false);
        },
        error: () => confirmNotice('Внештатная ошибка'),
    });
}

let proxy_choice = null;

$(function () {
    proxy_choice = $('[data-choice]');
    // сохранение
    $(document).off('click', '[data-save]');
    $(document).on('click', '[data-save]', (el) => {
        let proxy_block = $('.wrp-block').find('.proxy-block');
        let all_data = [];
        proxy_block.each(function () {
            let block = $(this);
            let item = {};
            item.key = block.find('input[name="key"]').val();
            item.status = block.find('input[name="status"]').prop('checked') ? 1 : 0;
            if (block.find('input[name="send_before_lead"]').length > 0) {
                item.send_before_lead = block.find('input[name="send_before_lead"]').prop('checked') ? 1 : 0;
            } else {
                item.send_before_lead = 0;
            }
            item.inputs = [];
            block.find('.line-for-custom-fields').each(function () {
                let row = $(this);
                let inputs = {};
                inputs.crm_input = row.find('input[name="crm_input"]').val();
                inputs.option_input = row.find('[name="option_input"] option:selected').val();
                inputs.custom_input = row.find('input[name="custom_input"]').val();
                inputs.fix_value = row.find('input[name="fix_value"]').val();
                item.inputs.push(inputs);
            });
            all_data.push(item);
        });
        ajaxSave($(el.currentTarget), all_data);
    });
    // $(document).on('click', '[data-save]', (el) => ajaxSave($(el.currentTarget)));
    // добавить строку
    $(document).off('click', '[data-add-field]');
    $(document).on('click', '[data-add-field]', (el) => {
        el = $(el.currentTarget);
        let row = proxy_choice.find('.line-for-custom-fields');
        el.closest('.line-for-custom-fields').after(row.prop('outerHTML'));
    });
    // удалить строку
    $(document).off('click', '[data-delete-field]');
    $(document).on('click', '[data-delete-field]', (el) => {
        el = $(el.currentTarget);
        let count_row = el.closest('.proxy-block').find('.line-for-custom-fields').length;
        if (count_row === 1) return;
        el.closest('.line-for-custom-fields').remove();
    });
    // добавить прокси блок
    $(document).off('click', '[data-add-new-block-bottom]');
    $(document).on('click', '[data-add-new-block-bottom]', (el) => {
        el = $(el.currentTarget);
        let new_proxy_block = $(proxy_choice.prop('outerHTML'));
        new_proxy_block.removeAttr('data-choice');
        new_proxy_block.removeAttr('style');
        el = el.closest('.proxy-block').after(new_proxy_block);
    });
    // копировать прокси блок
    $(document).off('click', '[data-copy-this-block]');
    $(document).on('click', '[data-copy-this-block]', (el) => {
        // el = $(el.currentTarget);
        // let clone_proxy_block = el.closest('.proxy-block').clone();
        // el.closest('.proxy-block').after(clone_proxy_block);
    });
    // удалить прокси блок
    $(document).off('click', '[data-delete-this-block]');
    $(document).on('click', '[data-delete-this-block]', (el) => {
        el = $(el.currentTarget);
        el.closest('.proxy-block').remove();
    });
    // если интеграций нет, вставляем пустую форму
    $(() => {
        let hole = $('[data-hole-for-plug]');
        let new_proxy_block = $(proxy_choice.prop('outerHTML'));
        new_proxy_block.removeAttr('data-choice');
        new_proxy_block.removeAttr('style');
        hole.replaceWith(new_proxy_block);
    });
});