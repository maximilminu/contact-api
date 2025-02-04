const { DataSource } = require("typeorm");
const Contact = require("../entities/Contact");
require("dotenv").config();

const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true, 
  entities: [Contact],
});

const connectDB = () => {
  AppDataSource.initialize()
    .then(() => {
      console.log("Database connected successfully");
    })
    .catch((error) => {
      console.error("Database connection error:", error);
    });
};

module.exports = { connectDB, AppDataSource };