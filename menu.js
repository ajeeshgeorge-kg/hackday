$(document).ready(function(){

    var elements = $('ul#menu > li');
    var step = Math.PI * 2 / elements.length;
    var radius = 200;

    $('a#cta').click(function(){
        showChildren( $('ul#menu') );
    });

    $('ul#menu li a').click(function(){
        selectItem( $(this).parent() );
    });

    function showChildren (parent) {
        var elements = $(parent).children('li');
        var answer = 'Male';
        for (var i = 0; i < elements.length; i++) {
        	var $this = $(elements[i]);
        	$.ajax({	
                type: 'GET',
                url: 'Getdata.php',
                data: 'page='+answer,	
                dataType: 'json',	
                success: function(data){
                	$.each(data, function(key, val) {
                		console.log(key);
                		console.log(val);
                	})
                }
        	});
        	$this.children('a').attr('href','www.google.com'); 
        	$this.children('a').prepend('<img src="images/1/1/1170500209_1.jpg" alt="Shoes" height="100" width="100">'); 
        	$(elements[i]).show().animate({
        		left: radius * Math.cos(step*i) + 'px',
        		top: radius * Math.sin(step*i) + 'px',
        	}, { duration: 800, queue: false });
        };
    }

    function selectItem (element) {
        var elements = $(element).siblings().addBack();
        for (var i = 0; i < elements.length; i++) {
            if(elements[i] == element){
                $(element).animate({
                    left: 0,
                    top: 0
                }, { duration: 800, queue: false });
            } else {
                $(elements[i]).animate({
                    left: 250 * Math.cos(step*i) + 'px',
                    top: 250 * Math.sin(step*i) + 'px',
                    opacity: 0
                }, { duration: 800, queue: false });
            }
        };
        showChildren( $(element).find('ul > li') );
    }

    // $(elements).click(function(){

    //     for (var i = 0; i < elements.length; i++) {
    //         if(elements[i] == this){
    //             $(this).animate({
    //                 left: 0,
    //                 top: 0
    //             }, { duration: 800, queue: false });
    //         } else {
    //             $(elements[i]).animate({
    //                 left: 250 * Math.cos(step*i) + 'px',
    //                 top: 250 * Math.sin(step*i) + 'px',
    //             }, { duration: 800, queue: false });
    //         }
    //     };   
    // });

});