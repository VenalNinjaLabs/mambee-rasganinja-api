import mongoose from 'mongoose';

export class MongoFactory {

    constructor() {
        this.instance = null;
        this.connect();
    }

    static getInstance() {
        if(!this.instance) {
            this.connect();
        }
        return this.instance;
    }

    static connect() {
        mongoose.Promise = global.Promise;
        mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`);
        this.instance = mongoose.connection;
    }
}