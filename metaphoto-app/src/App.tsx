import './App.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Photos from './components/photos';
import PhotosDetail from './components/photoDetail';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Photos/>,
  },
  {
    path: "/:id",
    element: <PhotosDetail/>,
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
