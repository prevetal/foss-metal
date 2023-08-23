$(function(){
	// Проверка браузера
	if ( !supportsCssVars() ) {
		$('body').addClass('lock')
		$('.supports_error').addClass('show')
	}


	// Ленивая загрузка
	setTimeout(function(){
		observer = lozad('.lozad', {
			rootMargin: '200px 0px',
			threshold: 0,
			loaded: function(el) {
				el.classList.add('loaded')
			}
		})

		observer.observe()
	}, 200)


	// Установка ширины стандартного скроллбара
	$(':root').css('--scroll_width', widthScroll() +'px')


	// Кнопка 'Вверх'
	$('body').on('click', '.buttonUp button', function(e) {
		e.preventDefault()

		$('body, html').stop(false, false).animate({
			scrollTop: 0
		}, 1000)
	})


	// Маска ввода
	$('input[type=tel]').inputmask('+7 (999) 999 - 99 - 99')

	// Кастомный select
	$('select').niceSelect()

	// Фокус при клике на название поля
	$('body').on('click', '.form .label', function() {
    	$(this).closest('.line').find('.input, textarea').focus()
	})

	// Выбор файла
	$('body').on('change', '.form input[type=file]', function(e) {
    	$(this).closest('.line').find('.path').text( $(this).val() )
	})


	// Fancybox
	$.fancybox.defaults.hash = false
	$.fancybox.defaults.touch = false
	$.fancybox.defaults.backFocus = false
	$.fancybox.defaults.autoFocus = false
	$.fancybox.defaults.animationEffect = 'zoom'
	$.fancybox.defaults.transitionEffect = 'slide'
	$.fancybox.defaults.speed = 500
	$.fancybox.defaults.gutter = 40
	$.fancybox.defaults.i18n = {
		'en' : {
			CLOSE: "Закрыть",
			NEXT: "Следующий",
			PREV: "Предыдущий",
			ERROR: "Запрошенный контент не может быть загружен.<br /> Пожалуйста, повторите попытку позже.",
			PLAY_START: "Запустить слайдшоу",
			PLAY_STOP: "Остановить слайдшоу",
			FULL_SCREEN: "На весь экран",
			THUMBS: "Миниатюры",
			DOWNLOAD: "Скачать",
			SHARE: "Поделиться",
			ZOOM: "Увеличить"
		}
	}

	// Всплывающие окна
	$('body').on('click', '.modal_link', function(e) {
		e.preventDefault()

		$.fancybox.close(true)

		$.fancybox.open({
			src  : $(this).data('content'),
			type : 'inline'
		})
	})

	// Увеличение картинки
	$('.fancy_img').fancybox()


	// Изменение количества товара
	$('body').on('click', '.amount .minus', function(e) {
	    e.preventDefault()

	    let parent = $(this).closest('.amount')
	    let input = parent.find('.input')
	    let inputVal = parseFloat( input.val() )
	    let minimum = parseFloat( input.data('minimum') )
	    let step = parseFloat( input.data('step') )
	    let unit = input.data('unit')

	    if( inputVal > minimum ){
	    	input.val( inputVal-step+unit )
	    }

	    if( $(this).hasClass('update_price') ){
	    	let _self = $(this)

			setTimeout(function(){
				updateCartPrice( _self.parents('tr') )
			}, 10)
	    }
	})

	$('body').on('click', '.amount .plus', function(e) {
	    e.preventDefault()

	    let parent = $(this).closest('.amount')
	    let input = parent.find('.input')
	    let inputVal = parseFloat( input.val() )
	    let maximum = parseFloat( input.data('maximum') )
	    let step = parseFloat( input.data('step') )
	    let unit = input.data('unit')

	    if( inputVal < maximum ){
	    	input.val( inputVal+step+unit )
	    }

	    if( $(this).hasClass('update_price') ){
	    	let _self = $(this)

			setTimeout(function(){
				updateCartPrice( _self.parents('tr') )
			}, 10)
	    }
	})

	$('body').on('keydown', '.input.update_price', function() {
		let _self = $(this)

		setTimeout(function(){
			updateCartPrice( _self.parents('tr') )
		}, 10)
	})


	// Мини всплывающие окна
	firstClick = false

	$('.mini_modal_link').click(function(e){
	    e.preventDefault()

	    let modalId = $(this).data('modal-id')

	    if( $(this).hasClass('active') ){
	        $(this).removeClass('active')
	      	$('.mini_modal').removeClass('active')

	        firstClick = false

			if( is_touch_device() ){
				$('body').css('cursor', 'default')
			}
	    }else{
	        $('.mini_modal_link').removeClass('active')
	        $(this).addClass('active')

	        $('.mini_modal').removeClass('active')
	        $(modalId).addClass('active')

	        firstClick = true

			if( is_touch_device() ){
				$('body').css('cursor', 'pointer')
			}
	    }
	})

	// Закрываем всплывашку при клике за её пределами
	$(document).click(function(e){
	    if ( !firstClick && $(e.target).closest('.mini_modal').length == 0 ){
	        $('.mini_modal, .mini_modal_link').removeClass('active')

			if( is_touch_device() ){
				$('body').css('cursor', 'default')
			}
	    }

	    firstClick = false
	})


	// Аккордион
	$('body').on('click', '.accordion .item .title', function(e) {
		e.preventDefault()

		let parent = $(this).closest('.item')
		let accordion = $(this).closest('.accordion')

		if( parent.hasClass('active') ) {
			parent.removeClass('active')
			parent.find('.data').slideUp(300)
		} else {
			accordion.find('.item').removeClass('active')
			accordion.find('.data').slideUp(300)

			parent.addClass('active')
			parent.find('.data').slideDown(300)
		}
	})


	// Моб. меню
	$('body').on('click', '.mob_header .mob_menu_link', function(e) {
    	e.preventDefault()

		$(this).addClass('active')
		$('body').addClass('lock')
		$('header').addClass('show')
		$('.overlay').fadeIn(300)
    })

	$('body').on('click', 'header .close, .overlay', function(e) {
    	e.preventDefault()

    	$('.mob_header .mob_menu_link').removeClass('active')
		$('body').removeClass('lock')
		$('header').removeClass('show')
		$('.overlay').fadeOut(300)
    })


    if( is_touch_device() ){
    	$('header .menu .item > a.sub_link').addClass('touch_link')

    	$('body').on('click', 'header .menu .item > a.sub_link', function(e) {
    		if( $(this).next().css('visibility') == 'hidden' ) {
	    		e.preventDefault()

				$('header .menu .sub_menu').removeClass('show')

				$(this).next().addClass('show')
    		}
	    })
    }
})



