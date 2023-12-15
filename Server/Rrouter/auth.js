const router = require('express').Router()
const  Crypto=require('crypto-js')
const jwt =require('jsonwebtoken')
const UserData = require('../model/user')




router.post("/sign",async (req, res) => {
    console.log("req-body--", req.body);

    try {
        req.body.password = Crypto.AES.encrypt(req.body.password, process.env.CryptKey).toString()
        const newData = new UserData({
            username:req.body.username,
            email:req.body.email,
            mobile:req.body.mobile,
            address:req.body.address,
            password:req.body.password
        })
        const saveData = await newData.save()
        res.status(200).json(saveData)

    } catch (err) {
        res.status(500).json(err)
    }

})
router.post('/ver', async (req, res) => {
    
    try {
        const Dbd = await UserData.findOne({ email: req.body.emaillog })
        console.log("Dbd---",Dbd);
        !Dbd && res.status(401).json('Please check your email')

        const Hp = Crypto.AES.decrypt(Dbd.password, process.env.CryptKey)
        const Op = Hp.toString(Crypto.enc.Utf8)
        console.log(Op);
        console.log("password check==", Op, req.body.password);
        Op != req.body.password && res.status(401).json('Password and email are not match')

        const accesstoken = jwt.sign({
            id: Dbd._id
        }, process.env.JwtKey, { expiresIn: '1d' })
        
        console.log(accesstoken);
        const { password, ...others } = Dbd._doc
        console.log("endd",{ ...others, accesstoken });
        res.status(200).json({ ...others, accesstoken })
        


    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router
