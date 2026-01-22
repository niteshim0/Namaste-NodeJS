const userAuth = async (req,res,next) => {

  try {
      const {token} = req.cookies;
  
      const decryptedObj = jwt.verify(token, 'SecretJWTKEY');
      const {_id} = decryptedObj;

      const user = await User.findById(_id);
      req.user = user;
      next();
  } catch (error) {
     return res.status(404).json({
      success : "false",
      message : "Redirect to signup page,token is now expired"
     })
  }
  
}

module.exports = {userAuth};