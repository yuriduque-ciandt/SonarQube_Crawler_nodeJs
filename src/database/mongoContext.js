import mongoose from "mongoose";

class Database {
  static connect() {
    const mongoString = process.env.DATABASE_URL;

    mongoose.connect(mongoString);
    const database = mongoose.connection;

    database.on("error", (error) => {
      console.log(error.message);
    });

    database.once("connected", () => {
      console.log("Database Connected");
    });
  }
}

export default Database;
