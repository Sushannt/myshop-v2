import express from "express";
import "dotenv/config";
import dbConn from "./config/db.mjs";
import { notFound, errorHandler } from "./middleware/errorMiddleware.mjs";

// routes
import productRouter from "./routes/productRoutes.mjs";

dbConn(); //connecting to MongoDB

const app = express();

// middleware
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running");
});

// routing middleware
app.use("/api/products", productRouter);

//handling errors
app.use(notFound);
app.use(errorHandler);

app.listen(process.env.PORT || 4001);
