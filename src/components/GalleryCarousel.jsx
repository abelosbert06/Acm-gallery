import React, { useState, useEffect, useCallback, useMemo } from "react";
import { ChevronRightIcon } from "./Icons/ChevronRightIcon";
import { ChevronLeftIcon } from "./Icons/ChevronLeftIcon";

// CarouselCard component
const CarouselCard = ({ item, itemsPerPage, gap }) => (
  <div
    className="relative h-80 rounded-2xl overflow-hidden group flex-shrink-0"
    style={{
      flex: `0 0 calc((100% - ${(itemsPerPage - 1) * gap}px) / ${itemsPerPage})`
    }}
  >
    <img
      src={item.imageUrl}
      alt={item.category}
      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
    />
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
      <button className="bg-white/90 text-gray-800 font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-white transition-all duration-200 backdrop-blur-sm">
        Show all
      </button>
    </div>
  </div>
);

// Main GalleryCarousel component
const GalleryCarousel = ({ items }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Determine items per page based on window width
  const itemsPerPage = useMemo(() => {
    if (windowWidth >= 1150) return 3;
    if (windowWidth >= 800) return 2;
    return 1;
  }, [windowWidth]);

  const totalItems = items.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const gap = 32; // 2rem = 32px

  const nextSlide = useCallback(() => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  }, [totalPages]);

  const prevSlide = useCallback(() => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  }, [totalPages]);

  const goToSlide = (idx) => setCurrentPage(idx);

  // Balanced start index to ensure the last page is always full
  const startIndex = useMemo(() => {
    if (currentPage === totalPages - 1) {
      return Math.max(0, totalItems - itemsPerPage);
    }
    return currentPage * itemsPerPage;
  }, [currentPage, totalPages, totalItems, itemsPerPage]);

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <h1 className="text-[2rem] font-bold mb-8">Recent</h1>
        <div
          className="flex transition-transform duration-500 ease-in-out gap-8"
          style={{
            transform: `translateX(calc(-${startIndex} * (100% + ${gap}px) / ${itemsPerPage}))`
          }}
        >
          {items.map((item) => (
            <CarouselCard key={item.id} item={item} itemsPerPage={itemsPerPage} gap={gap} />
          ))}
        </div>
      </div>

      {/* Arrows */}
      {totalPages > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute top-1/2 -left-6 -translate-y-1/2 z-10 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 transition-all duration-200 focus:outline-none"
            aria-label="Previous slide"
          >
            <ChevronLeftIcon className="h-6 w-6 text-gray-700" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 -right-6 -translate-y-1/2 z-10 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 transition-all duration-200 focus:outline-none"
            aria-label="Next slide"
          >
            <ChevronRightIcon className="h-6 w-6 text-gray-700" />
          </button>

          {/* Pagination dots */}
          <div className="flex justify-center items-center space-x-2 mt-8">
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${currentPage === idx ? "bg-gray-800 w-4" : "bg-gray-300 hover:bg-gray-400"
                  }`}
                aria-label={`Go to page ${idx + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default GalleryCarousel;
