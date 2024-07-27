import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const SALT_ROUNDS = 10
const userSchema = mongoose.Schema({
    username: {type: String, required: true, unique:true, match: /^[A-Za-z0-9]+$/},
    email: {type: String, required:true, uinique:true, match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        validate:{ 
        validator: function(value){
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
        },
        message: 'Invalid email address format', },
    },
    password: {type: String, required:true, validator:function(v){
        return /[!@#$%^&*(),.?":{}|<>]/.test(v)
    }, message: props=>{`${props.value} must contain at least one special character`}}
})

//Remove password from response
userSchema.set('toJSON', {
    transform: function(doc,ret){
        delete ret.password
        return ret
    },
})

userSchema.pre('save', function(next){
    const user = this
    if(!user.isModified('password')) return next()

    bcrypt.hash(user.password, SALT_ROUNDS)
    .then(hash =>{
        user.password = hash
        next()
    })
    .catch(error =>{
        console.log('hash error', {error})
        next(error)
    })
})

userSchema.methods.comparePassword = function(trypassword, cb){
    bcrypt.compare(trypassword, this.password, cb)
}

const User = mongoose.model('User', userSchema)

export default User