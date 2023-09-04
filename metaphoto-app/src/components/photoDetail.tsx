import { useEffect, useState } from "react";
import { getDetailPhoto } from "../services/photosService";
import { PhotoResponse } from "./type";
import "./photos.style.css";
import { useParams } from "react-router-dom";

const PhotoDetail = () => {
  const [responsoPhoto, setResponsePhoto] = useState<PhotoResponse>();
  const { id } = useParams<{ id: string }>();
  const getDetail = async () => {
    if(!id) return
    const response = await getDetailPhoto(+id);
    setResponsePhoto(response);
  };

  useEffect(() => {
    getDetail();
  }, []);
  return (
    <>
    <a href="/" style={{color: "#fff", background: "#000", padding: "5px 0", margin: "10px 0", width: "150px", display: "block", borderRadius: 10, cursor: "pointer"  }} >Back</a>
      {responsoPhoto && (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "row",
            width: "800px",
            justifyContent: "space-between",
            alignItems: "center",
            color: "black",
            textAlign: "left"
          }}
        >
          <div style={{ width: "50%" }}>
            <img width="100%" src={responsoPhoto.thumbnailUrl} />
          </div>
          <div style={{ width: "50%", padding: "20px", boxSizing:"border-box" }}>
            <p><b>Photo name:</b>. {responsoPhoto.title}</p>
            <p><b>Album name:</b> {responsoPhoto.album.title}</p>
            <div style={{backgroundColor: "#ececec", borderRadius: 5, padding: 10}}>
                <p><b>user information:</b> </p>
                <p><b>email:</b> {responsoPhoto.user.email}</p>
                <p><b>name:</b> {responsoPhoto.user.name}</p>
                <p><b>username:</b> {responsoPhoto.user.username}</p>
                <p><b>phone:</b> {responsoPhoto.user.phone}</p>
                <p><b>website:</b> {responsoPhoto.user.website}</p>
                <p><b>company:</b> {responsoPhoto.user.company.name}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PhotoDetail;
