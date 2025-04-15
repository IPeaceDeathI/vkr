(function(){


// @switch
// + /user/pay_plan
// -----------------------------------------------------
// <div class="flexbe-switch">
//     <div class="switch-item">
$.fn.switch = function(callback=function(){}){
    $(this).off('click').on('click',function(e){
        var elem = $(this);
        var box = elem.closest('.flexbe-switch');
        box.find('.switch-item').removeClass('active');
        elem.addClass('active');
        var inx = $(this).index();
        var offset = inx*100 + 2;
        box.find('.switch-toggle').animate({'left':offset+'px'});

        // result
        var target = $(e.target); // дочерний элемент нажатия
        target = target.closest('.switch-item'); // доходим до родителя
        var result = {
            elem: elem,
            target: target,
            name: box.attr('name'),
            val: target.index(),
        };
        if(target.hasClass('switch-item'))
            callback(result);
    });
}


// @btnLine
// + /settings/integration_counters
// -----------------------------------------------------
// <div class="flexbe-buttons-line" name="options.webvisor_version" >
//     <span class="flexbe-button filling is-light">Отключен</span>
//     <span class="flexbe-button filling is-light">Версия 1.0</span>
//     <span class="flexbe-button filled is-light active">Версия 2.0</span>
// </div>
$.fn.btnLine = function(callback=function(){}){
    $(this).off('click').on('click',function(e){
        var elem = $(this);
        var box = elem.closest('.flexbe-buttons-line');
        box.find('.flexbe-button').removeClass('active');
        elem.addClass('active');

        // result
        var target = $(e.target); // дочерний элемент нажатия
        target = target.closest('.flexbe-button'); // доходим до родителя
        var result = {
            elem: elem,
            target: target,
            name: box.attr('name'),
            val: target.index(),
        };
        if(target.hasClass('flexbe-button'))
            callback(result);
    });
}


// @dropdown
// + /user/pay_plan
// -----------------------------------------------------
// <div class="dropdown">
//     Text
//     <div class="toggle-helper"></div>
//     <dropdown>
//         <div ref="balloon" style="display:none;">
//             <div class="flexbe-list-item active"></div>
$.fn.dropdown = function(callback=function(){}){
    $(this).off('click').on('click',function(e){
        var elem = $(this);
        elem.find('[ref="balloon"]').toggle(); // показываем скрытое
        elem.toggleClass('in-dropdown').toggleClass('focus'); // скрытое сверху контента
        // result
        var target = $(e.target);
        target = target.closest('.flexbe-list-item');
        var result = {
            elem: elem,
            target: target,
            name: elem.attr('name'),
            val: target.index(),
        };
        if(target.hasClass('flexbe-list-item'))
            callback(result);
    });
}
$('[ref="dropdown"]').dropdown();


// @popup
// - /settings/domain/ + add

// @autosave
// - /settings/code/ + textarea



})(jQuery);