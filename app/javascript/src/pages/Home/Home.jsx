import React, { useEffect, useState } from 'react';
import { FaRegArrowAltCircleLeft, FaRegArrowAltCircleRight } from 'react-icons/fa';
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

  const [rating, setRating] = useState(50);

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

  const canClickNext = () => currentImageIndex !== null && currentImageIndex < imagesByTheme.length - 1;
  const canClickPrev = () => currentImageIndex !== null && currentImageIndex > 0;

  const nextImage = () => {
    if (!canClickNext()) return;
    setCurrentImageIndex(prev => prev + 1);
    setRating(50);
  };

  const prevImage = () => {
    if (!canClickPrev()) return;
    setCurrentImageIndex(prev => prev - 1);
    setRating(50);
  };

  const handleSubmit = () => {
    console.log(rating);
  };

  return (
    <div className={classes.Home}>
      <div className={classes.sideLeft}>
        <h2>Доступные темы:</h2>
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
            <div className={classes.imageName}>{currentImage && currentImage.name}</div>
            <div className={classes.images}>
              <div className={classes.arrow} onClick={() => prevImage()}>
                {canClickPrev() && <FaRegArrowAltCircleLeft />}
              </div>
              <div className={classes.imageContainer}>
                {currentImage && <img src={srcImage(currentImage.file)} alt={currentImage.name} />}
              </div>
              <div className={classes.arrow} onClick={() => nextImage()}>
                {canClickNext() && <FaRegArrowAltCircleRight />}
              </div>
            </div>
            <div className={classes.grade}>
              <input type='range' value={rating} onChange={e => setRating(e.target.value)} min={0} max={100} />
              <div className={classes.value}>
                <span>Ваша оценка: {rating}</span>
                <button onClick={() => handleSubmit()}>Сохранить</button>
              </div>
            </div>
          </>
        ) : (
          <>Тема не выбрана</>
        )}
      </div>
    </div>
  );
};

export { Home };
