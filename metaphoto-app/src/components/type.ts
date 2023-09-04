export interface Photo {
  albumId: number;
  id: number;
  thumbnailUrl: string;
  title: string;
  url: string;
}

export interface PhotosResponse {
  photos: Photo[];
  rowsPerPage: number;
  totalPosts: number;
  next: {
    limit: number;
    pageNumber: number;
  };
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export interface Album {
  userId: number;
  id: number;
  title: string;
}

export interface PhotoResponse extends Photo {
  user: User;
  album: Album;
}
