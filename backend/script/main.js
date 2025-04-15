(function(){


// Получить GET params
$.getParam = function(parameterName){
    var result = null,
        tmp = [];
    location.search
        .substr(1)
        .split("&")
        .forEach(function (item) {
          tmp = item.split("=");
          if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
        });
    return result;
}


// // DateTimePicker // 2021-11-18 09:00 - на странице лендинга продукта блочик весь скрипт, закоментил вчера
// // https://xdsoft.net/jqplugins/datetimepicker/
if($('.filter-date').length)
$('.filter-date, #search-from-date, #search-to-date').datetimepicker({
	mask: true,
});

if($('.filter-date-sql').length)
$('.filter-date-sql').datetimepicker({
	format:'Y-m-d',
	mask: true,
});
// // При изменении фильта даты, сразу обновить страницу
// $('.search-filters.dropdown-menu .filter-date-sql').change(function(){
// 	$(this).closest('.dropdown-menu').find('[type="submit"]').trigger('click');
// });


// H1 select
$('.h1-select').on('change',function(){
	var value = $(this).val();
	var current_url = (''+window.location);
	// var location = current_url.replace(/\?shop=[0-9]/g,'')+'?shop='+value;
	var location = '';
	if(current_url.indexOf('?')!=-1) location = current_url.split('?')[0];
	location += '?type='+value;
	window.location = location;
});


// Информация по заявке
$('.ajax-add-info').click(function(){
	var elem = $(this);
	var form = elem.closest('form');
	var id = $('[lead-id]').attr('lead-id');
	var text = $('[name="info_text"]').val();
	// var where = $('[name="info_where"]').val();
	if(form.find('[name="info_text"]').val()!=''){
		// console.log('info_lid='+id+'&'+form.serialize());
		$.ajax({
			url: '/post/crm_post.php',
			method: 'POST',
			data: 'info_lid='+id+'&'+form.serialize(),
			success: function(data){
				$('<div class="info-box my"><div class="info-name">Вы написали</div><div class="info-text">'+text+'<div class="info-date">Только что</div></div></div>').appendTo('.lead-info-box');
				infoScrollBottom();
				$('[name="info_text"]').val('');
				// console.log(data);
				data = JSON.parse(data);
				if(data){
					console.log(data);
				}
			}
		});
	}
});


// Информация по заявке
$('[func="get-record"]').click(function(){
	var elem = $(this);
	var box = elem.closest('.info-box');
	var call_id_with_rec = $(this).attr('data-addon');
	if(call_id_with_rec){
		// console.log('call_id_with_rec='+call_id_with_rec);
		$.ajax({
			url: '/call-func',
			method: 'POST',
			data: 'f=get_record&call_id_with_rec='+call_id_with_rec,
			success: function(data){
				if(data){
					// console.log(data);
					data = JSON.parse(data);
					console.log(data.link);
					box.find('.info-record').html('<audio src="'+data.link+'" controls>');
				}
			}
		});
	} else {
		console.log('call_id_with_rec не задан');
	}
});


$('.contacts-settings select').on('change',function(){
	$(this).closest('form').find('[type="submit"]').trigger('click');
});


// Autocomplete / select search

function split( val ) {
	return val.split( /;\s*/ );
}
function extractLast( term ) {
	return split( term ).pop();
}

function onChangeInputs(){
	$('.action-check-data').val('');
	$('.action-check-id').val(0);
	$('[name="submit_checkin"]').addClass('hide');
	$('[name="submit_add"]').removeClass('hide');
};

$.fn.searchInput = function(mas,sets){
	$(this)
	.on( "keydown", function( event ) {
		if ( event.keyCode === $.ui.keyCode.TAB &&
		$( this ).autocomplete( "instance" ).menu.active ) {
			event.preventDefault();
		}
		onChangeInputs();
	})
	.on( "click", function( event ) {
		if(sets!='easy' && sets!='links') $(this).autocomplete('search', '');
		// onChangeInputs();
	})
	.autocomplete({
		minLength: 0,
		delay: 0,
		source: function( request, response ) {
			// delegate back to autocomplete, but extract the last term
			var results = $.ui.autocomplete.filter(
				mas, extractLast( request.term ) );
			// response( $.ui.autocomplete.filter(
			// 	mas, extractLast( request.term ) ) );
			response(results.slice(0, 15));
		},
		focus: function() {
			// prevent value inserted on focus
			return false;
		},
		select: function( event, ui ) {
			var terms = split( this.value );
			// remove the current input
			terms.pop();
			// add the selected item
			terms.push( ui.item.value );
			// add placeholder to get the comma-and-space at the end
			terms.push( "" );
			if(sets=='links') window.location.href = ui.item.href;
			if(sets=='multi') this.value = terms.join( "; " );
			else this.value = terms[0];

			if($(this).hasClass('action-search')){ // Если найден контакт
				$('.action-check-data').val(this.value);
				var i=-1; mas.forEach(function(contact){ i++;
					if(contact==$('.action-check-data').val()){
						$('.action-check-id').val(contacts_ids[i]); // TODO: search in contacts
					}
				})
				$('[name="submit_checkin"]').removeClass('hide');
				$('[name="submit_add"]').addClass('hide');
				$('.action-contact-box').removeClass('hide');
				this.value = '';

			}

			return false;
		}
	});
};

var inputsInit = function(){
	// $('[name="act_place_street"]').searchInputEasy(streets[$('[name="act_place_city"]').val()]);
	// if($.lists && $.lists['attached'] && $.lists['attached'][$('[name="act_place_city"]').val()])
	// 	$('[name="act_place_street"]').searchInput($.lists['attached'][$('[name="act_place_city"]').val()],'easy');
	// else
	// 	$('[name="act_place_street"]').searchInput([],'easy');

	// $('[name*="detail"]').each(function(){
	// 	var box = $(this).closest('.multi');
	// 	// var mas = details[box.find('[name*="element"]').val()];
	// 	var mas = [];
	// 	if($.lists && $.lists['attached'] && $.lists['attached'][box.find('[name*="element"]').val()])
	// 		mas = $.lists['attached'][box.find('[name*="element"]').val()];
	// 	if(mas) $(this).searchInput(mas);
	// });

	// $('[name*="defect"]').searchInput(defects,'multi');

	// Отметка участия контакта в мероприятии
	if(contacts)
		$('.action-search').searchInput(contacts,'easy');
}; inputsInit();


// Загружаем контакты
var contacts = [];
var contacts_ids = [];

// $.ajax({
// 	url: 'contacts_load',
// 	method: 'POST',
// 	success: function(data){
// 		data = JSON.parse(data);
// 		if(data){
// 			// var i=0; data.contacts.forEach(function(contact){ i++;
// 			// 	contacts[i] = contact.contact_last_name;
// 			// });
// 			contacts = data.contacts;
// 			contacts_ids = data.contacts_ids;
// 		}
// 		// console.log(contacts);
// 		inputsInit();
// 	}
// });


//

$('[shows]').click(function(){
	var id = $(this).attr('shows');
	$(this).remove();
	$('[hided="'+id+'"]').removeClass('hide');
});


$('.menu-mobile-btn').click(function(){
	$('.menu-desktop').toggleClass('desktop').toggleClass('mobile');
	$('.menu-desktop.desktop').addClass('hide');
	$('.menu-desktop.mobile').removeClass('hide');
});


if($('select[name="select_submit"]').length)
$('select[name="select_submit"]').on('change',function(){
	var value = $(this).val();
	$('input[name="'+value+'"]').trigger('click');
});

if($('select[name="select_submit"]').length)
$('select[name="select_submit"]').val($('[name="submit_current"]').val());

// Отмечать информацию заявки в низу
function infoScrollBottom(){
	$('.overflow-lead-info').each(function(){
	   // certain browsers have a bug such that scrollHeight is too small
	   // when content does not fill the client area of the element
	   var scrollHeight = Math.max(this.scrollHeight, this.clientHeight);
	   // console.log(scrollHeight);
	   this.scrollTop = scrollHeight - this.clientHeight;
	});
}
infoScrollBottom();

// ==================================================
// === CALENDAR === */
// ==================================================
$('[time]').each(function(){
	var value = parseInt($(this).attr('time'));
	$(this).css('height',value*1+'px');
});

// ==================================================
// === product contenteditable === */
// ==================================================
$('.product-contenteditable').click(function(){
	var sets = ''; 
	$('[contenteditable]').each(function(){
		var elem = $(this);
		var key = elem.attr('name');
		var value = elem.text();
		if(key){
			if(sets!='') sets += '&';
			sets += key+'='+value;
		}
	});
	var id = $('[product-id]').attr('product-id');
	// console.log(sets+'$id=');
	if(sets && id) $.ajax({ type: 'POST',
		url: '/p/product_page_edit.php', // /post
		data: sets+'&product_id='+id,
		success: function(data){
			console.log(data);
			if(data=='success')
				window.location = '';
		},
	});
});


// ==================================================
// === UPLOAD === */
// ==================================================

var checkIncludes = function(str, mas){
	var check = false;
	mas.forEach(function(value){
		if(str.includes(value)) check = true;
	});
	if(check) return true;
}

$('.upload-btn').click(function(){
	$(this).closest('.upload-box').find('[type="file"]').trigger('click');
});
$.fn.funcBtnUpload = function(){
		var box = $(this).closest('.upload-box');
		var file_data = $(this).prop('files');   
		var form_data = new FormData();
		var files_count = $(this).prop('files').length;
		// Тип сценария. Например, создание сметы lead_smets
		var type_script = box.attr('type-script');
		if(type_script) form_data.append('type_script', type_script); // Попадет в REQUEST
		// Номер лида, например
		var key_id = box.attr('key-id');
		if(key_id) form_data.append('key_id', key_id);
		// Файлы
		for(var i=0; i<files_count; i++){
			form_data.append('files[]', file_data[i]);
		}
		// form_data.append('file', file_data[0]);
		box.find('[type="file"]').val('');
		// console.log(form_data);                             
		$.ajax({
	        url: '/post/upload.php',
	        dataType: 'text',
	        cache: false,
	        contentType: false,
	        processData: false,
	        data: form_data,                         
	        type: 'post',
	        error: function(){
	        	$.message('<h3>Ошибка загрузки фото</h3>',7000);
	        },
	        success: function(data){
	            // console.log(data);
	        	data = JSON.parse(data);
	        	console.log(data);
	            // // Создание сметы
	            // if(box.attr('change-upload')=='lead_smets'){}
	            //
	            if(type_script=='directory_import' && data['file_id']){
	            	$.message('<h3>Импорт в справочник</h3>Файл успешно загружен<br><a href="/directory/?action=import&id='+data['file_id']+'" class="btn">Перейти к обработке</a>',7000);
	            	window.location = '/directory/?action=import&id='+data['file_id'];
	            }
	            if(type_script=='lead_smets' && data['smeta']){ //  && $('.smets-box').length
	            	var new_smet = $('<div class="box smeta-box">Добавлена новая смета <b>id'+data['smeta']['smeta_id']+'</b><br><a href="/smeta/'+data['smeta']['smeta_id']+'" class="btn">Перейти к обработке</a></div>');
	            	new_smet.appendTo('.smets-box');
	            	// $.message('<h3>Смета успешно загружена</h3><a href="/smeta/'+data['smeta']['smeta_id']+'" class="btn">Перейти к обработке</a>',7000);
	            	$.message('<h3>Смета успешно загружена</h3>',5000);
	            }
	            if(type_script=='lenta_file'){ //  && $('.smets-box').length
	            	// window.location = window.location;
	            	data['files_list'].forEach(function(file){
	            		$.message('<div>Файл успешно загружен в ленту объекта<br>Наименование: <b>'+file+'</b></div>',5000);
	            	});
	            	$.message('<div>Загружены файлы<br>Кол-во: <b>'+data['files_list'].length+' шт.</b></div>',5000);
	            }
	            //
	            if(data['links'] && box.find('input[name*="_file"]').length)
					box.find('input[name*="_file"]').val(data['links']);
	            // if(data['error']=='upload_error'){ alert('Ошибка загрузки данного файла'); }
            	// else
	            if(data['links']) data['links'].split(',').forEach(function(link){
		            // if(link.indexOf('.')!=-1)
		            if(box.length && box.find('[add-in-list]').length){
						var directName = box.find('[add-in-list]').attr('add-in-list');
						var value = box.find('[name="'+directName+'"]').val() || '';
						if(value.length>2) value += ', ';
						value += link;
						box.find('[name="'+directName+'"]').val(value);
						// console.log(value);
						// Обновляем картинки на основе input
						var input_value = box.find('[name="'+directName+'"]').val() || '';
						var formats_img = ['jpg','jpeg','png','gif'];
						var formats_video = ['mov','mp4'];
						// box.find('.photos-list').html('');
						// if(input_value) input_value.split(', ').forEach(function(src){
							var src = link;
							var format = src.split('.')[src.split('.').length-1];
							src = src.replace('./uploads/','/uploads/');
							if(checkIncludes(src,formats_img))
								$('<img src="'+src+'">').click(function(){
									if(confirm('Вы уверены что хотите открепить этот файл?')){
										$(this).remove();
										// upd val input
										var photos_list = [];
										box.find('.photos-list.overflow-box img, .photos-list.overflow-box video').each(function(){
											var src = $(this).attr('src');
											photos_list.push(src);
										});
										box.find('[name="report_photos"]').val(photos_list.join(', '));
										box.find('.photos-input').val(photos_list.join(', ')); // new
									}
								}).appendTo(box.find('.photos-list'));
							else if(checkIncludes(src,formats_video))
								$('<video src="'+src+'" controls>').click(function(){
									if(confirm('Вы уверены что хотите открепить этот файл?')){
										$(this).remove();
										// upd val input
										var photos_list = [];
										box.find('.photos-list.overflow-box img, .photos-list.overflow-box video').each(function(){
											var src = $(this).attr('src');
											photos_list.push(src);
										});
										box.find('[name="report_photos"]').val(photos_list.join(', '));
										box.find('.photos-input').val(photos_list.join(', ')); // new
									}
								}).appendTo(box.find('.photos-list'));
		            } else {
			            $('.profile-photo').html('<img src="'+link+'">');
						// if(!data['error']){
							if(link)
							$.ajax({
								method: 'POST',
								url: '/post/user_photo_add.php',
								data: 'user_photo='+link,
							});
						// } else console.log(data['error']);
		            }
	            });
	        }
	     });
	};
$('[type="file"]').on('change', function() {
	$(this).funcBtnUpload();
});


// Обновляем удаление фото из формы / При обычной загрузки страницы
$('.photos-list img').click(function(){
	var box = $(this).closest('.upload-box');
	if(confirm('Вы уверены что хотите открепить этот файл?')){
		$(this).remove();
		// upd val input
		var photos_list = [];
		box.find('.photos-list.overflow-box img, .photos-list.overflow-box video').each(function(){
			var src = $(this).attr('src');
			photos_list.push(src);
		});
		box.find('[name="report_photos"]').val(photos_list.join(', '));
		box.find('.photos-input').val(photos_list.join(', ')); // new
	}
});


// // ==================================================
// // === IMPORT PRELOAD === */
// // ==================================================
// var contactsCols = [
// 	{ col: 'contact_list', name: 'Список', search: ['список'] },
// 	{ col: 'contact_phone', name: 'Телефон', search: ['телефон','phone'] },
// 	{ col: 'contact_telegram_name', name: 'Телеграм Имя', search: ['телеграм'] },
// 	{ col: 'contact_telegram_id', name: 'Телеграм ID', search: [] },
// 	{ col: 'contact_source', name: 'Откуда', search: ['откуда'] },
// 	{ col: 'contact_first_name', name: 'Имя', search: ['имя'] },
// 	{ col: 'contact_last_name', name: 'Фамилия', search: ['фамилия'] },
// 	{ col: 'contact_middle_name', name: 'Отчество', search: ['отчество'] },
// 	{ col: 'contact_comment', name: 'Комментарий', search: ['коммент'] },
// 	{ col: 'contact_date', name: 'Дата', search: ['дата','врем'] },
// 	{ col: 'contact_status', name: 'Статус', search: ['статус','обзвон'] },
// ];
// var importTop = [];
// var importData = [];
// var importSel = [];
// var importPost = [];
// $('.import-preload').click(function(){
// 	importTop = [];
// 	importData = [];
// 	importSel = [];
// 	importPost = [];
// 	var table = $('.import-box').find('table');
// 	var j=0;
// 	table.find('tr').each(function(){ j++;
// 		var tr = $(this);
// 		var i=0;
// 		tr.find('td').each(function(){ i++;
// 			var td = $(this);
// 			var value = td.text();
// 			if(j==1){
// 				// importTop.push({
// 				// 	'col': i,
// 				// 	'value': value,
// 				// });
// 				importTop[i] = {
// 					'col': i,
// 					'value': value,
// 				}
// 			} else {
// 				importData.push({
// 					'row': j-1,
// 					'col': i,
// 					'value': value,
// 				});
// 			}

// 		});
// 	});
// 	// console.log(importTop);
// 	// console.log(importData);
// 	$('<h2>Заголовки импорта</h2>').appendTo('.import-tops');
// 	importTop.forEach(function(col){
// 		var top = $('<div class="import-top table-box">');
// 		$('<div class="top-name table-cell">'+col.col+' - '+col.value+'</div>').appendTo(top);
// 		var selectBox = $('<div class="top-select table-cell w-50">').appendTo(top);
// 			var select = $('<select name="top_'+col.col+'">');
// 			$('<option value="">[Не учитывать]</option>').appendTo(select);
// 			contactsCols.forEach(function(val){
// 				var check = false;
// 				val.search.forEach(function(search){
// 					if(col.value.toLowerCase().indexOf(search.toLowerCase())!=-1){ check = true }
// 				});
// 				$('<option value="'+val.col+'" '+(check?'selected':'')+'>'+val.name+'</option>').appendTo(select);
// 			});
// 			select.appendTo(selectBox);
// 		selectBox.appendTo(top);
// 		top.appendTo('.import-tops');
// 	});
// 	$('<div class="btn">Подтвердить заголовки</div>')
// 	.click(function(){
// 		$('[name*="top_"]').each(function(){
// 			var value = $(this).val();
// 			var num = $(this).attr('name').split('_')[1] || 0;
// 			if(num) importTop.forEach(function(top){
// 				if(top.col==num) top.sql = value;
// 			});
// 		});
// 		// console.log(importTop);
// 		importData.forEach(function(tr){
// 			var sql = importTop[tr.col].sql;
// 			if(sql){
// 				if(!importSel[tr.row]) importSel[tr.row] = {};
// 				importSel[tr.row][sql] = tr.value.replace(/(?:\r\n|\r|\n)/g,'').replace(/  /g,' ');
// 			}
// 		});
// 		// console.log(importSel);
// 		importSel.forEach(function(row){
// 			// if(row.sql=='contact_date'){
// 				if(row.contact_date)
// 				if(parseInt(row.contact_date.split('.')[1])>12){
// 					// row.value = row.value.split('.')[1]+'.'+row.value.split('.')[0]+'.'+row.value.split('.')[2];
// 					row.contact_date = row.contact_date.replace(/^([\d]{1,2}).([\d]{2}).([\d]{4})/,"$3.$1.$2");
// 				} else 
// 					row.contact_date = row.contact_date.replace(/^([\d]{1,2}).([\d]{1,2}).([\d]{4})/,"$3.$2.$1");
// 			// } 
// 			importPost.push(row);
// 		});
// 		// console.log(importPost);
// 		// console.log(JSON.stringify(importPost));
// 		$.ajax({ type: 'POST',
// 			url: '/post_contacts_import',
// 			data: 'import_shop='+$('[name="import_shop"]').val()+'&data='+JSON.stringify(importPost),
// 			success: function(data){
// 				// console.log(data);
// 				data = JSON.parse(data);
// 				$.message('<h3>Успешно добавлено</h3>Контактов: <b>'+data.countInsert+' шт.</b><br>'+
// 					'Пропущено: <b>'+data.countSelect+' шт.</b><br>'+
// 					'Ошибочных: <b>'+data.countErrorContacts+' шт.</b><br>'+
// 					'Создано статусов: <b>'+data.countNewStatus+' шт.</b>',7000);
// 				$('.import-tops').html('');
// 			},
// 		});
// 	})
// 	.appendTo('.import-tops');
// });


// // ==================================================
// // === TABLE UPDATE === */
// // ==================================================
// $('.table-edit').each(function(){
// 	var table = $(this);
// 	table.find('td').bind('input',function(){
// 		// console.log($(this).text());
// 		$(this).addClass('changed');
// 	});
// });

// $('.save-table-edit').click(function(){
// 	$('.table-edit').each(function(){
// 		var table = $(this);
// 		var edits = [];
// 		var tabl = table.attr('row-table');
// 		table.find('.changed').each(function(){
// 			var e = {};
// 			var tr = $(this).closest('tr');
// 			e.id = tr.attr('row-id');
// 			e.col = $(this).attr('row-col');
// 			if($(this).find('select').length){
// 				e.value = $(this).find('select').val();
// 				// var val = $(this).find('select').val();
// 				// $.ajax({ type: 'POST',
// 				// 	url: '/post/table_edit.php',
// 				// 	data: 'table='+tabl+'&data='+JSON.stringify(edits),
// 				// 	success: function(data){
// 				// 		data = JSON.parse(data);
// 				// 		console.log(data);
// 				// 		$.message('<h3>Изменения сохранены</h3>Строк затронуто: <b>'+data.count+' шт.</b>',5000);
// 				// 	},
// 				// });
// 			}
// 			else 
// 				e.value = $(this).text();
// 			// console.log(e.id,e.col,e.value);
// 			if(e.id && e.col)
// 				edits.push(e);
// 		});

// 		// shop and event
// 		var shop = $('.contacts-settings [name="shop"]').val() || 0;
// 		var event = $('.contacts-settings [name="event"]').val() || 0;

// 		table.find('.changed').removeClass('changed');
// 		$.ajax({ type: 'POST',
// 			url: '/post/table_edit.php',
// 			data: 'table='+tabl+'&data='+JSON.stringify(edits)+(shop?'&shop='+shop:'')+(event?'&event='+event:''),
// 			success: function(data){
// 				data = JSON.parse(data);
// 				// console.log(data);
// 				$.message('<h3>Изменения сохранены</h3>Строк затронуто: <b>'+data.count+' шт.</b>',5000);
// 			},
// 		});
// 	});
// });







function setPost(array){
	var result = [];
	for(var key in array){
		result.push(key+'='+array[key]);
	}
	return result.join('&');
}

// $('[action="smeta_add_dir"]').click(function(){
// 	$('[action-id^="d"] [type="checkbox"]:checked').each(function(){
// 		var tr = $(this).closest('[action-id]');
// 		var a = [];
// 		a['row_formula'] = tr.find('.td-formula').text();
// 		a['row_count_smeta'] = tr.find('.td-count input').val() ? tr.find('.td-count input').val() : tr.find('.td-count').text();
// 		if(a['row_count_smeta']=='-') a['row_count_smeta'] = 1;
// 		a['row_name'] = tr.find('.td-name').text();
// 		a['row_price'] = parseInt(tr.find('.td-price').text());
// 		a['row_sum'] = Math.round(parseInt(a['row_count_smeta']) * parseInt(a['row_price']));

// 		//
// 		a['row_smeta'] = $('.smeta-add-box').attr('closest-id');
// 		a['row_room_id'] = $('.smeta-add-box').attr('room-id');
// 		a['row_room'] = $('.smeta-add-box').attr('room-name');
// 		// console.log(setPost(a));
// 		// Запрос на каждую строку отдельно
// 		$.ajax({
// 			method: 'POST',
// 			url: '/post/actions.php',
// 			data: 'action=smeta_add_dir&'+setPost(a),
// 			success: function(data){
// 				// console.log(data);
// 				if(data.substr(0,1)=='{') data = JSON.parse(data); else data = null;
// 				if(data){
// 					tr.attr('action-id',data['insert_id']);
// 					tr.removeClass('grey');
// 					tr.find('td').addClass('edited');
// 					setTimeout(function(){
// 						tr.find('td.edited').removeClass('edited');
// 					},3000);
// 					tr.find('.td-count').attr('e-id',data['insert_id']);
// 					tr.find('.td-edit').html('Добавлено');
// 					// tr.find('[type="checkbox"]').prop('checked', true);
// 					tr.find('[type="checkbox"]:checked').trigger('click');
// 				} else console.log('Ответ не получен');
// 			}
// 		});
// 	});
// });



// ==================================================
// === TABS custom ===
// ==================================================

// // Показать весь справочник
// $('[type="checkbox"].tab-smeta-all').click(function(){
// 	var group = $(this).attr('tab-group');
// 	var check = $(this).is(':checked') ? 1 : 0;
// 	$('[tab-group="'+group+'"][tab-id]').addClass('hide');
// 	if(check)
// 		$('[tab-group="'+group+'"][tab-id="smeta_all"]').removeClass('hide');
// 	else
// 		$('[tab-group="'+group+'"][tab-id="smeta_mini"]').removeClass('hide');
// 	// Снять все выбранные, чтобы не путаться
// 	$('td [type="checkbox"]:checked').trigger('click');
// });



// ==================================================
// === CHART_grafic ===
// ==================================================

// Готовим данные для графика
var dataArray = {};
$('[data-array]').each(function(){
	var key = $(this).attr('data-array');
	var value = $(this).html();
	dataArray[key] = value;
});


// Отрисовываем один большой график остатков на странице товара
var renderChart = function(){
	// var canvasChart = false;
	// $('.chart_stats').each(function(){
	// 	canvasChart = $(this).getContext('2d');
	// });
	// var canvasChart = document.getElementById('chart_stats').getContext('2d');
	// var canvasChart = document.getElementsByClassName('chart_stats')[0].getContext('2d');
	// .forEach(function(canvasChart){
	// for(var chart_id=0; chart_id<$('.chart_stats').length; chart_id++){
	$('.chart_stats').each(function(){
		// var canvasChart = document.getElementsByClassName('chart_stats')[chart_id]; // .getContext('2d')
		var canvasChart = $(this);

		// canvasChart.height = 200;
		var chartSettings = {
			borderWidth: 3,
			title: $(this).attr('chart-title'),
			one: $(this).attr('one'),
			two: $(this).attr('two'),
			three: $(this).attr('three') || null,
			four: $(this).attr('four') || null,
			four_title: $(this).attr('four-title') || null,
		};
		//
		var yAxes = [
				{
					display: true,
					// scaleLabel: {
					// 	display: true,
					// 	labelString: 'Продажи'
					// },
	                ticks: {
	                    beginAtZero: true
	                },
	                position: 'left',
	                id: 'y-axis-1',
				}
				,{
					display: true,
				 	ticks: {
	                    beginAtZero: true
	                },
					position: 'right',
					id: 'y-axis-2',
				},
			];
		// console.log(chartRows);
		var datasets = [];
		datasets.push({
			            label: chartSettings['title'],
			            fill: 'origin',
			            // data: dataArray['in_date'].split(','), // Заработок
			            data: chartSettings['two'].split(','),
			            backgroundColor: 'rgb(54 150 83 / 20%)',
			            borderColor: 'rgb(54 150 83 / 80%)',
			            pointBackgroundColor: 'rgb(54 150 83 / 80%)',
			            borderWidth: chartSettings['borderWidth'],
			            yAxisID: 'y-axis-1'
			        });
		if(chartSettings.three)
		datasets.push({
			            label: 'План',
			            fill: 'origin',
			            data: chartSettings['three'].split(','), 
			            backgroundColor: 'rgb(51 102 204 / 20%)',
			            borderColor: 'rgb(51 102 204 / 80%)',
			            pointBackgroundColor: 'rgb(51 102 204 / 80%)',
			            borderWidth: chartSettings['borderWidth'],
			            yAxisID: 'y-axis-2'
			        });
		if(chartSettings.four){
			yAxes.push({
					display: true,
						ticks: {
						beginAtZero: true
					},
					position: 'right',
					id: 'y-axis-3',
				});
			datasets.push({
	            label: chartSettings['four_title'],
	            fill: 'origin',
	            data: chartSettings['four'].split(','), 
	            backgroundColor: 'rgba(222, 130, 42, 0.2)',
	            borderColor: 'rgba(222, 130, 42, .8)',
	            pointBackgroundColor: 'rgba(222, 130, 42, .8)',
	            borderWidth: chartSettings['borderWidth'],
	            yAxisID: 'y-axis-3'
	        });
		}
		var myChart = new Chart(canvasChart, {
		    type: 'line', // bar
		    data: {
		        // labels: dataArray['dm'].split(','), // Дни
		        labels: chartSettings['one'].split(','),
		        datasets: datasets,
		    },
		    options: {
		        responsive: true,
		    	maintainAspectRatio: false,
				// title:{
				//     display:true,
				//     text:'Chart.js Line Chart'
				// },
				tooltips: {
					mode: 'index',
					intersect: false,
				},
				hover: {
					mode: 'nearest',
					intersect: true
				},
				scales: {
					xAxes: [{
						display: true,
						// scaleLabel: {
						// 	display: true,
						// 	labelString: 'Дни'
						// }
					}],
					yAxes: yAxes,
				}
		    }
		});
		//Hide
		// myChart.getDatasetMeta(2).hidden=true;
		// myChart.getDatasetMeta(3).hidden=true;
		// myChart.getDatasetMeta(4).hidden=true;
		myChart.update();
	});
};
if($('canvas').length)
renderChart();



/* Smeta file import post
---------------------------------------*/

// Обработка файла сметы post-запросом
$('[smeta-import]').click(function(){
	var id = $(this).attr('smeta-id');
	// console.log('import',id);
	$.message('<h3>Обработка файла...</h3>Проиходит в фоновом режиме, и может занять до нескольких минут');
	$.ajax({
		url: '/import',
		method: 'POST',
		data: 'id='+id,
		success: function(data){
			if(data.substr(0,1)=='{') data = JSON.parse(data); else data = null;
			if(data){
				// console.log(data);
				$.message('<h3>Файл успешно обработан</h3>Обновляем страницу...');
				window.location = window.location;
			} else console.log(data);
		}
	});
});



/* Maps geo yandex
---------------------------------------*/
if($('#map').length)
	ymaps.ready(init);


function init(){
    if($('[name="lead_address"]').length)
	$('[name="lead_address"]').each(function(){
		// if($('[name="lead_coords"]').val()) return true;
		
		var address = $('[name="lead_address"]').val();

	    // Поиск координат
	    ymaps.geocode(address, {
	        results: 1
	    }).then(function (res) {
			// Выбираем первый результат геокодирования
			var firstGeoObject = res.geoObjects.get(0);
			// Координаты геообъекта
			var coords = firstGeoObject.geometry.getCoordinates();
			// Область видимости геообъекта
			var bounds = firstGeoObject.properties.get('boundedBy');

			var crds = coords.join(',');
			// console.log(crds);
			if(!$('[name="lead_coords"]').length){
				// $('[name="lead_address"]').after('<input name="lead_coords" value="'+crds+'">');
			} else {
				$('[name="lead_coords"]').val(crds);
			}
		});
	});
}




/* Dropdown Lists
---------------------------------------*/
$.updateDropdown = function(){
	// for (var li of $('.list-dropdown').find("li:not(.li-none)")){
	$('.list-dropdown').find("li:not(.li-none)").each(function(){
		var li = $(this);
		if(li.hasClass('li-show')) return;
		if(li.hasClass('li-hide')) return;

		var span = li.find('span');
		span.addClass('li-show');

		// var span = document.createElement("span");
		// span.classList.add("li-show");
		// li.prepend(span);
		// span.append(span.nextSibling); // Вставляем текст li в span
	});

	$('.list-dropdown li span').unbind('click');
	$('.list-dropdown li span').click(function(event){
		let childrenList = $(this).closest('li').find("ul");
		if (!childrenList) return;
		// childrenList.toggleClass('hide'); // Без анимации скрытия
		// if (childrenList.hasClass('hide')) {

		if (childrenList.is(":visible")) {
			childrenList.hide(); // 300
			$(this).addClass("li-hide"); // event.target.classList.add("li-hide")
			$(this).removeClass("li-show");
			// $(this).closest('li').find('ul label').removeClass('hide');
		} else {
			childrenList.show(); // 300
			$(this).addClass("li-show");
			$(this).removeClass("li-hide");
			childrenList.find('[dir-id]').removeClass('hide');
			// $(this).closest('li').find('ul label').removeClass('hide');
		}
		// TODO: просто выделить скрытие и раскрытие в функции и вызывать отдельно, и общую нажатия
	});
};
$.updateDropdown();


// Выделение группы товаров
$('.check-group').click(function(){
	var elem = $(this);
	var parent = elem.closest('li');
	parent.find('ul [type="checkbox"].just-select:visible, .smeta-row-box [type="checkbox"].just-select:visible').each(function(){
		if(elem.is(':checked'))
			$(this).prop('checked','checked'); // TODO: Оптимизировать для сотней позиций, собирать данные потом, а не каждый клик
		else
			$(this).prop('checked','');
	});
	// TODO: Потом собирать данные раз в 5 сек и вносить в базу изменения
	// TODO: Сразу несколько id передаем в ~saveSmetaRow()
});

		// Если родительский элемент был выделен, а дочерний сняли, то обнулить родителя
		// var qwer = parent.closest('li').find('[type="checkbox"]:first').is(':checked');
		// if(qwer) qwer.prop('checked','');




// var array_smeta = [
// 	{'id':1,'cat1':'Полы','cat2':'Демонтаж','cat3':'Прочее','cat4':'','name':'Вынос мусора'},
// 	{'id':2,'cat1':'Полы','cat2':'Демонтаж','cat3':'Прочее','cat4':'','name':'Уборка руками'},
// 	{'id':3,'cat1':'Полы','cat2':'Монтаж','cat3':'Установка пола','cat4':'Кладка лимината','name':'Кладка лимината 2*5 по ГОСТу'},
// ];

// // Функция добавления в список сметы
// // Функция создания списка
// function renderDropdown(rows){
// 	rows.forEach(function(row){
// 		console.log(row);
// 		// result[row['cat1']][row['cat2']][row['cat3']][row['cat4']] = row;
// 	});
// }
// renderDropdown(array_smeta);


// // Использем в /constructor/scripts/page_scripts.js
// При нажатии на кнопку с [popup] открываем окно поверх страницы
// if($('[popup]').length)
// $('[popup]').click(function(){
// 	var elem = $(this);
// 	var type = elem.attr('popup');
// 	var id = elem.attr('popup-id');

// 	// Прошлые значения
// 	var pre = [];
// 	var closest = elem.closest('[popup-box]');
// 	closest.find('meta').each(function(){
// 		var t = $(this).attr('type');
// 		var c = $(this).attr('content');
// 		pre[t] = c;
// 	});
// 	closest.find('[popup-par]').each(function(){
// 		var t = $(this).attr('popup-par');
// 		var c = $(this).html();
// 		pre[t] = c;
// 	});

// 	var box = $('<div>');
// 	var form = $('<form>'); form.appendTo(box);

// 	// Разные попапы
// 	if(type=='smeta_edit_info'){
// 		$('<h2 class="popup-title">Изменить номер и дату</h2>').appendTo(form);
// 		$('<label>Смета/Акт</label>').appendTo(form);
// 		$('<input type="text" value="'+id+'" disabled>').appendTo(form);
// 		$('<input name="smeta_id" type="hidden" value="'+id+'">').appendTo(form);
// 		$('<label>Наименование</label>').appendTo(form);
// 		$('<input name="smeta_name" type="text" value="'+pre['smeta_name']+'" placeholder="Наименование...">').appendTo(form);
// 		$('<label>Номер документа, порядковый</label>').appendTo(form);
// 		$('<input name="smeta_num" type="text" value="'+pre['smeta_num']+'" placeholder="Номер...">').appendTo(form);
// 		$('<label>Дата для подписания</label>').appendTo(form);
// 		$('<input name="smeta_date_sign" type="text" value="'+pre['smeta_date_sign']+'" placeholder="Дата..." class="filter-date">').appendTo(form);
// 		$('<br>').appendTo(form);
// 		$('<a class="btn submit">Сохранить изменения</a>').appendTo(form);
// 	}

// 	box.popup();

// 	// Обработка
// 	$('.filter-date').datetimepicker({
// 		mask: true,
// 	});

// 	// Кнопка сохранить
// 	var submit = $('.popup-box a.submit');
// 	submit.click(function(){
// 		// console.log($('.popup-box form').serialize());

// 		// var pre = []; // Выше
// 		// pre['smeta_id'] = id;

// 		var mas = JSON.stringify(pre);
// 		$.ajax({
// 			method: 'POST',
// 			url: '/post/actions.php',
// 			data: 'action='+type+'&mas='+mas+'&'+$('.popup-box form').serialize(),
// 			success: function(data){
// 				// console.log(data);
// 				if(data.substr(0,1)=='{') data = JSON.parse(data); else { console.log(data); data = null; } 
// 				if(data){
// 					console.log(data);

// 					// Сохраняем изменения
// 					for(var t in data['upd']){
// 						var c = data['upd'][t];
// 						$('[popup-box="'+id+'"]').find('meta[type="'+t+'"]').attr('content',c);
// 						$('[popup-box="'+id+'"]').find('[popup-par="'+t+'"]').html(c);
// 					}

// 					$('.popup-close').trigger('click');
// 				}
// 			}, // success
// 		}); // ajax
// 	}); // submit
// });



// Меню поиска фильтров воронки

// $('.cell-auto').on('focusin',function(){
// 	$('.search-filters').css('display','block');
// });
// $('.cell-auto').on('focusout',function(){
// 	$('.search-filters').css('display','none');
// });

const $menu = $('.dropdown');
const onMouseUp = e => {
 if (!$menu.is(e.target) // If the target of the click isn't the container...
   && $menu.has(e.target).length === 0) // ... or a descendant of the container.
   {
     $menu.removeClass('is-active')
  }
}
$('.dropdown-toggle').on('click', () => {
  $menu.toggleClass('is-active').promise().done(() => {
    if ($menu.hasClass('is-active')) {
      $(document).on('mouseup', onMouseUp) // Only listen for mouseup when menu is active...
    } else {
      $(document).off('mouseup', onMouseUp) // else remove listener.
    }
  })
})


// Используется в фильтрах выбора ответснного в воронке и карте
if($('.select-selectize').length)
$('.select-selectize').each(function(){
	$(this).selectize({
		maxItems: $(this).hasClass('multi') ? 10 : 1,
	});
});

// Выбор нескольких статусов в воронке
if($('form.section-search [type="submit"]')) $('form.section-search [type="submit"]').click(function(){
	if($('form.section-search [name="status"]').length && $('form.section-search [for="status"]').length)
		$('form.section-search [name="status"]').val($('form.section-search [for="status"]').val().join(', '));
});


// Статусы оплаты и акта в объекте чтобы переключались
if($('.smets-select').length)
$('.smets-select').on('change',function(){
	var elem = $(this);
	var mas = {
		'smeta_id': elem.closest('[popup-box]').attr('popup-box'),
		'name': elem.attr('name'),
		'hash': elem.closest('[popup-box]').attr('hash'),
		'val': elem.val(),
		'table': elem.attr('chg-table'),
		'lead_id': elem.closest('[lead-id]').attr('lead-id'),
		'type_name': elem.closest('[lead-id]').attr('type-name'),
		'val_new': elem.find('option:selected').html(),
	};

	// Обновляем статус сразу
	elem.attr('level',mas['val']);
	console.log(mas);

	$.ajax({
		url: '/post/actions.php',
		method: 'POST',
		data: { action: 'smets_status', mas: mas },
		success: function(data){
			if(data.substr(0,1)=='{') data = JSON.parse(data); else { console.log(data); data = null; } 
			if(data){
				console.log(data);
			}
		}
	});
});


// Типы подрядчиков
$.order_type_names = {
	'shop': 'Черновые материалы',
	'finishing': 'Финишные материалы',
	'doors': 'Двери',
	'design': 'Дизайн',
	'master': 'Мастера на ремонт',
};


var updateMasterFot = function(params){
	// Загружаем рассчет ФОТа мастеров по этапам
	$.ajax({
		method: 'POST',
		url: '/post/masters.php',
		data: 'action=list&type=master&'+(params['lid']?'order_lid='+params['lid']:'order_id='+params['id']),
		success: function(data){
			if(data.substr(0,1)=='{') data = JSON.parse(data); else { console.log(data); data = null; } 
			if(data){
				// console.log(data);

				var spec_box = ('.popup-box .fot-master');
				if(data['smeta']) for(var smeta_id in data['smeta']){
					var smeta = data['smeta'][smeta_id];
					var smeta_master = 0, smeta_smeta = 0;
					for(var step in smeta){
						var mas = smeta[step];
						smeta_smeta += mas['row_sum_smeta'];
						smeta_master += mas['row_sum_master'];
					}
					// Заголовок сметы и сумма
					var tr = $('<div class="table-row">'); tr.appendTo(spec_box);
					$('<div class="table-cell nowrap"><br><span class="grey min">Смета №'+smeta_id+'</span><br><b>'+(data['smets'][smeta_id]?Math.ceil(data['smets'][smeta_id]['smeta_sum_all']).toLocaleString():'')+' р.</b></div>').appendTo(tr);
					$('<div class="table-cell"></div>').appendTo(tr);
					$('<div class="table-cell nowrap align-right"><br><span class="grey min">Сумма заказчику:</span><br><b>'+(smeta_smeta?Math.ceil(smeta_smeta).toLocaleString():'')+'</b> р.</div>').appendTo(tr);
					$('<div class="table-cell nowrap align-right"><br><span class="grey min">Оплата мастерам:</span><br><b>'+(smeta_master?Math.ceil(smeta_master).toLocaleString():'')+'</b> р.</div>').appendTo(tr);
					// Этапы
					for(var step in smeta){
						var mas = smeta[step];
						var tr = $('<div class="table-row">'); tr.appendTo(spec_box);
						$('<div class="table-cell i nowrap">- '+(step?step:'Без категории')+'</div>').appendTo(tr);
						$('<div class="table-cell w-100"><div class="line-solid"></div></div>').appendTo(tr);
						$('<div class="table-cell nowrap align-right">'+(mas['row_sum_smeta']?Math.ceil(mas['row_sum_smeta']).toLocaleString():'-')+' р.</div>').appendTo(tr);
						$('<div class="table-cell nowrap align-right">'+(mas['row_sum_master']?Math.ceil(mas['row_sum_master']).toLocaleString():'-')+' р.</div>').appendTo(tr);
					}
				}
			}
		}
	});
};

// Заявка на комплектацию
if($('.render-lead-order').length)
$('.render-lead-order').click(function(){
	var elem = $(this);
	// var type = elem.attr('popup');
	var id = elem.attr('popup-id');
	var order_id = elem.attr('popup-oid');

	$.ajax({
		method: 'POST',
		url: '/post/masters.php',
		data: 'action=order&order_id='+order_id,
		success: function(data){
			// console.log(data);
			if(data.substr(0,1)=='{') data = JSON.parse(data); else { console.log(data); data = null; } 
			// if(data){
				console.log(data);

				var box = $('<div>');
				var form = $('<form>'); form.appendTo(box);
				var post = (data && data['order']) ? data['order'] : [];

				// Разные попапы
				// if(type=='smeta_edit_info'){
					if(!order_id)
						$('<h2 class="popup-title">Подать заявку</h2>').appendTo(form);
					else
						$('<h2 class="popup-title">Редактирование заявки №'+order_id+'</h2>').appendTo(form);

					if(!id){
						// Список всех объектов
						if(data && data['leads']){
							var table = $('<div class="table">').appendTo(form); table.appendTo(form);
							var td = $('<div class="table-cell">'); td.appendTo(table);
							$.options_master['order_lid'] = data['leads'];
							td.renderSelectOptions({post:post,multi:0,none:1,label:'Объект',col:'order_lid',width:'w-100',req:1});
						} else {
							$('<label>Объект</label>').appendTo(form);
							$('<input name="order_lid" type="text" placeholder="Введите ID из CRM..." req-col="order_lid">').appendTo(form);
						}
					} else {
						$('<input name="order_lid" type="hidden" value="'+id+'">').appendTo(form);
					}

					var table = $('<div class="table table-mobile">').appendTo(form); table.appendTo(form);
					var td = $('<div class="table-cell">'); td.appendTo(table);
					$('<label>На что заявка</label>').appendTo(td);
					var selectType = $('<select name="order_type" class="">');
					for(var val in $.order_type_names){
						var name = $.order_type_names[val];
						if(name!='shop')
						$('<option value="'+val+'" '+(val==post['order_type']?'selected':'')+'>'+name+'</option>').appendTo(selectType);
					};
					selectType.appendTo(td);
					var td = $('<div class="table-cell">'); td.appendTo(table);
					$('<label>Дата начала/встречи</label>').appendTo(td);
					$('<input name="order_date_start" type="text" value="'+(post['order_date_start'])+'" class="filter-date ">').appendTo(td);
					var td = $('<div class="table-cell">'); td.appendTo(table);
					$('<label>Дата финала</label>').appendTo(td);
					$('<input name="order_date_end" type="text" value="'+(post['order_date_end'])+'" class="filter-date ">').appendTo(td);

					// Специализация / появляется если тип мастеров
					var spec_box = $('<div class="table table-mobile selectize-block hidden-master">'); spec_box.appendTo(form);
					var td = $('<div class="table-cell">'); td.appendTo(spec_box);
						$('<label>Специализация ремонта</label>').appendTo(td);
						var selectType = $('<select name="action_order_specify" multiple class=" select-go select-selectize" req-col="order_specify" placeholder="Выберите специализацию...">');
						for(var val in $.options_master['master_specify']){
							var name = $.options_master['master_specify'][val];
							$('<option value="'+val+'" '+((post['order_specify'] && post['order_specify'].indexOf(val)!=-1)?'selected':'')+'>'+name+'</option>').appendTo(selectType);
						};
						selectType.appendTo(td);
						$('<input type="hidden" name="order_specify" value="'+post['order_specify']+'" req-col="order_specify">').appendTo(td);

					var spec_box = $('<div class="table table-mobile selectize-block hidden-master">'); spec_box.appendTo(form);
					var td = $('<div class="table-cell">'); td.appendTo(spec_box);
						td.renderSelectOptions({post:post,multi:0,none:1,label:'Проживание',col:'order_living',width:'w-100',req:1}); // +req-col
					// 	$('<label>Проживание</label>').appendTo(td);
					// 	var selectType = $('<select name="order_living" class="" req-col="order_living">'); //
					// 		$('<option value="">Не выбрано</option>').appendTo(selectType);
					// 		$('<option value="Нет">Нет</option>').appendTo(selectType);
					// 		$('<option value="Да">Да</option>').appendTo(selectType);
						// selectType.appendTo(td);
					var td = $('<div class="table-cell">'); td.appendTo(spec_box);
						td.renderSelectOptions({post:post,multi:0,none:1,label:'Национальность',col:'order_country',width:'w-100',req:1});
						// $('<label>Национальность</label>').appendTo(td);
						// var selectType = $('<select name="order_country" class="" req-col="order_country">');
						// 	$('<option value="">Не выбрано</option>').appendTo(selectType);
						// 	$('<option value="Любые">Любые</option>').appendTo(selectType);
						// 	$('<option value="Славяне">Славяне</option>').appendTo(selectType);
						// selectType.appendTo(td);
					var td = $('<div class="table-cell">'); td.appendTo(spec_box);
						$('<label>Оплата мастерам, ориентировочно</label>').appendTo(td);
						$('<input type="number" name="order_fot" class="" value="'+(post['order_fot']?post['order_fot']:'')+'" req-col="order_fot" placeholder="Сумма в рублях...">').appendTo(td);

					//
					$('<label>Комментарий cоздателя заявки</label>').appendTo(form);
					$('<textarea name="order_comment" type="text" placeholder="Бренд, выставить счет на юр, доставку до двери и т.д.">'+
						(post['order_comment']?post['order_comment']:'')+'</textarea>').appendTo(form);

					if(order_id){
						$('<label>Комментарий КЦ</label>').appendTo(form);
						$('<textarea name="order_comment_callcenter" type="text" placeholder="Бренд, выставить счет на юр, доставку до двери и т.д.">'+
							(post['order_comment_callcenter']?post['order_comment_callcenter']:'')+'</textarea>').appendTo(form);
						$('<label>Когда позвонить КЦ</label>').appendTo(form);
						$('<input name="order_date_callcenter" type="text" value="'+(post['order_date_callcenter'])+'" class="filter-date ">').appendTo(form);
						//
						$('<label>Совершена первая встреча</label>').appendTo(form);
						$('<input name="order_date_meter" type="text" value="'+(post['order_date_meter'])+'" class="filter-date">').appendTo(form);
						$('<label>Чек сделки</label>').appendTo(form);
						$('<input name="order_price" type="text" value="'+(post['order_price']?post['order_price']:0)+'">').appendTo(form);
					}

					// Таблица ФОТа по сметам
					var spec_box = $('<div class="table table-mobile selectize-block fot-master hidden-master">'); spec_box.appendTo(form);

					$('<br>').appendTo(form);
					$('<a class="btn submit">Отправить заявку</a>').appendTo(form);
				// }

				box.popup();

				updateMasterFot({lid: id});

				// Обработка / даты
				$('.filter-date').datetimepicker({
					format:'Y-m-d H:i:s',
					mask: true,
				});

				// Скрывать поля в зависимости от типа
				var updateTypeOrder = function(){
					var type_val = $('.popup-box [name="order_type"]').val();
					if(type_val=='master'){
						$('.hidden-'+type_val).show();
					} else {
						$('[class*="hidden-"]').hide();
					}
					console.log(type_val);
				};
				$('.popup-box [name="order_type"]').on('change',function(){
					updateTypeOrder();
				});
				updateTypeOrder();

				// Специализация
				$('.select-go').each(function(){
					$(this).selectize({
						maxItems : $(this).attr('multiple')?15:1,
						delimiter: ',',
						persist: false,
						labelField: "label",
						valueField: "value",
						sortField: 'label',
						searchField: 'label',
					});
				});

				// Кнопка сохранить
				var submit = $('.popup-box a.submit');
				submit.click(function(){
					// // console.log($('.popup-box form').serialize());

					// var pre = []; // Выше
					// pre['smeta_id'] = id;
					// var mas = JSON.stringify(pre);

					if($('.popup-box [name="action_order_lid"]').length)
					$('.popup-box [name="order_lid"]').val($('.popup-box [name="action_order_lid"]').val());
					// Списком выводим множественный выбор / Специализация
					$('.popup-box [name="order_specify"]').val($('.popup-box [name="action_order_specify"]').val().join(', '));
					$('.popup-box [name="order_living"]').val($('.popup-box [name="action_order_living"]').val());
					$('.popup-box [name="order_country"]').val($('.popup-box [name="action_order_country"]').val());

					// console.log($('.popup-box form').serialize());

					// Проверка
					var err = [];
					$('[req-col]').each(function(){
						var val = $(this).val();
						var name = $(this).attr('req-col');
						var title = $(this).closest('.table-cell').find('label').text() || false;
						if(!val && ($(this).is(":visible") || $(this).closest('.table-cell').find('label').is(':visible'))){
							err.push('Заполните поле '+title);
							$.message('Заполните поле <b>'+title+'</b>');
							$(this).addClass('incorrect');
						} else {
							$(this).removeClass('incorrect');
						}
					});

					if(!err || !err.length)
					$.ajax({
						method: 'POST',
						url: '/post/order_complect.php',
						data: (order_id?'order_id='+order_id+'&':'')+$('.popup-box form').serialize(), // .serializeArray(),
						success: function(data){
							// console.log(data);
							if(data.substr(0,1)=='{') data = JSON.parse(data); else { console.log(data); data = null; } 
							if(data){
								console.log(data);

								// $('.popup-close').trigger('click');
								// if(!order_id)
								// 	window.location = '/crm/'+id+'/?action=orders';

								// $.message('<h3>Заявка создана</h3>Перенаправление на страницу заявок...',5000);
							}
						}, // success
					}); // ajax

					// Сразу закрываем поле чтобы не дублить заявки
					if(!err || !err.length){
						$('.popup-close').trigger('click');
						$.message('<h3>Заявка создана</h3><a class="btn" href="/crm/'+id+'/?action=orders">К заявкам объекта</a>',5000);
					}
				}); // submit

			// } // if data order
		} // success order
	}); // ajax load order
});



// Чат в объекте
if($('select.chat-select').length){
	$('select.chat-select').each(function(){
		$(this).change(function(){
			var text = $(this).find('option:selected').text();
			var $aux = $('<select/>').append($('<option/>').text(text));
			$(this).after($aux);
			$(this).width($aux.width());
			// console.log(text,$aux.width());
			$aux.remove();
		}).change();
	});
	$('.chat-select').trigger('change'); // Первично активируем еще раз
}


// // При изменении текста, изменять форму / TODO
// if($('.chat-text').length)
// $('.chat-text').on('change',function(){
// 	var text = $(this).text();
// 	console.log(text);
// 	$('[name="info_text"]').val(text);
// });


$.dtt = function(d = '',params = []){
	var dt = new Date(d);
	var month = dt.getMonth();
	var dy = dt.getDate();
	var mt = '';
	if(!params['short']){
		if(month==0) mt = 'янв';
		if(month==1) mt = 'фев';
		if(month==2) mt = 'мар';
		if(month==3) mt = 'апр';
		if(month==4) mt = 'мая';
		if(month==6) mt = 'июн';
		if(month==7) mt = 'июл';
		if(month==8) mt = 'авг';
		if(month==9) mt = 'сен';
		if(month==10) mt = 'окт';
		if(month==11) mt = 'ноя';
	}
	return dy+' '+mt;
}


// Дату форматируем для поставления в поле datepicker для календарного выбора
$.dateToPicker = function(d = false,params = []){
	var dt = new Date(d);
	var year = dt.getFullYear();
	var month = ('0'+dt.getMonth()).slice(-2); 
	var day = dt.getDate();
	var hour = dt.getHours();
	var min = dt.getMinutes();
	var mt = '';
	var txt = year+'/'+month+'/'+day+' '+hour+':'+min;
	return txt;
}


// Выбор исполнителей

if($('[get-executor]').length)
$('[get-executor]').click(function(){
	var elem = $(this);
	var type = elem.attr('get-executor');
	var id = elem.attr('popup-id');

	$.ajax({
		method: 'POST',
		url: '/post/masters.php',
		data: 'action=list&type='+type+'&order_id='+id,
		success: function(data){
			// console.log(data);
			if(data.substr(0,1)=='{') data = JSON.parse(data); else { console.log(data); data = null; } 
			if(data){
				// console.log(data);

				var box = $('<div>');
				var form = $('<form>'); form.appendTo(box);

				var pre = [];

				// Данные из строки таблицы
				var post = [];
				elem.closest('tr').find('[name]').each(function(){
					var name = $(this).attr('name');
					post[name] = $(this).html();
				});
				// console.log(post); 

				// Разные попапы
				if(type){ // =='master'
					$('<h2 class="popup-title">Выбрать мастеров для заявки</h2>').appendTo(form);
					$('<label>Заявка</label>').appendTo(form);
					$('<input type="text" value="'+id+'" disabled>').appendTo(form);
					$('<input type="hidden" name="order_id" value="'+id+'">').appendTo(form);
					// $('<input type="hidden" name="order_type" value="'+type+'">').appendTo(form);
					//
					$('<label>Данные заявки</label>').appendTo(form);
					$('<div class="order-info">'+
						(data['order']['order_comment']?data['order']['order_comment']:'')+
						(data['order']['order_specify']?' <span class="grey">• Спец:</span> <i>'+data['order']['order_specify']+'</i>':'')+
						(data['order']['order_living']?' <span class="grey">• Прожив:</span> <i>'+data['order']['order_living']+'</i>':'')+
						(data['order']['order_country']?' <span class="grey">• Нац:</span> <i>'+data['order']['order_country']+'</i>':'')+
						(data['order']['order_fot']?' <span class="grey">• Оплата:</span> <i>'+data['order']['order_fot']+'</i>':'')+
					'</div>').appendTo(form);
					//
					var table = $('<div class="table table-mobile">').appendTo(form); table.appendTo(form);
					var td = $('<div class="table-cell">'); td.appendTo(table); 
					$('<label>Список мастеров</label>').appendTo(td);
					$('<input type="text" name="q" placeholder="Поиск по мастерам...">').appendTo(td);
					var td = $('<div class="table-cell">'); td.appendTo(table); 
					$('<label>Дата начала/встречи</label>').appendTo(td);
					$('<input name="order_date_start" type="text" value="'+(post['order_date_start'])+'" placeholder="Дата..." class="filter-date">').appendTo(td);
					var td = $('<div class="table-cell">'); td.appendTo(table);
					$('<label>Дата финиша</label>').appendTo(td);
					$('<input name="order_date_end" type="text" value="'+(post['order_date_end'])+'" placeholder="Дата..." class="filter-date">').appendTo(td);
					// Список исполнителей
					var overflow = $('<div class="master-select-box overflow-box">');
					var select = $('<div class="master-select overflow">');
					if(!data['masters']) $('<span><br>Мастера типа "'+$.order_type_names[type]+'" не найдены</span>').appendTo(select); 
					else // data['masters'].forEach(function(master){
					for(var master_id in data['masters']){
						var master = data['masters'][master_id];
						// Заявки мастера текущие
						var object_list = '';
						if(master['orders']) master['orders'].forEach(function(ord){
							object_list += '<span>#'+ord['order_lid']+' (з.'+ord['order_id']+') '+
								'c <b>'+(ord['order_date_start']?$.dtt(ord['order_date_start']):'')+'</b>'+(ord['order_date_end']?' по <b>'+$.dtt(ord['order_date_end'])+'</b>':'')+'</span><br>';
						});
						var object_history = '';
						if(master['orders_history']) master['orders_history'].forEach(function(ord){
							object_history += '<span>#'+ord['order_lid']+' (з.'+ord['order_id']+') '+
								'c <b>'+(ord['order_date_start']?$.dtt(ord['order_date_start']):'')+'</b>'+(ord['order_date_end']?' по <b>'+$.dtt(ord['order_date_end'])+'</b>':'')+'</span><br>';
						});
						//
						var option = $('<label class="master-option '+(object_list?'orange':'')+'" master-id="'+master['master_id']+'">');
						$('<input type="checkbox" value="'+master['master_id']+'" '+(master['master_checked']?'checked':'')+'>').appendTo(option);
						$('<div class="master-data">'+
							(master['master_fio']?master['master_fio']:'')+
							(master['master_country']?' <span class="grey">•</span> '+master['master_country']:'')+
							(master['master_metro']?' <span class="grey">• Метро:</span> '+master['master_metro']:'')+
							(master['master_team']?' <span class="grey">• Бриг:</span> '+master['master_team']:'')+
							(master['master_specify']?' <span class="grey">• Спец:</span> '+master['master_specify']:'')+
							(master['master_phone']?' <span class="grey">•</span> '+master['master_phone']:'')+
							(master['master_status']?' <span class="grey">•</span> '+master['master_status']:'')+
							(master['master_instr']?' <span class="grey">• Инстр:</span> '+master['master_instr']:'')+
							(master['rate_master']?' <span class="grey">•</span> <i class="ico-rate"></i>'+master['rate_master']:'')+
							(master['rate_manager']?' <span class="grey">•</span> <i class="ico-rate-blue"></i>'+master['rate_manager']:'')+
							(object_list?' <span class="grey">•</span>'+
								'<div inf="left" class="red-hot">тек: '+master['orders'].length+'<div>'+object_list+'</div></div>':'')+
							(object_history?' <span class="grey">•</span>'+
								'<div inf="left" class="green-hot">был: '+master['orders_history'].length+'<div>'+object_history+'</div></div>':'')+
							'<br><span class="grey">'+
							// (master['master_specify']?''+master['master_specify']+' • ':'')+
							(master['master_comment_hr']?''+master['master_comment_hr']:'')+
							(master['master_comment_coord']?' • '+master['master_comment_coord']:'')+
						'</div>').appendTo(option);
						option.appendTo(select);
					}//);
					select.appendTo(overflow);
					overflow.appendTo(form);
					$('<div class="master-select-result">'+
						'<span class="master-result-text">Выбраны: </span>'+
						'<span class="master-count b">0</span> шт.'+
						'<input name="order_masters" class="master-input" type="hidden">'+
						' &nbsp;<span name="master-сancel" type="text" class="min" style="color: #36c">Очистить выбор</span>'+
						' &nbsp;<span name="master-selected" type="text" class="min" style="color: #36c">Только выбранные</span>'+
					'</div>').appendTo(form);
					//

					// Таблица ФОТа по сметам
					var spec_box = $('<div class="table table-mobile selectize-block fot-master">'); spec_box.appendTo(form);

					$('<br>').appendTo(form);
					$('<a class="btn submit">Сохранить изменения</a>').appendTo(form);
				}

				box.popup();
				// ------------------- Вся обработка после создании попапа

				updateMasterFot({id: id});

				// При вводе в поиск, сортировать исполнителей
				$('.popup-box [name="q"]').on('keyup change',function(){
					var val = $(this).val();
					$('.popup-box .master-option').each(function(){
						if($(this).text().toLowerCase().indexOf(val.toLowerCase())!=-1)
							$(this).show();
						else
							$(this).hide();
					});
				});

				// Считаем что выбрано
				var updateCheckedMasters = function(){
					var ids = [];
					$('.popup-box .master-option [type="checkbox"]:checked').each(function(){
						ids.push($(this).val());
					});
					$('.master-select-result .master-input').val('['+ids.join('],[')+']');
					$('.master-select-result .master-count').html(ids.length);
				}
				$('.popup-box .master-option').on('change',function(){
					updateCheckedMasters();
				});
				updateCheckedMasters();

				// Очистить выбор
				$('.popup-box [name="master-сancel"]').click(function(){
					$('.popup-box .master-option [type="checkbox"]').prop('checked','');
					updateCheckedMasters();
				});

				// Только выборанные
				$('.popup-box [name="master-selected"]').click(function(){
					$(this).toggleClass('active');
					$('.popup-box .master-option').each(function(){
						if(!$(this).find('[type="checkbox"]').is(':checked'))
							$(this).toggleClass('hide');
					});
				});

				// Обработка дат
				$('.filter-date').datetimepicker({
					format:'Y-m-d H:i:s',
					mask: true,
				});
				// $('[name="order_date_start"]').val(post['order_date_start']);
				// $('[name="order_date_end"]').val(post['order_date_end']);

				// Кнопка сохранить
				var submit = $('.popup-box a.submit');
				submit.click(function(){
					// console.log($('.popup-box form').serialize());

					$.ajax({
						method: 'POST',
						url: '/post/masters.php',
						data: 'action=save&'+$('.popup-box form').serialize(),
						success: function(data){
							if(data.substr(0,1)=='{') data = JSON.parse(data); else { console.log(data); data = null; } 
							if(data){
								console.log(data);

								if(data['count'])
									elem.find('.isp').html('маст: '+data['count']);
								else
									elem.find('.isp').html('маст');

								$('.popup-close').trigger('click');
							}
						}, // success
					}); // ajax
				}); // submit
			} // if data success
		}, // success
	}); // ajax main

});


$.options_master = [];

$.options_master['order_living'] = {
	'Да': 'Да',
	'Нет': 'Нет',
};
$.options_master['order_country'] = {
	'Любые': 'Любые',
	'Славяне': 'Славяне',
};


$.options_master['master_specify'] = {
	'электрик': 'электрик',
	'сантехник': 'сантехник',
	'маляр': 'маляр',
	'штукатур': 'штукатур',
	'плиточник': 'плиточник',
	'гипсокартонщик': 'гипсокартонщик',
	'плотник': 'плотник',
	'каменьщик': 'каменьщик',
	'демонтажник': 'демонтажник',
	'универсал': 'универсал',
};
$.options_master['master_source'] = {
	'Авито': 'Авито',
	'HH': 'HH',
	'Юла': 'Юла',
	'Worki': 'Worki',
	'Профи': 'Профи',
	'SuperJob': 'SuperJob',
	'Директ': 'Директ',
};
$.options_master['master_instr'] = {
	'Все': 'Все',
	'Частично': 'Частично',
	'Нет': 'Нет',
};
$.options_master['master_team'] = {
	'Есть': 'Есть',
	'Нет': 'Нет',
};
$.options_master['master_country'] = {
	'РФ': 'РФ',
	'РБ': 'РБ',
	'УК': 'УК',
	'Молдова': 'Молдова',
	'Армения': 'Армения',
	'Азербайджан': 'Азербайджан',
	'Таджикистан': 'Таджикистан',
	'Туркменистан': 'Туркменистан',
	'Узбекистан': 'Узбекистан',
	'Казахстан': 'Казахстан',
	'Кыргызстан': 'Кыргызстан',
	'Грузия': 'Грузия',
	'Другое': 'Другое',
};
$.options_master['master_metro'] = {
	'Авиамоторная (КН)': 'Авиамоторная (КН)',
	'Автозаводская (ЗМ)': 'Автозаводская (ЗМ)',
	'Академическая (КР)': 'Академическая (КР)',
	'Александровский сад (ФЛ)': 'Александровский сад (ФЛ)',
	'Алма-Атинская': 'Алма-Атинская',
	'Алексеевская (КР)': 'Алексеевская (КР)',
	'Алтуфьево (СТ)': 'Алтуфьево (СТ)',
	'Андроновка': 'Андроновка',
	'Аннино (СТ)': 'Аннино (СТ)',
	'Арбатская (АП)': 'Арбатская (АП)',
	'Арбатская (ФЛ)': 'Арбатская (ФЛ)',
	'Аэропорт (ЗМ)': 'Аэропорт (ЗМ)',
	'Аминьевская': 'Аминьевская',
	'Бабушкинская (КР)': 'Бабушкинская (КР)',
	'Багратионовская (ФЛ)': 'Багратионовская (ФЛ)',
	'Баррикадная (ТК)': 'Баррикадная (ТК)',
	'Бутырская': 'Бутырская',
	'Белокаменная': 'Белокаменная',
	'Бауманская (АП)': 'Бауманская (АП)',
	'Балтийская': 'Балтийская',
	'Беговая (ТК)': 'Беговая (ТК)',
	'Белорусская (ЗМ)': 'Белорусская (ЗМ)',
	'Белорусская (КЛ)': 'Белорусская (КЛ)',
	'Боровское шоссе': 'Боровское шоссе',
	'Беляево (КР)': 'Беляево (КР)',
	'Беломорская': 'Беломорская',
	'Бибирево (СТ)': 'Бибирево (СТ)',
	'Библиотека им. Ленина (СК)': 'Библиотека им. Ленина (СК)',
	'Боровицкая (СТ)': 'Боровицкая (СТ)',
	'Ботанический сад (КР)': 'Ботанический сад (КР)',
	'Братиславская (ЛБ)': 'Братиславская (ЛБ)',
	'Бульвар адмирала Ушакова (БТ)': 'Бульвар адмирала Ушакова (БТ)',
	'Бульвар Дмитрия Донского (СТ)': 'Бульвар Дмитрия Донского (СТ)',
	'Бульвар Рокоссовского': 'Бульвар Рокоссовского',
	'Бунинская аллея (БТ)': 'Бунинская аллея (БТ)',
	'Борисово': 'Борисово',
	'Варшавская (КХ)': 'Варшавская (КХ)',
	'ВДНХ (КР)': 'ВДНХ (КР)',
	'Владыкино (СТ)': 'Владыкино (СТ)',
	'Водный стадион (ЗМ)': 'Водный стадион (ЗМ)',
	'Войковская (ЗМ)': 'Войковская (ЗМ)',
	'Волгоградский проспект (ТК)': 'Волгоградский проспект (ТК)',
	'Волжская (ЛБ)': 'Волжская (ЛБ)',
	'Волоколамская (АП)': 'Волоколамская (АП)',
	'Воробьёвы горы (СК)': 'Воробьёвы горы (СК)',
	'Верхние Лихоборы': 'Верхние Лихоборы',
	'Верхние Котлы': 'Верхние Котлы',
	'Воронцовская': 'Воронцовская',
	'Выставочная (ФЛ)': 'Выставочная (ФЛ)',
	'Выхино (ТК)': 'Выхино (ТК)',
	'Говорово': 'Говорово',
	'Динамо (ЗМ)': 'Динамо (ЗМ)',
	'Дмитровская (СТ)': 'Дмитровская (СТ)',
	'Добрынинская (КЛ)': 'Добрынинская (КЛ)',
	'Давыдково': 'Давыдково',
	'Домодедовская (ЗМ)': 'Домодедовская (ЗМ)',
	'Деловой центр': 'Деловой центр',
	'Достоевская (ЛБ)': 'Достоевская (ЛБ)',
	'Дубровка (ЛБ)': 'Дубровка (ЛБ)',
	'Жулебино': 'Жулебино',
	'ЗИЛ': 'ЗИЛ',
	'Зябликово': 'Зябликово',
	'Зюзино': 'Зюзино',
	'Измайловская (АП)': 'Измайловская (АП)',
	'Измайлово': 'Измайлово',
	'Калужская (КР)': 'Калужская (КР)',
	'Кантемировская (ЗМ)': 'Кантемировская (ЗМ)',
	'Каховская (КХ)': 'Каховская (КХ)',
	'Каширская (ЗМ)': 'Каширская (ЗМ)',
	'Каширская (КХ)': 'Каширская (КХ)',
	'Киевская (АП)': 'Киевская (АП)',
	'Киевская (КЛ)': 'Киевская (КЛ)',
	'Киевская (ФЛ)': 'Киевская (ФЛ)',
	'Китай-город (КР)': 'Китай-город (КР)',
	'Китай-город (ТК)': 'Китай-город (ТК)',
	'Кожуховская (ЛБ)': 'Кожуховская (ЛБ)',
	'Коломенская (ЗМ)': 'Коломенская (ЗМ)',
	'Комсомольская (КЛ)': 'Комсомольская (КЛ)',
	'Комсомольская (СК)': 'Комсомольская (СК)',
	'Коньково (КР)': 'Коньково (КР)',
	'Красногвардейская (ЗМ)': 'Красногвардейская (ЗМ)',
	'Краснопресненская (КЛ)': 'Краснопресненская (КЛ)',
	'Красносельская (СК)': 'Красносельская (СК)',
	'Красные ворота (СК)': 'Красные ворота (СК)',
	'Крестьянская застава (ЛБ)': 'Крестьянская застава (ЛБ)',
	'Кропоткинская (СК)': 'Кропоткинская (СК)',
	'Крылатское (АП)': 'Крылатское (АП)',
	'Кузнецкий мост (ТК)': 'Кузнецкий мост (ТК)',
	'Котельники': 'Котельники',
	'Коптево': 'Коптево',
	'Косино': 'Косино',
	'Кузьминки (ТК)': 'Кузьминки (ТК)',
	'Кунцевская (АП)': 'Кунцевская (АП)',
	'Кунцевская (ФЛ)': 'Кунцевская (ФЛ)',
	'Крымская': 'Крымская',
	'Курская (АП)': 'Курская (АП)',
	'Курская (КЛ)': 'Курская (КЛ)',
	'Кутузовская (ФЛ)': 'Кутузовская (ФЛ)',
	'Коммунарка': 'Коммунарка',
	'Ленинский проспект (КР)': 'Ленинский проспект (КР)',
	'Лермонтовский проспект': 'Лермонтовский проспект',
	'Ломоносовский проспект': 'Ломоносовский проспект',
	'Лесопарковая': 'Лесопарковая',
	'Лубянка (СК)': 'Лубянка (СК)',
	'Лихоборы': 'Лихоборы',
	'Лухмановская': 'Лухмановская',
	'Люблино (ЛБ)': 'Люблино (ЛБ)',
	'Марксистская (КН)': 'Марксистская (КН)',
	'Марьина Роща (ЛБ)': 'Марьина Роща (ЛБ)',
	'Марьино (ЛБ)': 'Марьино (ЛБ)',
	'Маяковская (ЗМ)': 'Маяковская (ЗМ)',
	'Медведково (КР)': 'Медведково (КР)',
	'Международная (ФЛ)': 'Международная (ФЛ)',
	'Менделеевская (СТ)': 'Менделеевская (СТ)',
	'Мневники': 'Мневники',
	'Мичуринский проспект': 'Мичуринский проспект',
	'Митино (АП)': 'Митино (АП)',
	'Молодежная (АП)': 'Молодежная (АП)',
	'Минская': 'Минская',
	'Мякинино (АП)': 'Мякинино (АП)',
	'Нагатинская (СТ)': 'Нагатинская (СТ)',
	'Нагорная (СТ)': 'Нагорная (СТ)',
	'Нахимовский проспект (СТ)': 'Нахимовский проспект (СТ)',
	'Новаторская': 'Новаторская',
	'Народное Ополчение': 'Народное Ополчение',
	'Новопеределкино': 'Новопеределкино',
	'Новохохловская': 'Новохохловская',
	'Новогиреево (КН)': 'Новогиреево (КН)',
	'Новокосино': 'Новокосино',
	'Новокузнецкая (ЗМ)': 'Новокузнецкая (ЗМ)',
	'Новослободская (КЛ)': 'Новослободская (КЛ)',
	'Нижегородская': 'Нижегородская',
	'Некрасовка': 'Некрасовка',
	'Новоясеневская (КР)': 'Новоясеневская (КР)',
	'Новые Черемушки (КР)': 'Новые Черемушки (КР)',
	'Октябрьская (КЛ)': 'Октябрьская (КЛ)',
	'Октябрьская (КР)': 'Октябрьская (КР)',
	'Октябрьское поле (ТК)': 'Октябрьское поле (ТК)',
	'Озерная': 'Озерная',
	'Орехово (ЗМ)': 'Орехово (ЗМ)',
	'Окская': 'Окская',
	'Окружная': 'Окружная',
	'Ольховая': 'Ольховая',
	'Отрадное (СТ)': 'Отрадное (СТ)',
	'Охотный ряд (СК)': 'Охотный ряд (СК)',
	'Павелецкая (ЗМ)': 'Павелецкая (ЗМ)',
	'Павелецкая (КЛ)': 'Павелецкая (КЛ)',
	'Парк культуры (КЛ)': 'Парк культуры (КЛ)',
	'Парк культуры (СК)': 'Парк культуры (СК)',
	'Парк Победы (АП)': 'Парк Победы (АП)',
	'Партизанская (АП)': 'Партизанская (АП)',
	'Первомайская (АП)': 'Первомайская (АП)',
	'Перово (КН)': 'Перово (КН)',
	'Петровско-Разумовская (СТ)': 'Петровско-Разумовская (СТ)',
	'Петровский парк': 'Петровский парк',
	'Печатники (ЛБ)': 'Печатники (ЛБ)',
	'Пионерская (ФЛ)': 'Пионерская (ФЛ)',
	'Планерная (ТК)': 'Планерная (ТК)',
	'Площадь Ильича (КН)': 'Площадь Ильича (КН)',
	'Площадь Революции (АП)': 'Площадь Революции (АП)',
	'Полежаевская (ТК)': 'Полежаевская (ТК)',
	'Полянка (СТ)': 'Полянка (СТ)',
	'Пражская (СТ)': 'Пражская (СТ)',
	'Прокшино': 'Прокшино',
	'Преображенская площадь (СК)': 'Преображенская площадь (СК)',
	'Пролетарская (ТК)': 'Пролетарская (ТК)',
	'Проспект Вернадского (СК)': 'Проспект Вернадского (СК)',
	'Проспект Мира (КЛ)': 'Проспект Мира (КЛ)',
	'Проспект Мира (КР)': 'Проспект Мира (КР)',
	'Профсоюзная (КР)': 'Профсоюзная (КР)',
	'Пушкинская (ТК)': 'Пушкинская (ТК)',
	'Пятницкое шоссе': 'Пятницкое шоссе',
	'Речной вокзал (ЗМ)': 'Речной вокзал (ЗМ)',
	'Рижская (КР)': 'Рижская (КР)',
	'Раменки': 'Раменки',
	'Румянцево': 'Румянцево',
	'Ростокино': 'Ростокино',
	'Рассказовка': 'Рассказовка',
	'Римская (ЛБ)': 'Римская (ЛБ)',
	'Рязанский проспект (ТК)': 'Рязанский проспект (ТК)',
	'Савеловская (СТ)': 'Савеловская (СТ)',
	'Свиблово (КР)': 'Свиблово (КР)',
	'Севастопольская (СТ)': 'Севастопольская (СТ)',
	'Семеновская (АП)': 'Семеновская (АП)',
	'Серпуховская (СТ)': 'Серпуховская (СТ)',
	'Славянский бульвар (АП)': 'Славянский бульвар (АП)',
	'Саларьево': 'Саларьево',
	'Смоленская (АП)': 'Смоленская (АП)',
	'Смоленская (ФЛ)': 'Смоленская (ФЛ)',
	'Соколиная гора': 'Соколиная гора',
	'Сокол (ЗМ)': 'Сокол (ЗМ)',
	'Стахановская': 'Стахановская',
	'Спартак': 'Спартак',
	'Стрешнево': 'Стрешнево',
	'Сокольники (СК)': 'Сокольники (СК)',
	'Спортивная (СК)': 'Спортивная (СК)',
	'Селигерская': 'Селигерская',
	'Солнцево': 'Солнцево',
	'Сретенский бульвар (ЛБ)': 'Сретенский бульвар (ЛБ)',
	'Строгино (АП)': 'Строгино (АП)',
	'Студенческая (ФЛ)': 'Студенческая (ФЛ)',
	'Сухаревская (КР)': 'Сухаревская (КР)',
	'Сходненская (ТК)': 'Сходненская (ТК)',
	'Таганская (КЛ)': 'Таганская (КЛ)',
	'Таганская (ТК)': 'Таганская (ТК)',
	'Тверская (ЗМ)': 'Тверская (ЗМ)',
	'Технопарк': 'Технопарк',
	'Театральная (ЗМ)': 'Театральная (ЗМ)',
	'Текстильщики (ТК)': 'Текстильщики (ТК)',
	'Терехово': 'Терехово',
	'Теплый Стан (КР)': 'Теплый Стан (КР)',
	'Тимирязевская (СТ)': 'Тимирязевская (СТ)',
	'Третьяковская (КН)': 'Третьяковская (КН)',
	'Третьяковская (КР)': 'Третьяковская (КР)',
	'Трубная (ЛБ)': 'Трубная (ЛБ)',
	'Тульская (СТ)': 'Тульская (СТ)',
	'Тургеневская (КР)': 'Тургеневская (КР)',
	'Тропарево': 'Тропарево',
	'Тушинская (ТК)': 'Тушинская (ТК)',
	'Улица 1905 года (ТК)': 'Улица 1905 года (ТК)',
	'Улица Академика Янгеля': 'Улица Академика Янгеля',
	'Улица Горчакова': 'Улица Горчакова',
	'Угрешская': 'Угрешская',
	'Улица Дмитриевского': 'Улица Дмитриевского',
	'Улица Скобелевская': 'Улица Скобелевская',
	'Улица Старокачаловская': 'Улица Старокачаловская',
	'Университет': 'Университет',
	'Филевский парк': 'Филевский парк',
	'Фили': 'Фили',
	'Фонвизинская': 'Фонвизинская',
	'Филатов Луг': 'Филатов Луг',
	'Фрунзенская': 'Фрунзенская',
	'Ховрино': 'Ховрино',
	'Хорошево': 'Хорошево',
	'Царицыно': 'Царицыно',
	'ЦСКА': 'ЦСКА',
	'Цветной бульвар': 'Цветной бульвар',
	'Черкизовская': 'Черкизовская',
	'Чертановская': 'Чертановская',
	'Чеховская': 'Чеховская',
	'Чистые пруды': 'Чистые пруды',
	'Чкаловская': 'Чкаловская',
	'Шаболовская': 'Шаболовская',
	'Шоссе Энтузиастов': 'Шоссе Энтузиастов',
	'Шелепиха': 'Шелепиха',
	'Шипиловская': 'Шипиловская',
	'Щелковская': 'Щелковская',
	'Щукинская': 'Щукинская',
	'Электрозаводская': 'Электрозаводская',
	'Юго-Западная': 'Юго-Западная',
	'Южная': 'Южная',
	'Юго-Восточная': 'Юго-Восточная',
	'Ясенево': 'Ясенево',
};


$.fn.renderSelectOptions = function(params = {}){
	var form = $(this);
	var spec_box = $('<div class="selectize-block">'); spec_box.appendTo(form);
	$('<label>'+params['label']+'</label>').appendTo(spec_box);
	var selectType = $('<select name="action_'+params['col']+'" '+(params['multi']?'multiple':'')+' '+
		'class="'+(!params['width']?'w-50':params['width'])+' select-go select-selectize" '+
		(params['req']?'req-col="'+params['col']+'" ':'')+
		'placeholder="'+params['label']+'...">');
	if(params['none']) $('<option value="">Не выбрано</option>').appendTo(selectType);
	if($.options_master[params['col']])
	for(var val in $.options_master[params['col']]){
		var name = $.options_master[params['col']][val];
		$('<option value="'+val+'" '+((params['post'][params['col']] && params['post'][params['col']].indexOf(val)!=-1)?'selected':'')+'>'+name+'</option>').appendTo(selectType);
	};
	selectType.appendTo(spec_box);
	$('<input type="hidden" name="'+params['col']+'" value="'+params['post'][params['col']]+'">').appendTo(form);
};

// edit-popup
if($('[edit-popup]').length)
$('[edit-popup]').click(function(){
	var elem = $(this);
	var type = elem.attr('edit-popup');
	var id = elem.attr('popup-id');

	var box = $('<div>');
	var form = $('<form>'); form.appendTo(box);
	var pre = [];

	// Данные из строки таблицы
	var post = [];
	elem.closest('tr').find('[name]').each(function(){
		var name = $(this).attr('name');
		post[name] = $(this).html();
	});

	// Разные попапы
	if(type){ // =='master'
		if(id){
			$('<h2 class="popup-title">Карточка мастера</h2>').appendTo(form);
			$('<label>ID</label>').appendTo(form);
			$('<input type="text" value="'+id+'" disabled>').appendTo(form);
			$('<input type="hidden" name="master_id" value="'+id+'">').appendTo(form);
		} else {
			$('<h2 class="popup-title">Добавление мастера</h2>').appendTo(form);
		}
		$('<label>Тип мастера</label>').appendTo(form);
		// $('<input type="text" name="master_type" value="'+type+'">').appendTo(form);
		var selectType = $('<select name="master_type" class="w-50">');
		for(var val in $.order_type_names){
			var name = $.order_type_names[val];
			$('<option value="'+val+'" '+(type==val?'selected':'')+'>'+name+'</option>').appendTo(selectType);
		};
		selectType.appendTo(form);
		// Специализация / появляется если тип мастеров
		// var spec_box = $('<div class="selectize-block">'); spec_box.appendTo(form);
		// $('<label>Специализация ремонта</label>').appendTo(spec_box);
		// var selectType = $('<select name="action_specify" multiple class="w-50 select-go select-selectize" placeholder="Выберите специализацию...">');
		// for(var val in $.options_master['master_specify']){
		// 	var name = $.options_master['master_specify'][val];
		// 	$('<option value="'+val+'" '+((post['master_specify'] && post['master_specify'].indexOf(val)!=-1)?'selected':'')+'>'+name+'</option>').appendTo(selectType);
		// };
		// selectType.appendTo(spec_box);
		// $('<input type="hidden" name="master_specify" value="'+post['master_specify']+'">').appendTo(form);
		//
		var table = $('<div class="table table-mobile">').appendTo(form); table.appendTo(form);
		var td = $('<div class="table-cell">'); td.appendTo(table);
			$('<label>День рождения</label>').appendTo(td);
			$('<input name="master_birthday" type="text" value="'+post['master_birthday']+'" class="filter-date">').appendTo(td);
		var td = $('<div class="table-cell">'); td.appendTo(table);
			$('<label>Дата собеседования</label>').appendTo(td);
			$('<input name="master_date_come" type="text" value="'+post['master_date_come']+'" class="filter-date">').appendTo(td);
		var td = $('<div class="table-cell">'); td.appendTo(table);
			$('<label>Когда позвонить</label>').appendTo(td);
			$('<input name="master_date_call" type="text" value="'+post['master_date_call']+'" class="filter-date">').appendTo(td);
		//
		var table = $('<div class="table table-mobile">').appendTo(form); table.appendTo(form);
		var td = $('<div class="table-cell">'); td.appendTo(table);
			$('<label>ФИО</label>').appendTo(form);
			$('<input type="text" name="master_fio" placeholder="ФИО..." value="'+(post['master_fio']?post['master_fio']:'')+'" class="w-50">').appendTo(form);
		var td = $('<div class="table-cell">'); td.appendTo(table);
			$('<label>Телефон</label>').appendTo(form);
			$('<input type="text" name="master_phone" placeholder="Телефон..." value="'+(post['master_phone']?post['master_phone']:'')+'">').appendTo(form);
		//
		var table = $('<div class="table table-mobile">').appendTo(form); table.appendTo(form);
		var td = $('<div class="table-cell w-30">'); td.appendTo(table);
			td.renderSelectOptions({post:post,multi:0,none:1,label:'Источник контакта',col:'master_source',width:'w-100'});
		var td = $('<div class="table-cell w-30">'); td.appendTo(table);
			td.renderSelectOptions({post:post,multi:1,none:0,label:'Специализация ремонта',col:'master_specify',width:'w-100'});
		var td = $('<div class="table-cell w-30">'); td.appendTo(table);
			td.renderSelectOptions({post:post,multi:0,none:1,label:'Инструменты',col:'master_instr',width:'w-100'});
		//
		var table = $('<div class="table table-mobile">').appendTo(form); table.appendTo(form);
		var td = $('<div class="table-cell w-30">'); td.appendTo(table);
			td.renderSelectOptions({post:post,multi:0,none:1,label:'Гражданство',col:'master_country',width:'w-100'});
		var td = $('<div class="table-cell w-30">'); td.appendTo(table);
			td.renderSelectOptions({post:post,multi:0,none:1,label:'Метро',col:'master_metro',width:'w-100'});
		var td = $('<div class="table-cell w-30">'); td.appendTo(table);
			td.renderSelectOptions({post:post,multi:0,none:1,label:'Команда/бригада',col:'master_team',width:'w-100'});
		//
		var td = $('<div class="table-cell">'); td.appendTo(table);
		$('<label>Адрес проживания</label>').appendTo(form);
		$('<input type="text" name="master_address" placeholder="Адрес проживания..." value="'+(post['master_address']?post['master_address']:'')+'" class="w-100">').appendTo(form);
		// 
		// Документы
		//
		$('<label>Комментарий HR</label>').appendTo(form);
		$('<textarea type="text" name="master_comment_hr" placeholder="Комментарий HR...">'+(post['master_comment_hr']?post['master_comment_hr']:'')+'</textarea>').appendTo(form);
		$('<label>Комментарий координации</label>').appendTo(form);
		$('<textarea type="text" name="master_comment_coord" placeholder="Комментарий координации...">'+(post['master_comment_coord']?post['master_comment_coord']:'')+'</textarea>').appendTo(form);
		//
		$('<br>').appendTo(form);
		$('<a class="btn submit">Сохранить изменения</a>').appendTo(form);
	}

	box.popup();
	// ------------------- Вся обработка после создании попапа

	// Обработка дат
	$('.filter-date').datetimepicker({
		format:'Y-m-d H:i:s',
		mask: true,
	});

	$('.select-go').each(function(){
		$(this).selectize({
			maxItems : $(this).attr('multiple')?15:1,
			delimiter: ',',
			persist: false,
			labelField: "label",
			valueField: "value",
			sortField: 'label',
			searchField: 'label',
		});
	});

	// Кнопка сохранить
	var submit = $('.popup-box a.submit');
	submit.click(function(){
		// console.log($('.popup-box form').serialize());

		// Списком выводим множественный выбор / Специализация
		$('.popup-box [name="master_specify"]').val($('.popup-box [name="action_master_specify"]').val().join(', '));
		$('.popup-box [name="master_source"]').val($('.popup-box [name="action_master_source"]').val());
		$('.popup-box [name="master_instr"]').val($('.popup-box [name="action_master_instr"]').val());
		$('.popup-box [name="master_metro"]').val($('.popup-box [name="action_master_metro"]').val());
		$('.popup-box [name="master_team"]').val($('.popup-box [name="action_master_team"]').val());
		$('.popup-box [name="master_country"]').val($('.popup-box [name="action_master_country"]').val());

		var id = $('.popup-box form').find('[name="master_id"]').val() || 0;
		if(id) $('.popup-box form').find('[name]').each(function(){
			var val = $(this).val();
			var name = $(this).attr('name');
			if(name=='master_type') val = $.order_type_names[val];
			$('[popup-box="'+id+'"]').find('[name="'+name+'"]').html(val);
		});

		$.ajax({
			method: 'POST',
			url: '/post/masters.php',
			data: 'action=edit&'+$('.popup-box form').serialize(),
			success: function(data){
				if(data.substr(0,1)=='{') data = JSON.parse(data); else { console.log(data); data = null; } 
				if(data){
					// console.log(data);

					$('.popup-close').trigger('click');
					if(!id) window.location = '/masters'; // Если добавляли нового, то обновляем страницу
				}
			}, // success
		}); // ajax
	}); // submit

});



// Переключение режима grid воронки, при нажатии на иконки вида
$('.grid-btns [type="radio"]').on('click change',function(){
	$(this).closest('form').find('[type="submit"]').trigger('click');
});



// Документы и галочки для отметки что они отсканированы
$('.documents-checking .member input[type="checkbox"]').on('change',function(){
	var elem = $(this).closest('.member');
	elem.toggleClass('on');
	var a = {
		'check': elem.hasClass('on'),
		'type': elem.attr('doc-type'),
		'id': elem.attr('doc-id'),
		'object': elem.closest('[doc-object]').attr('doc-object'),
	};
	console.log(a);
});



$('.shop-object-select').on('change',function(){
	var val = $(this).val();
	var opt = $('[lead_id="'+val+'"]');
	$('[name="adress"]').val(opt.attr('lead_address'));
	$('[name="object"]').val(opt.attr('lead_company_id'));
	$('[name="phone"]').val(opt.attr('lead_phone'));
	console.log(val);
	console.log(opt);
});



// Задачи в ленте, показывается дата
if($('.type-where .chat-select').length)
$('.type-where .chat-select').on('change',function(){
	var val = $(this).val();
	if(val=='task'){
		$('.chat-with.type-date').removeClass('hide');
		$('<option val="1" selected>Мне</option>').appendTo('.chat-with.type-for select');
	} else {
		$('.chat-with.type-date').addClass('hide');
		$('.chat-with.type-for select option[val="1"]').remove();
	}
});



})(jQuery);