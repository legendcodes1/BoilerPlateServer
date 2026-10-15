import mongoose from 'mongoose';

async function dbConnect(mongoUri: string) {
  try {
    const connection = await mongoose.connect(mongoUri, {
      autoIndex: true,
      autoCreate: true,
    })

    console.log("mongoose connected")

    return connection;
  } catch (error) {
    console.error("src/config/db.connect.ts: error =", error)
  }
}

export default dbConnect;