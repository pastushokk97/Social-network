(function () {
  document.querySelector('.formUpload').action = document.location.pathname + '/upload';
}());

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

      a.href = `/profile/${response[i].id}`;
      img.src = `/uploads/${response[i].photo_url}`;
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

