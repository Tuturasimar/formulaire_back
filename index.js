require("dotenv").config();
const express = require("express");
const formidable = require("express-formidable");
const cors = require("cors");

const app = express();
app.use(formidable());
app.use(cors());

var API_KEY = MAILGUN_API_KEY;
var DOMAIN = MAILGUN_DOMAIN;
var mailgun = require("mailgun-js")({ apiKey: API_KEY, domain: DOMAIN });

app.get("/", (req, res) => {
  res.json({ message: "Bienvenue...Bienvenue !" });
});

app.post("/form", (req, res) => {
  console.log(req.fields);

  const data = {
    from: "Trévor Sénant <me@samples.mailgun.org>",
    to: res.fields.email,
    subject: "Hello there",
    text: "Thanks for subscribing !",
  };

  mailgun.messages().send(data, (error, body) => {
    console.log(body);
    console.log(error);

    if (error === undefined) {
      res.json({ message: "Données reçues. Un mail a été envoyé" });
    } else {
      res.json({ message: "An error occured" });
    }
  });
});

app.all("*", (req, res) => {
  res.json({ message: "Route introuvable" });
});

app.listen(3000, () => {
  console.log("Server started");
});
