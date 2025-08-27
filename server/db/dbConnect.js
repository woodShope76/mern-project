// import { connect } from "mongoose";

// const dbConnect = async () =>{
//     await connect('mongodb://127.0.0.1:27017/FurAgain')
//     console.log("db connect");
    
// };

// export default dbConnect;

import { connect } from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // 🔁 Load variables from .env file

const dbConnect = async () => {
  const uri = process.env.MONGO_URI;
  await connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("✅ MongoDB Atlas connected");
};


export default dbConnect;

