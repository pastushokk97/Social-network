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

const submit = document.querySelector('.submit');
const warning = document.querySelector('.warning');
const done = document.querySelector('.done')

function sendLetter() {
  const url = '/contact';
  const firstName = document.getElementById('fname').value;
  const lastName = document.getElementById('lname').value;
  const email = document.getElementById('email').value;
  const subject = document.getElementById('subject').value;
  const text = document.getElementById('text').value;
  
  const claim = {
    firstName:firstName,
    lastName:lastName,
    email:email,
    subject:subject,
    text:text,
  };
  console.log(claim);
  if (claim.firstName === '' || claim.lastName === ''|| claim.email === ''|| claim.subject === '' || claim.text === '') {
    return warning.hidden = false;
  }
  const request = new XMLHttpRequest();
  request.open('POST',url, true);   
  request.setRequestHeader('Content-Type', 'application/json');
  request.addEventListener('load', function () {
      
    const receivedUser = request.response;
    console.log(receivedUser);
    warning.hidden = true;
    done.hidden = false;
});
  request.send(JSON.stringify(claim));
}

submit.addEventListener('click',(e) => {
  e.preventDefault();
  sendLetter();
})

