import axios from "axios";


    export const getPhotos = async (pageNumber?: number, limit?: number, albumID?: number) => {
        let url = 'http://localhost:3000/photos';
        if(pageNumber !== undefined && limit !== undefined) {
            url = `${url}?pageNumber=${pageNumber}&limit=${limit}`;
        }
        if(albumID) {
            url = `${url}&albumId=${albumID}`
        }
        const response = await axios.get(url);
      
        return response.data.data;
    };


    export const getDetailPhoto = async (id: number) => {
        const url = `http://localhost:3000/photos/${id}`;
        const response = await axios.get(url);
      
        return response.data.data;
    };

    export const getAlbums = async () => {
        const url = `http://localhost:3000/albums`;
        const response = await axios.get(url);
      
        return response.data.data;
    };
