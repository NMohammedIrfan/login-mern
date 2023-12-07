const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');


const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
},
    {
        timestamps:true
    });

    //encrypt user password
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }

    //bcrypt functionality and generating salt for password..
    const salt = await bcrypt.genSalt(10);//more secure the password 
    this.password = await bcrypt.hash(this.password, salt)
})

userSchema.methods.matchPassword=async function(enterPassword){
    return await bcrypt.compare(enterPassword,this.password);
};



const User=mongoose.model('User',userSchema);
module.exports=User;