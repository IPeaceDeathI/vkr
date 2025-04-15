(function(){

$('.menu-mobile-btn').click(function(){
	$('.menu-desktop').toggleClass('desktop').toggleClass('mobile');
});


// ==================================================
// === LIKES === */
// ==================================================

$('.like').click(function(){
	var elem = $(this);
	var box = elem.closest('.report-box');
	var id = box.attr('report_id');
	$.ajax({
		method: 'POST',
		url: '/post/like_set.php',
		data: 'like_mid='+id+'&like_type=report',
		success: function(data){
			console.log(data);
			if(data=='like_add'){
				elem.text(parseInt(elem.text())+1);
			} else if(data=='like_delete'){
				elem.text(parseInt(elem.text())-1);
			}
			elem.toggleClass('like-my');
		},
	});
});


// ==================================================
// === COMMENTS === */
// ==================================================

$('.report-comments textarea').click(function(){
	var elem = $(this);
	var box = elem.closest('.report-box');
	elem.attr('rows','3');
	box.find('.add-comment').removeClass('hide');
});

$('.add-comment').click(function(){
	var elem = $(this);
	var box = elem.closest('.report-box');
	var id = box.attr('report_id');
	var text = box.find('.report-comments textarea').val();
	// console.log(text);
	if(id!=0)
	$.ajax({
		method: 'POST',
		url: '/post/comment_add.php',
		data: 'comment_mid='+id+'&comment_type=report&comment_text='+text,
		success: function(data){
			console.log(data);
			if(data=='comment_add'){
				box.find('.report-comments textarea').val('');
				$('<div class="comment-box"><div class="comment-user">Вы написали:</div><div class="comment-date">Только что</div><div class="comment-text">'+text+'</div></div>').appendTo(box.find('.report-comments-box'));
			} 
			// else if(data=='comment_delete'){
			// 	elem.text(parseInt(elem.text())-1);
			// }
		},
	});
});


// ==================================================
// === EDIT MY REPORTS === */
// ==================================================

$('.report-edit-btn').click(function(){
	var elem = $(this);
	var box = elem.closest('.report-box');
	var id = box.attr('report_id');
	console.log('report-edit-btn');
	// box.find('.report-text').replaceWith(); // заменить элементы, на заметку
	box.find('.report-text').addClass('hide');
	box.find('.report-text-edit').removeClass('hide').val(box.find('.report-text').text());
	// img
	var uploadBox = $('<div class="upload-box photos-edit-box">');
	$('<a class="upload-btn btn mini" name="profile_upload_photo">Прикрепить фото</a>')
		.click(function(){
			$(this).closest('.report-box').find('[type="file"]').trigger('click');
		}).appendTo(uploadBox);
	$('<input add-in-list="report_photos" type="file" class="hide" />')
		.on('change', function() {
			$(this).funcBtnUpload();
		}).appendTo(uploadBox);
	var photosOver = $('<div class="overflow overflow-photos-mini">').appendTo(uploadBox);
	var photosBox = $('<div class="photos-list overflow-box"></div>').appendTo(photosOver);
	var photos_list = [];
	if(box.find('.report-photos.photos-list').length){
		box.find('.report-photos.photos-list img, .report-photos.photos-list video').each(function(){
			var src = $(this).attr('src');
			var new_elem = '';
			if(src.toLowerCase().indexOf('mov')!=-1 || src.toLowerCase().indexOf('mp4')!=-1)
				new_elem = $('<video src="'+src+'">');
			else
				new_elem = $('<img src="'+src+'">');
			new_elem.click(function(){
				if(confirm('Вы уверены что хотите открепить этот файл от отчета?')){
					$(this).remove();
				}
			}).appendTo(photosBox);
			photos_list.push(src);
		});
	} else box.find('.report-text-edit').after('<div class="report-photos photos-list">');
	console.log(photos_list);
	$('<input name="report_photos" type="text" class="hide" />').val(photos_list.join(', ')).appendTo(uploadBox);
	box.find('.report-photos.photos-list').hide().before(uploadBox);
	// 
	// <div class="upload-box">
	// 	<a class="upload-btn btn mini" name="profile_upload_photo">Прикрепить фото</a>
	// 	<input add-in-list="report_photos" type="file" class="hide" />
	// 	<div class="overflow overflow-photos-mini">
	// 		<div class="photos-list overflow-box">
	// 			...
	// 		</div>
	// 	</div>
	// 	<input name="report_photos" type="text" class="hide" />
	// </div>
	//
	box.find('.report-edit-cancel').removeClass('hide');
	box.find('.report-edit-save').removeClass('hide');
	box.find('.report-edit-btn').addClass('hide');
	box.find('.report-text').attr('contenteditable','true');
	box.find('.report-text-cut').remove();
	box.find('.report-goals').addClass('hide');
	box.find('.show-full-text').remove();
});
$('.report-edit-save').click(function(){
	var elem = $(this);
	var box = elem.closest('.report-box');
	var id = box.attr('report_id');
	var text = box.find('.report-text-edit').val();
	// img real list val // Вместо: var photos = box.find('[name="report_photos"]').val();
	var photos_list = [];
	box.find('.photos-list.overflow-box img, .photos-list.overflow-box video').each(function(){
		var src = $(this).attr('src');
		photos_list.push(src);
	});
	var photos = photos_list.join(', ');
	// img
	$('.report-photos.photos-list').show();
	$('.photos-edit-box').remove();
	$('.report-photos.photos-list').html('');
	if(photos!='') photos.split(', ').forEach(function(src){
		if(src.toLowerCase().indexOf('mov')!=-1 || src.toLowerCase().indexOf('mp4')!=-1)
			$('<video src="'+src+'">').appendTo('.report-photos.photos-list');
		else
			$('<img src="'+src+'">').appendTo('.report-photos.photos-list');
	});
	//
	box.find('.report-text').removeClass('hide').text(text);
	box.find('.report-text-edit').addClass('hide');
	$.ajax({
		method: 'POST',
		url: '/post/report_edit.php',
		data: 'report_id='+id+'&report_text='+text+'&report_photos='+photos,
		success: function(data){
			console.log(data);
			if(data=='report_edit'){
				console.log('report_edit_success!');
			}
		},
	});
	//
	box.find('.report-text').attr('contenteditable','false'); // TODO: edit form delete
	box.find('.report-edit-save').addClass('hide');
	box.find('.report-edit-cancel').addClass('hide');
	box.find('.report-edit-btn').removeClass('hide');
	box.find('.report-goals').removeClass('hide');
});
$('.report-edit-cancel').click(function(){
	var elem = $(this);
	var box = elem.closest('.report-box');
	var id = box.attr('report_id');
	console.log('report-edit-cancel');
	//
	box.find('.report-text').removeClass('hide');
	box.find('.report-text-edit').addClass('hide');
	// img
	box.find('.report-photos.photos-list').show();
	box.find('.photos-edit-box').remove();
	//
	box.find('.report-text').attr('contenteditable','false');  // TODO: edit form delete
	box.find('.report-edit-save').addClass('hide');
	box.find('.report-edit-cancel').addClass('hide');
	box.find('.report-edit-btn').removeClass('hide');
	box.find('.report-goals').removeClass('hide');
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
	    var file_data = $(this).prop('files')[0];   
	    var form_data = new FormData();                  
	    form_data.append('file', file_data);
	    box.find('[type="file"]').val('');
	    // console.log(form_data);                             
	    $.ajax({
	        url: 'post/upload.php',
	        dataType: 'text',
	        cache: false,
	        contentType: false,
	        processData: false,
	        data: form_data,                         
	        type: 'post',
	        success: function(data){
	            console.log(data); //
	            if(data=='upload_error'){ alert('Ошибка загрузки данного файла'); }
            	else
	            if(data.indexOf('.')!=-1)
	            if(box.length && box.find('[add-in-list]').length){
					var directName = box.find('[add-in-list]').attr('add-in-list');
					var value = box.find('[name="'+directName+'"]').val() || '';
					if(value.length>2) value += ', ';
					value += data;
					box.find('[name="'+directName+'"]').val(value);
					// console.log(value);
					// Обновляем картинки на основе input
					var input_value = box.find('[name="'+directName+'"]').val() || '';
					var formats_img = ['jpg','jpeg','png','gif'];
					var formats_video = ['mov','mp4'];
					// box.find('.photos-list').html('');
					// if(input_value) input_value.split(', ').forEach(function(src){
						var src = data;
						var format = src.split('.')[src.split('.').length-1];
						if(checkIncludes(src,formats_img))
							$('<img src="'+src+'">').click(function(){
								if(confirm('Вы уверены что хотите открепить этот файл от отчета?')){
									$(this).remove();
									// upd val input
									var photos_list = [];
									box.find('.photos-list.overflow-box img, .photos-list.overflow-box video').each(function(){
										var src = $(this).attr('src');
										photos_list.push(src);
									});
									box.find('[name="report_photos"]').val(photos_list.join(', '));
								}
							}).appendTo(box.find('.photos-list'));
						else if(checkIncludes(src,formats_video))
							$('<video src="'+src+'" controls>').click(function(){
								if(confirm('Вы уверены что хотите открепить этот файл от отчета?')){
									$(this).remove();
									// upd val input
									var photos_list = [];
									box.find('.photos-list.overflow-box img, .photos-list.overflow-box video').each(function(){
										var src = $(this).attr('src');
										photos_list.push(src);
									});
									box.find('[name="report_photos"]').val(photos_list.join(', '));
								}
							}).appendTo(box.find('.photos-list'));
						// console.log(src);
					// });
							// if(box.find('.report-photos.photos-list').length){
								// box.find('.report-photos.photos-list img, .report-photos.photos-list video').each(function(){
								// 	var src = $(this).attr('src');
								// 	// TODO: if video
								// 	$('<img src="'+src+'">')
								// 		.click(function(){
								// 			if(confirm('Вы уверены что хотите удалить это изображение из отчета?')){
								// 				$(this).remove();
								// 				// // TODO: пересчет
								// 				// var updateList = [];
								// 				// box.find('.report-photos.photos-list img').each(function(){
								// 				// 	updateList.push($(this).attr('src'));
								// 				// });
								// 				// box.find('[name="report_photos"]').val(updateList.join(', '));
								// 				// console.log('upd: '+updateList.join(', '));
								// 			}
								// 		}).appendTo(photosBox);
								// 	photos_list.push(src);
								// });
							// } else $('.report-text-edit').after('<div class="report-photos photos-list">');
	            } else {
		            $('.profile-photo').html('<img src="'+data+'">');
					if(data!='upload_error'){
						$.ajax({
							method: 'POST',
							url: '/post/user_photo_add.php',
							data: 'user_photo='+data,
						});
					} else console.log('upload_error');
	            }
	        }
	     });
	};
$('[type="file"]').on('change', function() {
	$(this).funcBtnUpload();
});


// ==================================================
// === CUT TEXT / SHOW HIDDEN === */
// ==================================================

$('.report-text-cut, .show-full-text').click(function() {
	var box = $(this).closest('.report-box');
	var id = box.attr('report_id');
	box.find('.report-text').removeClass('hide');
	box.find('.report-text-cut').remove();
	box.find('.show-full-text').remove();
	box.find('.report-text-cut').click(function(){});
	//
	box.find('.report-bar .views').text(parseInt(box.find('.report-bar .views').text())+1);
	$.ajax({
		method: 'POST',
		url: '/post/report_view.php',
		data: 'report_id='+id,
	});
	$.ajax({
		method: 'POST',
		url: '/post/report_view_user.php',
		data: 'view_mid='+id+'&view_type=report',
	});
});



// ==================================================
// === ALL COMMENTS / SHOW HIDDEN === */
// ==================================================

$('.show-all-comments').click(function() {
	var elem = $(this);
	var box = elem.closest('.report-box');
	box.find('.comment-box').removeClass('hide');
	elem.remove();
});



// ==================================================
// === SHOW REPORT TRACKERS === */
// ==================================================

$('.show-all-trackers').click(function() {
	var elem = $(this);
	var box = elem.closest('.report-box');
	box.find('.goal-wrapper-list').removeClass('hide');
	elem.remove();
});


// ==================================================
// === GOALS === */
// ==================================================

$('.goal-box.editing').click(function(){
	var box = $(this).closest('.goal-box');
	var id = box.attr('goal-id');
	var name = box.find('label').text();
	var new_name = prompt('Введите новое название трекера "'+name+'"');
	if(new_name){
		if(new_name.length>24){
			alert('Название трекера слишком длинное. Используйте не саму формулировну цели, а название действия для отслеживания (заработок, тренировка, знакомства, вес и т.д.) - обычно это 1-3 слова, не нужно указывать переодичность и конкретику');
		} else
		$.ajax({
			method: 'POST',
			url: '/post/goal_edit.php',
			data: 'goal_id='+id+'&goal_name='+new_name,
			success: function(data){
				console.log(data);
				box.find('label').text(new_name);
			},
		});
	}
});


$('.goal-box.editing-count').click(function(){
	var box = $(this).closest('.goal-box');
	var id = box.attr('done-id');
	var type = box.attr('done-type');
	var name = box.find('label').text();
	var old_value = box.find('.count.goal-result').text();
	var new_value = 0;
	var check = false;
	if(type=='day'){
		if(confirm('Вы дейстительно хотите изменить значение трекера "'+name+'" за выбранный день на противоположное?')){
			if(parseInt(old_value)==0) new_value = 1;
			if(parseInt(old_value)==1) new_value = 0;
			check = true;
		}
	} else {
		new_value = prompt('Введите новое значение трекера "'+name+'" за выбранный день');
		check = true;
	}
	if(check && (new_value || new_value==0)){
		// if(new_value!=0 && (''+parseInt(new_value)).length!=(''+new_value).length){
		// 	alert('Нужно ввести целое число');
		// } 
		// console.log('done_id='+id+'&done_count='+new_value);
		// else
		$.ajax({
			method: 'POST',
			url: '/post/goal_edit_count.php',
			data: 'done_id='+id+'&done_count='+new_value,
			success: function(data){
				console.log(data);
				if(data=='done_count_edit'){
					alert('Треккер успешно изменен');
					box.find('.count.goal-result').text(new_value);
				} 
			},
		});
	}
});


	// if($('.phone-check').length){
	// 	var phone_sms_sec = undefined;
	// 	var phone_check_code = Math.floor(Math.random()*9000+1000);
	// 	var begin_sec = 9;
	// 	var sec = begin_sec;
	// 	var func_check_phone = function(){
	// 		if(sec==begin_sec || sec==0){
	// 			var elem = $('.phone-check');
	// 			var form = elem.closest('form');
	// 			$('.phone-code-box').removeClass('hide');
				
	// 			var s = {
	// 				text: 'Код для регистрации: '+phone_check_code,
	// 				phone: form.find('[name="phone"]').val(),
	// 			};
	// 			if(s.phone.length>=10 || s.phone.length<=11){
	// 				// $.ajax({
	// 				// 	method: 'POST',
	// 				// 	url: 'https://ya7772@yandex.ru:AviNvfBnxIp4sKry0eSWVXI8oRW@gate.smsaero.ru/v2/sms/send?number='+s.phone+'&text='+s.text+'&sign=RepTar.ru&channel=DIRECT',
	// 				// 	// body: 'number='+s.phone+'&text='+s.text+'&sign=RepTar.ru&channel=DIRECT',
	// 				// 	// headers: { 'Content-Type': "application/x-www-form-urlencoded;charset=utf-8" },
	// 				// 	success: function(data_sms){
	// 				// 		console.log(data_sms);
	// 				// 	},
	// 				// });
	// 				console.log('send sms',sec);
	// 			}
	// 			sec = begin_sec;
	// 			phone_sms_sec = setInterval(function(){
	// 				if(sec>0){
	// 					if(sec<10) sec_text = '0'+sec; else sec_text = sec;
	// 					$('.phone-check').text('Выслать еще 0:'+(sec_text));
	// 				}
	// 				else {
	// 					clearInterval(phone_sms_sec);
	// 					$('.phone-check').text('SMS еще раз');
	// 					// .click(func_check_phone);
	// 					sec = begin_sec+1;
	// 				}
	// 				sec--;
	// 			},1000);
	// 		}
	// 	};
	// 	$('.phone-check').click(func_check_phone);
	// }

})(jQuery);