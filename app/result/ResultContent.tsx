"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Result() {
  const params = useSearchParams();
  const query = params.get("q")?.toLowerCase().trim();
  const [images, setImages] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    if (!query) return;
    setLoading(true);
    setError("");
    setImages([]);

    fetch(`https://dog.ceo/api/breed/${query}/images/random/12`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setImages(data.message);
        } else {
          setError(`Tidak ditemukan gambar untuk ras anjing "${query}".`);
        }
      })
      .catch(() => {
        setError("Terjadi kesalahan saat mengambil data dari API.");
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, 500);
      });
  }, [query]);

  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, []);

  const toggleFavorite = (img: string) => {
    let updated: string[];
    if (favorites.includes(img)) {
      updated = favorites.filter((fav) => fav !== img);
    } else {
      updated = [...favorites, img];
    }
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  const isFavorite = (img: string) => favorites.includes(img);

  return (
    <main className="min-h-screen bg-gray-100 py-10 px-5 flex flex-col items-center">
      <div className="max-w-6xl w-full text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Hasil Pencarian Anjing Ras
        </h1>
        {query && (
          <p className="mb-4 text-gray-600">
            Menampilkan hasil untuk:{" "}
            <span className="text-purple-600 font-semibold">{query}</span>
          </p>
        )}

        <div className="mb-4 text-right">
          <a
            href="/favorite"
            className="text-blue-500 underline hover:text-blue-700"
          >
            Lihat Favorit ❤️
          </a>
        </div>

        {loading && <p className="text-gray-500">Sedang memuat gambar...</p>}

        {error && (
          <div className="bg-red-100 text-red-600 p-4 rounded-lg shadow-md">
            {error}
          </div>
        )}

        {!loading && !error && (
          <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4 mt-6">
            {images.map((url, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-lg shadow-md break-inside-avoid group"
              >
                <img
                  src={url}
                  alt={`Anjing ${query}`}
                  className="w-full object-cover transition-transform duration-300 hover:scale-105 rounded-lg"
                />
                <button
                  onClick={() => toggleFavorite(url)}
                  className={`absolute top-2 right-2 text-xl p-2 rounded-full transition-all w-10 h-10   ${
                    isFavorite(url)
                      ? "text-red-500 bg-white"
                      : "text-gray-400 bg-white/70 hover:text-red-400"
                  }`}
                >
                  {isFavorite(url) ? "❤️" : "🤍"}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
