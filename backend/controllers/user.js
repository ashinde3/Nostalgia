import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

export const signin = async (req,res) => {
    const {email,password} = req.body;

    try {
        const isUserExisting = await User.findOne({email});

        if(!isUserExisting) return res.status(404).json({message: "User doesn't exist"});

        const isPasswordCorrect = await bcrypt.compare(password,isUserExisting.password);

        if(!isPasswordCorrect) return res.status(400).json({messsage: "Invalid credentials. Try again."});

        const token = jwt.sign({email: isUserExisting.email, id: isUserExisting._id}, 'test', {expiresIn: "1h"});

        res.status(200).json({result: isUserExisting, token});
    } catch (error) {
        //console.log(error);
        res.status(500).json({message: 'Something went wrong. Try again.'});
    }
}

export const signup = async (req,res) => {
    const {email, password, confirmPassword, firstName, lastName} = req.body;

    try {
        const isUserExisting = await User.findOne({email});

        if(isUserExisting) return res.status(400).json({message: "User already exists. Sign In"});

        if(password !== confirmPassword) return res.status(400).json({message: "Passwords don't match."});

        const hashPassword = await bcrypt.hash(password, 12);

        const result = await User.create({email, password: hashPassword, name: `${firstName} ${lastName}`});
        
        const token = jwt.sign({email: result.email, id: result._id}, 'test', {expiresIn: "1h"});

        res.status(200).json({result, token});
    } catch (error) {
        res.status(500).json({message: 'Something went wrong. Try again.'});
    }
}