const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const {Schema} = mongoose;

const adminSchema = new Schema({
    emailad: String,
    passwordad: String,
});


adminSchema.methods.encryptPassword=(password)=>{
    return bcrypt.hashSync(password,bcrypt.genSaltSync(10));
};

adminSchema.methods.comparePassword= function(password){
    return bcrypt.compareSync(password, this.password);
}

module.exports= mongoose.model('admin',adminSchema);