window.onload = function () {
  const formFile = document.querySelector('.formUpload');
  formFile.action = document.location.pathname + '/upload';
  document.body.classList.add('loaded_hiding');

for(let i = 0; i<navbarMobileLeft.length;i++) {
  navbarMobileLeft[i].style.display = 'none'
  }

  window.setTimeout(function () {
    document.body.classList.add('loaded');
    document.body.classList.remove('loaded_hiding');
  }, 2000);
};
const navbarMobileLeft = document.querySelectorAll('.left');
const navbarMobile = document.querySelector('.navbarMobile');
const burgerMenu = document.querySelector('.burgerMenu')
let click = 0;

function menu() {
  if(click % 2 === 0) {
  for(let i = 0; i<navbarMobileLeft.length;i++) {
    navbarMobileLeft[i].style.display = 'block';
    }
    navbarMobile.style.height = 200+'px';
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

const add = document.querySelector('.add');
const addForm = document.querySelector('.addForm')
const submit = document.querySelector('.submit');
const close = document.querySelector('.close');
const edit = document.querySelector('.edit');

close.addEventListener('click', (e) => {
  e.preventDefault();
  addForm.hidden = true;
});
if(add) {
add.addEventListener('click', (e) => {
  e.preventDefault();
  addForm.hidden = false;
});
}
submit.addEventListener('click',(e) => {
  e.preventDefault();
  const url = document.location.pathname + '/add';
  const title = document.getElementById('title').value;
  const subtitle = document.getElementById('subtitle').value;
  const text = document.getElementById('text').value;
  const date = new Date();

  if(title === '' || subtitle === '' || text === '') {
    return alert('You did not fill in all the fields!')
  }

  const post = JSON.stringify({
    title:title,
    subtitle:subtitle,
    text:text,
    date:date,
  });
  console.log(post,'post');

  addForm.action = url;
  const request = new XMLHttpRequest();
  request.open('POST',url, true);   
  request.setRequestHeader('Content-Type', 'application/json');
  request.addEventListener('load', function () {
      
    const receivedUser = request.response;
    location.href = location.href;
    console.log(receivedUser);
});
  request.send(post);
  addForm.hidden = true;
});
