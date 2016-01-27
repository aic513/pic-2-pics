var menu = document.querySelector(".menu");
var offer = document.querySelector(".offer");
var order = document.querySelector(".order");
var sup = document.querySelector(".subscripe");
var btn_offer = document.querySelector(".rules--offer");
var btn_cross = document.querySelector(".offer__cross");
var orderBtn = document.querySelector(".orderBtn");
var orderCross = document.querySelector(".order--cross");
var btnSup = document.querySelector(".btnSup");


btnSup.addEventListener('click', function(event) {
    console.log("click");
    event.preventDefault();
    sup.classList.add("show");
    console.log("add show");
  });

//  btn_offer.addEventListener('click', function(event) {
//    event.preventDefault();
//    offer.classList.add("offer--show");
//  }); 
//    
//  btn_cross.addEventListener('click', function(event) {
//    event.preventDefault();
//    offer.classList.remove("offer--show");
//  });
//
//  orderBtn.addEventListener('click', function(event) {
//    event.preventDefault();
//    order.classList.add("order--show");
//  }); 
//    
////  for (var i = 0; i < orderBtn.length; i++) {
////      orderBtn[i].addEventListener('click', function(event) {
////        event.preventDefault();
////        order.classList.add("order--show");
////      });
////  }
//
//
////  orderCross.addEventListener('click', function(event) {
////    event.preventDefault();
////    offer.classList.remove("order--show");
////  });
//  
//  nav.addEventListener('click', function(event) {
//    event.preventDefault();
//    offer.classList.remove("offer--show");
//  });

  
