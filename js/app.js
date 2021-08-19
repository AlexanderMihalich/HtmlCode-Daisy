function headerDark() {
	const main = document.querySelector("#main");
	const header = document.querySelector("#header");
	
	window.addEventListener('scroll', function () {
		let scrollTop = document.documentElement.scrollTop;

		if (scrollTop >= (main.offsetHeight - header.offsetHeight*1.1)) {
			header.classList.add("dark");
		} else {
			header.classList.remove("dark");
		}
	});
}
headerDark();

new WOW().init();

var ua = window.navigator.userAgent;
var msie = ua.indexOf("MSIE ");
var isMobile = { Android: function () { return navigator.userAgent.match(/Android/i); }, BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); }, iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); }, Opera: function () { return navigator.userAgent.match(/Opera Mini/i); }, Windows: function () { return navigator.userAgent.match(/IEMobile/i); }, any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); } };
function isIE() {
	ua = navigator.userAgent;
	var is_ie = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
	return is_ie;
}
if (isIE()) {
	document.querySelector('body').classList.add('ie');
}
if (isMobile.any()) {
	document.querySelector('body').classList.add('_touch');
}
//=================
function testWebP(callback) {
	var webP = new Image();
	webP.onload = webP.onerror = function () {
		callback(webP.height == 2);
	};
	webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}
testWebP(function (support) {
	if (support == true) {
		document.querySelector('body').classList.add('_webp');
	} else {
		document.querySelector('body').classList.add('_no-webp');
	}
});
//=================
function ibg() {
	if (isIE()) {
		let ibg = document.querySelectorAll("._ibg");
		for (var i = 0; i < ibg.length; i++) {
			if (ibg[i].querySelector('img') && ibg[i].querySelector('img').getAttribute('src') != null) {
				ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
			}
		}
	}
}
ibg();
if (document.querySelector('.wrapper')) {
	document.querySelector('.wrapper').classList.add('_loaded');
}
let unlock = true;
//=================
let iconMenu = document.querySelector(".icon-menu");
if (iconMenu != null) {
	let delay = 500;
	let menuBody = document.querySelector(".menu__body");
	iconMenu.addEventListener("click", function (e) {
		if (unlock) {
			body_lock(delay);
			iconMenu.classList.toggle("_active");
			menuBody.classList.toggle("_active");
		}
	});
};
function menu_close() {
	let iconMenu = document.querySelector(".icon-menu");
	let menuBody = document.querySelector(".menu__body");
	iconMenu.classList.remove("_active");
	menuBody.classList.remove("_active");
}
//=================
function body_lock(delay) {
	let body = document.querySelector("body");
	if (body.classList.contains('_lock')) {
		body_lock_remove(delay);
	} else {
		body_lock_add(delay);
	}
}
function body_lock_remove(delay) {
	let body = document.querySelector("body");
	if (unlock) {
		let lock_padding = document.querySelectorAll("._lp");
		setTimeout(() => {
			for (let index = 0; index < lock_padding.length; index++) {
				const el = lock_padding[index];
				el.style.paddingRight = '0px';
			}
			body.style.paddingRight = '0px';
			body.classList.remove("_lock");
		}, delay);

		unlock = false;
		setTimeout(function () {
			unlock = true;
		}, delay);
	}
}
function body_lock_add(delay) {
	let body = document.querySelector("body");
	if (unlock) {
		let lock_padding = document.querySelectorAll("._lp");
		for (let index = 0; index < lock_padding.length; index++) {
			const el = lock_padding[index];
			el.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
		}
		body.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
		body.classList.add("_lock");

		unlock = false;
		setTimeout(function () {
			unlock = true;
		}, delay);
	}
}
//=================
let headerSearch = document.querySelectorAll('.header');
for (let i = 0; i < headerSearch.length; i++) {
	const header = headerSearch[i];
	const topOffset = header.offsetHeight;

	const yakors = header.querySelectorAll(".menu__link");
	for (let i = 0; i < yakors.length; i++) {
		const yakor = yakors[i];

		yakor.addEventListener("click", function (e) {
			const dataSaersh = yakor.dataset.scroll.substring(1);
			const scrollTarget = document.getElementById(dataSaersh);

			const elementPosition = scrollTarget.getBoundingClientRect().top;
			const offsetPosition = elementPosition - topOffset;
			window.scrollBy({
				top: offsetPosition,
				behavior: 'smooth'
			})
			e.preventDefault();
		});

		window.addEventListener('scroll', function () {
			const elementId = yakor.dataset.scroll;
			const idPosition = document.querySelector(elementId).offsetTop;
			const idHeight = document.querySelector(elementId).offsetHeight;

			const scroll = document.documentElement.scrollTop;
			(scroll > idPosition - topOffset * 1.1 && scroll < (idPosition + idHeight - topOffset * 1.1)) ? addClass(i) : removeClass(i);

			function addClass(k) {
				yakor.classList.remove('_active');
				yakors[k].classList.add('_active');
			}
			function removeClass(k) {
				yakors[k].classList.remove('_active');
			}
		});
	}
}
//=================
let btnArrows = document.querySelectorAll('.arrow');
for (let i = 0; i < btnArrows.length; i++) {
	let btnArrow = btnArrows[i];
	btnArrow.addEventListener('click', function (e) {
		e.preventDefault();

		const href = this.getAttribute('href').substring(1);
		const scrollTarget = document.getElementById(href);

		const topOffset = document.querySelector('.header').offsetHeight;

		const elementPosition = scrollTarget.getBoundingClientRect().top;
		const offsetPosition = elementPosition - topOffset;

		window.scrollBy({
			top: offsetPosition,
			behavior: 'smooth'
		})
	});
}
//=================
const filtItem = document.querySelectorAll('.filter__item');
const filtCard = document.querySelectorAll('.item');

