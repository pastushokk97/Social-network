function initMap() {
  const location = {
    lat:50.006147,
    lng:36.226999,
  }
  const options = {
    center:location,
    zoom:17
  }
  const map = new google.maps.Map(document.querySelector('.map'),options);
  const mapMobile = new google.maps.Map(document.querySelector('.mapMobile'),options);
  const marker = new google.maps.Marker({position: location, map: map});
  const mobileMarker = new google.maps.Marker({position: location, map: mapMobile});
}
const navbarMobileLeft = document.querySelectorAll('.left');
const navbarMobile = document.querySelector('.navbarMobile')
const burgerMenu = document.querySelector('.burgerMenu');
let click = 0;

window.onload = function() {

for(let i = 0; i<navbarMobileLeft.length;i++) {
    navbarMobileLeft[i].style.display = 'none'
  }
}

function menu() {
  if(click % 2 === 0) {
    for(let i = 0; i<navbarMobileLeft.length;i++) {
      navbarMobileLeft[i].style.display = 'block';
  }
    navbarMobile.style.height = 300+'px';
    burgerMenu.src = '../image/closeMenu.png';
  } else {
      for(let i = 0; i<navbarMobileLeft.length;i++) {
        navbarMobileLeft[i].style.display = 'none'
  }
  navbarMobile.style.height = 40+'px';
  burgerMenu.src = '../image/menu.png';
  }
  click += 1;
}