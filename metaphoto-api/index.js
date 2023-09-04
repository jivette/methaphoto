const { response } = require("express");
const {useAPIResponse} = require('./utils/useAPIResponse');
const getPhotos = require('./middleware/getPhotos');
const getDetailPhoto = require('./middleware/getDetailPhoto');
const cors = require('cors');
const getAlbums = require("./middleware/getAlbums");


const express = require("express"),
  path = require("path"),
  app = express(),
  port = 3000;

const { sendIterableItems } = useAPIResponse();

app.use(cors('*'));

app.get("/", (req, response) => {
  let agentUser = req.header("user-agent");
  response.send("La ruta / solicitada con: " + agentUser);
});

app.get("/photos", getPhotos, async (req,res, next) => {
  try {
    const payload = req?.photos;
    return sendIterableItems(payload, res);
  } catch (error) {
    return next(error);
  }
});

app.get("/photos/:id", getDetailPhoto, async (req,res, next) => {
  try {
    const payload = req?.photo;
    return sendIterableItems(payload, res);
  } catch (error) {
    return next(error);
  }
});

app.get("/albums", getAlbums, async (req,res, next) => {
  try {
    const payload = req?.albums;
    return sendIterableItems(payload, res);
  } catch (error) {
    return next(error);
  }
});

app.listen(port, (err) => {
  if (err) {
    console.error("Error escuchando: ", err);
    return;
  }
  console.log(`Escuchando en el puerto :${port}`);
});
