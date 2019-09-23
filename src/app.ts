import morgan from "morgan";
import express from "express";
import mongoose from "mongoose";
import bluebird from "bluebird";
import {errors} from "celebrate";
import bodyParser from "body-parser";

import router from "./routes/index"; // TODO do not use index
import {errorHandler, routeNotFound, transformApiErrors} from "./middlewares/error";

// Create Express server
const app = express();

const {MONGODB_URI} = process.env;
// Connect to MongoDB
const mongoUrl = MONGODB_URI;
mongoose.Promise = bluebird;
mongoose.connect(mongoUrl, {poolSize: 5, useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
    console.log("  Connected with MongoDB %s", MONGODB_URI,);
}).catch(err => {
    console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
    process.exit();
});

// Express configuration
app.use(morgan("tiny"));
app.set("port", process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(errors());

// Register all routes
app.use("/api", router);

// Transform API error middleware
app.use(transformApiErrors); // TODO enhance

// API error handling middlewares
app.use(errorHandler);
app.use(routeNotFound);

export default app;
