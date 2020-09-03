(function() {
  if(document.location.pathname.length > 20) {
    document.querySelector('.modal').style.display = 'block'
    document.querySelector('.sendEmail').remove()
  } else {
    document.querySelector('.modal').remove()
    document.querySelector('.restore').remove()
  }

  if(window.innerWidth < 500) {
    document.querySelector('.navbar').remove();
  } else {
    document.querySelector('.navbarMobile').remove();
  }
})()
const warningCode = document.querySelector('.warningCode')
const submitCode = document.querySelector('.submitCode')

if(submitCode) {
  submitCode.addEventListener('click',async(e) => {
    e.preventDefault();
    const code = document.querySelector('.restoreCode').value
    if(code.length === 0) return warningCode.style.display = 'block';

    const response = await fetch(document.location.pathname, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({code:code})
    });
    
    const result = await response.json();

    switch(result) {
      case 'User wasn\'t found':
        warningCode.innerHTML = '<strong>User wasn\'t found!</strong>'
        warningCode.style.display = 'block';
        break;
      case 'Time is over' :
        warningCode.innerHTML = '<strong>Time is over!</strong> Please request new code'
        warningCode.style.display = 'block';
        break;
      case 'Code is right':
        warningCode.innerHTML = '<strong>Code is right!</strong>'
        warningCode.style.backgroundColor = '#4CAF50';
        warningCode.style.display = 'block';
        document.querySelector('.modal').style.display = 'none'
        setTimeout(() => {
          document.querySelector('form').style.display = 'block'
        },1000)
        break;
      case 'Code is wrong':
        warningCode.innerHTML = '<strong>Code is wrong!</strong>'
        warningCode.style.display = 'block';
        break;
    }
  })
}


const submit = document.querySelector('.signupbtn');

if(submit) {
  submit.addEventListener('click',(e) => {
    e.preventDefault();
    const done = document.querySelector('.done')
    const warning = document.querySelector('.warning')
    const email = document.querySelector('.email').value;
    const send = JSON.stringify({'email':email});
    console.log(send,'email');
    const request = new XMLHttpRequest();
    if(email.length === 0 || !email.includes('@')) return warning.style.display = 'block';

    request.open('POST','/restore-password', true);   
    request.setRequestHeader('Content-Type', 'application/json');
    request.addEventListener('load', function () {
        
      const receivedUser = JSON.parse(request.response);
      console.log(receivedUser);
      done.innerHTML = '<strong>Mail was sent!</strong> Please check your mail';
      if(receivedUser === 'Email was sent') return  done.style.display = 'block';
      return warning.style.display = 'block';
    });
    
    request.send(send);
  })
}
const restorePassword = document.querySelector('.restore-btn');

if(restorePassword) {
  restorePassword.addEventListener('click',async(e) => {
    e.preventDefault()

    const password = document.querySelector('.password').value;
    const repeatPassword = document.querySelector('.repeatPassword').value;

    if(password !== repeatPassword) return document.querySelector('.warning').style.display = 'block';

    const response = await fetch(document.location.pathname, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({password:password})
    });
    
    const result = await response.json();

    switch(result) {
      case 'Password was updated': 
        document.querySelector('.done').style.display = 'block';
        setTimeout(() => {
          document.location.href = '/login';
        },1000)
        break;
      case 'User was not found': 
        document.querySelector('.warning').innerHTML = '<strong>User was not found</strong>'
        document.querySelector('.warning').style.display = 'block';
        break;
    }
  })
}