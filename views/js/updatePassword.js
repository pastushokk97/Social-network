const navbarMobileLeft = document.querySelectorAll('.left');
const navbarMobile = document.querySelector('.navbarMobile')
const burgerMenu = document.querySelector('.burgerMenu');
const submit = document.querySelector('.signupbtn');
const warning = document.querySelector('.warning');
const done = document.querySelector('.done');
let click = 0;

window.onload = function () {
  const formFile = document.querySelector('.update');
  formFile.action = document.location.pathname;
  for(let i = 0; i<navbarMobileLeft.length;i++) {
    navbarMobileLeft[i].style.display = 'none'
  }
}

function changeType(className,class_img) {
  const password = document.querySelector(className);
  const change = document.querySelector(class_img);  
  console.log(change.src)
  if(change.src === 'https://sonic-momentum-279720.oa.r.appspot.com/image/see.png') {
    password.type = 'text';
    change.src = 'https://sonic-momentum-279720.oa.r.appspot.com/image/hide.png';
  } else if(change.src === 'https://sonic-momentum-279720.oa.r.appspot.com/image/hide.png') {
    password.type = 'password';
    change.src = 'https://sonic-momentum-279720.oa.r.appspot.com/image/see.png';
  };
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
  const url = document.location.pathname;
  const password = document.querySelector('.password').value;
  const repeatPassword = document.querySelector('.passwordRepeat').value;
  if(password.length === 0 || repeatPassword.length === 0) return warning.style.display = 'block';
  if(password.length <= 5) { 
    warning.innerHTML = '<strong>Warning!</strong> Too easy password, try another one';
    return warning.style.display = 'block';
  };
  if(password !== repeatPassword) {
    warning.innerHTML = '<strong>Warning!</strong> Passwords do not match';
    return warning.style.display = 'block';
  }
  const update = {'password':password};
  const request = new XMLHttpRequest();
  request.open('POST',url, true);   
  request.setRequestHeader('Content-Type', 'application/json');
  request.addEventListener('load', function () {
      
    const receivedUser = request.response;
    console.log(receivedUser);  
    if(receivedUser === 'User was not found') {
      warning.innerHTML = '<strong>Warning!</strong> Users with this email was not found';
      return warning.style.display = 'block';
    }
    done.innerHTML = '<strong>Password was updated</strong>'
    done.style.display = 'block';
    setTimeout(() => {
      document.location.href = `https://sonic-momentum-279720.oa.r.appspot.com/login`;
    },1500);
});
  request.send(JSON.stringify(update));

})