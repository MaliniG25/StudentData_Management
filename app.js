require("dotenv").config();
const Departmentroutes = require("./routes/department.js");
const Studenttroutes = require("./routes/student.js");
const express = require("express");
const db = require("./db/index.js");

const app = new express();
const port = process.env.PORT || 8080;
db();
app.use(express.json());
app.use("/movies",movieRoutes);

app.listen(port, () => {
    console.log(`Express app listening at http://localhost:${port}`);
});