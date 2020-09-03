(function() {

  setTimeout(() => {
  document.querySelector('.preloader').remove();
  },1000)

  const script = document.createElement('script');
  if (window.innerWidth < 500) {
    document.querySelector('.navbar').remove()
    script.src = '/views/js/profileMobile.js'
    document.body.append(script)
  } else {
    document.querySelector('.navbarMobile').remove()
    script.src = '/views/js/profile.js'
    document.body.append(script)
  }
}())

function resultingSearch(ul,str) {
  const resulting = document.createElement('p')
  resulting.className = 'resultingSearch';
  resulting.innerHTML = str;
  if(str === 'Users were not found') resulting.style.marginLeft = 17 + '%';
  ul.append(resulting);
}

const edit = document.querySelector('.edit');

edit.addEventListener('click',(e) => {

  const cancel = document.querySelector('.cancel');
  const update = document.querySelector('.update');
  const formFile = document.querySelector('.formUpload');
  const upload = document.querySelector('.upload');
  const information = document.querySelector('.information')
  const changeInformation = document.querySelector('.changeInformation')

  information.style.display = 'none';
  changeInformation.style.display = 'block';
  formFile.style.display = 'block';

  upload.addEventListener('click',(e) => {
    information.style.display = 'block';
    changeInformation.style.display = 'none';
    formFile.style.display = 'none';
  })

  update.addEventListener('click',(e) => {
    e.preventDefault();
    const url = document.location.pathname + '/update';

    const sent = JSON.stringify({
      'name':document.querySelector('.changeName').value,
      'surname':document.querySelector('.changeSurname').value,
      'description':document.querySelector('.changeDes').value,
    });

    const request = new XMLHttpRequest();
    request.open('POST',url, true);   
    request.setRequestHeader('Content-Type', 'application/json');
    request.addEventListener('load', function () {
        
      const receivedUser = request.response;
      document.location.href =  document.location.href;
  });
    request.send(sent);
  
    information.style.display = 'block';
    changeInformation.style.display = 'none';
    formFile.style.display = 'none';
  });

  cancel.addEventListener('click',(e) => {
    e.preventDefault();
    information.style.display = 'block';
    changeInformation.style.display = 'none';
    formFile.style.display = 'none';
  });
})

const add = document.querySelector('.add');
const addForm = document.querySelector('.addForm')
const addPost = document.querySelector('.addPost');
const close = document.querySelector('.close');

close.addEventListener('click', (e) => {
    e.preventDefault();
    addForm.hidden = true;
});

add.addEventListener('click', (e) => {
  e.preventDefault();
  addForm.hidden = false;
});

addPost.addEventListener('click',(e) => {
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

  addForm.action = url;
  const request = new XMLHttpRequest();
  request.open('POST',url, true);   
  request.setRequestHeader('Content-Type', 'application/json');
  request.addEventListener('load', function () {
    document.location.href = document.location.href;
});
  request.send(post);
  addForm.hidden = true;
});
