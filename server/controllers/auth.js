const User = require("../models/user");

exports.createOrUpdateUser = async (req, res) => {
  // res.json({
  //   data: "Hey you hit create-or-update-user API endpoint",
  // });
  const { name, picture, email } = req.user;

  const user = await User.findOneAndUpdate(
    { email },
    { name, picture },
    { new: true }
  );

  if (user) {
    console.log("USER UPDATED", user);
    res.json(user);
  } else {
    const newUser = await new User({
      email,
      name,
      picture,
    }).save();
    console.log("USER CREATED", newUser);
    res.json(newUser);
  }
};
