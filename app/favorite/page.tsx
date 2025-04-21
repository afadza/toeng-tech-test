"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Favorite() {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, []);

  const removeFavorite = (url: string) => {
    const updated = favorites.filter((fav) => fav !== url);
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  return (
    <main className="min-h-screen bg-white py-10 px-6 flex flex-col items-center">
      <div className="max-w-6xl w-full">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Gambar Favorit ❤️
        </h1>

        <div className="mb-6 text-center">
          <Link
            href="/"
            className="text-blue-600 underline hover:text-blue-800"
          >
            🔙 Kembali ke pencarian
          </Link>
        </div>

        {favorites.length === 0 ? (
          <p className="text-center text-gray-500">
            Belum ada gambar favorit. Tambahkan dari halaman pencarian!
          </p>
        ) : (
          <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
            {favorites.map((url, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-lg shadow-md break-inside-avoid group"
              >
                <img
                  src={url}
                  alt={`Favorit ${index}`}
                  className="w-full object-cover rounded-lg transition-transform duration-300 hover:scale-105"
                />
                <button
                  onClick={() => removeFavorite(url)}
                  className="absolute top-2 right-2 bg-white/80 text-red-600 hover:text-white hover:bg-red-600 p-2 rounded-full transition w-10 h-10"
                  title="Hapus dari Favorit"
                >
                  🗑️
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
