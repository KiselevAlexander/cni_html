$(document).ready(function($) {

  $('select').styler();
	$('.che').styler();

  $('.dropdown-menu').on( 'click', 'a', function() {
    var text = $(this).html();
    var htmlText = text + ' <span class="caret"></span>';
    $(this).closest('.dropdown').find('.dropdown-toggle').html(htmlText);
  });

  /* footer drop */
  $('.f-widget h2').click(function () {
    $(this).toggleClass('f-open');
    $(this).next().toggle('slow');
     return false;
  });

  /* message click */
  $('.message-title').click(function () {
    $(this).parent().toggleClass('m-open');
    $(this).next().toggle('slow');
    $(this).prev().toggle('slow');
     return false;
  });

  /* Color change */
  $('.color-1').click(function () {
    $('.hand-new .item').addClass('color-1');
    $('.hand-new .item').removeClass('color-2 color-3 color-4 color-5 color-6 color-7');
  });
  $('.color-2').click(function () {
    $('.hand-new .item').addClass('color-2');
    $('.hand-new .item').removeClass('color-1 color-3 color-4 color-5 color-6 color-7');
  });
  $('.color-3').click(function () {
    $('.hand-new .item').addClass('color-3');
    $('.hand-new .item').removeClass('color-1 color-2 color-4 color-5 color-6 color-7');
  });
  $('.color-4').click(function () {
    $('.hand-new .item').addClass('color-4');
    $('.hand-new .item').removeClass('color-1 color-2 color-3 color-5 color-6 color-7');
  });
  $('.color-5').click(function () {
    $('.hand-new .item').addClass('color-5');
    $('.hand-new .item').removeClass('color-1 color-2 color-3 color-4 color-6 color-7');
  });
  $('.color-6').click(function () {
    $('.hand-new .item').addClass('color-6');
    $('.hand-new .item').removeClass('color-1 color-2 color-3 color-4 color-5 color-7');
  });
  $('.color-7').click(function () {
    $('.hand-new .item').addClass('color-7');
    $('.hand-new .item').removeClass('color-1 color-2 color-3 color-4 color-5 color-6');
  });

  /* Shrot */
  $('.p02-1').click(function () {
    $('.p03-3 a').removeClass('active');
    $('.p02 a').removeClass('active');
    $('.hand-new .item').removeClass('vibrano');
    $(this).addClass('active');
    $('.hand-f2, .hand-f5').addClass('vibrano');
    $('.hand-new .dspb').removeClass("dspb");
    $('.vibrano:first').addClass("dspb");
  });

  /* Middle */
  $('.p02-2').click(function () {
    $('.p03-3 a').removeClass('active');
    $('.p02 a').removeClass('active');
    $('.hand-new .item').removeClass('vibrano');
    $(this).addClass('active');
    $('.hand-f4, .hand-f7').addClass('vibrano');
    $('.hand-new .dspb').removeClass("dspb");
    $('.vibrano:first').addClass("dspb");
  });

  /* Long */
  $('.p02-3').click(function () {
    $('.p03-3 a').removeClass('active');
    $('.p02 a').removeClass('active');
    $('.hand-new .item').removeClass('vibrano');
    $(this).addClass('active');
    $('.hand-f3, .hand-f6').addClass('vibrano');
    $('.hand-new .dspb').removeClass("dspb");
    $('.vibrano:first').addClass("dspb");
  });

  /* Quadrate */
  $('.p03-1').click(function () {
    $('.p03 a').removeClass('active');
    $(this).addClass('active');
    $('.hand-f4, .hand-f5, .hand-f6, .hand-d4, .hand-d5, .hand-d6').removeClass('vibrano');
    $('.hand-f2, .hand-f3, .hand-f4, .hand-d2, .hand-d3, .hand-d4').addClass('vibrano');
    $('.hand-new .dspb').removeClass("dspb");
    $('.vibrano:first').addClass("dspb");
  });
  /* Oval */
  $('.p03-2').click(function () {
    $('.p03 a').removeClass('active');
    $(this).addClass('active');
    $('.hand-f2, .hand-f3, .hand-f4, .hand-d2, .hand-d3, .hand-d4').removeClass('vibrano');
    $('.hand-f4, .hand-f5, .hand-f6, .hand-d4, .hand-d5, .hand-d6').addClass('vibrano');
    $('.hand-new .dspb').removeClass("dspb");
    $('.vibrano:first').addClass("dspb");
  });

  /* almond */
  $('.p03-3').click(function () {
    $('.p02 a').removeClass('active');
    $('.p03 a').removeClass('active');
    $('.hand-new .item').removeClass('vibrano');
    $(this).addClass('active');
    $('.hand-f1').addClass('vibrano');
    $('.hand-new .dspb').removeClass("dspb");
    $('.vibrano:first').addClass("dspb");
  });

  /* Matoviy */
  $('.matov').click(function (){
    $('.mass').attr('src', function(i,e){
      return e.replace("mask.png","mask_.png");
    })
  });

  /* other-design */
  $('.other-design').owlCarousel({
    items:6,
    animateOut:'fadeOut',
    loop:false,
		navText:false,
		dots:false,
    margin:0,
    nav:true,
    touchDrag:false,
    mouseDrag:false,
    responsiveClass:true,
    responsive:{
      320:{items:3},
      768:{items:6},
      1024:{items:6},
      1140:{items:6}
    }
	});


  /* primerochka */
  $('.primerochka').owlCarousel({
    items:1,
    animateOut:'fadeOut',
    loop:false,
		navText:false,
		dots:false,
    margin:0,
    nav:false,
    touchDrag:false,
    mouseDrag:false,
    URLhashListener:true,
    startPosition: 'URLHash'
	});

/*	primerochka - final */
  $('.hand-c').owlCarousel({
    items:1,
    animateOut:'fadeOut',
    loop:false,
		navText:false,
		dots:false,
    margin:0,
    nav:true,
    URLhashListener:true,
    startPosition: 'URLHash'
	});

  /* Carousel nav  */
  $('.mobile-nav ul').owlCarousel({
    items:1,
    loop:true,
		navText: false,
		dots: false,
    margin:30,
    nav:true
	});

	/* Carousel recomendation  */
  $('.recomendation-items').owlCarousel({
    items:4,
    loop:true,
		navText: false,
		dots: false,
    margin:40,
    nav:true,
    responsiveClass:true,
    responsive:{
      320:{items:1,nav:false},
      768:{items:2},
      1024:{items:3},
      1140:{items:4}
    }
	});

	/* other-cource caurosel */
	var owl = $('.other-cource-caurosel').owlCarousel({
    items:4,
    loop:true,
		navText: false,
		dots: false,
    margin:40,
    nav:true,
    responsiveClass:true,
    responsive:{
      320:{items:1,nav:false},
      768:{items:2},
      1024:{items:3},
      1140:{items:4}
    }
	});
	/* animate filter */
	var owlAnimateFilter = function(even) {
		$(this)
		.addClass('__loading')
		.delay(70 * $(this).parent().index())
		.queue(function() {
			$(this).dequeue().removeClass('__loading')
		})
	}

	$('.btn-filter-wrap').on('click', '.btn-filter', function(e) {
		var filter_data = $(this).data('filter');
		/* return if current */
		if($(this).hasClass('btn-active')) return;
		/* active current */
		$(this).addClass('btn-active').siblings().removeClass('btn-active');
		/* Filter */
		owl.owlFilter(filter_data, function(_owl) {
			$(_owl).find('.item').each(owlAnimateFilter);
		});
	});


  /* drop in list */
  $('.list-group-sortable').sortable({
    placeholderClass: 'list-group-item'
  });

  /* mask change time */
  $(".mtime").mask("99:99",{placeholder:" "});

  /* like counter portfolio */
  var likecounter = 136;
  $(".like").click(function(){
    likecounter++;
    $(this).text(likecounter);
  });

  /* delete portfolio */
  $('.del').click(function () {
    $(this).parents('.item').remove();
    return false;
  });

  $("#add-portfolio").fileinput({
    showPreview: false,
    showUpload: false,
    elErrorContainer: '#kartik-file-errors',
    allowedFileExtensions: ["jpg", "png", "gif"]
    //uploadUrl: '/site/file-upload-single'
  });

  /* header stick */
  $( 'header' ).on( 'affix.bs.affix', function(){
    if( !$( window ).scrollTop() ) return false;
  });

});



