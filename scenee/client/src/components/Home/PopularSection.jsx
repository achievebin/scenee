import React from 'react';
import styles from './PopularSection.module.css';

const popularItem = [
  {
    id: 1,
    title: '뿅뿅 지구오락실',
    image: '/images/Earth.png',
  },
  {
    id: 2,
    title: '폭싹 속았수다',
    image: '/images/When Life Gives You Tangerines.jpg',
  },
  {
    id: 3,
    title: '승부',
    image: '/images/vs.jpg',
  },
  {
    id: 4,
    title: '슬기로운 전공의 생활',
    image: '/images/doctor.jpg',
  },
  {
    id: 5,
    title: '당신의 맛',
    image: '/images/taste.jpg',
  },
  /*{
  id : 6,
  title : '스위트 홈',
  images : '/images/Sweethome.jpg',
},
{
  id : 7,
  title : '신병 3',
  images : '/images/fun.jpg',

},
{
  id : 8,
  title : '천국보다 아름다운',
  images : '/images/heaven.jpg',
},*/
];

function PopularSection() {
  return (
    <section className={styles['popular-section']}>
      <h1 className={styles['popular-section__title']}>WEEK BEST 🏆</h1>

      <div className={styles['popular-section__list']}>
        {popularItem.map((item) => (
          <div className={styles['popular-item']} key={item.id}>
            <div className={styles['popular-card']}>
              <img
                src={item.image}
                alt={item.title}
                className={styles['popular-card__img']}
              />
            </div>

            <p className={styles['pupular-title']}>{item.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default PopularSection;
