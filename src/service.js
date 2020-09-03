const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const ObjectId = require('mongodb').ObjectId;
const MongoClient = require('mongodb').MongoClient;

const transporter = nodemailer.createTransport({
  service:'gmail',
  auth: {
    user: 'pastushokk97@gmail.com',
    pass: 'Igor2015',
  }
});

const mailOptions = {
  from: 'pastushokk97@gmail.com',
};

function sendEmail(data) {
  return new Promise(async(resolve,reject) => {

  mailOptions.to = 'pastushokk97@gmail.com';
  mailOptions.subject = 'Mail from a client';
  mailOptions.text = `Mail from ${data.email}`;
  mailOptions.html = `
    <h3>Mail from ${data.email} and name is ${data.firstName}${data.lastName}</h3>
    <h3>Subject:${data.subject}</h3>
    <h4>Text from client:${data.text}</h4>
  `;

  await transporter.sendMail(mailOptions, function (err,info) {
      if(err) {
        throw err;
      }
      resolve(info.accepted);
    });
  });
};

function addUser(data) {
  const mongoClient = new MongoClient('mongodb+srv://Igor:*=$Pf-N5H89QJE.@users-e9wlw.gcp.mongodb.net/pips?retryWrites=true&w=majority',{ useUnifiedTopology: true, useNewUrlParser: true,  });
  
  bcrypt.hash(data.password, 10, function(err, hash) {
    if(err) throw err;
    data.password = hash;
  });

  return new Promise(async(resolve,reject) =>  {
 
    await mongoClient.connect((err,client) => {
      if (err) throw err;

    const db = client.db('pips');
    const collection = db.collection('users');
    collection.find({'email':data.email}).toArray((err,results) => {
      if(err) throw err;

      if(results.length >=1 ) {
        resolve('This email is already taken');
      }
    });

    collection.insertOne(data,(err,result) => {
      if (err) { 
        throw err;
      }
      client.close();
      resolve(data);
      });
    });  
  });
} 

function getProfile(id) {
  const mongoClient = new MongoClient('mongodb+srv://Igor:*=$Pf-N5H89QJE.@users-e9wlw.gcp.mongodb.net/pips?retryWrites=true&w=majority',{ useUnifiedTopology: true, useNewUrlParser: true,  });
  
      const objectId = new ObjectId(id);

      return new Promise(async(resolve,resject) => {
        await mongoClient.connect(async(err,client) => {
          if(err) throw err;
      
          const db = client.db('pips');
          const collection = db.collection('users');

          const data = await collection.find({'_id':objectId}).toArray();
          client.close();
          if(data.length == 0) resolve('User was not found');
          resolve(data);
        });
      });
}
function uploadNote(id,note) {
const mongoClient = new MongoClient('mongodb+srv://Igor:*=$Pf-N5H89QJE.@users-e9wlw.gcp.mongodb.net/pips?retryWrites=true&w=majority',{ useUnifiedTopology: true, useNewUrlParser: true,  });

    const objectId = new ObjectId(id);
    return new Promise(async(resolve,reject) => {
    await mongoClient.connect(async(err,client) => {
      if(err) throw err;
  
      const db = client.db('pips');
      const collection = db.collection('users');
  
      await collection.updateOne({'_id':objectId},{$push:{post:note}},(err) => {
        if (err) throw err;
        client.close();
        resolve('Post was added');
      });
    });
  });
} 

function updateProfile(id,data) {
  const MongoClient = require('mongodb').MongoClient;
  const mongoClient = new MongoClient('mongodb+srv://Igor:*=$Pf-N5H89QJE.@users-e9wlw.gcp.mongodb.net/pips?retryWrites=true&w=majority',{ useUnifiedTopology: true, useNewUrlParser: true,  });
  const objectId = new ObjectId(id);
  return new Promise(async(resolve,reject) => {
  await mongoClient.connect(async(err,client) => {
    
    if(err) throw err;
    
    const db = client.db('pips');
    const collection = db.collection('users');
    
    await collection.updateOne({'_id':objectId}, {$set:{name:data.name}});
    await collection.updateOne({'_id':objectId}, {$set:{surname:data.surname}});
    await collection.updateOne({'_id':objectId}, {$set:{description:data.description}});
    
    client.close();
    resolve('ok');
  });
});
};

function uploadPhoto(id,file) {
  const mongoClient = new MongoClient('mongodb+srv://Igor:*=$Pf-N5H89QJE.@users-e9wlw.gcp.mongodb.net/pips?retryWrites=true&w=majority',{ useUnifiedTopology: true, useNewUrlParser: true,  });

  const objectId = new ObjectId(id);

  return new Promise(async(resolve,reject) => {
    await mongoClient.connect(async(err,client) => {
      if(err) throw err;
    
    const db = client.db('pips');
    const collection = db.collection('users');

    await collection.updateOne({'_id':objectId},{$push:{photo:file.filename}});
    })
    resolve('Photo was uploaded');
  })
}

