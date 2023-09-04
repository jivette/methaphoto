const axios = require("axios");

const HEADERS = {
  headers: {
    "Content-Type": "application/json",
  },
};
const getDetailPhoto = async (req, res, next) => {
  try {
    const photoResponse = await axios.get(
      `https://jsonplaceholder.typicode.com/photos/${req.params.id}`,
      HEADERS
    );

    const albumResponse = await axios.get(
      `https://jsonplaceholder.typicode.com/albums/${photoResponse.data.albumId}`,
      HEADERS
    );
    const userResponse = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${albumResponse.data.userId}`,
      HEADERS
    );


    const photo = {
      ...photoResponse.data,
      album: {...albumResponse.data},
      user: {...userResponse.data}
    };
    req.photo = photo;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = getDetailPhoto;
