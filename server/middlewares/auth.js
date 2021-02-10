const admin = require("../firebase");

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
