const navbarMobileLeft = document.querySelectorAll('.left');
const navbarMobile = document.querySelector('.navbarMobile');
const burgerMenu = document.querySelector('.burgerMenu')
let click = 0;

(function() {
if(window.innerWidth < 500) document.querySelector('.showPassword').remove()
})()

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

function changeType(className) {
  const password = document.querySelector(className);
  const change = document.querySelector('.showPassword');

  if(change.src === 'https://sonic-momentum-279720.oa.r.appspot.com/image/see.png') {
    password.type = 'text';
    change.src = 'https://sonic-momentum-279720.oa.r.appspot.com/image/hide.png';
  } else if(change.src === 'https://sonic-momentum-279720.oa.r.appspot.com/image/hide.png') {
    password.type = 'password';
    change.src = 'https://sonic-momentum-279720.oa.r.appspot.com/image/see.png';
  };
};

const signUp = document.querySelector('.create');

signUp.addEventListener('click',(e) => {
  e.preventDefault();
  
  const registerForm = document.querySelector('.form');
  const userName = registerForm.elements['userName'].value;
  const userPassword = registerForm.elements['userPassword'].value;
  
  const attention = document.querySelector('.attention');
  const notFound = document.querySelector('.notFound');
 
  const user = JSON.stringify({userName: userName,
                             userPassword: userPassword,
                            });

  const request = new XMLHttpRequest();
  console.log(user);
  if(userName === '' || userPassword === '') {
    attention.hidden = false;
  } else {
   attention.hidden = true;
   
   request.open('POST','/login', true);   
   request.setRequestHeader('Content-Type', 'application/json');
   request.addEventListener('load', function () {
      
    const receivedUser = JSON.parse(request.response);
      
      if(receivedUser.flag) {
        document.location.href = `https://sonic-momentum-279720.oa.r.appspot.com${receivedUser.redirect}`;
      } else {
        notFound.hidden = false;
      }
    });
   
    request.send(user);
  };
});