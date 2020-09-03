const submit = document.querySelector('.submit');
const warning = document.querySelector('.warning');
const done = document.querySelector('.done')

function sendLetter() {
  const firstName = document.getElementById('fname').value;
  const lastName = document.getElementById('lname').value;
  const email = document.getElementById('email').value;
  const subject = document.getElementById('subject').value;
  const text = document.getElementById('text').value;
  
  const claim = {
    firstName:firstName,
    lastName:lastName,
    email:email,
    subject:subject,
    text:text,
  };
  
  if(claim.firstName === '' || claim.lastName === ''|| claim.email === ''|| claim.subject === '' || claim.text === '') {
    return warning.hidden = false;
  }
  if(!email.includes('@')) {
    warning.innerHTML = '<strong>Check!</strong> Your email is wrong!'
    return warning.hidden = false;
  }

  const request = new XMLHttpRequest();
  
  request.open('POST','/contact', true);   
  request.setRequestHeader('Content-Type', 'application/json');
  request.addEventListener('load', function () {
      
    const receivedUser = JSON.parse(request.response);

    switch(receivedUser.length) {
      case 1:
        warning.hidden = true;
        done.hidden = false;
        break;
      case 0:
        warning.hidden = false;
        done.hidden = true;
        break;
      default:
        warning.innerHTML = '<strong>We are sorry!</strong> Try again.'
        warning.hidden = false;
        done.hidden = true;
    }
  });

  request.send(JSON.stringify(claim));
}

submit.addEventListener('click',(e) => {
  e.preventDefault();
  sendLetter();
})

