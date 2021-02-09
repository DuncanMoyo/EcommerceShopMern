const admin = require("../firebase");

exports.authCheck = (req, res, callback) => {
  console.log(req.headers); //should get token
  callback();
};
