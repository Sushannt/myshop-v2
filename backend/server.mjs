import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import dbConn from "./config/db.mjs";
import { notFound, errorHandler } from "./middleware/errorMiddleware.mjs";

// routes
import productRouter from "./routes/productRoutes.mjs";
import userRouter from "./routes/userRoutes.mjs";
import orderRouter from "./routes/orderRoutes.mjs";

dbConn(); //connecting to MongoDB

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); //cookie parsing middleware

app.get("/", (req, res) => {
  res.send("API is running");
});

// routing middleware
app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);
app.use("/api/paypal/config", (req, res) => {
  res.json({ clientId: process.env.PAYPAL_CLIENT_ID });
});

//handling errors
app.use(notFound);
app.use(errorHandler);

app.listen(process.env.PORT || 4001);
