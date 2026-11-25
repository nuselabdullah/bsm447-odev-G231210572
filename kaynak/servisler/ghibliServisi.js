// Studio Ghibli API adresi (tüm filmlerin JSON listesini döndürür)
export const API_ADRESI = 'https://ghibliapi.vercel.app/films';

// API'den filmleri çeken asenkron yardımcı fonksiyon
export const filmleriGetir = async () => {
  // 1. Sunucuya HTTP GET isteği gönder
  const yanit = await fetch(API_ADRESI);

  // 2. HTTP durum kodunu kontrol et (200-299 arası değilse hata fırlat)
  if (!yanit.ok) {
    throw new Error(`Sunucu hatası: ${yanit.status}`);
  }

  // 3. Gelen JSON metnini JavaScript dizisine dönüştür
  const veri = await yanit.json();

  // 4. Beklenen veri tipinin dizi olduğunu doğrula
  if (!Array.isArray(veri)) {
    throw new Error('API beklenen liste formatında veri döndürmedi.');
  }

  return veri;
};
