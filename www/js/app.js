var picApp = angular.module('picApp', ['ui.router']);

picApp.config(function($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/");
  //
  // Now set up the states
  $stateProvider
    .state('/', {
      url: "/",
      templateUrl: "main.html"
    })
});

picApp.directive('a', function() {
    return {
        restrict: 'E',
        link: function(scope, elem, attrs) {
            if(attrs.ngClick || attrs.href === '' || attrs.href === '#'){
                elem.on('click', function(e){
                    e.preventDefault();
                });
            }
        }
   };
});

picApp.controller('IndexCtrl', function($scope, $http){

	

	$scope.init = function(){
		$scope.icons = [
			{
				image : 'eco.svg',
				title: 'Экологически безопасная печать',
				desc: 'Полностью безвредно для здоровья',
				link: '#'
			},
			{
				image: 'delivery.svg',
				title: 'БЫСТРАЯ ДОСТАВКА КУРЬЕРОМ В РУКИ',
				desc: 'Или другим удобным для вас способом',
				link: '#'
			},
			{
				image: 'stars.svg',
				title: 'Предложения для любимых клиентов',
				desc: 'Станьте им прямо сейчас',
				link: '#'
			},
			{
				image: 'smile.svg',
				title: 'ВЕРНЕМ ДЕНЬГИ (ЕСЛИ НЕ ПОНРАВИТСЯ)',
				desc: 'да, вы все равно останетесь довольны',
				link: '#'
			},
			{
				image: 'like.svg',
				title: 'ОПЛАТА ПРОДУКЦИИ ПРИ ПОЛУЧЕНИИ',
				desc: 'Или другим удобным для вас способом',
				link: '#'
			},
			{
				image: 'sunmoon.svg',
				title: 'КРУГЛОСУТОЧНО И БЕЗ ВЫХОДНЫХ',
				desc: 'Беспрерывно принимаем ваши заказы',
				link: '#'
			}
		];

		$scope.items = [
			{
				image : 'images/item1.jpg',
				title : 'Срочно в номер',
				desc : 'Мы печатаем на идеально настроенном и самом современном японском плоттере',
				foto : 'images/foto51.png',
				name : 'Юлия, 30 лет',
				text : '«НЕ ЗНАЮ, ЧТО В PICS 2 PICS МНЕ НРАВИТСЯ БОЛЬШЕ — СВЕТОВАЯ СКОРОСТЬ ИЗГОТОВЛЕНИЯ ИЛИ ЦВЕТОВОЙ ОХВАТ ИХ ЛЕГЕНДАРНОГО ПЕЧАТНОГО ОБОРУДОВАНИЯ)»' 
			},
			{
				image : 'images/item3.jpg',
				title : '12 ЦВЕТОВ РАДУГИ',
				desc : 'ПРЕДЛАГАЕМ МАССУ ВАРИАНТОВ ХУДОЖЕСТВЕННОЙ ОБРАБОТКИ ВАШЕГО ФОТО',
				foto : 'images/foto4.png',
				name : 'Анастасия, 28 лет',
				text : '«ДИЗАЙНЕРЫ PICS 2 PICSЗАСТАВИЛИ МЕНЯ ОТКАЗАТЬСЯ ОТ УКОРЕНЕННЫХ СТЕРЕОТИПОВ И ПОВЕРИТЬ В ВОЛШЕБСТВО. КОЛИЧЕСТВУ ВАРИАНТОВ КАЧЕСТВО РАБОТ В ЖЕРТВУ НЕ ПРИНОСИТСЯ — БЕЛАЯ... НЕТ, ЦВЕТНАЯ МАГИЯ!»'	
			},
			{
				image : 'images/item2.jpg',
				title : 'БОК О БОК',
				desc : 'Для разных картин вы можете выбрать различное оформление торца',
				foto : 'images/foto2.png',
				name : 'Марина, 34 год',
				text : '«В ПОИСКАХ ДОПОЛНИТЕЛЬНЫХ СМЫСЛОВ ЗНАКОМЫЙ ИСКУССТВОВЕД ПОСОВЕТОВАЛ НЕ УПУСКАТЬ ИЗ ВИДА ДАЖЕ ТОРЦЫ КАРТИН. ЛЮБЛЮ ДЕТАЛИ!»'
			},
			{
				image: 'images/item4.jpg',
				title : 'ПРИСЕЛ НА ДОРОЖКУ',
				desc : 'ЗАБОТЛИВО УПАКОВЫВАЕМ ГОТОВУЮ ПРОДУКЦИЮ И ОТПРАВЛЯЕМ ЕЁ САМЫМ БЫСТРЫМ СПОСОБОМ',
				foto : 'images/foto6.png',
				name : 'Маша, 25 лет',
				text : '«Я ИНОГДА СНИМАЮ КАРТИНУ И ВЕШАЮ ЕЁ НА ДРУГОЕ МЕСТО. ЧТО МНЕ ЕЩЁ ОСТАЕТСЯ ДЕЛАТЬ, ЕСЛИ ХОЧЕТСЯ ЛЮБОВАТЬСЯ ЕЙ ВЕЗДЕ, ПО ВСЕМУ ДОМУ? ПОЗВОНЮ ПОДРУГЕ, УЗНАЮ КАКОЙ ПРАЗДНИК СЛЕДУЮЩИЙ).'
			},
			{
				image: 'images/item5.jpg',
				title : 'БЕЗ СУЧКА',
				desc : 'Модульный подрамник из сосны, натуральный хлопковый холст, КРАФТОВЫЙ СКОТЧ',
				foto : 'images/foto1.png',
				name : 'Никита, 29 лет',
				text : '«АККУРАТНОСТЬ... АККУРАТНОСТЬ ПРЕВЫШЕ ВСЕГО! ТАК МЕНЯ ВСЕГДА УЧИЛ ОТЕЦ, И ОЧЕНЬ ПРИЯТНО, ЧТО КТО-ТО ВОСПИТАН В СХОЖИХ ТРАДИЦИЯХ»'
			},
			{
				image: 'images/item6.jpg',
				title : '2Х2',
				desc : 'НАШ КРЕПЁЖ — УДОБНЫЙ И НАДЕЖНЫЙ СПОСОБ РАЗМЕЩЕНИЯ КАРТИНЫ У ВАС ДОМА',
				foto : 'images/foto3.png',
				name : 'Елена, 32 года',
				text : '«ПОВЕСИТЬ НА СТЕНУ КАРТИНУ БЫЛО ПРОЩЕ ПРОСТОГО, МНЕ ДАЖЕ НЕ ПРИШЛОСЬ ПРОСИТЬ ОБ ЭТОМ МУЖА — И ЭТО БЫЛ ДЛЯ НЕГО ДВОЙНОЙ СЮРПРИЗ!»'
			}
		];
	}

	$scope.questions = function(){
		
		return false;
	}

	$scope.orderForm = function(){
		return false;
	}

	$scope.subscript = function(){

		return false;
	}

});

picApp.controller('SupportCtrl', function($scope, $http){

	$scope.init = function(){

	}

	$scope.feedback = function(){
		return false;
	}

});