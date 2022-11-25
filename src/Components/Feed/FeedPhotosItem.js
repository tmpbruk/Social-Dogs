import React from "react";
import Image from "../Helper/Image";
import styles from "./FeedPhotosItem.module.css";

function FeedPhotosItem({ photo, setModalPhoto }) {
  const handleClick = () => {
    setModalPhoto(photo);
  };

  return (
    <li className={styles.photo} onClick={handleClick}>
      <Image src={photo.src} alt={photo.title} />
      <span className={styles.views}>{photo.acessos}</span>
    </li>
  );
}

export default FeedPhotosItem;
