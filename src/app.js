const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
console.log(partialsPath);

//Setup hbs engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//Setup starting directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Home page",
    name: "Devanshu",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Devanshu",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpMsg: "Hello. I help 🧑‍🚀",
    title: "Help page",
    name: "Devanshu",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Please provide an addresss",
    });
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }
        return res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/help/*", (req, res) => {
  res.render("errorpage", {
    title: "error time boissss",
    errorMsg: "Error smol help",
    name: "Devanshu",
  });
});

app.get("*", (req, res) => {
  res.render("errorpage", {
    title: "error time boissss",
    errorMsg: "Error big",
    name: "Devanshu",
  });
});

app.listen(3000, () => {
  console.log("Server up and running");
});
