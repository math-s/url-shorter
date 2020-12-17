import * as Mongoose from 'mongoose'
//import { UserModel } from './users/users.model'

let database: Mongoose.Connection

export const connect = () => {
    const uri = "mongodb://127.0.0.1:27017/?compressors=disabled&gssapiServiceName=mongodb"

    if(database){
        return;
    }

    Mongoose.connect(uri, {
        useNewUrlParser: true, 
        useFindAndModify:true, 
        useUnifiedTopology: true, 
        useCreateIndex: true
    })

    database = Mongoose.connection

    database.once('open', async () => {
        console.log('connected to database')
    })
    database.on('error', ()=>{
        console.log('database connection error')
    })
}

export const disconnect = () => {
    if (!database){
        return
    }
    Mongoose.disconnect
}