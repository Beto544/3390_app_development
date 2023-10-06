const User = require('../model/user')
const jwt = require('jsonwebtoken')


exports.createUser = async (req,res) => {
    const {name, email, password} = req.body
    const user = await User.findOne({email})
    if(user) return res
        .status(400)
        .json({sucess:false, error:' email already exists'})
    const newUser = new User({
        name ,
        email ,
        password
    })
    await newUser.save();
    res.send(newUser)
}

exports.signin = async (req,res) => {
    const {email,password} = req.body
    if(!email.trim() || !password.trim) return res
    .status(400)
    .json({sucess:false, error:'email/password missing'});
    
    const user = await User.findOne({email})
    if(!user) return res
    .status(400)
    .json({sucess:false, error:'User not found'});

    const isMatched = await user.comparePassword(password)
    if(!isMatched) return res
    .status(400)
    .json({sucess:false, error:'email/password does not match'});

    const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {
        expiresIn: '1d'
    })
    res.json({success: true, user: {name: user.name, email: user.email, id: user._id, token}})

}