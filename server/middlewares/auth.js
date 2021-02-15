const admin = require("../firebase");
const User = require('../models/user')

exports.authCheck = async (req, res, callback) => {
  console.log(req.headers); //should get token

  try {
    const firebaseUser = await admin
      .auth()
      .verifyIdToken(req.headers.authtoken);
    console.log("FIREBASE USER IN AUTH CHECK", firebaseUser);
    req.user = firebaseUser;
    callback();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      error: "Invalid or expired token",
    });
  }
};

exports.adminCheck = async (req, res, callback) => {
  const {email} = req.user
  
  const adminUser = await User.findOne({email}).exec()

  if(adminUser.role !== 'admin') {
    res.status(403).json({
      err: 'Admin resource. Access denied'
    })
  } else {
    callback()
  }
}