$(window).scroll(function(){
	// Кнопка 'Вверх'
	if( $(window).scrollTop() > $(window).innerHeight() ) {
		$('.buttonUp').fadeIn(300)
	} else {
		$('.buttonUp').fadeOut(200)
	}
})



// Вспомогательные функции
function updateCartPrice(context){
	let totalCartPrice = 0

	if(context) {
		let price = parseFloat(context.find('.price:not(.total)').data('price'))
		let amount = parseInt(context.find('.amount .input').val())
		let totalPrice = price*amount

		context.find('.price.total').text( totalPrice.toLocaleString(undefined, {minimumFractionDigits: 2}) )
	}

	$('.cart_info table tbody .price.total').each(function(){
		totalCartPrice = (totalCartPrice + parseFloat( $(this).text().replace(",",".").replace(/\s+/g, '') ))
	})

	$('.cart_info .total_price span').text( totalCartPrice.toLocaleString(undefined, {minimumFractionDigits: 2}) )
}


function setHeight(className){
    let maxheight = 0
    let object = $(className)

    object.each(function() {
    	let elHeight = $(this).innerHeight()

        if( elHeight > maxheight ) {
        	maxheight = elHeight
        }
    })

    object.innerHeight( maxheight )
}


function is_touch_device() {
	return !!('ontouchstart' in window)
}


function widthScroll() {
    let div = document.createElement('div')
    div.style.overflowY = 'scroll'
    div.style.width = '50px'
    div.style.height = '50px'
    div.style.visibility = 'hidden'
    document.body.appendChild(div)

    let scrollWidth = div.offsetWidth - div.clientWidth
    document.body.removeChild(div)

    return scrollWidth
}


var supportsCssVars = function() {
    var s = document.createElement('style'),
        support

    s.innerHTML = ":root { --tmp-var: bold; }"
    document.head.appendChild(s)
    support = !!(window.CSS && window.CSS.supports && window.CSS.supports('font-weight', 'var(--tmp-var)'))
    s.parentNode.removeChild(s)

    return support
}