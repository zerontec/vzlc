const {User}= require('../db')
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const {Op} = require ('sequelize');




async function validateResetToken({token}){
const user = await User.findOne({

    where:{
        resetToken: token,
        resetTokenExpires:{[Op.gt]: Date.now}
    }
});

if(!user) throw 'Invalid Token';

return user;

}

/**
 * This function takes a password as an argument, and returns a promise that resolves to the hashed
 * password.
 * @param password - The password to hash.
 * @returns The hashed password.
 */

async function hash(password) {
    return await bcrypt.hash(password, 10);
  }


  /**
 * It generates a random string of 40 hexadecimal characters.
 * @returns A random string of 40 hexadecimal characters.
 */

const randomTokenString = () => {

return crypto.randomBytes(40).toString('hex');


}


async function forgotPassword({email}, origin){

const user = await User.findOne({where:{email}});
if(!user) return; 

//create reset token expire 24 hours
user.resetToken = randomTokenString();
user.resetTokenExpires = new Date(Date.now() +24 *60*60*100);
await user.save();

//send Email
await sendPasswordResetEmail(user, origin);


}


async function resetPassword  ({token, password})  {

     const  user = await validateResetToken({token});
    //update passwors and remove reset token

    user.password = await hash(password);
    user.passwordReset = Date.now();
    user.resetToken= null,
    await user.save();


}

async function sendPasswordResetEmail(user, origin){

let message;
if(origin){

const resetUrl = `${origin}/reset-password?token=${user.resetToken}`;
message = `<p>Please click the below link to rerset your password, the link will be valid for 1 day   </p>`
        `<p> <a href='${resetUrl}'>${resetUrl}</a>  </p>`
}else{

message = `<p>Please use the below token to reset your password with the <code>/user/reset-password</code> api route:</p>
<p><code>${user.resetToken}</code></p>`;

}
await sendEmail({

to:user.email,
subject: 'Venezuela Construction',
html:`<h4>Reset Password Email</h4>
${message}`,

})
}





