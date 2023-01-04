
var documentHasScroll = function() {
    return window.innerHeight <= document.body.offsetHeight;
};
// var keepFooter = function(documentHasScroll){
//     if (!document.getElementById("layout-footer")){
//         return;
//     }
//
//     if(documentHasScroll){
//         document.getElementById("layout-footer").classList.remove('fixed-bottom');
//     }else{
//         document.getElementById("layout-footer").classList.add('fixed-bottom');
//     }
// }



$(document).ready(function() {
    let isFirefox = navigator.userAgent.search("Firefox");
    if(isFirefox > 0){
        mouseWheelEventFirefox();
    }
    svgZoom();
	/* MENU */
	$('.navbar-nav').attr('id', 'menu'); // please don't remove this line
	$( '<div class="calendar-top"></div>' ).insertBefore( "#calendar" );
	$( '<div class="card-profile-top"></div>' ).insertBefore( ".card.profile.card-profile" );
		var divs = $(".card-profiles > div");
		for(var i = 0; i < divs.length; i+=2) {
			divs.slice(i, i+2).wrapAll( '<div class="col-xs" />');
		}


	// var headerNavbar = $('#headerNavbar');
	// var width100 = $('.width100');
	// var innerWidth = $('body').innerWidth();
	// headerNavbar.width(innerWidth);
	// width100.width(innerWidth);


	$('body').on('click', '.work_packages .accordion-toggle', function () {
		if ($(this).next(".accordion-content").is(':visible')) {
			$(this).next(".accordion-content").slideUp(300);
			$(this).children(".plusminus").addClass('plus');
			$(this).children(".plusminus").removeClass('minus');
		} else {
			$(this).next(".accordion-content").slideDown(300);
			$(this).children(".plusminus").removeClass('plus');
			$(this).children(".plusminus").addClass('minus');
		}
	});

	$('.nav.nav-pills').removeAttr('id');

	$('.contact_info .card-body .body, .press-releases .card-container .body, .partners .card-profile .body').each(function(){
		var countParagraphs = $(this).find('p').length;
		if(countParagraphs > 1){
			$(this).find('p').first().append('<div class="dorsal">Read more</div>');
			$(this).find('p:not(:first)').wrapAll( "<div class='toogle-contact-paragraphs'></div>" )
		}

	});

	$('.dorsal').click(function () {
		var link = $(this);
		link.parent().parent().find('.toogle-contact-paragraphs').slideToggle('slow', function() {
			if ($(this).is(':visible')) {
				link.text('Read less');
			} else {
				link.text('Read more');
			}
		});

	});


	$('.content-wrapper.news .content img').each(function(){
		$(this).attr('id', 'myImg');
		$(this).addClass('myImages');
	});

	$('.content-wrapper.news').after('<div id=\"myModal\" class=\"modal\">\n' +
		'  <span class=\"close_modal\">&times;</span>\n' +
		'  <img class=\"modal-content\" id=\"img01\">\n' +
		'  <div id=\"caption\"></div>\n' +
		'</div>');


	// create references to the modal...
	var modal = document.getElementById('myModal');
// to all images -- note I'm using a class!
	var images = document.getElementsByClassName('myImages');
// the image in the modal
	var modalImg = document.getElementById("img01");
// and the caption in the modal
	var captionText = document.getElementById("caption");

// Go through all of the images with our custom class
	for (var i = 0; i < images.length; i++) {
		var img = images[i];
		// and attach our click listener for this image.
		img.onclick = function(evt) {
			modal.style.display = "block";
			modalImg.src = this.src;
			captionText.innerHTML = this.alt;
		}
	}

	var span = document.getElementsByClassName("close_modal")[0];
	if(span){
		span.onclick = function() {
			modal.style.display = "none";
		}
	}



});



function encodeURIObject(data){
    return Object.keys(data).map(function (i) {
        return encodeURIComponent(i) + '=' + encodeURIComponent(data[i])
    }).join('&');
}

