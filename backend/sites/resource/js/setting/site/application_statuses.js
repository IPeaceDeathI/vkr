let deleted_statuses = [];

function confirm_statuses (statuses, $el)
{
    let msg = 'Подтвердить изменения?';
    if(statuses.length > 0)
    {
        statuses = '«' + statuses.join(',') + '»';
        msg = 'Вы уверены, что хотите удалить статус(ы) ' + statuses + '? Все заявки с этим статусом будут переведены в статус «Неразобранное»';
    }
    $.confirm({
        backgroundDismiss: true,
        boxWidth: '25%',
        useBootstrap: false,
        title: '',
        content: msg,
        buttons: {
            'да': {
                btnClass: 'btn-noks-yes',
                action: () =>
                {
                    // ajax
                    execChange_statuses(
                        // parse
                        parseData_statuses(),
                        $el
                    );
                }
            },
            'нет': {
                btnClass: 'btn-noks-no',
                action: () => {}
            },
        }
    });
}

function showConfirm (msg, clusure_close = null)
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
        onClose: clusure_close,
    });
}

function execChange_statuses (data, $el)
{
    tempDisabledElem($el, true);
    // ajax удаляет ключи в которых есть пустые массивы.
    if(data.length == 0) data = '';

    $.ajax({// ajax fuking bull shit
        url: '/api/site/'+getMetaIdSite()+'/setting/method/change_statuses_for_leads',
        dataType: 'json',
        method: 'PUT',
        data: {
            'statuses': data,
        },
        success: (res) =>
        {
            deleted_statuses = [];
            showConfirm('Готово', () => {
                // редирект нужен для нового рендера, если его не будет тогда будет багуля
                location.reload(true);
            });
        },
        error: (res) => {
            deleted_statuses = [];
            showConfirm(Object.values(res.responseJSON.errors).join('<br>'));
            tempDisabledElem($el, false);
        },
    });
}

function parseData_statuses ()
{
    let items = $('.item-status:not(#disabled)');
    let data = [];
    items.each(function( index )
    {
        let item = $(this);
        data.push({
            status_num: index,
            status_name: item.find('input').val(),
            status_id: item.attr('data-id'),
            status_color: item.find('.color').attr('data-color').replace('#', '')
        });
    });

    return data;
}

// dragAndDropSortStatus
$(function()
{
    $(".wrapper-statuses").sortable({
        items: ".item-status:not(#disabled)",
        handle: '.drag-drop'
    });
    $(".wrapper-statuses").disableSelection();
});

//removeItemStatus
(function()
{
    $(document).on('click', '.item-status .remove', function()
    {
        if($(this).parent().attr('data-id') > 0)
        {
            deleted_statuses.push(
                $(this).parent().find('input').val()
            );
        }
        $(this).parent().remove();
    });
})();

function genPalette ()
{
    let colors = ["#fffeb2","#fffd7f","#fff000","#ffeab2","#ffdc7f","#ffce5a","#ffdbdb","#ffc8c8","#ff8f92","#d6eaff","#c1e0ff","#98cbff","#ebffb1","#deff81","#87f2c0","#f9deff","#f3beff","#ccc8f9","#eb93ff","#f2f3f4","#e6e8ea"];
    let spans = '';
    colors.forEach(function(color)
    {
        spans += `<span class="swatch" data-color="${color}" style="background-color: ${color}"></span>`;
    });

    let color_box = `<div class="palette">${spans}</div>`;
    return color_box;
}

//addAfterItemStatus
(function()
{
    $(document).on('click', '.item-status .add', function()
    {
        let item = $(this).parent();
        let newItem = item.clone();
        let color = '#d6eaff';
        newItem.removeAttr('id');
        newItem.attr('data-id', '');
        newItem.find('input').val('Новый статус');

        newItem.find('.color').css('background-color', '#' + color);
        newItem.find('.color').attr('data-color', color);

        if(newItem.find('.palette').length == 0)
        {
            newItem.find('.color').after( genPalette() );
        }
        newItem.find('input').removeClass('block');
        if(newItem.find('.remove').length == 0)
        {
            newItem.find('.add').after('<div class="remove"></div>');
        }
        
        item.after( newItem );
    });
})();

// addAllPalette
(function()
{
    $('.item-status[data-id] .color-box').each(function()
    {
        $( this ).append( genPalette() );
    });
})();


(function()
{
    // call palette
    $(document).on('click', '.item-status .color-box .color', function()
    {
        $(this).parent().find('.palette').toggle();
    });

    // select color
    $(document).on('click', '.item-status span.swatch', function()
    {
        let $el = $(this);
        let color = $el.attr('data-color');
        let $item = $el.closest('.color-box');
        $el.parent().hide();
        $item.find('.color').css('background-color', '#' + color);
        $item.find('.color').attr('data-color', color);
    });
})();

// buttonSave
(function()
{
    $('[data-save]').off('click');
    $('[data-save]').on('click', (el) => confirm_statuses(deleted_statuses, $(el.currentTarget)));
})();
