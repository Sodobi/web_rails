import React from 'react';
import classes from './Footer.module.scss';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className={classes.Footer}>
      <span>
        {t('footer.author')}: <i>{t('footer.name')}</i>
      </span>
      <span>
        {t('footer.stack')}: <i>Ruby on Rails</i> & <i>ReactJS</i>
      </span>
    </footer>
  );
};

export { Footer };
