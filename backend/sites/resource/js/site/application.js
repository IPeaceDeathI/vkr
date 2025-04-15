function saveStatusAppl ($el, status)
{
    $el.attr('data-save_status', status);
}

function changeColorStatus ($el, color)
{
    $el.parent().css('background-color', '#' + color);
}

function ajaxChangeStatusLead ($el, data)
{
    $.ajax({
        url: '/sites/' + getMetaIdSite() + '/api/application',
        method: 'PUT',
        dataType: 'json',
        data: {
            id_page: data.id_page,
            id_appl: data.id_appl,
            id_status: data.id_status,
            method: 'changeStatusLead'
        },
        success: function(response)
        {
            if(!response.status)
            {
                // вернуть цвет в прежнее состояние
                changeColorStatus($el, data.old_color);
                // вернуть selected в прежнее состояние
                $el.val(data.old_id_status);
            }
            else
            {
                saveStatusAppl($el, data.id_status);
            }
        }
    });
}
// changeSelectedStatusAppl
(function(){
    let appl = document.querySelectorAll('.application');

    appl.forEach(function(el)
    {
        el.querySelector('select').addEventListener('change', function()
        {
            let $select = $(this);
            let data = {
                id_page: $select.data('id_page'),
                id_appl: $select.data('id_appl'),
                id_status: $select.val(),
                old_id_status: $select.data('save_status'),
            };
            data.old_color = $select.parent().css('background-color');
            data.new_color = $select.find('option[value="' + data.id_status + '"]').data('color');

            changeColorStatus(
                $select,
                data.new_color
            );

            ajaxChangeStatusLead($select, data);
        });
    });
})();

// filterPages
(function(){
    let filter = document.querySelector('.filter-page select');

    filter.addEventListener('change', function(el)
    {
        let $option = $("option:selected", this);
        let go_to = $option.data('url');
        go_to = document.location.origin + go_to;
        let current_id_page = (new URL(go_to)).searchParams.get('id_page');
        let id_page = (new URL(document.location)).searchParams.get('id_page');
        if(current_id_page == id_page) return;
        redirect(go_to);
    });

})();

$('input.filter-date_').daterangepicker({
    //startDate: '01.01.2023',
    opens: "center",
    drops: "auto",
    minYear: 2023,
    minDate: '01.01.2023',
    locale: {
        "separator": '-',
        "format": 'DD.MM.YYYY',
        "applyLabel": "Применить",
        "cancelLabel": "Отменить",
        "daysOfWeek": [
            "Пн",
            "Вт",
            "Ср",
            "Чт",
            "Пт",
            "Сб",
            "Вс"
        ],
        "monthNames": [
            "Январь",
            "Февраль",
            "Март",
            "Апрель",
            "Май",
            "Июнь",
            "Июль",
            "Август",
            "Сентябрь",
            "Октябрь",
            "Ноябрь",
            "Декабрь"
        ],
        "firstDay": 1
    }
});

$('input.filter-date_').on('apply.daterangepicker', function(ev, picker) {
    let params = {
        origin: document.location.origin,
        id_site: getMetaIdSite(),
        id_page: (new URL(document.location)).searchParams.get('id_page'),
        period: $('input.filter-date_').val()
    };

    let go_to = params.origin + '/sites/' + params.id_site + '/application?';

    if(params.id_page != null)
    {
        go_to += '&id_page=' + params.id_page;
    }

    go_to += '&period=' + params.period;

    //console.log(params);
    //console.log(go_to);
    redirect(go_to);
});

//clearDateFilter
(function()
{
    $('.wrapper-filter .close .btn_close').on('click', function()
    {
        let go_to = window.location.origin;
        go_to += '/sites/' + getMetaIdSite() + '/application';
        if(window.location.href == go_to) return;
        redirect(go_to);
    });
})();

// applChart
(function()
{
    const ctx = document.getElementById('appl_chart');
    let date = ctx.getAttribute('data-date');
    let values = ctx.getAttribute('data-values');

    date = window.atob(date);
    date = JSON.parse(date);
    values = window.atob(values);
    values = JSON.parse(values);

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: date,
            datasets: [{
                label: '',
                data: values,
                borderWidth: 1,
                backgroundColor: '#FF9D9D',
            }]
        },
        options: {
            plugins: {
                legend: {
                    display: false
                },
            },
            scales: {
                y: {
                    /* beginAtZero: true, */
                    display: false,
                    ticks: {
                        display: false
                    }
                },
                x: {
                    display: false,
                    ticks: {
                        display: false
                    }
                },
            },
        }
    });
})();