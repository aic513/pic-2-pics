var offer = document.querySelector(".offer");
var btn_offer = document.querySelector(".rules--offer");
var btn_cross = document.querySelector(".offer__cross");
var nav = document.querySelector("nav");
    
  btn_offer.addEventListener('click', function(event) {
    event.preventDefault();
    offer.classList.add("offer--show");
  }); 
    
  btn_cross.addEventListener('click', function(event) {
    event.preventDefault();
    offer.classList.remove("offer--show");
  });

  nav.addEventListener('click', function(event) {
    event.preventDefault();
    offer.classList.remove("offer--show");
  });