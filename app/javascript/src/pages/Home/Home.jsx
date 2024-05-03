import React, { useEffect, useState } from 'react';
import imageService from '../../services/image.service';

const Home = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    imageService
      .getAll()
      .then(response => console.log(response.data))
      .catch(console.log);
  }, []);

  return (
    <div>
      <h2>Images</h2>
      {/* {images.map(image => (
        <label>{image.name}</label>
      ))} */}
    </div>
  );
};

export { Home };
