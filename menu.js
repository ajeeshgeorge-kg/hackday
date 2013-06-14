$(window).ready(function(){

    var radius = 250;

    var state = {
        'gender' : [],
        'style' : [],
        'substyle' : [],
        'colour' : [],
        'product' : [],
        'accessory' : []
    };

    var jsonData = $.parseJSON('{"style":{"guy":{"Casual":{},"Formal":{},"Trainers":{},"Boots":{}},"girl":{"Courts":{"Mid Heel":{},"Peep Toes":{},"High Heel":{},"Stiletto":{},"Platforms":{},"Wedges":{},"Low Heel":{}},"Sandals":{"Flats":{"3536300109":{},"3554500109":{},"3562300109":{},"3632200339":{},"3653300799":{},"3654201979":{},"3681300979":{},"3681500979":{},"3681600979":{},"3706000209":{},"3732500109":{},"3839400309":{},"3839900759":{},"3840600209":{},"3842400109":{},"3849900979":{},"3860900979":{},"3901800979":{}},"Low Heels":{},"Wedges":{},"Mid Heels":{},"Espadrilles":{},"High Heels":{},"Platforms":{},"Occasion":{}},"Occasion":{},"Flats":{},"Platforms":{},"Trainers":{},"Boots":{}}},"colour":{"BEIGE":"#d4be8f","BLACK":"black","BLUE":"#276bb4","BROWN":"#70462e","CAMEL":"#b8945a","CREAM":"#f2ead5","GOLD":"#ebca3f","GREEN":"#11772d","GREY":"#8f8d92","METALLIC":"#b7b7b7","NAVY":"#191e56","NUDE":"#ddcbbf","ORANGE":"#fe5e00","PINK":"#ff94ca","RED":"#ed1b24","SILVER":"#818181","TAN":"#e1ce96","TAUPE":"#cec5a6","WHITE":"white","YELLOW":"#fef102"},"accessory":{"2761685999":{},"3198335999":{},"3637808979":{},"3742857979":{},"3840361429":{},"3920464459":{},"4098161559":{}}}');

    var productOffset = 0;
    var productLimit = 6;

    function showChildren (parent) {
        var elements = $(parent).children('li');
        var step = Math.PI * 2 / elements.length;

        for (var i = 0; i < elements.length; i++) {
            var x = Math.round ( radius * Math.cos(step*i) );
            var y = Math.round ( radius * Math.sin(step*i) );
            $(elements[i])
                .css('display', 'block')
                .animate({
                    left: x + 'px',
                    top: y + 'px',
                    opacity: 1
                }, { duration: 800, queue: false })
            ;
        };
    }

    function selectItem (element) {
        var elements = $(element).siblings().addBack();
        var step = Math.PI * 2 / elements.length;

        var selectType = $(element).children('a').data('type');
        var selectValue = $(element).children('a').data('value');

        state[selectType].push(selectValue);

        if(selectType == 'accessory'){
            $(element).animate({
                left: 0,
                top: 0
            }, { duration: 800, queue: false });
        } else {
            for (var i = 0; i < elements.length; i++) {
                if(elements[i] == element[0]){
                    $(element).animate({
                        left: 0,
                        top: 0
                    }, { duration: 800, queue: false });
                } else {
                    // var x = Math.round ( (radius + 50) * Math.cos(step*i) );
                    // var y = Math.round ( (radius + 50) * Math.sin(step*i) );
                    // $(elements[i]).animate({
                    //     left: x + 'px',
                    //     top: y + 'px',
                    //     opacity: 0
                    // }, { duration: 800, queue: false });

                    $(elements[i]).fadeOut();
                }
            };

            $('li').filter(':animated').promise().done(function() {
                createChildren( selectType, $(element) );
                showChildren( $(element).children('ul') );
            });
        }
    }

    function createChildren (selectType, element) {
        if (selectType == 'gender') {
            var level = 'style';
            var centreText = 'First off select the sort of shoe you\'d like.';
            var html = '<ul>';
            $.each( jsonData['style'][state.gender], function(key, value){
                html += '<li><a href="#" data-type="style" data-value="' + key + '" class="style"><span class="text">' + key + '</span></a></li>';
            });
            html += '</ul>';
        } else if (selectType == 'style') {
            var level = 'substyle';
            var centreText = 'Select the style you\'re looking for.';
            var html = '<ul>';
            $.each( jsonData['style'][state.gender][state.style], function(key, value){
                html += '<li><a href="#" data-type="substyle" data-value="' + key + '" class="substyle"><span class="text">' + key + '</span></a></li>';
            });
            html += '</ul>';
        } else if (selectType == 'substyle') {
            var level = 'colour';
            var centreText = 'Now, choose what colour you\'d like the shoe in.';
            var html = '<ul>';
            $.each( jsonData['colour'], function(key, value){
                html += '<li><a href="#" data-type="colour" data-value="' + key + '" class="colour" style="background-color:' + value + ';">' + key + '</a></li>';
            });
            html += '</ul>';
        } else if (selectType == 'colour') {
            var level = 'product';
            var centreText = 'Here\'s some shoes we think might be what you\'re looking for, select one.';
            var html = '<ul>';
            var items = jsonData['style'][state.gender][state.style][state.substyle];
            var count = Object.keys(items).length;
            var i = 0;
            $.each( items, function(key, value){
                i++;
                if (i == productLimit && i < count ) {
                    productOffset =
                    html += '<li><a href="#" data-type="colour" data-value="' + state.colour + '" class="more product-more"><span class="text">View More</span></a></li>';
                    return false;
                };
                html += '<li><a href="#" data-type="product" data-value="' + key + '" class="product" style="background-image:url(\'product/' + key + '.jpg\');">' + key + '</a></li>';
            });
            html += '</ul>';
        } else if (selectType == 'product') {
            var level = 'accessory';
            var centreText = 'Here\'s a selection of accessories that would look great with your selected shoe, select some.<a href="#" class="done">I\'m done</a>';
            var html = '<ul>';
            var items = jsonData['accessory'];
            var count = Object.keys(items).length;
            var i = 0;
            $.each( items, function(key, value){
                i++;
                if (i == productLimit && i < count ) {
                    productOffset =
                    html += '<li><a href="#" data-type="product" data-value="' + state.product[0] + '" class="more accessory-more"><span class="text">View More</span></a></li>';
                    return false;
                };
                html += '<li><a href="#" data-type="accessory" data-value="' + key + '" class="accessory" style="background-image:url(\'accessory/' + key + '.jpg\');">' + key + '</a></li>';
            });
            html += '</ul>';
        };

        $('#centre').attr('class', level)
            .children('.text').html(centreText);

        $(element).append(html);
    }

    function populateCentre () {
        
    }

    $('ul#menu li').on('click', 'a', function(event){
        event.preventDefault();
        selectItem( $(this).parent() );
    });

    $('#centre').on('click', 'a.done', function(event){
        $(this).fadeOut('fast');
        $('ul#menu').fadeOut('slow');
        $('#centre').delay(500).fadeOut('slow');
    });

    setTimeout(function (){
        $('#centre').fadeIn('slow');
        showChildren( $('ul#menu') );
    }, 1000);
});