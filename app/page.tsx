"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    if (search.trim()) {
      router.push(`/result?q=${encodeURIComponent(search)}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-white px-4">
      <div className="max-w-xl w-full text-center space-y-6 p-6 rounded-xl bg-white shadow-xl">
        <h1 className="text-4xl font-bold text-gray-800">
          🐶 Selamat Datang di DogGallery!
        </h1>
        <p className="text-gray-600 text-lg">
          Temukan gambar lucu dan menggemaskan dari berbagai ras anjing di
          seluruh dunia. Cukup ketik nama ras anjing dan klik cari!
        </p>

        <div className="flex items-center justify-center gap-2 mt-4">
          <input
            type="text"
            placeholder="Contoh: husky, hound, pug..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none text-black"
          />
          <button
            onClick={handleSearch}
            className="px-4 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
          >
            Cari
          </button>
        </div>

        <p className="text-sm text-gray-500 mt-2">
          Contoh ras: hound, poodle, beagle, bulldog
        </p>
      </div>
    </main>
  );
}
