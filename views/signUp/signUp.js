const navbarMobileLeft = document.querySelectorAll('.left');
const navbarMobile = document.querySelector('.navbarMobile');
const burgerMenu = document.querySelector('.burgerMenu')
let click = 0;

(function() {
  if(window.innerWidth < 500){
     document.querySelector('.showPassword').remove();
     document.querySelector('.repeatShowPassword').remove();
  }
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

function changeType(className,class_img) {
  const password = document.querySelector(className);
  const change = document.querySelector(class_img);  
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
  const userEmail = registerForm.elements['userEmail'].value;
  const userPassword = registerForm.elements['userPassword'].value;
  const userRepeatPassword = registerForm.elements['userRepeatPassword'].value;
  const date = new Date();

  const attentionToPassword = document.querySelector('.attentionToPassword');
  const attention = document.querySelector('.attention');
  
  
  const user = JSON.stringify({userName: userName,
                               userEmail: userEmail,
                               userPassword: userPassword,
                               userRepeatPassword:userRepeatPassword,
                               signUpDate:date,
                            });
  const request = new XMLHttpRequest();
  
  if(userName === '' || userEmail === '' || userPassword === '' || userRepeatPassword === '') {

    attention.hidden = false;
    attentionToPassword.hidden = true;
  
  } else if(userPassword !== userRepeatPassword) {
  
    attentionToPassword.hidden = false;
    attention.hidden = true;
  } else if(userPassword.length <= 5) {
    attention.innerHTML = 'Password is unsafe';
    attention.hidden = false;
  } else if(!userEmail.includes('@')) {
    attention.innerHTML = 'Check your email';
    attention.hidden = false;
  } else {
    
    attentionToPassword.hidden = true;
    attention.hidden = true;
   
   request.open('POST','/sign-up', true);   
   request.setRequestHeader('Content-Type', 'application/json');
   request.addEventListener('load', function () {
      
    const receivedUser = JSON.parse(request.response);
    console.log(receivedUser);
       switch(receivedUser) {
        case 'Error':
          attention.innerHTML = 'Something went wrong'
          attention.hidden = false;
          break;
       case 'This email is already taken':
        attention.innerHTML = 'This email is already taken'
        attention.hidden = false;
        break;
       default:
          document.location.href = "https://sonic-momentum-279720.oa.r.appspot.com/login";
          break;
       }
   });
   
   request.send(user);
  };
});