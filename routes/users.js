const express = require('express');
const cors = require('cors');
const JWT = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = express.Router();

const { user } = require('../config/config.js');
//app.use(express.json());
//app.use(cors());
const secret_key = 'XVtiQNiIsInRUYx7gkCFxiQUYx0USRMT7';




// route for Registering
router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Please fill in all fields! ' });
  }

  
  
  if (!passwordStrength(password)) {
    return res.status(400).json({ message: 'Password not strong enough! Please include at least one lowercase character, uppercase character, number and special character! ' });
  };

  // variable set to contain the hashed password
  const hashedPassword = await bcrypt.hash(password, 10);

  // variable set to contain the entered email and password
  const userInfo = {
    email: email,
    password: hashedPassword
  };

  const findEmail = await user.where('email', '==', email).get();
  const checkEmail = (findEmail.docs[0]?.data());
  
  // checks if the users email is already registered (checks database)
  if (checkEmail) {
    return res.status(401).json({ message: 'Something went wrong! Please try again. ' });
  };

  try {
    // adds the newly registered user to database
    await user.add(userInfo);
    
    res.status(201).json({ message: 'User created successfully! ' });
  } catch (error) {
    console.error('Something went wrong!: ', error);
    res.status(500).json({ message: 'Internel Server Error! Registeration failed! ' });
  }
});






// route to Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // checks whether email of user exists in the database
  const findEmail = await user.where('email', '==', email).get();
  const checkEmail = findEmail.docs[0]?.data();
  
 
  // checks whether an email is entered or if the user is registered or not
  if (findEmail.empty || findEmail.docs.length === 0) {
    return res.status(401).json({ message: 'Invalid credentials!' });
  };

  

  const userInfo = checkEmail;


  // converts stored hashed password to its original form and compares with entered password
  const passwordMatch = await bcrypt.compare(password, userInfo.password);
  //console.log(password, userInfo.password);
  if (!passwordMatch) {
    return res.status(401).json({ message: 'Invalid credentials!' });
  }

  
  try{
    const token = JWT.sign({ userId: userInfo.id, 
    adminLogin: userInfo.email === "admin@gmail.com" }, secret_key);
     
    res.status(200).json({ "Generated Token ": token });
    } catch (error) {
    console.error('Something went wrong!: ', error);
    res.status(500).json({ message: 'Internel Server Error! Login failed! ' });
  }    

  

});

// only admin allowed to retrieve user information
router.get('/', adminTokenVerification, async (req, res) => {
  const allUsers = await user.get();
  const idUsers = allUsers.docs.map((doc) => doc.id);
  console.log(idUsers);
  const listUsers = allUsers.docs.map((doc) => ({id: doc.id, ... doc.data() }));
  try{
    res.status(200).send(listUsers);
  } catch (error) {
    console.error('Something went wrong!: ', error);
    res.status(500).json({ message: 'Internel Server Error! Retrieving User Information failed! ' });
  }
});


// only admin allowed to delete user
router.delete('/delete', adminTokenVerification, async (req, res) => {
  const { email } = req.body;

  try {
    const fetchUser = await user.where('email', '==', email).get();

    if (fetchUser.empty) {
      return res.status(404).json({ message: 'User not found' });
    }

    const userId = fetchUser.docs[0].id;

    await user.doc(userId).delete();

    res.status(200).json({ message: 'User Deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Deleting user failed! ' });
  }
});




function passwordStrength(password) {
  const passRequirements = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]+$/;
  return passRequirements.test(password);
};


function adminTokenVerification(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  console.log(token);
  if (!token) {
    return res.status(401).json({ message: 'Something went wrong! ' });
  };

  JWT.verify(token, secret_key, (err, decodedToken) => {
    if (err) {
      return res.status(401).json({ message: 'Provided token is not valid! ' });
    }

    if (!decodedToken.adminLogin) {
      return res.status(403).json({ message: 'Only accessible by admins! ' });
    }

    // Store the authenticated user ID in the request object
    req.userId = decodedToken.userId;
    next();
  });
}


// function to verify JWT token
function tokenVerification(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  console.log(token);
  if (!token) {
    return res.status(401).json({ message: 'Something went wrong! ' });
  };

  JWT.verify(token, secret_key, (err, decodedToken) => {
    if (err) {
      return res.status(401).json({ message: 'Provided token is not valid! ' });
    }

    // Store the authenticated user ID in the request object
    req.userId = decodedToken.userId;
    next();
  });
};
  

module.exports = router;