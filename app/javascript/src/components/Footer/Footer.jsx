import React from 'react';
import classes from './Footer.module.scss';

const Footer = () => {
  return (
    <footer className={classes.Footer}>
      <div className={classes.info}>
        <span>
          Автора проекта: <i>Иванова Софья</i>
        </span>
        <span>Все права защищены</span>
      </div>

      <div className={classes.info}>
        <span>
          Стек технологий: <i>Ruby on Rails</i> & <i>ReactJS</i>
        </span>
      </div>
    </footer>
  );
};

export { Footer };
