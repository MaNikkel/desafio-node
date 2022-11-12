const express = require("express");

const app = express();
const port = 3000;

const config = {
  host: "db",
  user: "root",
  password: "root",
  database: "nodedb",
};

const mysql = require("mysql");

const connection = mysql.createConnection(config);

const createTableSql = `CREATE TABLE IF NOT EXISTS people (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(255),
  PRIMARY KEY (id)
)`;

connection.query(createTableSql);

const sql = `INSERT INTO people(name) VALUES ('Fritz')`;
const selectSql = `SELECT * FROM people`;

connection.query(sql);

// connection.end();

app.get("/", async (req, res) => {
  // const connection = mysql.createConnection(config);

  connection.query(selectSql, (err, result) => {
    const names = result.map((result) => `<li>${result.name}</li>`).join(" ");

    res.send(`<h1>Full Cycle Rocks! <ul>${names}</ul></h1>`);
  });

  // connection.end();
});

app.listen(port, () => {
  console.log(`rodando na porta ${port}`);
});
