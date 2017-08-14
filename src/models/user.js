import mongoose from 'mongoose';
import { hash, compare } from 'bcrypt';
import isEmail from 'validator/lib/isEmail';

import { EXCEPTION } from '../constants';
import { ExceptionFactory } from '../util';

import { UserRole, UserRoles } from './user.roles';

import mongoosePaginate from 'mongoose-paginate';

const saltRounds = 3;
const PAGINATION_LIMIT = 10;

let userSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        unique: true,
        require: true   
    },
    email: { 
        type: String, 
        trim: true,
        unique: true, 
        required: true,
        validate: {
            validator: email => isEmail(email),
            message: '{VALUE} is not valid email'
        }
    },
    name: { 
        type: String,
        required: true,
        trim: true     
    },
    password: { 
        type: String,
        required: true,
        trim: true    
    },
    role: { 
        type: String,
        enum: UserRoles,
        index: true,
        required: true
    },
    resetPassword: {
        type: Boolean,
        default: true,
        required: true
    },
    actived: {
        type: Boolean,
        default: true
    }
});

userSchema.plugin(mongoosePaginate);

userSchema.set('toJSON', { 
    getters: true,
    virtuals: true,
    transform: function(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        delete ret.password;
        delete ret.resetPassword;
    }
})
userSchema.set('toObject', { 
    getters: true,
    virtuals: true,
    transform: function(doc, ret) {
        delete ret.resetPassword;
    }
});
userSchema.pre('save', function(next) {
    this.constructor
        .find({ role: UserRole.DEFAULT_ADMINISTRATOR })
        .exec()
        .then(users => {
            if(users.length && this.role === UserRole.DEFAULT_ADMINISTRATOR) {
                throw new ExceptionFactory(EXCEPTION.ONLY_ONE_DEFAULT_ADMIN);
            }
            return;
        })
        .then(something => hash(this.password, saltRounds))
        .then(hash => { 
            this.password = hash;
            next();
        })
        .catch(next);
});
userSchema.pre('update', function(next) {
    if(this._update.$set.resetPassword) {
        hash(this._update.$set.password, saltRounds)
            .then(hash => { 
                this._update.$set.password = hash;
                this._update.$set.resetPassword = false;
                next();
            })
            .catch(next);
    }
    next();
});
userSchema.statics.asSearch = function(query, attrs, plus) {
    query = query ? query : '';
    let or = attrs.map(attr => ({ [attr]: new RegExp(`.*${query}.*`, 'i') }));
    return plus ? { $and: [{ $or: or }, plus] } : { $or: or };
}
userSchema.methods.hasSystemRestriction = function(newRole) {
    if(this.role !== UserRole.DEFAULT_ADMINISTRATOR && newRole === UserRole.DEFAULT_ADMINISTRATOR) {
        return new ExceptionFactory(EXCEPTION.ONLY_ONE_DEFAULT_ADMIN);
    } else if(this.role === UserRole.DEFAULT_ADMINISTRATOR && newRole !== UserRole.DEFAULT_ADMINISTRATOR) {
        return new ExceptionFactory(EXCEPTION.AT_LEAST_DEFAULT_ADMIN);
    }
    return false;
}
userSchema.methods.isDefaultAdmin = function() {
    return this.role === UserRole.DEFAULT_ADMINISTRATOR;
}
userSchema.methods.validateCredentials = function(username, pass) {
    return compare(pass, this.password)
        .then(isCorrect => {
            if(this.username === username && isCorrect) return this;
            else return null;
        })
        .catch(err => false);
}
userSchema.virtual('displayName').get(function() {
    let partialsName = this.name.split(' ');
    return partialsName.length > 1 ? `${partialsName[0]} ${partialsName[partialsName.length - 1]}` :
        this.name;
})

let User = mongoose.model('User', userSchema);

export { User, UserRole, PAGINATION_LIMIT };