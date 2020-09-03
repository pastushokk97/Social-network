(function() {
  if(window.innerWidth < 500){
     document.querySelector('.navbar').remove();
  } else {
    document.querySelector('.navbarMobile').remove();
  }
})()

const signUp = document.querySelector('.signupbtn');
signUp.addEventListener('click', async(e) => {
  e.preventDefault();
  
  const username = document.querySelector('.username').value;
  const surname = document.querySelector('.surname').value;
  const email = document.querySelector('.email').value;
  const password = document.querySelector('.password').value;
  const repeatPassword = document.querySelector('.repeatPassword').value;
  const date = new Date();

  const warning = document.querySelector('.alert');

  if(username === '' || email === '' || password === '' || repeatPassword === '') {
    return warning.style.display = 'block';
  } else if(password !== repeatPassword) {
    warning.innerHTML = '<strong>Warning!</strong>Your passwords don\'t match.'
    return warning.style.display = 'block';
  } else if(password.length < 5) {
    warning.innerHTML = '<strong>Warning!</strong>Your password is so easy.'
    return warning.style.display = 'block';
  } else if(!email.includes('@')) {
    warning.innerHTML = '<strong>Warning!</strong>Your email is wrong.'
    return warning.style.display = 'block';
  };

  const user = {
    username: username,
    surname: surname,
    email: email,
    password: password,
    signUpDate:date,                           
  };

  const response = await fetch('/sign-up', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(user)
  });
  
  const result = await response.json();

  switch(result) {
  case 'Error':
    warning.innerHTML = '<strong>Something went wrong</strong>'
    warning.style.display = 'block';
    break;
  case 'This email is already taken':
    warning.innerHTML = '<strong>This email is already taken</strong>'
    warning.style.display = 'block';
    break;
  default:
    document.location.href = '/login';
    break;
  }
});
