// lib/dbConnect.ts

import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

const cached = {
  conn: null as typeof mongoose | null,
  promise: null as Promise<typeof mongoose> | null,
};

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    if (!MONGODB_URI) {
      throw new Error(
        'Lütfen .env.local dosyasında MONGODB_URI ortam değişkenini tanımlayın'
      );
    }
    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => mongoose);
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose
      .connect(MONGODB_URI!, opts)
      .then((mongoose) => {
        return mongoose;
      })
      .catch((error) => {
        console.error('Veritabanına bağlanırken bir hata oluştu:', error);
        throw error;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
