const validator = require('validator');

const validateSignUpData = (req) => {

  const {name,email,password,skills} = req.body;
  if(!name || !email || !password || !skills){
    console.log(name,email,password,skills);
    throw new Error("Some fields are not fulfilled.")
  }
  else if(!validator.isEmail(email)){
    throw new Error("Email is Invalid!");
  }
  else if(skills && skills.length==0){
    throw new Error("Skill field can't be empty.")
  }
}

const validateEditData = (req) => {
  const allowedFields = ["name", "skills", "experienceLevel", "location"];

  return Object.keys(req.body).every(field =>
    allowedFields.includes(field)
  );
};


module.exports = {validateSignUpData,validateEditData};