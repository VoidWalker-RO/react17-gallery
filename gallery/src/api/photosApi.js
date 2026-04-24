export async function fetchPhotos(page, limit) {
  const response = await fetch(
    `https://picsum.photos/v2/list?page=${page}&limit=${limit}`
  );

  if (!response.ok) {
    throw new Error("Помилка при завантаженні фото");
  }

  const data = await response.json();
  return data;
}