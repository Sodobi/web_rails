import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import imageService from '../../services/image.service';
import valueService from '../../services/value.service';
import { useAuthContext } from '../../hooks';
import classes from './Profile.module.scss';

const srcImage = img => `../../assets/${img}`;

export const Profile = () => {
  const { t } = useTranslation();

  const { user, avatar } = useAuthContext();

  const [itemsValue, setItemsValue] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const values = (await valueService.getByUser(user.id)).data;

      const items = [];
      for (const value of values) {
        const image = (await imageService.getById(value.image_id)).data;

        items.push(
          <div key={value.id} className={classes.Item}>
            <img src={srcImage(image.file)} alt={image.name} />
            <span>{image.name}</span>
            <span>
              {t('profile.value')}: {value.value}
            </span>
          </div>,
        );
      }

      setItemsValue(items);
    }

    fetchData();
  }, []);

  return (
    <div className={classes.Profile}>
      <div className={classes.UserInfo}>
        <img src={avatar ?? '../../assets/user.png'} />

        <div className={classes.Info}>
          <div>
            {t('profile.name')}: {user.name}
          </div>
          <div>
            {t('profile.email')}: {user.email}
          </div>
        </div>
      </div>

      <div className={classes.UserValues}>
        <div className={classes.Header}>{t('profile.rating')}:</div>

        {itemsValue.map(item => item)}
      </div>
    </div>
  );
};
