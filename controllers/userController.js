const userModel = require('../models/users');

// const cloudinary = require('../config/cloudinary');
const fs = require('fs');
const bcrypt = require('bcrypt');
const { sendMail } = require("../middleware/email");
const jwt = require('jsonwebtoken');
// const { forgotHtml } = require("../middleware/forgot");
const { registerOTP } = require('../utils/otpMail');
const { forgotHtml } = require('../middleware/forgotMail');


const toTitleCase = (str) => {
  if (!str) return '';
  return str
    .toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });
};


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
     await sendMail(email, subject, registerOTP(user.otp, user.firstName));

    res.status(200).json({
    message: "OTP sent, kindly check your email",
        });
  } catch (error) {
    res.status(500).json({
      mesaage: "Error resending otp: " + error.message,
    });
  }
};

exports.login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const checkUser = await userModel.findOne({where: {email: email.toLowerCase().trim()}});
        const checkPassword = await bcrypt.compare(password, checkUser.password)
        if(!checkUser || !checkPassword){
            return res.status(400).json({message: "Invalid credentials"});
        }
        if (checkUser.isVerified === false){
            return res.status(400).json({
                message: `This email ${checkUser.email} is not verified yet`
            })
        };

        const newUser = {
            id: checkUser.id,
            firstName: checkUser.firstName,
            lastName: checkUser.lastName,
            email: checkUser.email,
            role: checkUser.role
        }

        const token = jwt.sign({id: checkUser.id}, process.env.JWT_SECRET_KEY, {expiresIn: "5m"});
        res.status(200).json({
            message: 'Login successful',
            data: newUser,
            token
        })
    } catch (error) {
        
       console.log(error.message)
        res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        }) 
    }
};

exports.home = async (req, res) => {
    try {
        const checkToken = req.headers.authorization;
        if(!checkToken) {
            return res.status(400).json({message: "Login required"})
        };
        
        const token = req.headers.authorization.split(" ")[1];
        
        jwt.verify(token, process.env.JWT_SECRET_KEY, async(err, result)=>{
        
            if(err){
                res.status(400).json({error: err.message})
            } else{
                const checkcUser = await userModel.findByPk(result.id)
                res.status(200).json({message: `Welcome ${checkcUser.lastName}, we are happy to have you here`});
            }
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        })         
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

exports.verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await userModel.findOne({ where: { email: email.toLowerCase().trim() } });
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (Date.now() > new Date(user.otpExpiredAt).getTime())
      return res.status(400).json({ message: 'OTP expired' });

    if (otp !== user.otp)
      return res.status(400).json({ message: 'Invalid OTP' });

    
    await user.update({ otpVerified: true });

    res.status(200).json({ message: 'OTP verified successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error verifying OTP: ' + error.message });
  }
};

exports.resetPassword = async (req, res) => {
    try {
        const {email, newPassword, confirmPassword} = req.body;
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
        const {oldPassword, newPassword, confirmPassword} = req.body;
        if (!oldPassword || !newPassword || !confirmPassword) {
          return res.status(400).json({
                message: "All fields are required"
            })
        }
        const id = req.user;
        console.log(id);
        
        const user = await userModel.findByPk(id);
        const checkPassword = await bcrypt.compare(oldPassword, user.password);
        if(!checkPassword){
            return res.status(400).json({
                message: "Password does not match your current password"
            })
        }
        const checkExistingPass = await bcrypt.compare(newPassword, user.password);
        if (checkExistingPass){
            return res.status(400).json({
                message: "You cannot use your previous password"
            })
        }
        if (confirmPassword !== newPassword) {
            res.status(400).json({
                message: "New passwords must match"
            })
        } else {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(confirmPassword, salt);

        const updatedPW = {
            password: hashPassword
        }
        await userModel.update(updatedPW, {where: {id}});
        res.status(200).json({
            message: "Password successfully changed"
        })
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        });
    }
};

exports.getOneUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await userModel.findByPk(userId).select('-password -otp -otpExpiredAt ');
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
        const allUsers = await userModel.findAll().select('-password -otp -otpExpiredAt');
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
        const { fullName, age } = req.body;
        const { id } = req.params;
        const file = req.file;
        let response;
        const user = await userModel.findById(id);

        if (!user) {
            return res.status(404).json({message: 'User not found'});
        };

        if (file && file.path) {
            await cloudinary.uploader.upload(file.path)
            fs.unlinkSync(file.path)
        }
        const userData = {
            fullName: fullName ?? user.fullName,
            age: age ?? user.age,
            profiePicture: {
                imageUrl: response?.secure_url,
                publicId: response?.public_id
            }
        };
        const newData = Object.assign(user, userData);
        const update = await userModel.findByIdAndUpdate(user._id, newData, { new: true });
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
}

exports.deleteUser = async (req, res) => {
    try {
        const {id} = req.params;
        const user = await userModel.findById(id);
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
        const user = await userModel.findById(id);
        if (user === null) {
            return res.status(404).json({
                message: "User not found"
            })
        }
        user.isAdmin = true;
        await user.save();
        res.status(200).json({
            message: "User role updated to Admin"
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