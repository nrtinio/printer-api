// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

// const User = require('../models/user');
import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import User from '../models/user';

async function CreateUser(req: Request, res: Response){
    try {
        const hash = bcrypt.hash(req.body.password, 10);

        const user = new User({
            email: req.body.email,
            password: hash,
            role: req.body.role,
            active: false,
            first_name: req.body.firstName,
            last_name: req.body.lastName,
            alias: req.body.alias
        });

        const result = await user.save();

        res.status(201).json({
            ok: true,
            message: 'User created!',
            result
        });
    }catch(err:any) {
        console.log('Error in creating user: ' + err.message);
        res.status(500).json({
            ok: false,
            message: 'Invalid authentication credentials'
        });
    }



        //     user.save()
        //         .then(result => {
        //             res.status(201).json({
        //                 ok: true,
        //                 message: 'User created!',
        //                 result
        //             });
        //         })
        //         .catch(err => {
        //             res.status(500).json({
        //                 ok: false,
        //                 message: 'Invalid authentication credentials'
        //             });
        //         });
        // });
}

async function Login(req: Request, res: Response) {
    try {
        const user = await User.findOne({ email: req.body.email, active: true });

        if(!user) {
            throw new Error(('User not found / inactive'));
        }

        const hashCheckResult = await bcrypt.compare(req.body.password, user.password);

        if(hashCheckResult) {
            const token = jwt.sign(
                { email: user.email, userId: user._id },
                process.env.JWT_KEY,
                { expiresIn: '4h' }
            );
            res.status(200).json({
                token,
                expiresIn: 14400,
                user: {
                    email: user.email,
                    role: user.role,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    alias: user.alias,
                }
            });
        } else {
            throw new Error(('Hash failed'));
        }
    }catch(err: any) {
        console.log('Error in user login: ' + err.message);
        return res.status(401).json({
            message: 'Invalid authentication credentials'
        });
    }
}

async function ResetPassword(req: Request, res: Response) {
    const query= {email: req.body.email};
    // let foundUser;

    // User.findOne(query,{email:1, password:1})
    // .then(user => {
    //     foundUser = user;
    //     return user;
    // })
    // .then(user => {
    //     return bcrypt.hash(req.body.newPassword, 10);
    // })
    // .then(hash => {
    //     foundUser.set('password',hash);
    //     return foundUser;
    // }).then(user => {
    //     return user.save();
    // })
    // .then(result => {
    //     res.status(200).json({
    //         ok: true,
    //         message: 'Password reset successful!'
    //     })
    // })
    // .catch(error => {
    //     console.log(error);
    //     res.status(500).json({
    //         message: 'Password reset failed!'
    //     });
    // });
    try {
        const user = await User.findOne(query,{email:1, password:1});
        const hash = await bcrypt.hash(req.body.newPassword, 10);
        user.set('password', hash);
        await user.save();

        res.status(200).json({
            ok: true,
            message: 'Password reset successful!'
        });
    }catch(err:any) {
        console.log('Error in resetting password: ' + err.message);
        res.status(500).json({
            message: 'Password reset failed!'
        });
    }
}

async function ChangePassword(req: Request, res: Response) {
    const query= {email: req.body.email};
    // let foundUser;

    // User.findOne(query,{email:1, password:1})
    // .then(user => {
    //     foundUser = user;
    //     return user;
    // })
    // .then(user => {
    //     return bcrypt.compare(req.body.oldPassword, foundUser.password);
    // })
    // .then(result => {
    //     if(result){
    //         return bcrypt.hash(req.body.newPassword, 10);
    //     } else {
    //         return;
    //     }
    // })
    // .then(hash => {
    //     if(hash) {
    //         foundUser.set('password',hash);
    //         return foundUser;
    //     } else {
    //         return;
    //     }
    // })
    // .then(user => {
    //     if(user) {
    //         return user.save();
    //     } else {
    //         return;
    //     }
    // })
    // .then(result => {
    //     if(result) {
    //         res.status(200).json({
    //             ok: true,
    //             message: 'Password change successful!'
    //         });
    //     } else {
    //         res.status(200).json({
    //             ok: false,
    //             message: 'Incorrect password'
    //         });
    //     }
    // })
    // .catch(error => {
    //     console.log(error);
    //     res.status(500).json({
    //         message: 'Password change failed!'
    //     });
    // });
    try {
        const user = await User.findOne(query,{email:1, password:1});
        const hashCheckResult = await bcrypt.compare(req.body.oldPassword, user.password);

        if(hashCheckResult) {
            const newHash = await bcrypt.hash(req.body.newPassword, 10);

            user.set('password', newHash);
            await user.save();

            res.status(200).json({
                ok: true,
                message: 'Password change successful!'
            });
        } else {
            res.status(200).json({
                ok: false,
                message: 'Incorrect password'
            });
        }
    }catch(err: any) {
        console.log('Error in changing password');
        res.status(500).json({
            message: 'Password change failed!'
        });
    }
}

async function GetUsersSearch(req: Request, res: Response) {
    const criteria = req.body.criteria;
    const page = req.body.page;
    const limit = req.body.limit;
    let query= {};

    if(criteria) {
        query = {
        $or: [{
            email: { $regex: '.*' + criteria + '.*', $options: 'i' }
        }]
        };
    }

    try {
        const users = await User.find(query,{email:1, role:1, active:1, first_name:1, last_name:1, alias:1}).skip(page*limit).limit(limit).sort({});

        res.status(200).json(users);
    }catch(err: any) {
        console.log('Error in fetching users: ' + err.message)
        res.status(500).json({
            message: 'Fetching users failed!'
        });
    }
}

async function GetUsersSearchCount(req: Request, res: Response) {
    const criteria = req.body.criteria;
    const page = req.body.page;
    const limit = req.body.limit;
    let query= {};

    if(criteria) {
        query = {
        $or: [{
            email: { $regex: '.*' + criteria + '.*', $options: 'i' }
        }]
        };
    }

    try {
        const usersCount = await User.countDocuments(query);

        res.status(200).json(usersCount);
    }catch(err: any) {
        console.log('Error in fetching users count: ' + err.message)
        res.status(500).json({
            message: 'Fetching users count failed!'
        });
    }
}

// exports.toggleActiveStatus = (req, res, next) =>{
//     let query= {email: req.body.email};

//     User.findOne(query,{email:1, active:1})
//     .then(user => {
//         user.set('active',!user.active);
//         return user.save();
//     })
//     .then(result => {
//         res.status(200).json({
//             ok: true,
//             message: "Status change successful!"
//         })
//     })
//     .catch(error => {
//         console.log(error);
//         res.status(500).json({
//             message: "Status change failed!"
//         });
//     });
// }

async function UpdateUser(req: Request, res: Response) {
    const query= {email: req.body.email};
    const updates = JSON.parse(req.body.updates);

    try {
        const result = await User.findOneAndUpdate(query, updates);

        res.status(200).json({
            ok: true,
            message: req.body.command + ' successful'
        });
    }catch(err: any) {
        console.log('Error in updating user: ' + err.message);
        res.status(500).json({
            ok: false,
            message: req.body.command ? req.body.command + ' failed. Server Error' : 'Update failed. Server Error'
        });
    }
}

export default { CreateUser, ChangePassword, GetUsersSearch, GetUsersSearchCount, ResetPassword, UpdateUser, Login }