function sendLink(email) {
  const mongoClient = new MongoClient('mongodb+srv://Igor:*=$Pf-N5H89QJE.@users-e9wlw.gcp.mongodb.net/pips?retryWrites=true&w=majority',{ useUnifiedTopology: true, useNewUrlParser: true,  });

  return new Promise(async(resolve,reject) => {
    await mongoClient.connect(async(err,client) => {
      if(err) throw err;
    
    const db = client.db('pips');
    const collection = db.collection('users');

    const restoreCode = Math.floor(Math.random() * 1000000)

    await collection.findOne({'email':email},async(err,user) => {
      if(err) throw err;
      if(!user) resolve('User was not found');

        collection.updateOne({'email':email},{$set:{'restoreCode':restoreCode}});

        mailOptions.to = email;
        mailOptions.subject = 'Restore your password';
        mailOptions.html = `
          <h3>If you want restore your password please follow this link https://sonic-momentum-279720.oa.r.appspot.com/restore-password/${user._id}</h3>
          <h3>Here is your code ${restoreCode} for restore password, this code can be used within five minutes</h3>
          <h3>If that wasn't you, just ignore</h3>
          <br />
          <br />
          <h4>Our team PIPS</h4>
          <h4>The best wishes to you!</h4>`;

        await transporter.sendMail(mailOptions, function (err,info) {
          if(err) {
            throw err;
          }

          setTimeout(() => {
            collection.updateOne({'email':email},{$set:{'restoreCode':''}});
          },1000 * 60 * 3)

          resolve('Email was sent');
        });
      });
    })
  })
}

sendLink('ihor.pastushenko@nure.ua')
.then(res => console.log(res));

function checkCode(id,code) {
  return new Promise(async(resolve,reject) => {
    const mongoClient = new MongoClient('mongodb+srv://Igor:*=$Pf-N5H89QJE.@users-e9wlw.gcp.mongodb.net/pips?retryWrites=true&w=majority',{ useUnifiedTopology: true, useNewUrlParser: true,  });
    
    if(id.length != 24) resolve('User wasn\'t found');

    const objectId = new ObjectId(id);
    await mongoClient.connect(async(err,client) => {
      if(err) throw err;
    
      const db = client.db('pips');
      const collection = db.collection('users');
      await collection.findOne({'_id':objectId},(err,user) => {
      if(err) throw err;
      if(!user) resolve('User wasn\'t found')

      if(user.restoreCode === '') resolve('Time is over')

      user.restoreCode == code ? resolve('Code is right') : resolve('Code is wrong');
      })
    });
  })
};


function updatePassword(id,password) {
  bcrypt.hash(password, 10, function(err, hash) {
    password = hash;
  });
  const mongoClient = new MongoClient('mongodb+srv://Igor:*=$Pf-N5H89QJE.@users-e9wlw.gcp.mongodb.net/pips?retryWrites=true&w=majority',{ useUnifiedTopology: true, useNewUrlParser: true,  });

  const objectId = new ObjectId(id);

  return new Promise(async(resolve,reject) => {
    await mongoClient.connect(async(err,client) => {
      if(err) throw err;
    
      const db = client.db('pips');
      const collection = db.collection('users');
      await collection.findOne({'_id':objectId},(err,user) => {
      if(err) throw err;
      if(!user) resolve('User was not found');
      
      collection.updateOne({'_id':objectId},{$set:{password:password}});
      resolve('Password was updated');
      });
    })
  })
}

async function findPeople(name) {
  const mongoClient = new MongoClient('mongodb+srv://Igor:*=$Pf-N5H89QJE.@users-e9wlw.gcp.mongodb.net/pips?retryWrites=true&w=majority',{ useUnifiedTopology: true, useNewUrlParser: true,  });
  const regular = new RegExp(name);
  const result = [];

    return new Promise(async(resolve,resject) => {
      await mongoClient.connect(async(err,client) => {
        if(err) throw err;
    
        const db = client.db('pips');
        const collection = db.collection('users');

        const data = await collection.find({'name':{'$regex':regular}}).toArray();
        client.close();
        console.log(data);
        if(data.length === 0) resolve('Users were not found');
        for (let i = 0; i < data.length; i++) {
          result.push({name:data[i].name,
                      id:data[i]._id,
                      photo_url: data[i].photo[data[i].photo.length - 1],
                      description:data[i].description
          })
        }
      
      resolve(result);
      });
  });
}

module.exports = {
  addUser,
  sendEmail,
  getProfile,
  uploadNote,
  updateProfile,
  uploadPhoto,
  sendLink,
  updatePassword,
  checkCode,
  findPeople,
};

