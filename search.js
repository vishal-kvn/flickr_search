$(document).ready( function(){

	var qstring;
	var page = 1;
    var per_page = 9;
 
    $("#images").delegate(".photo", "click", function(e) {
        //Cancel the link behavior
        e.preventDefault();

        var id = $("#dialog");

        //Get the screen height and width
        var maskHeight = $(document).height();
        var maskWidth = $(window).width();

        //Set heigth and width to mask to fill up the whole screen
        $('#mask').css({
            'width': maskWidth,
            'height': maskHeight
        });

        //transition effect             
        $('#mask').fadeIn(1000);
        $('#mask').fadeTo("slow", 0.8);

        //Get the window height and width
        var winH = $(window).height();
        var winW = $(window).width();

        //Set the popup window to center
        $(id).css('top', winH / 2 - $(id).height() / 2);
        $(id).css('left', winW / 2 - $(id).width() / 2);

        //transition effect
        $(id).fadeIn(2000);

    });

    //if close button is clicked
    $('.window .close').click(function(e) {
        //Cancel the link behavior
        e.preventDefault();

        $('#mask').hide();
        $('.window').hide();
    });


	
	$("form").submit(function() {

		qstring = $("input:first").val();
		$("#images").html("");

		search_flickr(qstring);

      	return false;
    });

    function search_flickr(qstring) {

    	console.log(qstring);
    	console.log(page);
    	console.log(per_page);

    	var url = "http://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=84a525f920a32e032c05eaae4e98a718&text=" + qstring + "&per_page=" + per_page + "&page=" + page + "&extras=url_n"

		var src;
		$.getJSON(url + "&format=json&jsoncallback=?", function(data){
			if (data.stat == "ok"){
				$.each(data.photos.photo, function(i,item){
		        $("<img/>").attr("src", item.url_n).addClass("photo").appendTo("#images");
		    	});	
			}
			else {
				alert("Error occured while loading photos");
			}
		    
		});
    }

    $(window).scroll($.debounce(50 , function(){

    		if  ($(window).scrollTop() == $(document).height() - $(window).height()){
	           page = page + 1;
	           search_flickr(qstring);
	        }

		}
	));

});