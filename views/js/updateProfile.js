const fileUpload = [];
function processSelectedFiles(fileInput) {
  let files = fileInput.files;

  for (let i = 0; i < files.length; i++) {
    fileUpload.push(files[i].name)
  }
}

if(edit) {
edit.addEventListener('click',(e) => {

  const cancel = document.querySelector('.cancel');
  const update = document.querySelector('.update');
  const name = document.querySelector('.name');
  const surname = document.querySelector('.surname')
  const description = document.querySelector('.description');
  const changeName = document.querySelector('.changeName');
  const changeSurname = document.querySelector('.changeSurname')
  const changeDes = document.querySelector('.changeDes');
  const formFile = document.querySelector('.formUpload');
  const file = document.querySelector('.file');
  const upload = document.querySelector('.upload');

  name.hidden = true;
  surname.hidden = true;
  description.hidden = true;
  changeName.hidden = false;
  changeSurname.hidden = false;
  changeDes.hidden = false;
  cancel.hidden = false;
  update.hidden = false;
  formFile.style.display = 'block';

  upload.addEventListener('click',(e) => {
    name.hidden = false;
    surname.hidden = false;
    description.hidden = false;
    changeName.hidden = true;
    changeSurname.hidden = true;
    changeDes.hidden = true;
    cancel.hidden = true;
    update.hidden = true;
    formFile.style.display = 'none';
  })

  update.addEventListener('click',(e) => {
    e.preventDefault();
    const url = document.location.pathname + '/update';

    const sent = JSON.stringify({
      'name':changeName.value,
      'surname':changeSurname.value,
      'description':changeDes.value,
    });

    const request = new XMLHttpRequest();
    request.open('POST',url, true);   
    request.setRequestHeader('Content-Type', 'application/json');
    request.addEventListener('load', function () {
        
      const receivedUser = request.response;
      console.log(receivedUser,'user');
      document.location.href =  document.location.href;
  });
    request.send(sent);
  
    name.hidden = false;
    surname.hidden = false;
    description.hidden = false;
    changeName.hidden = true;
    changeSurname.hidden = true;
    changeDes.hidden = true;
    cancel.hidden = true;
    update.hidden = true;
    formFile.style.display = 'none';
  });

  cancel.addEventListener('click',(e) => {
    e.preventDefault();
  
    name.hidden = false;
    surname.hidden = false;
    description.hidden = false;
    changeName.hidden = true;
    changeSurname.hidden = true;
    changeDes.hidden = true;
    cancel.hidden = true;
    update.hidden = true;
    formFile.style.display = 'none';
  });
})
}