import React, { useState, useRef, useEffect } from 'react';
import styles from './PopularSection.module.css';

const data = [
  { id:1, title:'뿅뿅 지구오락실',     image:'/images/Earth.png' },
  { id:2, title:'폭싹 속았수다',       image:'/images/When Life Gives You Tangerines.jpg' },
  { id:3, title:'승부',               image:'/images/vs.jpg' },
  { id:4, title:'슬기로운 전공의 생활', image:'/images/doctor.jpg' },
  { id:5, title:'당신의 맛',          image:'/images/taste.jpg' },
];




 function PopularSection() {
  const [hoveredIndex, setHoveredIndex] = useState(0);
    const timerRef = useRef(null);
  
    useEffect(() => {
      // 3초마다 다음 인덱스로
      timerRef.current = setInterval(() => {
        setHoveredIndex(i => (i + 1) % data.length);
      }, 4000);
      return () => clearInterval(timerRef.current);
    }, []);
  
    // 마우스 올리면 자동 슬라이드 멈추고, 해당 카드로 변경
    const handleMouseEnter = idx => {
      clearInterval(timerRef.current);
      setHoveredIndex(idx);
    };
    // 마우스 떼면 다시 자동 실행
    const handleMouseLeave = () => {
      timerRef.current = setInterval(() => {
        setHoveredIndex(i => (i + 1) % data.length);
      }, 3000);
    };
  
    return (
      <section className={styles.popularSection}>
        <h1 className={styles.popularSectionTitle}>WEEK BEST 🏆</h1>
        <div className={styles.popularList} style={{
      transform: `translateX(-${hoveredIndex * (333 + 90)}px)`,
      transition: 'transform 0.9s ease-in-out'
    }}>
          {data.map((item, idx) => {
            const isHovered = idx === hoveredIndex;
            const displayRank = idx + 1;
            return (
              <div
                key={item.id}
                className={[
                  styles.popularItem,
                  isHovered && styles.hovered,
                ]  .filter(Boolean) .join(' ')}
                onMouseEnter={() => handleMouseEnter(idx)}
                onMouseLeave={handleMouseLeave}
              >
                <div className={styles.popularCardWrapper}>
                  <span className={styles.popularRank}>{displayRank}</span>
                  <div
                    className={[
                      styles.popularCardInner,
                      styles[`inner${displayRank}`],
                    ].join(' ')}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className={styles.popularCardImg}
                    />
                  </div>
                </div>
                <p className={styles.popularSubtitle}>{item.title}</p>
              </div>
            );
          })}
        </div>
      </section>
    ); 
}

export default PopularSection