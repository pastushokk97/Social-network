const express = require('express');
const router = express.Router();
const jsonParser = express.json();
const multer = require('multer');
const passport = require('passport');
const { addUser,sendLink, sendEmail, uploadPhoto, updateProfile,getProfile,uploadNote,updatePassword,checkCode,findPeople } = require('../service');
const storageConfig = multer.diskStorage({
  destination: (req, file, cb) =>{
      cb(null, 'uploads');
  },
  filename: (req, file, cb) =>{
      cb(null, file.originalname);
  }
});
router.use(multer({storage:storageConfig}).single('filedata'));

const auth = (req,res,next) => {
  if(req.isAuthenticated()) {
    next();
  } else {
    return res.redirect('/login');
  }
}
router.get('/weather',jsonParser,(req,res) => {
  res.render(__dirname + '/views/weather/weather.ejs');
});

router.get('/sign-up', jsonParser, function (request, response) {
  response.render(__dirname +'/views/signUp/signUp.ejs');
});

router.get('/contact',jsonParser, (request,response) => {
  response.render(__dirname + '/views/contact/contact.ejs')
});
router.get('/login', jsonParser, function (request, response) {
  response.render(__dirname + '/views/login/login.ejs');
});

router.get('/restore-password',jsonParser,(requset,response) => {
  response.render(__dirname + '/views/restorePassword/restorePassword.ejs');
});

router.get('/restore-password/:id',jsonParser,(requset,response) => {
  response.render(__dirname + '/views/restorePassword/restorePassword.ejs');
});

router.get('/about',jsonParser,(req,res) => {
  res.render(__dirname + '/views/about/about.ejs')
});

router.get('/profile/:id',auth,(req,res) => {
  const account = req.session.passport.user._id;

  const id = req.params['id'];
  getProfile(id)
  .then(result => {
    if(typeof(result) === 'string') res.status(404);
    else {
      result[0].truth = false;
      if(result[0]._id == account) result[0].truth = true;
      console.log(result[0]._id,'re');
      console.log(account,'re2');
      console.log(result[0]._id == account);
      res.render(
        __dirname + '/views/profile/profile.ejs',
        { 'data': result })
    }
  });
});

router.post('/contact',jsonParser, (request,response) => {
  const letter = {
    'firstName':request.body.firstName,
    'lastName':request.body.lastName,
    'email':request.body.email,
    'subject':request.body.subject,
    'text':request.body.text,
  };

  sendEmail(letter)
  .then((result) => {
    response.json(result)
  });
});
 

router.post('/sign-up',jsonParser,(req,res) => {
 
   const user = {
    name:req.body.username,
    surname: req.body.surname,
    photo:['notFound.jpg'],
    email:req.body.email,
    password:req.body.password,
    signUpDate:req.body.signUpDate,
  };

  addUser(user)
  .then(result => {
    if(typeof(result) === 'string') {
      res.status(406).json(result);
    }
    else res.status(200).json(result)
  });
});

router.post('/restore-password',jsonParser,(req,res) => {
  console.log(req.body.email);
  sendLink(req.body.email)
  .then(result => {
    if(result === 'User was not found') res.json(result);
    else res.json('Email was sent');
  })
})

router.post('/restore-password/:id',jsonParser,async (req,res) => {
  if(req.body.code) {
    checkCode(req.params['id'],req.body.code)
    .then(result => {
      res.json(result);
    })
  } else {
    updatePassword(req.params['id'],req.body.password)
    .then(result => {
      if(result === 'Password was updated') res.json('Password was updated');
      else res.json('User was not found');
    });
  }
});

router.post('/login',jsonParser,function(req,res,next) {

  passport.authenticate('local', function(err, user) {
    if (err) { 
      return next(err); 
    }
    if (!user) {
      return res.json({flag:false}); 
    }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.json({
        flag:true,
        redirect:`/profile/${user._id}`});  
    });
  })(req, res, next);

});

router.post('/profile/:id/add',jsonParser,auth,async(req,res) => {
  const id = req.params['id'];
  const note = {
    'title':req.body.title,
    'subtitle':req.body.subtitle,
    'text':req.body.text,
    'date':req.body.date
  };
  uploadNote(id,note)
  .then(result => {
    res.status(200).json(result);
  }); 
});

router.post('/profile/:id/update',jsonParser,auth,(req,res) => {
  const update = {
  'name': req.body.name,
  'surname': req.body.surname,
  'description': req.body.description,
  };
  updateProfile(req.params['id'],update)
  .then(res.json('ok')); 
});

router.post('/profile/:id/upload',(req, res) => {
  const filedata = req.file;
  if(!filedata) res.status(404);
  uploadPhoto(req.params['id'],filedata)
  .then(result => {
    if(result === 'Photo was uploaded') res.redirect(`/profile/${req.params['id']}`)
    else res.status(405)
  });
});

router.post('/profile/:id/findPeople',jsonParser,(req,res) => {
  
  if (req.body.name === '') return res.json('Enter a name')
console.time('router');
  findPeople(req.body.name)
  .then(result => {
    res.json(result);
  })

  console.timeEnd('router');
})

module.exports = router;