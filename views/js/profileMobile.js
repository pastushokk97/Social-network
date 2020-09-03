(function() {
  document.querySelector('.formUpload').action = document.location.pathname + '/upload';
}())

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

    a.href = `/profile/${response[i].id}`;
    img.src = `/uploads/${response[i].photo_url}`;
    nameAvatarMobile.innerHTML = response[i].name;
    descriptionAvatarMobile.innerHTML = response[i].description;
    div.append(nameAvatarMobile,descriptionAvatarMobile)
    a.append(img,div);
    li.append(a);
    ul.append(li);

    ul.style.display = 'block'
  }
})