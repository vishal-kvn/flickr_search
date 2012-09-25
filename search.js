$(document).ready( function(){

	var qstring;
	var page = 1;
    var per_page = 9;
    // var loading = 0;

 //    //the status of overlay box
	// var isOpen = false;
	// //function to display the box
	// function showOverlayBox() {
	// 	//if box is not set to open then don't do anything
	// 	if( isOpen == false ) return;
	// 	// set the properties of the overlay box, the left and top positions
	// 	$('.overlayBox').css({
	// 		display:'block',
	// 		left:( $(window).width() - $('.overlayBox').width() )/2,
	// 		top:( $(document).height() - $('.overlayBox').height() )/2 -20,
	// 		position:'absolute'
	// 	});
	// 	// set the window background for the overlay. i.e the body becomes darker
	// 	$('.bgCover').css({
	// 		display:'block',
	// 		width: $(window).width(),
	// 		height:$(window).height(),
	// 	});
	// }
	// function doOverlayOpen() {
	// 	//set status to open
	// 	isOpen = true;
	// 	showOverlayBox();
	// 	$('.bgCover').css({opacity:0}).animate( {opacity:0.5, backgroundColor:'#000'} );
	// 	// dont follow the link : so return false.
	// 	return false;
	// }
	// function doOverlayClose() {
	// 	//set status to closed
	// 	isOpen = false;
	// 	$('.overlayBox').css( 'display', 'none' );
	// 	// now animate the background to fade out to opacity 0
	// 	// and then hide it after the animation is complete.
	// 	$('.bgCover').animate( {opacity:0}, null, null, function() { $(this).hide(); } );
	// }
	// // if window is resized then reposition the overlay box
	// $(window).bind('resize',showOverlayBox);


	// // activate when the link with class launchLink is clicked
	// // $('a.launchLink').click( doOverlayOpen );
	// $("#images").delegate(".photo", "click", doOverlayOpen ); ***************


	// // close it when closeLink is clicked
	// $('a.closeLink').click( doOverlayClose );

	    //select all the a tag with name equal to modal
    $("#images").delegate(".photo", "click", function(e) {
        //Cancel the link behavior
        e.preventDefault();

        //Get the A tag
        // var id = $(this).attr('href');
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

    	// if (loading == 0){
    		if  ($(window).scrollTop() == $(document).height() - $(window).height()){
    		   // loading = 1;
	           page = page + 1;
	           search_flickr(qstring);
	           // loading = 0;


	        }
    	// }

		}
	));

});