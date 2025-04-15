// (function(){
! function(e){
	
	console.log('telegrand.js');

	window.telg = function(data){
		console.log(data);
		// $.ajax({
		// 	method: 'POST',
		// 	url: '//data-archive.ru/telegrand.php',
		// 	data: data,
		// 	success: function(data){ 
		// 		if(data.substr(0,1)=='{') data = JSON.parse(data); else data = null;
		// 		if(data){
		// 			console.log(data);
		// 		}
		// 	}
		// });

		$.ajax({
			method: 'POST',
			url: 'https://remfy.ru/post/telegrand.php',
			data: data,
			success: function(data){ 
				if(data.substr(0,1)=='{') data = JSON.parse(data); else data = null;
				if(data){
					console.log(data);
				}
			}
		});
	}




}([function(e, t, n) {
	console.log('func2_call');
	// console.log(e,t,n);
}]);
// })(jQuery);