function appendProfile() {
    $(document).on('profile', function (e) {
        var headerNavbarNav = $('#headerNavbarNav');
        var li = '<li class="nav-item"><a href="/profile" target = "_self">Profile</a></li >';
        headerNavbarNav.find('>ul').append(li);
    });
}
function appendSignIn(){
    $(document).on('signin', function (e) {
        var headerNavbarLogin = $('#headerNavbarNav');
        var li = '<li class="nav-item sign-in"><a href="/login" target = "_self">Login</a></li >';
		headerNavbarLogin.find('>ul').append(li);
		var menu = $('#menuToggle');
		menu.find('>ul').append(li);
    });
}

function appendSignOut() {
    $(document).on('signout', function (e) {
        var headerNavbarNav = $('#headerNavbarNav');
        var li = '<li class="nav-item  sign-in"><a data-request="onLogout" data-request-data="redirect: \'/\'">Logout</a></li >';
        headerNavbarNav.find('>ul').append(li);
		var menu = $('#menuToggle');
		menu.find('>ul').append(li);
    });
}

// function initAccordeon(pElem) {
// 	$('body').on('click', '.accordion-toggle', function () {
// 		if ($(this).next(".accordion-content").is(':visible')) {
// 			$(this).next(".accordion-content").slideUp(300);
// 			$(this).children(".plusminus").html('<span class="plus"></span>');
// 		} else {
// 			$(this).next(".accordion-content").slideDown(300);
// 			$(this).children(".plusminus").html('<span class="minus"></span>');
// 		}
// 	});
// }

function isBreakpointLarge() {
    return window.innerWidth <= 991;
}


function onPartners(pCode) {
    $.request('onPartners', {
        update: { 'components/partners_list': '#mycomponentpartners',
        },
        data: {
            code: pCode
        },
    }).then(response => {
        $('html, body').animate({
            scrollTop: $("#mycomponentpartners").offset().top - 100
        }, 1000);
        var tooltip = document.getElementById("tooltip");
        tooltip.classList.remove("active");

        $('.partners .card-profile .body').each(function(){
            var countParagraphs = $(this).find('p').length;
            if(countParagraphs > 1){
                $(this).find('p').first().append('<div class="dorsal">Read more</div>');
                $(this).find('p:not(:first)').wrapAll( "<div class='toogle-contact-paragraphs'></div>" )
            }

        });

        $('.dorsal').click(function () {
            var link = $(this);
            link.parent().parent().find('.toogle-contact-paragraphs').slideToggle('slow', function() {
                if ($(this).is(':visible')) {
                    link.text('Read less');
                } else {
                    link.text('Read more');
                }
            });

        });

    });
}


function zoomOut(){
    const svgImage = document.getElementById("svgImage");
    if(svgImage){
        var matrix = window.getComputedStyle(svgImage).transform;
        var matrixArray = matrix.replace("matrix(", "").split(",");
        var scaleX = parseFloat(matrixArray[0]); // convert from string to number
        if(!scaleX){
            scaleX = 1;
        }else{
            scaleX = scaleX + 0.1;
        }
        svgImage.style.transform = `scale(${scaleX})`;
    }
}
function zoomIn(){
    const svgImage = document.getElementById("svgImage");
    if(svgImage){
        var matrix = window.getComputedStyle(svgImage).transform;
        var matrixArray = matrix.replace("matrix(", "").split(",");
        var scaleX = parseFloat(matrixArray[0]); // convert from string to number
        if(!scaleX){
            scaleX = 0.9;
        }else{
            scaleX = scaleX - 0.1;
        }
        svgImage.style.transform = `scale(${scaleX})`;
        svgImage.style.overflow = `unset`;
    }
}