filtItem.forEach(event => {
	event.addEventListener('click', () => {
		filtItem.forEach(item => {
			item.classList.remove('_active');
		});
		event.classList.add('_active');

		const currentCategory = event.dataset.filter;
		filter(currentCategory, filtCard);
	})
})
function filter(category, blocks) {
	blocks.forEach(block => {
		const isItemFiltered = block.classList.contains(category);
		const isShowAll = category.toLowerCase() == 'all';

		if (!isItemFiltered && !isShowAll) {
			block.classList.add('anime');
			block.classList.add('hide');
		} else {
			block.classList.remove('anime');
			block.classList.remove('hide');
		}
	})
}
filtCard.forEach((card) => {
	card.ontransitionend = function () {
		if (card.classList.contains('anime')) card.classList.add('hide');
	}
})
//=================
let gallery = document.querySelectorAll('._gallery');
if (gallery) {
	gallery_init();
}
function gallery_init() {
	for (let index = 0; index < gallery.length; index++) {
		const el = gallery[index];
		lightGallery(el, {
			counter: false,
			selector: 'a',
			download: false
		});
	}
}
//=================
function _interplayClasses(els, el, class_name) {
	for (var i = 0; i < els.length; i++) {
		let el = els[i];
		el.classList.remove(class_name);
	}
	el.classList.add(class_name);
}
//========================================
function _wrap(el, wrapper) {
	el.parentNode.insertBefore(wrapper, el);
	wrapper.appendChild(el);
}
//========================================
function _removeClasses(el, class_name) {
	for (var i = 0; i < el.length; i++) {
		el[i].classList.remove(class_name);
	}
}
(function () {
	if (!Element.prototype.closest) {
		// реализуем
		Element.prototype.closest = function (css) {
			var node = this;
			while (node) {
				if (node.matches(css)) return node;
				else node = node.parentElement;
			}
			return null;
		};
	}
})();
(function () {
	if (!Element.prototype.matches) {
		Element.prototype.matches = Element.prototype.matchesSelector ||
			Element.prototype.webkitMatchesSelector ||
			Element.prototype.mozMatchesSelector ||
			Element.prototype.msMatchesSelector;
	}
})();
let sliders = document.querySelectorAll('._swiper');
if (sliders) {
	for (let i = 0; i < sliders.length; i++) {
		let slider = sliders[i];
		if (!slider.classList.contains('swiper-bild')) {
			let slider_items = slider.children;
			if (slider_items) {
				for (let k = 0; k < slider_items.length; k++) {
					let el = slider_items[k];
					el.classList.add('swiper-slide');
				}
			}
			let slider_content = slider.innerHTML;
			let slider_wrapper = document.createElement('div');
			
			
			slider_wrapper.classList.add('swiper-wrapper');
			slider_wrapper.innerHTML = slider_content;
			slider.innerHTML = '';
			slider.appendChild(slider_wrapper);
			slider.classList.add('swiper-bild');

			let sliderPaggingContainer = document.createElement('div')
			sliderPaggingContainer.classList.add('slider__pagging');
			let sliderPaggingPrev = document.createElement('div');
			let sliderPaggingNext = document.createElement('div');
			sliderPaggingPrev.classList.add('swiper-button-prev');
			sliderPaggingNext.classList.add('swiper-button-next');
			sliderPaggingNext.classList.add('reviews__paging swiper-pagination');
			sliderPaggingContainer.append(sliderPaggingPrev, sliderPaggingNext);
			slider_wrapper.after(sliderPaggingContainer);
		}
		if (slider.classList.contains('_gallery')) {
			//slider.data('lightGallery').destroy(true);
		}
	}
	sliders_bild_callback();
}

function sliders_bild_callback(params) { }

let slider_ps = new Swiper('.slider', {

	slidesPerView: 1,
	autoHeight: true,
	speed: 800,
	
	// Arrows
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
	
});
