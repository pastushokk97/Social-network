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

function resultingSearch(ul,str) {
  const resulting = document.createElement('p')
  resulting.className = 'resultingSearch';
  resulting.innerHTML = str;
  if(str === 'Users were not found') resulting.style.marginLeft = 17 + '%';
  ul.append(resulting);
}

const findPeople = document.querySelector('.findButton');
const findField = document.querySelector('.findField');

findPeople.addEventListener('click',(e) => {
  
  e.preventDefault();

  findPeople.style.backgroundColor = '#1abc9c';
  findPeople.style.top = '14px';

  findField.style.display = 'block';
  findField.style.marginBottom = '6px';

  document.querySelector('.findPeople').style.marginRight = '10px';
  
  findField.addEventListener('change',async(e) => {
    e.preventDefault();

    const ul = document.querySelector('.resultFind');
    let ulHeight = 65;
    ul.innerHTML = '';

    console.log(findField.value,'value'); 

    if (findField.value === '') return alert('This field can\'t be hollow')

    const request = await fetch(document.location.pathname + '/findPeople', {
      method:'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name:findField.value})
    });
    const response = await request.json();
    console.log(response);
    for (let i = 0; i < response.length; i++) {
      const li = document.createElement('li');
      const a = document.createElement('a');
      const img = document.createElement('img');
      const nameAvatar = document.createElement('p');
      const descriptionAvatar = document.createElement('p');

      li.className = 'person';
      a.className = 'avatar';
      img.className = 'photoAvatar';
      nameAvatar.className = 'nameAvatar';
      descriptionAvatar.className = 'descriptionAvatar';

      a.href = 'http://localhost:8080/profile/' + response[i].id;
      img.src = '/uploads/' + response[i].photo_url;
      nameAvatar.innerHTML = response[i].name;
      descriptionAvatar.innerHTML = response[i].description;

      a.append(img,nameAvatar,descriptionAvatar);
      li.append(a);
      ul.append(li);

      ul.style.height = ulHeight + 'px';
      ul.style.display = 'block'

      ulHeight += 65;

      setTimeout(() => {
        ul.style.display = 'none';
      },4000)
    }
  })
})

const mobileSearch = document.querySelector('.mobile-search');

mobileSearch.addEventListener('click',(e) => {
  e.preventDefault()
  document.querySelector('.search-menu-mobile').style.display = 'block';
  menu();
})

const findMobile = document.querySelector('.find-mobile-input');

findMobile.addEventListener('change',async(e) => { 
  e.preventDefault();

  const ul = document.querySelector('.resultMobileFind');
  
  const request = await fetch(document.location.pathname + '/findPeople', {
    method:'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({name:findMobile.value})
  });
  const response = await request.json();

  ul.innerHTML = '';

  if(typeof(response) === 'string') return resultingSearch(ul,response);
  resultingSearch(ul,'Search resulting');

  for (let i = 0; i < response.length; i++) {
    const li = document.createElement('li');
    const a = document.createElement('a');
    const img = document.createElement('img');
    const div = document.createElement('div');
    const nameAvatarMobile = document.createElement('p');
    const descriptionAvatarMobile = document.createElement('p');

    li.className = 'personMobile';
    a.className = 'avatarMobile';
    img.className = 'photoAvatarMobile';
    div.className = 'infoMobile';
    nameAvatarMobile.className = 'nameAvatarMobile';
    descriptionAvatarMobile.className = 'descriptionAvatarMobile';

    a.href = 'http://localhost:8080/profile/' + response[i].id;
    img.src = '/uploads/' + response[i].photo_url;
    nameAvatarMobile.innerHTML = response[i].name;
    descriptionAvatarMobile.innerHTML = response[i].description;
    div.append(nameAvatarMobile,descriptionAvatarMobile)
    a.append(img,div);
    li.append(a);
    ul.append(li);

    ul.style.display = 'block'
  }
})

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
