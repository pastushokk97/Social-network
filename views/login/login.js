(function() {
  if(window.innerWidth < 500) {
    document.querySelector('.navbar').remove();
  } else {
    document.querySelector('.navbarMobile').remove();
  }
})()

const login = document.querySelector('.loginbtn');

login.addEventListener('click',async(e) => {
  e.preventDefault();

  const email = document.querySelector('.email').value;
  const password = document.querySelector('.password').value;
  
  const warning = document.querySelector('.alert');

 
  const user = {
    email: email,
    password: password,
  };

  if(email === '' || password === '') {
    return warning.style.display = 'block';
  };

  const response = await fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(user)
  });
      
  const result = await response.json();
  
  if(result.flag !== false) return document.location.href = result.redirect;
  warning.innerHTML = '<strong>Check your Email and Password!</strong>'
  return warning.style.display = 'block';
});
