const express = require("express");
const {connectDB} = require("./src/config/db");
// const indexRouter = require("./src/routes/contactRoutes");
const contactRoutes = require("./src/routes/contactRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

connectDB();

app.use("/test", contactRoutes);
app.use("/contacts", contactRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
