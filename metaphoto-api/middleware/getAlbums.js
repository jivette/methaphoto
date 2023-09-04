const axios = require("axios");

const HEADERS = {
  headers: {
    "Content-Type": "application/json",
  },
};
const getAlbums = async (req, res, next) => {
  try {
    const albumsResponse = await axios.get(
      `https://jsonplaceholder.typicode.com/albums`,
      HEADERS
    );

    req.albums = albumsResponse.data ?? [];
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = getAlbums;
