import React, { useEffect, useState } from 'react';
import { FaRegArrowAltCircleLeft, FaRegArrowAltCircleRight } from 'react-icons/fa';
import classNames from 'classnames';
import { useAuthContext } from '../../hooks';
import ImageService from '../../services/image.service';
import ThemeService from '../../services/theme.service';
import ValueService from '../../services/value.service';
import classes from './Home.module.scss';
import { useTranslation } from 'react-i18next';

const srcImage = img => `../../assets/${img}`;

const DEFAULT_INPUT_VALUE = 50;

const Home = () => {
  const { t } = useTranslation();

  const user = useAuthContext().user;

  const [themes, setThemes] = useState([]);
  const [images, setImages] = useState([]);

  const [currentTheme, setCurrentTheme] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(null);
  const [currentValue, setCurrentValue] = useState(DEFAULT_INPUT_VALUE);

  const [userValue, setUserValue] = useState(null);
  const [averageValue, setAverageValue] = useState(null);

  useEffect(() => {
    ThemeService.getAll()
      .then(response => setThemes(response.data))
      .catch(console.log);
  }, []);

  useEffect(() => {
    setImages([]);
    setCurrentImage(null);
    setCurrentImageIndex(null);
    if (currentTheme) {
      ImageService.getByThemeId(currentTheme.id)
        .then(response => {
          setImages(response.data);
          setCurrentImage(response.data.length ? response.data[0] : null);
          setCurrentImageIndex(response.data.length ? 0 : null);
        })
        .catch(console.log);
    }
  }, [currentTheme]);

  useEffect(() => {
    loadImageValues();
  }, [currentImage]);

  useEffect(() => {
    if (currentImageIndex !== null) setCurrentImage(images[currentImageIndex]);
    else setCurrentImage(null);
  }, [currentImageIndex]);

  const loadImageValues = () => {
    if (!currentImage) return;

    ValueService.getByImage(currentImage.id)
      .then(response => {
        const sumValues = response.data.reduce((acc, value) => acc + value.value, 0);
        const aveValue = response.data.length ? sumValues / response.data.length : null;
        const valueOfUser = response.data.find(value => value.user_id === user.id);
        setAverageValue(aveValue ? parseFloat(aveValue.toFixed(2)) : null);
        setUserValue(valueOfUser ? valueOfUser : null);
        setCurrentValue(valueOfUser ? valueOfUser.value : DEFAULT_INPUT_VALUE);
      })
      .catch(console.log);
  };

  const canClickNext = () => currentImageIndex !== null && currentImageIndex < images.length - 1;
  const canClickPrev = () => currentImageIndex !== null && currentImageIndex > 0;
  const clickNext = () => canClickNext() && setCurrentImageIndex(currentImageIndex + 1);
  const clickPrev = () => canClickPrev() && setCurrentImageIndex(currentImageIndex - 1);

  const handleSubmit = () => {
    if (!user || !currentImage || !currentValue) return;

    if (userValue) {
      ValueService.update(userValue.id, user.id, currentImage.id, currentValue)
        .then(() => loadImageValues())
        .catch(console.log);
    } else {
      ValueService.create(user.id, currentImage.id, currentValue)
        .then(() => loadImageValues())
        .catch(console.log);
    }
  };

  return (
    <div className={classes.Home}>
      <div className={classes.sideLeft}>
        <h2>{t('home.allThemes')}:</h2>
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
          currentImage && (
            <>
              <div className={classes.imageName}>{currentImage.name}</div>
              <div className={classes.images}>
                <div className={classes.arrow}>
                  {canClickPrev() && <FaRegArrowAltCircleLeft onClick={() => clickPrev()} />}
                </div>
                <div className={classes.imageContainer}>
                  <img src={srcImage(currentImage.file)} alt={currentImage.name} />
                </div>
                <div className={classes.arrow}>
                  {canClickNext() && <FaRegArrowAltCircleRight onClick={() => clickNext()} />}
                </div>
              </div>
              <div className={classes.grade}>
                <div className={classes.valueInfo}>
                  <span>
                    {t('home.averageValue')}: {averageValue ?? '-'}
                  </span>
                  <span>
                    {t('home.yourValue')}: {userValue?.value ?? '-'}
                  </span>
                </div>
                <input
                  type='range'
                  value={currentValue}
                  onChange={e => setCurrentValue(e.target.value)}
                  min={0}
                  max={100}
                />
                <div className={classes.value}>
                  <span>
                    {t('home.value')}: {currentValue}
                  </span>
                  <button onClick={() => handleSubmit()}>{t('home.save')}</button>
                </div>
              </div>
            </>
          )
        ) : (
          <>{t('home.noTheme')}</>
        )}
      </div>
    </div>
  );
};

export { Home };
