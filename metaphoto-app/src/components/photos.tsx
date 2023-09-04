import {useEffect, useState} from "react";
import { getPhotos, getAlbums } from "../services/photosService";
import { Album, PhotosResponse } from "./type";
import ReactPaginate from 'react-paginate';
import "./photos.style.css";

const Photos = () => {
  const [responsoPhoto, setResponsePhoto] = useState<PhotosResponse>();
  const [rowPerPage, setRowPerPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [albumsResponse, setAlbumsResponse] = useState<Album[]>();
  const [selectedAlbum, setSelectedAlbum] = useState<number>(0);
    
  const getPhotosApi = async (pageNumber?: number, limit?: number, albumID?: number) => {
      const response = await getPhotos(pageNumber, limit, (albumID && albumID > 0 ? albumID : undefined));
      setResponsePhoto(response);
      setCurrentPage(response.next.pageNumber - 1)
    };

  const getAlbumsApi = async () => {
      const response = await getAlbums();
      setAlbumsResponse(response);
    };

    useEffect(() => { 
    getPhotosApi(currentPage, rowPerPage);
  }, [rowPerPage]);


  useEffect(() => { 
    getAlbumsApi();
  }, []);

  useEffect(() => { 
  }, [responsoPhoto]);

    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        getPhotosApi(selectedPage, rowPerPage, selectedAlbum)
    };
    
    const handleAlbum = (albumID: number) => {
        setSelectedAlbum(albumID)
        getPhotosApi(currentPage, rowPerPage, albumID)
    }
    return (
        <div style={{display: "flex", flexWrap: "wrap", flexDirection: "row", justifyContent:"space-between"}}>
            
            <div style={{width: "100%", margin: "20px 0", display: "flex", alignItems: "flex-end"}}>
                <div  style={{width: 200, height: 60, textAlign: "left"}}>
                    <label style={{color: "#000"}}>Album</label>
                    <select value={selectedAlbum} onChange={(event)=>handleAlbum(+event.target.value)} style={{width: 200, height: 30}}>
                        <option value={0} disabled>Select option</option>
                        {albumsResponse && albumsResponse.map(album=>{
                            return(<option value={album.id}>{album.title}</option>)
                        })
                        }
                    </select>
                </div>
                {selectedAlbum > 0 &&
                    <a style={{padding: 5, background: "#000", color: "#fff",borderRadius: 15, margin: "5px 11px", width: 100}} onClick={()=> getPhotosApi(0, rowPerPage)}>Reset</a>
                }
            </div>
            {responsoPhoto && responsoPhoto.photos.length > 0 && responsoPhoto.photos.map((photo, index) => {
                return(
                    <a href={`/${photo.id}`} style={{width: "18%", marginBottom: 10, border: "1px solid #ccc", borderRadius: 5}} key={index}>
                        <img width="100%" src={photo.thumbnailUrl} />
                        <p style={{color : "#000", fontSize: 10, textAlign: "left", padding: 10}}>{photo.title}</p>
                    </a>
                )
            })
            }
            <div style={{display: "flex", color: "#000", alignItems: "center", justifyContent: "space-between", width: "100%", marginTop: 40}}>
            {responsoPhoto &&

            <ReactPaginate
                  previousLabel={"prev"}
                  nextLabel={"next"}
                  breakLabel={"..."}
                  breakClassName={"break-me"}
                  pageCount={(responsoPhoto.totalPosts / responsoPhoto.rowsPerPage)}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={5}
                  onPageChange={handlePageClick}
                  containerClassName={"pagination"}
                  subContainerClassName={"pages pagination"}
                  activeClassName={"active"}/>
            }
            <div style={{display: "flex", color: "#000", alignItems: "center", justifyContent: "space-between", width: 200}}>
                Row per page
                <select value={rowPerPage} onChange={(event)=> setRowPerPage(+event.target.value)} style={{width: 80, height: 30}}>
                    <option>10</option>
                    <option>15</option>
                    <option>20</option>
                </select>
            </div>
            </div>
        </div>
    )
}

export default Photos;