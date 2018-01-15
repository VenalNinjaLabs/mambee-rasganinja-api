import mongoose from 'mongoose';

import {
    EXCEPTION
} from '../constants';
import {
    ExceptionFactory
} from '../util';

import mongoosePaginate from 'mongoose-paginate';

const PAGINATION_LIMIT = 10;

let rasgadaSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
        trim: true
    },
    cidade: {
        type: String,
        required: true,
        trim: true
    },
    referencia: {
        type: String,
        required: true,
        trim: true
    },
    comentario: {
        type: String,
        required: true,
        trim: true
    },
    votosPositivos: {
        type: Number,
        default: 0
    },
    votosNegativos: {
        type: Number,
        default: 0
    },
    horario: {
        type: Date,
        default: Date.now
    },
    activated: {
        type: Boolean,
        default: true
    }
});

rasgadaSchema.plugin(mongoosePaginate);

rasgadaSchema.set('toJSON', {
    getters: true,
    virtuals: true,
    transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
})
rasgadaSchema.set('toObject', {
    getters: true,
    virtuals: true,
});

rasgadaSchema.virtual('totalVotos').get(function () {
    return this.votosNegativos + this.votosPositivos;
})

rasgadaSchema.statics.asSearch = function (query, attrs, plus) {
    query = query ? query : '';
    let or = attrs.map(attr => ({
        [attr]: new RegExp(`.*${query}.*`, 'i')
    }));
    return plus ? {
        $and: [{
            $or: or
        }, plus]
    } : {
        $or: or
    };
}

let Rasgada = mongoose.model('Rasgada', rasgadaSchema);

export {
    Rasgada,
    PAGINATION_LIMIT
};