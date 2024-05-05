import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import ImageService from '../../services/image.service';
import ThemeService from '../../services/theme.service';
import classes from './Home.module.scss';

const srcImage = img => `../../assets/${img}`;

const Home = () => {
  const [themes, setThemes] = useState([]);

  const [images, setImages] = useState([]);
  const [imagesByTheme, setImagesByTheme] = useState([]);

  const [currentTheme, setCurrentTheme] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);

  const [currentImageIndex, setCurrentImageIndex] = useState(null);

  useEffect(() => {
    ImageService.getAll()
      .then(response => setImages(response.data))
      .catch(console.log);

    ThemeService.getAll()
      .then(response => setThemes(response.data))
      .catch(console.log);
  }, []);

  useEffect(() => {
    if (!currentTheme || !images.length) return;
    const filteredImages = images.filter(image => image.theme_id === currentTheme.id);
    setImagesByTheme(filteredImages);
    setCurrentImageIndex(filteredImages.length > 0 ? 0 : null);
  }, [currentTheme]);

  useEffect(() => {
    if (currentImageIndex !== null && currentImageIndex >= 0 && currentImageIndex < imagesByTheme.length)
      setCurrentImage(imagesByTheme[currentImageIndex]);
    else setCurrentImage(null);
  }, [currentImageIndex, imagesByTheme]);

  const nextImage = () => {
    if (currentImageIndex !== null && currentImageIndex < imagesByTheme.length - 1)
      setCurrentImageIndex(prev => prev + 1);
  };

  const prevImage = () => {
    if (currentImageIndex !== null && currentImageIndex > 0) setCurrentImageIndex(prev => prev - 1);
  };

  return (
    <div className={classes.Home}>
      <div className={classes.sideLeft}>
        {themes.map(theme => (
          <div
            key={theme.id}
            className={classNames(classes.option, currentTheme && theme.id === currentTheme.id && classes.selected)}
            onClick={() => setCurrentTheme(theme)}
          >
            {theme.name}
          </div>
        ))}
      </div>

      <div className={classes.content}>
        {currentTheme ? (
          <>
            <div className={classes.themeName}>{currentImage && currentImage.name}</div>
            <div className={classes.images}>
              <div className={classes.arrow} onClick={() => prevImage()}>
                left
              </div>
              {currentImage && <img src={srcImage(currentImage.file)} alt={currentImage.name} />}
              <div className={classes.arrow} onClick={() => nextImage()}>
                right
              </div>
            </div>
            <div className={classes.slider}>slider</div>
          </>
        ) : (
          <>Тема не выбрана</>
        )}
      </div>
    </div>
  );
};

export { Home };
