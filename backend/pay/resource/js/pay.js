function eventConfirmSelectionTariff (link)
{
    return defaultConfirm({
        content: 'При переходе на другой тариф, у вас спишется сумма за сутки. Подтвердить изменения?',
        buttons: {
            'да': {
                action: () => redirect(document.location.origin + '/' + link.attr('href')),
            },
            'нет': {
                action: () => {}
            },
        }
    });
}

function eventConfirmSelectionChangeTariffOption (id_product, select_value, $el)
{
    return defaultConfirm({
        content: 'Подтвердить изменения?',
        buttons: {
            'да': {
                action: () => ajaxOptionUpdate(id_product, select_value, $el),
            },
            'нет': {
                // TODO вернуть селект обратно
                action: () => {
                    pay_before_option[id_product].prop('selected', true);
                    changePrice(pay_before_option[id_product]);
                }
            },
        }
    });
}

function confirmOption (msg)
{
    return defaultConfirm({
        content: msg,
        buttons: {
            'ok': {
                action: () => {}
            },
        }
    });
}

function ajaxOptionUpdate (id_product, select_value, $el)
{
    tempDisabledElem($el, true);
    $.ajax({
        dataType: 'json',
        url: '/api/flows/' + getMetaIdFlow() + '/tariff_options/' + id_product,
        data: {
            'select_value' : select_value
        },
        method: 'PUT',
        success: (response) =>
        {
            if(!response.status)
            {
                confirmOption(Object.values(response.errors).join('<br>'));
                pay_before_option[id_product].prop('selected', true);
                changePrice(pay_before_option[id_product]);
            }
            else confirmOption('Готово');
            tempDisabledElem($el, false);
        },
        error: () => confirmOption('Внештатная ошибка'),
    });
}

function ajaxOptionAdd (id_product, select_value, $el)
{
    tempDisabledElem($el, true);
    $.ajax({
        dataType: 'json',
        url: '/api/flows/' + getMetaIdFlow() + '/tariff_options/' + id_product,
        data: {
            'select_value' : select_value
        },
        method: 'POST',
        success: (response) =>
        {
            if(!response.status)
            {
                $el.find('input').prop('checked', 0);
                confirmOption(Object.values(response.errors).join('<br>'));
            }
            else confirmOption('Готово');
            tempDisabledElem($el, false);
        },
        error: () => confirmOption('Внештатная ошибка'),
    });
}
function ajaxOptionDelete (id_product, $el)
{
    tempDisabledElem($el, true);
    $.ajax({
        dataType: 'json',
        url: '/api/flows/' + getMetaIdFlow() + '/tariff_options/' + id_product,
        method: 'DELETE',
        success: (response) =>
        {
            if(!response.status)
            {
                $el.find('input').prop('checked', 1);
                confirmOption(Object.values(response.errors).join('<br>'));
            }
            else confirmOption('Готово');
            tempDisabledElem($el, false);
        },
        error: () => confirmOption('Внештатная ошибка'),
    });
}
function changePrice ($optionSelected)
{
    let block_price = $optionSelected.parent().siblings('.block-price');
    block_price.text($optionSelected.attr('data-price-option'));
    return $optionSelected;
}

let pay_before_option = [];
(function()
{
    $(document).off('click', '[data-pay-change-tariff]');
    $(document).on('click', '[data-pay-change-tariff]', function(event)
    {
        event.preventDefault();
        return eventConfirmSelectionTariff($(this));
    });

    $(document).off('click', '[data-pay-btn-add-balance]');
    $(document).on('click', '[data-pay-btn-add-balance]', function(event)
    {
        event.preventDefault();
        let number = $(this).parent().find('input');
        window.open(document.location.origin + '/pay/payment/balance/' + number.val(), '_blank');
    });

    $(document).off('input', '.wrp-balance input[type="number"]');
    $(document).on('input', '.wrp-balance input[type="number"]', function()
    {
        if(this.validity.rangeUnderflow)
        {
            this.setCustomValidity("Минимальная сумма 500");
            this.reportValidity();
        }
    });
    // запоминаем селекты
    $(function()
    {
        $('.item-tariff-option input').each(function()
        {
            let inp = $( this );
            pay_before_option[inp.attr('data-id_product')] = inp.closest('.item-tariff-option').find('select').find('option:selected');
        });
    });
    // 
    $(document).off('change', '.item-tariff-option select');
    $(document).on('change', '.item-tariff-option select', function ()
    {
        // изменение цены
        let optionSelected = changePrice($('option:selected', this));
        // если активно, тогда пытаемся изменить значение опции
        let inp = optionSelected.parent().siblings('.toggler-wrapper').find('input');
        if(inp.is(':checked'))
        {
            let id_product = inp.attr('data-id_product');
            let el_select = inp.closest('.item-tariff-option').find('select');
            let select_value = el_select.find('option:selected').attr('value');
            select_value = Number.parseInt(select_value);
            eventConfirmSelectionChangeTariffOption(id_product, select_value, inp.closest('label'));
        }
    });
    // 
    $(document).off('click', '.item-tariff-option label input');
    $(document).on('click', '.item-tariff-option label input', function ()
    {
        let inp = $(this);
        let id_product = inp.attr('data-id_product');
        let el_select = inp.closest('.item-tariff-option').find('select');
        let select_value = el_select.find('option:selected').attr('value');
        select_value = Number.parseInt(select_value);
        // активировать
        if(inp.is(':checked')) ajaxOptionAdd(id_product, select_value, inp.closest('label'));
        // деактивировать
        else ajaxOptionDelete(id_product, inp.closest('label'));
    });
})();