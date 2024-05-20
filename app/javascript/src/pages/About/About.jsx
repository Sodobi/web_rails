import React from 'react';
import { useTranslation } from 'react-i18next';
import classes from './About.module.scss';

const About = () => {
  const { t } = useTranslation();

  return (
    <div className={classes.About}>
      <h1>{t('about.title')}</h1>
      <p>{t('about.text1')}</p>
      <p>{t('about.text2')}</p>
      <p>{t('about.text3')}</p>
      <p>{t('about.text4')}</p>
      <q>{t('about.text5')}</q>
    </div>
  );
};

export { About };
