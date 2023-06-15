const User = require('../models/User');
const { sendMail } = require('../src/emailengine');

exports.signupUser = (req, res) => {
  res.render('register');
};

exports.createUser = async (req, res) => {
  console.log(req.body);
  try {
    const { password, cpassword, email, userid, firstname, lastname } =
      req.body;
    if (!password) {
      throw new Error('Please enter a valid Password!');
    }
    if (!email) {
      throw new Error('Please enter a valid Email!');
    }
    if (!userid) {
      throw new Error('Please enter a valid Userid!');
    }
    if (!firstname) {
      throw new Error('Please enter a valid Firstname!');
    }
    if (!lastname) {
      throw new Error('Please enter a valid Lastname!');
    }
    if (cpassword !== cpassword) {
      throw new Error('Password does not match! Please enter a valid Password');
    }

    const user = new User({
      email: email,
      username: firstname + '' + lastname,
      userid: userid,
      password: password,
    });

    let otp = Math.floor(Math.random().toFixed(6) * 100000);
    console.log(otp);

    user.otp;
    user.otpExpireTime = new Date(Date.now() + 1000 * 60 * 15);

    let message = `Hello ${firstname}${lastname}
    welcome our website
    ${otp} is your otp for setting up your account at AskExpert. This otp is valid for 15 mins.
    Ignore this, if this is not done by you
    Thank You`;

    await sendMail(user.email, 'Email VErification', message);

    await user.save();

    res.render('register');
  } catch (error) {
    res.render('message', { message: error.message });
  }
};
