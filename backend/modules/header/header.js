function refreshBalance (refresh = false)
{
    if(refresh)
    {
        getInfoBalance();
        return;
    }
    let id_flow = $('meta[name="id-flow"]').attr('content');
    if(localStorage.getItem('flow.id_flow') != id_flow)
    {
        getInfoBalance();
        return;
    }
    let update = localStorage.getItem('flow.date.update') ?? 0;
    if(localStorage.getItem('flow.balance') != null)
    {
        if((Math.floor(Date.now() / 1000) - update) < ( 60*10 ))
        {
            let data = JSON.parse(localStorage.getItem('flow.balance'));
            changeBalance(data.flow_balance);
            changeDaysLeft(data);
            changeNameTariff(data.product.name);
            return;
        }
    }
    getInfoBalance();
}

function getInfoBalance ()
{
    $.ajax({
        url: `/api/flow/method/get_info_current_tariff`,
        method: 'GET',
        success: (response) =>
        {
            if(response.status)
            {
                localStorage.setItem('flow.balance', JSON.stringify(response.data));
                localStorage.setItem('flow.date.update', Math.floor(Date.now() / 1000));
                localStorage.setItem('flow.id_flow', response.data.tariff_flow_id);
                changeBalance(response.data.flow_balance);
                changeDaysLeft(response.data);
                changeNameTariff(response.data.product.name);
            }
        },
        error: function(){}
    });
}

function changeBalance (new_balance)
{
    if(Number.isNaN(Number.parseFloat(new_balance))) return;
    let balance = $('[data-flow-balance]');
    new_balance = new Intl.NumberFormat('ru-RU').format(new_balance);
    balance.text(new_balance + ' р.');
}

function changeNameTariff (name)
{
    let tariffName = $('[data-flow-name-tariff]');
    if(!name) tariffName.text('');
    else tariffName.text(name);
}

function changeDaysLeft (data)
{
    let elDaysLeft = $('[data-flow-days-left]');
    if(data.tariff_blocking)
    {
        elDaysLeft.addClass('left');
        elDaysLeft.text('Срок истек');
        return;
    }
    if(data.days_before_blocking)
    {
        elDaysLeft.text(data.days_before_blocking + ' дн.');
        return;
    }
    elDaysLeft.text('');
}

(function ()
{
    function eventRefreshBalance ()
    {
        $(document).off('click', '[data-flow-refresh]');
        $(document).on('click', '[data-flow-refresh]', function()
        {
            refreshBalance(true);
        });
    }
    function eventMenuBalance ()
    {
        $(document).off('click', '[data-flow-balance]');
        $(document).on('click', '[data-flow-balance]', function()
        {
            $('[data-wrp="balance"]').toggle();
        });
    }
    function hiddenHeaderMenu ()
    {
        $(document).mouseup(function(e)
        {
            $('[data-wrp]').each(function()
            {
                let el = $(this);
                if (el == null) return
                if ( !el.is(e.target)
                    && el.has(e.target).length === 0 )
                {
                    el.hide();
                }
            });
        });
    }

    eventMenuBalance();
    hiddenHeaderMenu();
    eventRefreshBalance();
    refreshBalance();
    
    
    function render_menu()
    {
        $(".icon-menu-header").click(function ()
        {
            $(".icon-menu-header").unbind();
            $(".nav-overlay").toggle("slide");
            $(".dark-overlay").toggle();
            render_menu();
        });
    }

    function out_menu()
    {
        $(".dark-overlay").click(function ()
        {
            $(".icon-menu-header").unbind();
            $(".nav-overlay").toggle("slide");
            $(".dark-overlay").toggle();
            render_menu();
        });
    }
    out_menu();
    render_menu();

    function button_profile()
    {
        $(".button-edit").click(function ()
        {
            $(".dropdown-settings").toggle();
        });
    }
    button_profile();

    function render_dropdown()
    {
        $('.dropdown-toggle').off();
        $('.dropdown-toggle').click(function ()
        {
            if($(this).find('.dropdown').css('display')=='none')
            {
                $(this).find('.dropdown').slideDown('fast')
            }
            else
            {
                $(this).find('.dropdown').slideUp('fast')
            }
        });

        $(document).click(function (e)
        {
            var target = e.target;
            if (!$(target).is('.dropdown-toggle') && !$(target).parents().is('.dropdown-toggle'))
            {
                $('.dropdown').slideUp('fast');
            }
        });
    }
    render_dropdown();
})(jQuery);