function svgZoom(){
    const svgImage = document.getElementById("svgImage");
    if(svgImage){
        const svgContainer = document.getElementById("svgContainer");
        var viewBox = {x:0,y:0,w:svgImage.clientWidth*1.5,h:svgImage.clientHeight*3.5};
        svgImage.setAttribute('viewBox', `${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`);
        const svgSize = {w:svgImage.clientWidth,h:svgImage.clientHeight};
        var isPanning = false;
        var startPoint = {x:0,y:0};
        var endPoint = {x:0,y:0};;
        var scale = 1;

        svgContainer.onmousewheel = function(e) {
            e.preventDefault();
            var w = viewBox.w;
            var h = viewBox.h;
            var mx = e.offsetX;//mouse x
            var my = e.offsetY;
            var dw = w*Math.sign(e.deltaY)*0.05;
            var dh = h*Math.sign(e.deltaY)*0.05;
            var dx = dw*mx/svgSize.w;
            var dy = dh*my/svgSize.h;
            viewBox = {x:viewBox.x-dx,y:viewBox.y-dy,w:viewBox.w+dw,h:viewBox.h+dh};
            scale = svgSize.w/viewBox.w;
            // zoomValue.innerText = `${Math.round(scale*100)/100}`;
            svgImage.setAttribute('viewBox', `${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`);
        }


        svgContainer.onmousedown = function(e){
            isPanning = true;
            startPoint = {x:e.x,y:e.y};
        }

        svgContainer.onmousemove = function(e){
            if (isPanning){
                endPoint = {x:e.x,y:e.y};
                var dx = (startPoint.x - endPoint.x)/scale;
                var dy = (startPoint.y - endPoint.y)/scale;
                var movedViewBox = {x:viewBox.x+dx,y:viewBox.y+dy,w:viewBox.w,h:viewBox.h};
                svgImage.setAttribute('viewBox', `${movedViewBox.x} ${movedViewBox.y} ${movedViewBox.w} ${movedViewBox.h}`);
            }
        }

        svgContainer.onmouseup = function(e){
            if (isPanning){
                endPoint = {x:e.x,y:e.y};
                var dx = (startPoint.x - endPoint.x)/scale;
                var dy = (startPoint.y - endPoint.y)/scale;
                viewBox = {x:viewBox.x+dx,y:viewBox.y+dy,w:viewBox.w,h:viewBox.h};
                svgImage.setAttribute('viewBox', `${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`);
                isPanning = false;
            }
        }

        svgContainer.onmouseleave = function(e){
            isPanning = false;
        }
    }

}




function mouseWheelEventFirefox(){

    var elem = document.getElementById('svgContainer');

    var handleWheel = function (event)
    {
        var delta = Math.max(-1, Math.min(1, event.wheelDelta || -event.detail));
        if(delta > 0){
            zoomIn();
        }else{
            zoomOut();
        }
        event.preventDefault();
    };

    var addMouseWheelEventListener = function (scrollHandler){
        if (elem.addEventListener) {
            elem.addEventListener("DOMMouseScroll", scrollHandler, false);
        }
    }

    addMouseWheelEventListener(handleWheel);

}


function init() {
    window.addEventListener('resize', function () {
        if (isBreakpointLarge()) {
            $('#card-carousel').slick('unslick');
        } else {
            if (typeof cardCarousel === 'function') {
                cardCarousel({
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    autoplay: true,
                    autoplaySpeed: 6000,
                    prevArrow: '<i class="slick-prev pr p-back"/>',
                    nextArrow: '<i class="slick-next pr p-forward"/>',
                });
             }
        }
        // keepFooter(documentHasScroll());

    });
    document.addEventListener('DOMContentLoaded', function () {
        if (!isBreakpointLarge()) {
            if (typeof cardCarousel === 'function') {
                cardCarousel({
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    autoplay: true,
                    autoplaySpeed: 6000,
                    prevArrow: '<i class="slick-prev pr p-back"/>',
                    nextArrow: '<i class="slick-next pr p-forward"/>',
                });
            }
        }
        // keepFooter(documentHasScroll());

    });
    // appendProfile()
    appendSignIn()
    appendSignOut()
}

init()
