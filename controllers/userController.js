const userModel = require('../models/users');

const cloudinary = require('../config/cloudinary');
const fs = require('fs');
const bcrypt = require('bcrypt');
const { sendMail } = require("../middleware/email");
const jwt = require('jsonwebtoken');
const { registerOTP } = require('../utils/otpMail');
const { forgotHtml } = require('../middleware/forgotMail');
const { generateToken, toTitleCase } = require('../utils/extras');


exports.register = async (req, res) => {
    try {
        const { firstName, lastName, email, password, confirmPassword, role } = req.body;
        const existingEmail = await userModel.findOne({ where: {email: email.toLowerCase().trim()} });

        if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
        }

        if(existingEmail) {
            return res.status(400).json({
                messasge: 'Email already registered'
            })
        }

        const saltRound = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, saltRound);
        const otp = Math.floor(100000 + Math.random() * 900000).toString();;
        
        let firstNameCase = toTitleCase(firstName);
        let lastNameCase = toTitleCase(lastName);

        const user = await userModel.create({
            firstName: firstNameCase,
            lastName: lastNameCase,
            email: email.toLowerCase().trim(),
            password: hashPassword,
            role,
            otp: otp,
            otpExpiredAt: Date.now() + 1000 * 120
        });
       
        const subject = "Email Verification";
        await sendMail(user.email, subject, registerOTP(user.otp, user.firstName));

        const token = generateToken(user.id, user.role);

        const newUser = {
            firstNameCase,
            lastNameCase,
            email: email.toLowerCase().trim(),
            role
        }
        res.status(201).json({
            message: "User registered successfully",
            verify_account: `Click on Verification link sent to ${user.email}`,
            data: newUser,
            token
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        })
    }
};

exports.verifyEmail = async (req, res) => {
  try {
    const { otp, email } = req.body;
    const user = await userModel.findOne({ where: {email: email.toLowerCase().trim()} });

    if (!user) {
      return res.status(404).json({
        message: "user not found",
      });
    }
    if (Date.now() > new Date(user.otpExpiredAt).getTime()) {
        return res.status(400).json({
        message: "OTP expired",
      });
    }

   if (String(otp).trim() !== String(user.otp).trim()) {
      return res.status(400).json({ message: "Invalid OTP" });
   }

    const updateUser = {
    isVerified: true,
    otp: null,
    otpExpiredAt: null,
    }

    await userModel.update(updateUser, {where: {email: email}})
    res.status(200).json({
      message: "User verified successfully",
    });
  } catch (error) {
    res.status(500).json({
      mesaage: "Error verifying user" + error.message,
    });
  }
};

