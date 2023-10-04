const User = require('../model/user')

exports.createUser = async (req,res) => {
    const {name, email, password} = req.body
    const user = await User.find({email})
    if(user) res.status(400).json({sucess:false, error:' email already exists'})
    const newUser = new User({
        name ,
        email ,
        password
    })
    await newUser.save();
    res.send(newUser)
}