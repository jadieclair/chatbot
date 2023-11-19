// Importing required modules and libraries
const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
require("dotenv").config();

// Initializing express application
const app = express();
const port = 3000;
const salt = 10;
const API_KEY = "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";

// Middleware setup
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3001"],
    methods: ["POST", "GET"],
    credentials: true,
  })
);
app.use(cookieParser());

// MySQL connection setup
const db = mysql.createConnection({
  host: "localhost",
  user: "newUser",
  password: "password",
  database: "chat_ai",
});

// Handling MySQL connection errors
db.connect((err) => {
  if (err) {
    console.error("MySQL connection error:", err);
    throw err;
  }
  console.log("Connected to MySQL");
});

// User registration endpoint
app.post("/register", (req, res) => {
  const sql = "INSERT INTO login (`name`, `email`, `password`) VALUES (?)";
  bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
    if (err) return res.json({ Error: "Error hashing password" });
    const values = [req.body.name, req.body.email, hash];
    db.query(sql, [values], (err, result) => {
      if (err) return res.json({ Error: "Error saving data to server" });
      return res.json({ Status: "Successfull" });
    });
  });
});

// User login endpoint
app.post("/login", (req, res) => {
  const sql = "SELECT * FROM login WHERE email = ?";
  db.query(sql, [req.body.email], (err, data) => {
    if (err) return res.json({ Error: "Login Error" });
    if (data.length > 0) {
      bcrypt.compare(
        req.body.password.toString(),
        data[0].password,
        (err, response) => {
          if (err) return res.json({ Error: "Password compare error" });
          if (response) {
            const name = data[0].name;
            const token = jwt.sign({ name }, "jwt-secret-key", {
              expiresIn: "1d",
            });
            res.cookie("token", token);
            return res.json({ Status: "Successfull" });
          } else {
            return res.json({ Error: "Password not matched" });
          }
        }
      );
    } else {
      return res.json({ Error: "No email exists" });
    }
  });
});

// OpenAI completion endpoint
app.post("/completions", async (req, res) => {
  const userMessage = req.body.message;
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: userMessage }],
      max_tokens: 100,
    }),
  };
  try {
    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      options
    );
    const data = await response.json();
    console.log(data);
    res.send(data);
  } catch (error) {
    // Handling errors during the fetch
    console.error(error);
    res.status(500).json({ Error: "Error fetching data from OpenAI" });
  }
});

// Helper function to add extra single quotes
function addExtraSingleQuotes(inputString) {
  let resultString = "";
  for (let i = 0; i < inputString.length; i++) {
    if (inputString[i] === "'") {
      resultString += "''";
    } else {
      resultString += inputString[i];
    }
  }
  return resultString;
}

// Save data endpoint
app.post("/saveData", function (req, res) {
  // Insert post into the 'questions' table
  console.log(req.body.message);
  const promptInput = req.body.message[0].prompt;
  const resultInput = req.body.message[0].result;

  const prompt = addExtraSingleQuotes(promptInput);
  const result = addExtraSingleQuotes(resultInput);

  const sql =
    "INSERT INTO questions (questions, answer) VALUES ('" +
    prompt +
    "', '" +
    result +
    "')";

  db.query(sql, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error saving data to the database");
    }
    console.log("Post saved to the database");
    res.status(200).send("Post saved successfully");
  });
});

// Get chat history endpoint
app.get("/getHistory", async function (req, res) {
  const sql = "SELECT * FROM chat_ai.questions";

  db.query(sql, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error fetching chat history");
    }
    res.send(result);
  });
});

// Logout endpoint
app.get("/logout", (req, res) => {
  res.clearCookie("token");
  const sql = "DELETE FROM chat_ai.questions";
  db.query(sql, (err, response) => {
    if (err) {
      console.error(err);
    }
  });
});

// Server listening on port 3000
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
