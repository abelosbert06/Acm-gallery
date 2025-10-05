import React, { useState, useMemo } from "react";
import { ChevronRightIcon } from "./Icons/ChevronRightIcon";
import { ChevronLeftIcon } from "./Icons/ChevronLeftIcon";

const CarouselCard = ({ item }) => (
  <div className="relative w-full h-80 bg-gray-200 rounded-2xl overflow-hidden group">
    <img src={item.imageUrl} alt={item.category} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
    <div className="absolute inset-0 bg-black bg-opacity-20"></div>
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
      <button className="bg-white/90 text-gray-800 font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-white transition-all duration-200 backdrop-blur-sm">
        Show all
      </button>
    </div>
  </div>
);

const GalleryCarousel = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 2;

  const chunk = (arr, size) =>
    Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
      arr.slice(i * size, i * size + size)
    );

  const pages = useMemo(() => chunk(items, itemsPerPage), [items]);
  const pageCount = pages.length;

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % pageCount);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + pageCount) % pageCount);
  const goToSlide = (index) => setCurrentIndex(index);

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {pages.map((page, pageIndex) => (
            <div key={pageIndex} className="flex-shrink-0 w-full flex gap-8">
              {page.map((item) => (
                <div key={item.id} className="w-1/2">
                  <CarouselCard item={item} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {pageCount > 1 && (
        <>
          <button onClick={prevSlide} className="absolute top-1/2 -left-6 -translate-y-1/2 z-10 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 transition-all duration-200">
            <ChevronLeftIcon className="h-6 w-6 text-gray-700" />
          </button>
          <button onClick={nextSlide} className="absolute top-1/2 -right-6 -translate-y-1/2 z-10 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 transition-all duration-200">
            <ChevronRightIcon className="h-6 w-6 text-gray-700" />
          </button>
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex justify-center items-center space-x-2">
            {Array.from({ length: pageCount }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                className={`h-2.5 w-2.5 rounded-full transition-colors duration-300 ${currentIndex === idx ? "bg-gray-800 scale-125" : "bg-gray-300 hover:bg-gray-400"}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default GalleryCarousel;
