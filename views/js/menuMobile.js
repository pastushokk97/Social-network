const menuMobileLeft = document.querySelectorAll('.left');
const menuMobile = document.querySelector('.navbarMobile')
const burgerMenu = document.querySelector('.burgerMenu');
let click = 0;

window.onload = function() {

for(let i = 0; i<menuMobileLeft.length;i++) {
  menuMobileLeft[i].style.display = 'none'
  }
}

function menu() {
  if(click % 2 === 0) {
    for (let i = 0; i < menuMobileLeft.length; i++) {
      menuMobileLeft[i].style.display = 'block';
  }
    menuMobile.style.height = 300+'px';
    burgerMenu.src = '../image/closeMenu.png';
  } else {
    for (let i = 0; i < menuMobileLeft.length; i++) {
      menuMobileLeft[i].style.display = 'none'
    }
  
    menuMobile.style.height = 40+'px';
    burgerMenu.src = '../image/menu.png';
  }

  click += 1;
}