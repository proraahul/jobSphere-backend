import express, { urlencoded } from "express";
import connectDB from "./db/connection.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
// import cors from "cors";
import bodyParser from "body-parser";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";
// const BASE_URL = process.env.BASE_URL;

dotenv.config();
// connect db
connectDB();
const PORT = process.env.PORT || 8080;
const app = express();


// middleware
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}))
app.use(urlencoded({extended:true}));
app.use(cookieParser());
// app.use(cors({
//     origin: "https://jobsphere-backend.onrender.com",
//     credentials: true
// }));
// console.log(`Allowed CORS origin: ${BASE_URL}`);
// const allowedOrigins = ['http://localhost:5173'];


// const corsOptions = {
//     origin: function (origin, callback) {
//         if (!origin || allowedOrigins.indexOf(origin) !== -1) {
//             callback(null, true);
//         } else {
//             callback(new Error('Not allowed by CORS'));
//         }
//     },
//     credentials: true,
// };

// app.use(cors(corsOptions));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://jobsphere-backend.onrender.com');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});



// api's route
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

app.listen(PORT, () => {
    console.log(`server running at port ${PORT}`);
});
