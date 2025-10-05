// src/App.jsx
import React, { useState } from "react";
import Navbar from "./components/Navbar";
import GalleryCarousel from "./components/GalleryCarousel";
import PortraitGrid from "./components/PortraitGrid";
import { SearchIcon } from "./components/Icons/SearchIcon";
import { FilterIcon } from "./components/Icons/FilterIcon";
import { CloseIcon } from "./components/Icons/CloseIcon";

// Carousel items
const carouselItems = [
  { id: 1, category: "Events", imageUrl: "https://picsum.photos/800/600?random=1" },
  { id: 2, category: "Contests", imageUrl: "https://picsum.photos/800/600?random=2" },
  { id: 3, category: "Events", imageUrl: "https://picsum.photos/800/600?random=3" },
  { id: 4, category: "Workshops", imageUrl: "https://picsum.photos/800/600?random=4" },
  { id: 5, category: "Contests", imageUrl: "https://picsum.photos/800/600?random=5" },
  { id: 6, category: "Events", imageUrl: "https://picsum.photos/800/600?random=6" },
];

// Portrait items
const portraitItems = Array.from({ length: 6 }, (_, i) => ({
  id: i + 1,
  imageUrl: `https://picsum.photos/400/500?random=${i + 10}`,
}));

const App = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const filters = ["All", "Events", "Contests"];

  return (
    <div className="min-h-screen bg-white font-sans border-l-4 border-r-4 border-cyan-100">
      {/* Navbar */}
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <section className="text-left mb-12">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">Gallery</h1>
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">Capturing our journey</h2>
          <div className="max-w-4xl space-y-4 text-gray-600 text-lg">
            <p>
              Explore the memorable moments from our ACM chapter events, workshops,
              and activities through our comprehensive photo gallery.
            </p>
            <p>
              From our inaugural ceremony to the latest workshops and competitions, these photos tell
              the story of our growing ACM community and the impact we're making together.
            </p>
          </div>
        </section>

        {/* Filters Section */}
        <section className="mb-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
            <div className="relative w-full md:w-auto flex-grow max-w-md">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <SearchIcon className="h-5 w-5 text-gray-400" />
              </span>
              <input
                type="text"
                placeholder="Search"
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
              />
            </div>

            <div className="relative w-full md:w-auto">
              <select className="appearance-none w-full md:w-48 bg-gray-50 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-white focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400">
                <option>Sort by</option>
                <option>Date Ascending</option>
                <option>Date Descending</option>
                <option>Most Popular</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <FilterIcon className="fill-current h-4 w-4" />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-5 py-2 text-sm font-medium rounded-full transition-colors duration-200 ${
                  activeFilter === filter
                    ? "bg-cyan-500 text-white shadow-md"
                    : "bg-white text-gray-600 border border-gray-300 hover:bg-gray-100"
                }`}
              >
                {filter}
              </button>
            ))}

            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-cyan-600 hover:text-cyan-800 transition-colors duration-200">
              Clear Filters
              <CloseIcon className="h-4 w-4" />
            </button>
          </div>
        </section>

        {/* Carousel Section */}
        <section className="mb-20">
          <GalleryCarousel items={carouselItems} />
        </section>

        {/* Portraits Section */}
        <section>
          <PortraitGrid items={portraitItems} />
        </section>
      </main>
    </div>
  );
};

export default App;
