(function(){


// @switch
// #/user/pay_plan
$('.switch-item').off('click').switch(function(result){
    console.log(result);

    $('.admin-user-pay-plan-list').attr('period',);
    $('.plan-price-month .price').html('- ₽');
});


// @btnLine
// #/settings/integration_counters
$('.flexbe-button').off('click').btnLine(function(result){
    console.log(result);
});


// @dropdown
// #/user/pay_plan
$('[ref="dropdown"]').dropdown(function(result){
    var elem = $(this);
    // выделяем выбранный в списке
    result.target.closest('[ref="dropdown"]').find('.flexbe-list-item').removeClass('active');
    result.target.addClass('active');
    // Сайтов
    var textSites = result.target.find('.feature-name').text(); // сколько сайтов
    var numSites = parseInt(textSites);
    result.elem.find('>span.flexbe-text').html(textSites); // меняем в селекторе
    var card = result.elem.closest('.flexbe-card-item');
    card.find('li:nth-child(2)').html(textSites); // меняем в тарифе
    // Цена
    var priceSelector = parseInt(result.target.find('.feauture-price').text()) || 0;
    var priceMonth = priceSelector*numSites;
    card.find('.plan-price-month .price').html(priceMonth);
});



})(jQuery);