exports.resendCode = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await userModel.findOne({ where: {email: email.toLowerCase().trim() }});

    if (!user) {
      return res.status(404).json({
        message: "user not found",
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const resendOtp = {
         otp: otp, 
         otpExpiredAt: Date.now() + 1000 * 120 
    }
    await userModel.update(resendOtp, {where: {email: email.toLowerCase().trim()}});

    const subject = "Email Verification Code Resent";
     await sendMail(email, subject, registerOTP(otp, user.firstName));

    res.status(200).json({
    message: "OTP resent successfully, kindly check your email",
        });
  } catch (error) {
    res.status(500).json({
      mesaage: "Error resending OTP: " + error.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const checkUser = await userModel.findOne({ where: { email: email.toLowerCase().trim() } });

    if (!checkUser) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const checkPassword = await bcrypt.compare(password, checkUser.password);
    if (!checkPassword) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    if (!checkUser.isVerified) {
      return res.status(400).json({
        message: `This email ${checkUser.email} is not verified yet`,
      });
    }
    
    const newUser = {
      id: checkUser.id,
      firstName: checkUser.firstName,
      lastName: checkUser.lastName,
      email: checkUser.email,
      role: checkUser.role,
    };

    const token = jwt.sign(
      { id: checkUser.id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "5m" }
    );

    res.status(200).json({
      message: "Login successful",
      data: newUser,
      token,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

exports.home = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "Login required. No token provided." });
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, result) => {
      if (err) {
        return res.status(401).json({ message: "Invalid or expired token", error: err.message });
      }

      const checkUser = await userModel.findByPk(result.id);
      if (!checkUser) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({
        message: `Welcome ${checkUser.lastName}, we are happy to have you here`,
      });
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

exports.forgotPassword = async (req, res) => {
    try {
        const {email} = req.body;
        const checkEmail = await userModel.findOne({where: {email: email.toLowerCase().trim()}});
      
        if(!checkEmail){
            return res.status(400).json({
                message: 'Invalid email address provided'})
        };
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        
        const forgotOtp = {
         otp: otp, 
         otpExpiredAt: Date.now() + 1000 * 240
         }
         await userModel.update(forgotOtp, {where: {email: email.toLowerCase().trim()}});

        const subject = 'Reset Password';
        await sendMail(checkEmail.email, subject, forgotHtml(otp, checkEmail.firstName));
        res.status(200).json({
            message: 'Kindly check your email for instructions'
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        })  
    }
};


exports.verifyResetPasswordOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP are required" });
    }
    const user = await userModel.findOne({ where: { email: email.toLowerCase().trim() } });
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (Date.now() > new Date(user.otpExpiredAt).getTime())
      return res.status(400).json({ message: 'OTP expired' });

    if (String(otp).trim() !== String(user.otp).trim()) {
      return res.status(400).json({ message: "Invalid OTP" });
   }

    await user.update({ otpVerified: true, otp: null, otpExpiredAt: null});

    res.status(200).json({ message: 'OTP verified successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error verifying OTP: ' + error.message });
  }
};

exports.resetPassword = async (req, res) => {
    try {
        const {email, newPassword, confirmPassword} = req.body;
        if (!email || !newPassword || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }
        if(newPassword !== confirmPassword) {
            return res.status(400).json({messsage: "Password do not match"})
        };
        const user = await userModel.findOne({where: {email: email.toLowerCase().trim(), otpVerified: true}})

        const saltRound = await bcrypt.genSalt(10);
        const hashedPW = await bcrypt.hash(confirmPassword, saltRound);
        
        const updatedPW =  {password: hashedPW, otp: null, otpVerified: false, otpExpiredAt: null}
       
        await user.update(updatedPW);
        res.status(200).json({
            message: "Password reset successful"
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            message: 'Internal Server Error',
            error: 'Error resetting password' + error.message
        })  
    }
};

exports.changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword, confirmPassword } = req.body;

    if (!oldPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const id = req.user.id;
    const user = await userModel.findByPk(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const validOld = await bcrypt.compare(oldPassword, user.password);
    if (!validOld) {
      return res.status(400).json({
        message: "Old password is incorrect",
      });
    }

    const sameAsOld = await bcrypt.compare(newPassword, user.password);
    if (sameAsOld) {
      return res.status(400).json({
        message: "You cannot reuse your previous password",
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        message: "New passwords must match",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(confirmPassword, salt);
    await user.update({ password: hashedPassword });

    return res.status(200).json({
      message: "Password successfully changed",
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

exports.getOneUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await userModel.findOne({attributes:  { exclude: ['password', 'otp', 'otpExpiredAt', 'otpVerified'] }}, {where:{userId}})
        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }
        res.status(200).json({
            message: 'User retrieved successfully',
            data: user
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        });
    }
};

exports.getAll = async (req, res) => {
    try {
        const allUsers = await userModel.findAll({ attributes: { exclude: ['password', 'otp', 'otpExpiredAt', 'otpVerified'] }});
        if (allUsers < 1) {
             res.status(200).json({
                message: `User's database is empty`
            })
        } else {
            res.status(200).json({
                message: `All users present in the database are ${allUsers.length}`,
                data: allUsers
            });
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        });
    }
}

exports.update = async (req, res) => {
    try {
        const { firstName, lastName } = req.body;
        const { id } = req.params;
        const file = req.file;
        let response;
        const user = await userModel.findByPk(id);

        if (!user) {
            return res.status(404).json({message: 'User not found'});
        };

        console.log(file);
            console.log('path: ', file.path);
        if (file && file.path) {
            response = await cloudinary.uploader.upload(file.path)
            fs.unlinkSync(file.path)
        }
        const userData = {
            firstName: firstName ?? user.firstName,
            lastName: lastName ?? user.lastName,
            profileImage: {
                publicId: response?.public_id,
                Url: response?.secure_url,
                
            }
        };
        const newData = Object.assign(user, userData);
        const update = await userModel.update(newData, { where: {id} });
        res.status(200).json({
            message: 'User updated successfully',
            data: update
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const {id} = req.params;
        const user = await userModel.findByPk(id);
        if(!user){
            return res.status(404).json({message: 'User not found'});
        }
        await userModel.destroy({where: {id}});
        res.status(200).json({
            message: 'User deleted successfully'
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        });
    }
};

exports.makeAdmin = async (req, res) => {
    try {
        const {id} = req.params;
        const user = await userModel.findByPk(id);
        if (user === null) {
            return res.status(404).json({
                message: "User not found"
            })
        }
        await user.update({isAdmin: true}, {where: {id}})
        res.status(200).json({
            message: "User's role updated to Admin"
        });
        } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        });
    }
};

exports.googleAuthLogin = async (req, res) => {
    try {
        const token = await jwt.sign({
            id: req.user.id,
            email: req.user.email,
            isAdmin: req.user.isAdmin
        }, "secretKey", {expiresIn: "1hr"})
        // res.redirect('/')

        res.status(200).json({
            message: 'Login successful',
            data: req.user.fullName,
            token
        })
    } catch (error) {
        res.status(500).json({
            message: "Error logging with Google: " + error.message
        })
    }
}
 exports.auth = (req,res,next)=>{
  const {role} = req.query;
  const state = Buffer.from(JSON.stringify({ role })).toString('base64')
    passport.authenticate("google", {scope: ['profile', 'email'],state})(req,res,next)
    
 }
  exports.user = passport.authenticate("google",{successRedirect:'/success', failureRedirect:'/failure'})

  exports.success = (req,res)=>{
      res.status(200).json({
        message:'user authenticated successfully',
        data:req.user
      })
  }
  exports.failure = (req,res)=>{
    res.status(401).json({
      message:'something went wrong'
    })
  }