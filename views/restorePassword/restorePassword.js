const navbarMobileLeft = document.querySelectorAll('.left');
const navbarMobile = document.querySelector('.navbarMobile');
const burgerMenu = document.querySelector('.burgerMenu')
const submit = document.querySelector('.signupbtn');
const done = document.querySelector('.done');
const warning = document.querySelector('.warning');
let click = 0;

window.onload = function () {
  for(let i = 0; i<navbarMobileLeft.length;i++) {
    navbarMobileLeft[i].style.display = 'none'
  }
};

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

submit.addEventListener('click',(e) => {
  e.preventDefault();
  const email = document.querySelector('.email').value;
  const send = JSON.stringify({'email':email});
  console.log(email,'email');
  const request = new XMLHttpRequest();
  if(email.length === 0 || !email.includes('@')) return warning.style.display = 'block';

   request.open('POST','/restore-password', true);   
   request.setRequestHeader('Content-Type', 'application/json');
   request.addEventListener('load', function () {
      
    const receivedUser = JSON.parse(request.response);
    console.log(receivedUser);
    done.innerHTML = '<strong>Mail was sent</strong>Please check your mail';
    if(receivedUser === 'Email was sent') return  done.style.display = 'block';
    return warning.style.display = 'block';
   });
   
   request.send(send);
})
