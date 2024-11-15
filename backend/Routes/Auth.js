// Routes/Auth.js
const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require('../models/User')
const multer = require('multer');
const Product = require('../models/Product')

const upload = multer({dest:'../upload'});

// Example route for login
router.post('/login', [
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Invalid password').exists(),
],async (req, res) => {
  let success = false;
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()})
  }

  const { email, password } = req.body;
 
  // Add your authentication logic here
  try{
    let user = await User.findOne({email});
    if(!user){
      return res.status(400).json({success,error:'Try Loggin with the correct credentails'})
    }
    let password1 = user.password;
    if(!password1 === password){
      return res.status(400).json({success,error:'Try Loggin with the correct credentails'})
    }
    else{
      success = true;
      return res.status(200).json({success});
    }
  }
  catch(error){
    console.error(error.message);
    res.send("server error")

  }
});

// Example route for registration
router.post('/signup',[

  body('name','Enter a name').exists(),
  body('email','Enter a valid mail').isEmail(),
  body('password','Enter a valid password').exists(),
  body('phone','Enter a valid phone number').exists()
],async (req, res) => {
  const errors  = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({error:errors.array()})
  }
  form = req.body;
  try{
    const user = new User(form);
    await user.save();
    console.log('user registration',form);
    res.json({message:'Registration   successfull'})
  }
  catch (error){
    console.error('Error registration user:',error.message)
    res.status(500).json({ error: 'Internal Server Error' });

  }
});

router.post('/upload/home',upload.fields([
  {name:'banner',maxCount:1},
  {name:'primaryImage',maxCount:1},
  {name:'alternativeImage',maxCount:1}
]),async(req,res) =>{
  const section = 'home';
  console.log(req.files.banner);
  const {productName,offerDetail} = req.body;
  const banner = req.files.banner?req.files.banner[0].filename:null;
  const primaryImage = req.files.primaryImage?req.files.primaryImage[0].filename:null;
  const alternativeImage = req.files.alternativeImage?req.files.alternativeImage[0].filename:null;
  console.log(banner,primaryImage,alternativeImage);
const product = new Product({
  section,
  banner,
  primaryImage,
  alternativeImage,
  productName,
  offerDetail

});
try{
  await product.save();
  res.json({message:`${section} product saved successfully`});
}
catch(error){
  res.status(500).json({error:`Error saving product in ${section}`});
}
})
// Get home data
router.get('/home', async (req, res) => {
  try {
    const homeData = await Product.find({ section: 'home' });
    res.json(homeData);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching home section data' });
  }
});

module.exports = router;
