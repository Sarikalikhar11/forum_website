const User = require('../models/User');
const { sendMail } = require('../src/EmailEngine');

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

    const checkUser = await User.findOne({ email: email, emailVerified: true });

    if (checkUser) {
      throw new Error('Email Already Exists!');
    }

    const user = new User({
      email: email,
      username: firstname + '' + lastname,
      userid: userid,
      password: password,
    });

    let otp = Math.floor(Math.random().toFixed(5) * 10000000);
    console.log(otp);

    user.otp = otp;
    user.otpExpireTime = new Date(Date.now() + 1000 * 60 * 15);

    let message = `Hello ${firstname} ${lastname} <br>
    welcome our website <br>
    ${otp} is your otp for setting up your account at AskExpert. This otp is valid for 15 mins. <br>
    Ignore this, if this is not done by you <br>
    Thank You`;

    await sendMail(user.email, 'Email VErification', message);

    await user.save();

    res.cookie('validateEmail', user.email, { httpOnly: false });
    res.cookie('validateUserid', user.userid, { httpOnly: false });

    res.redirect('/user/validateOTP');
  } catch (error) {
    res.render('message', { message: error.message });
  }
};

exports.validateOTP = async (req, res, next) => {
  try {
    if (!req.cookies.validateEmail) {
      throw new Error('Something went wrong!');
    }
    if (!req.body.otp) {
      throw new Error('Please send a valid OTP!');
    }
    const { otp } = req.body;

    const checkUser = await User.findOne({
      email: req.cookies.validateEmail,
      emailVerified: true,
    });

    if (checkUser) {
      throw new Error('Email Already Verified');
    }

    const user = await User.findOne({
      email: req.cookies.validateEmail,
      userid: req.cookies.validateUserid,
    });

    console.log(user.otpExpireTime);
    console.log(new Date(Date.now()));
    if (user.otp === otp && new Date(Date.now()) <= user.otpExpireTime) {
      user.emailVerified = true;

      await user.save();
      res.render('message', { message: 'Account Created Successfully!' });
    } else {
      res.render('message', { message: 'Invalid OTP!' });
    }
  } catch (error) {
    res.render('message', { message: error.message });
  }
};

exports.showOTPForm = async (req, res) => {
  try {
    console.log(req.cookies);

    res.render('otp');
  } catch (error) {
    res.render('message', { message: error.message });
  }
};

exports.renderLogin = (req, res) => {
  res.render('login');
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      throw new Error('Please enter valid Email');
    }
    if (!password) {
      throw new Error('Please enter valid Password');
    }

    const user = await User.findOne({ email: email });

    if (!user) {
      throw new Error('Invalid Credentials!');
    }

    let passwordMatch = await user.comparePassword(password);
    console.log(passwordMatch);

    if (passwordMatch) {
      res.redirect('/');
    } else {
      throw new Error('Invalid Credentials!');
    }

    res.render('login');
  } catch (error) {
    res.render('message', { message: error.message });
  }
};
