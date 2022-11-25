import React from "react";
import FeedModal from "./FeedModal";
import FeedPhotos from "./FeedPhotos";

const Feed = ({ user }) => {
  const [modalPhoto, setModalPhoto] = React.useState(null);
  const [pages, setPages] = React.useState([1]);
  const [infinite, setInfinite] = React.useState(true);

  React.useEffect(() => {
    let wait = false;
    const infinitScroll = (event) => {
      if (infinite) {
        const scroll = window.scrollY;
        const height = document.body.offsetHeight - window.innerHeight;
        if (scroll > height * 0.75 && !wait) {
          setPages((pages) => [...pages, pages.length + 1]);
          wait = true;
          setTimeout(() => {
            wait = false;
          }, 500);
        }
      }
    };
    window.addEventListener("wheel", infinitScroll);
    window.addEventListener("scroll", infinitScroll);
    return () => {
      window.removeEventListener("wheel", infinitScroll);
      window.removeEventListener("scroll", infinitScroll);
    };
  }, [infinite]);
  return (
    <div>
      {modalPhoto && (
        <FeedModal photo={modalPhoto} setModalPhoto={setModalPhoto} />
      )}
      {pages.map((page) => {
        return (
          <FeedPhotos
            key={page}
            page={page}
            user={user}
            setModalPhoto={setModalPhoto}
            setInfinite={setInfinite}
          />
        );
      })}
    </div>
  );
};

export default Feed;
