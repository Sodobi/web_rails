import React from 'react';
import classes from './Footer.module.scss';

const Footer = () => {
  return (
    <footer className={classes.Footer}>
      <div className={classes.contactInfo}>
        <span>Автора проекта: Иванова Софья</span>
        <span>По всем вопросам обращаться в TG: @myTG</span>
      </div>
    </footer>
  );
};

export { Footer };
