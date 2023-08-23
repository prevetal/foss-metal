$(function(){
	// Основной слайдер на главной
	$('.main_slider .slider').owlCarousel({
		items: 1,
		margin: 0,
		nav: true,
		dots: false,
		loop: true,
		smartSpeed: 750,
		autoplay: true,
		autoplayTimeout: 5000,
		navText: [
			'<svg><use xlink:href="#ic_arr_left" /></svg>',
			'<svg><use xlink:href="#ic_arr_right" /></svg>'
		]
	})


	// Карусель статей
	$('.articles .slider').owlCarousel({
		loop: true,
		nav: true,
		dots: false,
		smartSpeed: 500,
		navText: [
			'<svg><use xlink:href="#ic_arr_left" /></svg>',
			'<svg><use xlink:href="#ic_arr_right" /></svg>'
		],
		responsive: {
	        0:{
	            items: 1,
				margin: 15
	        },
	        480:{
	            items: 2,
				margin: 15
	        },
	        768:{
	            items: 2,
				margin: 20
	        },
	        1024:{
	            items: 3,
				margin: 20
	        },
	        1180:{
	            items: 3,
				margin: 33
	        }
		},
		onInitialized: function(event){
			articleHeight($(event.target), $(event.target).find('.article').size())
		},
		onResized: function(event){
			articleHeight($(event.target), $(event.target).find('.article').size())
		}
	})


	// Каталог продукции
	$('body').on('click', '.cats_wall .more button', function(e) {
	    e.preventDefault()

	    let parent = $(this).closest('.cats_wall')

	    if( $(this).hasClass('active') ) {
	    	$(this).removeClass('active')

	    	parent.find('.cat.hide').removeClass('show')
	    } else {
	    	$(this).addClass('active')

	    	parent.find('.cat.hide').addClass('show')
	    }
	})


	// Список товаров
	$('body').on('click', '.products .more button', function(e) {
	    e.preventDefault()

	    let parent = $(this).closest('.products')

	    if( $(this).hasClass('active') ) {
	    	$(this).removeClass('active')

	    	parent.find('tr.hide').removeClass('show')
	    } else {
	    	$(this).addClass('active')

	    	parent.find('tr.hide').addClass('show')
	    }
	})


	// Удаление товара из корзины
	$('body').on('click', '.cart_info table td.delete button', function(e) {
	    e.preventDefault()

	    let parent = $(this).closest('tr')

	    parent.remove()

	    updateCartPrice()
	})


	// Фильтр
	$('body').on('click', '.filter .item .name', function(e) {
		e.preventDefault()

		if( $(this).hasClass('active') ) {
			$(this).removeClass('active')
			$(this).next().slideUp(300)
		} else {
			$(this).addClass('active')
			$(this).next().slideDown(300)
		}
	})


	$('body').on('click', 'aside .mob_filter_link', function(e) {
		e.preventDefault()

		if( $(this).hasClass('active') ) {
			$(this).removeClass('active')
			$(this).next().slideUp(300)
		} else {
			$(this).addClass('active')
			$(this).next().slideDown(300)
		}
	})
})


$(window).load(function(){
	// Выравнивание элементов в сетке
	$('.cats_wall .flex').each(function(){
		catsWallHeight($(this), parseInt($(this).css('--cats_wall_count')))
	})

	$('.cats_list .flex').each(function(){
		catsListHeight($(this), parseInt($(this).css('--cats_list_count')))
	})

	$('.articles .flex').each(function(){
		articleHeight($(this), parseInt($(this).css('--articles_count')))
	})
})



$(window).resize(function(){
	// Выравнивание элементов в сетке
	$('.cats_wall .flex').each(function(){
		catsWallHeight($(this), parseInt($(this).css('--cats_wall_count')))
	})

	$('.cats_list .flex').each(function(){
		catsListHeight($(this), parseInt($(this).css('--cats_list_count')))
	})

	$('.articles .flex').each(function(){
		articleHeight($(this), parseInt($(this).css('--articles_count')))
	})
})



// Выравнивание категорий
function catsWallHeight(context, step){
	let start = 0
	let finish = step
	let cats = context.find('.cat')

	cats.find('.main').height('auto')

	for( let i = 0; i < cats.length; i++ ){
		let obj = cats.slice(start, finish).find('.main')

		setHeight( obj )

		start = start+step
		finish = finish+step
	}
}


function catsListHeight(context, step){
	let start = 0
	let finish = step
	let cats = context.find('.cat')

	cats.find('.name').height('auto')

	for( let i = 0; i < cats.length; i++ ){
		let obj = cats.slice(start, finish).find('.name')

		setHeight( obj )

		start = start+step
		finish = finish+step
	}
}


// Выравнивание статей
function articleHeight(context, step){
	let start = 0
	let finish = step
	let articles = context.find('.article')

	articles.find('.name').height('auto')

	for( let i = 0; i < articles.length; i++ ){
		let obj = articles.slice(start, finish).find('.name')

		setHeight( obj )

		start = start+step
		finish = finish+step
	}
}