import React from "react";
import { PHOTO_DELETE } from "../../api";
import useFetch from "../../Hooks/useFetch";
import Error from "../Helper/Error";
import styles from "./PhotoDelete.module.css";

const PhotoDelete = ({ id }) => {
  const { request, error, loading } = useFetch();

  const handleClick = async () => {
    const confim = window.confirm("Ceteza que deseja deletar?");
    if (confim) {
      const { url, options } = PHOTO_DELETE(id);
      const { response } = await request(url, options);
      if (response.ok) window.location.reload();
    }
  };

  return (
    <>
      {loading ? (
        <button onClick={handleClick} className={styles.delete} disabled>
          Deletando...
        </button>
      ) : (
        <button onClick={handleClick} className={styles.delete}>
          Deletar
        </button>
      )}

      <Error error={error} />
    </>
  );
};

export default PhotoDelete;
