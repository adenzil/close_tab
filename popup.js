$(function(){
	
	$('#close').on('click',function(){

		var minutes = $('#minutes').val();
		var seconds = $('#seconds').val();

		if(minutes == parseInt(minutes, 10) || seconds == parseInt(seconds, 10)){

			var totaltime = 0;

			if(minutes)
				totaltime += minutes*60*1000;

			if(seconds)
				totaltime += seconds*1000;

			chrome.tabs.query({'highlighted': true},function(tab) {
				chrome.runtime.sendMessage({timer:{'id':tab[0].id, 'title': tab[0].title, 'totaltime':totaltime}}, function(response) {
					$('#minutes').val('');
					$('#seconds').val('');
                });
			});
			

		}else{
			$('#minutes').attr("placeholder",'enter valid numbers');
			$('#seconds').attr("placeholder",'enter valid numbers');
		}

	})
})