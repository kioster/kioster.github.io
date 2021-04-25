$(function(){
	$.ajax({
		url: 'dataset/indexItems',
		success: function(data) {
			console.log(data);
			var template;

			$.ajax({
				url: 'templates/item.html',
				success: function(data) {
					template = $(data);
				},
				dataType: 'html',
				async: false
			});

			for (var i = 0; i < data.length; i++) {
				template.appendTo('#main-content').append(data[i].title);
			}
		},
		dataType: 'json'
	})
	
});