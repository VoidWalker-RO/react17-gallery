import { useEffect, useState } from "react";
import { fetchPhotos } from "../api/photosApi";
import "./Gallery.css";

function Gallery() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const loadPhotos = async () => {
      setLoading(true);
      try {
        const data = await fetchPhotos(page, 4);
        setPhotos(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadPhotos();
  }, [page]);

  const nextPage = () => setPage((p) => p + 1);
  const prevPage = () => setPage((p) => (p > 1 ? p - 1 : 1));

  return (
    <div className="gallery-container">
      <h2 className="title">📸 Галерея зображень</h2>

      <div className="controls">
        <button onClick={prevPage} disabled={page === 1}>
          ⬅ Попередні
        </button>

        <span>Сторінка: {page}</span>

        <button onClick={nextPage}>Наступні ➡</button>
      </div>

      {loading ? (
        <p className="loader">Завантаження...</p>
      ) : (
        <div className="grid">
          {photos.map((photo) => (
            <div key={photo.id} className="card">
              <img src={photo.download_url} alt={photo.author} />
              <p><b>Автор:</b> {photo.author}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Gallery;