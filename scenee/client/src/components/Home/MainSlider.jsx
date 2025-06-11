import React, { useEffect, useRef, useState } from "react";
import styles from "./MainSlider.module.css";

const nextIcon = "/next.svg";
function MainSlider() {
  const images = [
    "/images/dragon.jpg",
    "/images/hifive.jpg",
    "/images/mission.jpg",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const timeout = useRef(null);

  useEffect(() => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
    timeout.current = setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
    };
  }, [currentIndex, images.length]);

  const handleNext = () => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div className={styles["slider-container"]}>
      <div
        className={styles["slider-wrapper"]}
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((src, idx) => (
          <div className="slide" key={idx}>
            <img src={src} alt={`슬라이드 ${idx + 1}`} />
          </div>
        ))}
      </div>

      <button className={styles["arrow prev"]} onClick={handlePrev}>
        <img
          src={nextIcon}
          alt="Previous"
          className={styles["arrow-icon flipX"]}
        />
      </button>

      <button className={styles["arrow next"]} onClick={handleNext}>
        <img src={nextIcon} alt="Next" className={styles["arrow-icon"]} />
      </button>

      <div className={styles["dots"]}>
        {images.map((_, idx) => (
          <span
            key={idx}
            className={styles[`dot ${idx === currentIndex ? "active" : ""}`]}
            onClick={() => {
              if (timeout.current) clearTimeout(timeout.current);
              setCurrentIndex(idx);
            }}
          />
        ))}
      </div>
    </div>
  );
}
export default MainSlider;
