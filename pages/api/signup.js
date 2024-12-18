import configDB from '@/app/lib/configDB';
import User from '@/models/User';
import bcrypt from 'bcrypt'

const Signup = async (req,res) => {

    if(req.method === "POST"){
        const {name, username, email, password} = req.body;
        if(!name || !username || !email || !password){
            return res.status(400).json({message: "All fields are required"})
        }
    }
    
    try{
        await configDB()

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const existingUser = await User.findOne({ $or: [{username}, {email}]})
        if(existingUser){
            return res.status(400).json({message: "Username or email already exists"})
        }

        const user = new User({
            name,
            username,
            email,
            password: hashedPassword,
            profileImage,
            bio
        })

        await user.save()
        res.status(200).json({message: "User created successfully"})
    }catch(error){
        return res.status(401).json({message: "Error Creating User"})
    }
}

export default Signup