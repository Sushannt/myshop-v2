import mongoose from "mongoose";
import "dotenv/config";

// db config
import dbConn from "./config/db.mjs";

// local files
import users from "./data/users.mjs";
import products from "./data/products.mjs";

// models
import User from "./models/userModel.mjs";
import Order from "./models/orderModel.mjs";
import Product from "./models/productModel.mjs";

dbConn(); //connecting to database

const importData = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();

    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;

    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    await Product.insertMany(sampleProducts);

    console.log("Data Imported...");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();

    console.log("Data Destroyed...");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
