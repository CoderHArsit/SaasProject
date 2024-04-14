// import { connect } from "http2";
import exp from "constants";
import mongoose,{Mongoose} from "mongoose";
import { cache } from "react";


const MONGODB_URL=process.env.MONGODB_URL;

interface MongooseConnection{
    conn:Mongoose | null;
    promise: Promise<Mongoose> | null;
}

let cached: MongooseConnection=(global as any).mongoose;

if((!cached)){
    cached=(global as any).mongoose={
        conn:null,promise:null
    };
    
}

export const connectToDatabase=async()=>{
    if(cached.conn) return cached.conn;
    if(!MONGODB_URL) throw new Error("Missing MONGODB_URL");
    cached.promise=
        cached.promise ||
        mongoose.connect(MONGODB_URL,{
            dbName:'imaginify',bufferCommands:false
        })
        cached.conn=await cached.promise;

return cached.conn;
}
// Let's walk through the code step by step to understand what it does and how it works.

// 1. **Imports**:
//    - `mongoose` is being imported from the `mongoose` package. Mongoose is a library that makes it easier to interact with a MongoDB database using JavaScript.
//    - `MONGODB_URL` is fetched from the environment variables (likely set elsewhere in your application).

// 2. **Interface**:
//    - An interface `MongooseConnection` is defined with properties `conn` and `promise`. The `conn` property is a Mongoose instance (`Mongoose | null`), and the `promise` property is a promise that resolves to a Mongoose instance (`Promise<Mongoose> | null`).

// 3. **Global Cache**:
//    - The code is using a global variable (`global.mongoose`) to cache the database connection and promise. This means that the code will only attempt to connect to the database if there isn't already a cached connection.
//    - If `global.mongoose` is not initialized, it initializes it with `conn` set to `null` and `promise` set to `null`.

// 4. **`connectToDatabase` function**:
//    - This function returns a database connection. The function does the following:
//        - If there is an existing connection (`cached.conn`), it returns that connection immediately (so that a new connection isn't opened if one already exists).
//        - If `MONGODB_URL` is not set, it throws an error. This is a precaution to ensure that a valid MongoDB connection string is provided.
//        - If there's no existing connection (`cached.conn`), it attempts to connect to the MongoDB database using the `mongoose.connect` method. The connection string (`MONGODB_URL`) and database options (`dbName` and `bufferCommands`) are provided as parameters.
//            - `dbName` specifies the name of the database you want to connect to (in this case, `imaginify`).
//            - `bufferCommands` set to `false` tells Mongoose not to buffer any commands (such as save() or find()) until the connection is established.
//        - The connection promise is stored in `cached.promise`.
//        - Once the connection is established, the resolved Mongoose instance is stored in `cached.conn` and the connection is returned.

// By using a cached connection, the code ensures that the application only establishes one connection to the database and reuses it as needed. This is an efficient approach, especially for applications that perform multiple database operations over time.

