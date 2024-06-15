import mongoose, {Mongoose} from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL!

interface MongooseConn {
    conn: Mongoose;
    promise: Promise<Mongoose>
}

let cached: any = (global as any).mongoose;

if (!cached) {
    cached = (global as any).mongoose = {
        conn: null,
        promise: null
    }
}


export const connect = async () => {
    if (cached.conn) return cached.conn
    
    cached.promise = cached.promise || mongoose.connect(MONGODB_URL, {
        dbName: 'survey-db',
        bufferCommands: false,
        connectTimeoutMS: 30000
    })

    cached.conn = await cached.promise;

    return cached.conn
}