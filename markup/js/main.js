"use strict";
$(function(){
	/*** CHECK WIDTH ***/
	function if_mobile(){
		if($(window).width()<760) return true;
	}
	function if_tab(){
		if($(window).width()<1001) return true;
	}

	/*** side bar bavi slider ***/
    $('.aside_navi_slider').each(function(){
        var $this = $(this);
        $this.data('linkedEl', $this.bxSlider({
            auto: true,
            controls: true,
            pager: false,
            pause: 6500,
            autoHover: true,
            speed:500,
            adaptiveHeight: true
        }));
    })


    if(if_tab()){
	    $('.aside_testimonial_list').each(function(){
	        var $this = $(this);
	        $this.data('linkedEl', $this.bxSlider({
	            auto: true,
	            controls: true,
	            pager: false,
	            pause: 6500,
	            autoHover: true,
	            speed:500,
	            adaptiveHeight: true
	        }));
	    })
    }


	/*** CUSTOM CHECKBOX ***/
      $('.cC').click(function(e){
	    e.preventDefault();
	    if($(this).find(':radio')) $("input[name='"+$(this).find('input').attr('name')+"']").prop('checked', false).parents('.cC').removeClass('checked');
	    	$(this).toggleClass('checked').find('input').click()
	  	}).each(function(){
       	if($(this).find('input').is(':checked')) $(this).addClass('checked')
      })

      $('.cC input').click(function(e){
        e.stopPropagation()
      })


      $('.tabs_controls>*').click(function(e){
      	e.preventDefault();
      	$(this).addClass('on').siblings().removeClass('on');
      	$(this).parents('.tabs').find('.tab:eq('+$(this).index()+')').addClass('on').siblings().removeClass('on');
      }).first().click();



	/*** MISC ACCORDION ***/
      $('.acc_h').click(function(e){
      	e.preventDefault();
      	$(this).parents('.acc').toggleClass('opened').find('.acc_c').slideToggle();
      })

      $('.acc_h a').click(function(e){
      	e.stopPropagation();
      })


	/*** FOCUSING THE SEARCH BAR  ***/
	$('.page_header_search input').focus(function(){
		$(this).parents('.page_header_search').addClass('focus')
	}).blur(function(){
		$(this).parents('.page_header_search').removeClass('focus')
	})

	/*** DROP MENUS ***/
	$('.page_header_location_actual').click(function(e){
		e.preventDefault();
		e.stopPropagation();
		$('[data-navi-type="city_navi"]').slideToggle().siblings('[data-navi-type]').slideUp();
		$('html').toggleClass('navicalled')
	})
	$('.page_navigation_toggle').click(function(e){
		e.preventDefault();
		e.stopPropagation();
		if(if_mobile()){
			$(this).toggleClass('clicked');
			$('.page_navigation_in').slideToggle();
		}
		else{
			$('[data-navi-type="full_navi"]').slideToggle().siblings('[data-navi-type]').slideUp();
			$('html').toggleClass('navicalled')
		}
	})
	$('[data-navi-type]').click(function(e){
		e.stopPropagation();
	})
	$('html').click(function(e){
		e.preventDefault()
		if($(this).hasClass('navicalled')){
			$('[data-navi-type]').slideUp();
			$('html').removeClass('navicalled')	
		}
	})

	/*** CUSTOM SELECT  ***/
	$.widget( "custom.curselect", $.ui.selectmenu, {
      _renderItem: function( ul, item ) {
        ul.addClass('cs_select_short_ul');
        var li = $( "<li>", { text: item.label } );
        return li.appendTo( ul );
      }
    });
    $( ".curselect" ).curselect().curselect('widget').addClass('cs_select_short_btn');


    $('.bank_address_units').jScrollPane();
    $('.output_scrl').jScrollPane();

    $('.rated').each(function(){
    	var cf=1;
    	if($(this).parents('.rate').hasClass('rate10')) {cf=2};
    	$(this).width(parseInt($(this).parents('.rate').width()/5*parseFloat($(this).text())/cf)+'px');
    })


	/*** PRICE SELECTION  ***/
      $( ".sum_selection" ).each(function(){
        $(this).slider({
          range: "min",
          min: $(this).data('min'),
          max: $(this).data('max'),
          value: $(this).data('min'),
          slide: function( event, ui ) {
              $(this).parents('.sum_ammount_select').find('input[type="text"]').val(ui.value);
          },
		    create: function(event, ui){

		        $(this).slider('value',parseInt($(this).parents('.sum_ammount_select').find('input[type="text"]').val()));
		    }
        });
      })

jpg_compare();





})

function moveOverlay(amt){
	var overlay=$('.over_jpg'), current=parseInt(overlay.css('top'));
	overlay.css('top',current+amt)
}

function jpg_compare(){
	var img=$('body').attr('data-over-src') || 'images/over.jpg';
	$('body').append('<div class="over_jpg" style="background-image:url('+img+')"></div>')
	$('body').on("click",".over_jpg",function(){
	  $(this).toggleClass('h');
	})

	$(document).bind("keypress", function(e) {
	  if(e.which==17){
	    $('.over_jpg').toggle();
	  }
	  if(e.which==44){
	    moveOverlay(-1)
	  }
	  if(e.which==46){
	    moveOverlay(1)
	  }
	  if(e.which==60){
	    moveOverlay(-10)
	  }
	  if(e.which==62){
	    moveOverlay(10)
	  }
	  if(e.which==109){
	    moveOverlay(-100)
	  }
	  if(e.which==47){
	    moveOverlay(100)
	  }
	});
}