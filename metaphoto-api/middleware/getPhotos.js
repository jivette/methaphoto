const axios = require("axios");

const HEADERS = {
  headers: {
    "Content-Type": "application/json",
  },
};
const getPhotos = async (req, res, next) => {
  try {
    const albumId = parseInt(req.query.albumId) || null;
    const allPhotosResponse = await axios.get(
      `https://jsonplaceholder.typicode.com/photos${albumId ? `?albumId=${albumId}`: ""}`,
      HEADERS
    );

    const pageNumber = parseInt(req.query.pageNumber) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const result = {};
    const totalPosts = allPhotosResponse.data.length;
    let offset = pageNumber * limit;
    const endIndex = (pageNumber + 1) * limit;
    result.totalPosts = totalPosts;

    if (offset > 0) {
      result.previous = {
        pageNumber: pageNumber - 1,
        limit: limit,
      };
    }
    if (endIndex < totalPosts) {
      result.next = {
        pageNumber: pageNumber + 1,
        limit: limit,
      };
    }
    result.rowsPerPage = limit;

    const photosResponse = await axios.get(
      `https://jsonplaceholder.typicode.com/photos?_start=${offset}&_limit=${limit}${albumId ? `&albumId=${albumId}`: ""}`,
      HEADERS
    );

    result.photos = photosResponse?.data ?? [];
    req.photos = result;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = getPhotos;
