import React, { useState, useEffect, useCallback } from 'react';

const PortraitCard = ({ item, itemsPerPage, gap }) => (
    <div
        className="h-[400px] bg-gray-200 rounded-[16px] overflow-hidden group transition-shadow duration-200 hover:shadow-[0_8px_32px_rgba(0,0,0,0.12)] max-[900px]:h-[300px] relative flex-shrink-0"
        style={{
            flex: `0 0 calc((100% - ${(itemsPerPage - 1) * gap}px) / ${itemsPerPage})`
        }}
    >
        <img
            src={item.imageUrl}
            alt="Portrait"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none group-hover:pointer-events-auto">
            <button className="bg-white/90 text-gray-800 px-6 py-2 rounded-lg font-medium shadow-sm hover:bg-white transition-colors">
                Show all
            </button>
        </div>
    </div>
);

export default function PortraitCarousel({ items }) {
    const [currentPage, setCurrentPage] = useState(0);
    const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Determine items per page based on window width
    const getItemsPerPage = () => {
        if (windowWidth >= 1150) return 3;
        if (windowWidth >= 800) return 2;
        return 1;
    };

    const itemsPerPage = getItemsPerPage();
    const totalItems = items.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const gap = 32; // 2rem = 32px

    const handleNext = useCallback(() => {
        setCurrentPage((prev) => (prev + 1) % totalPages);
    }, [totalPages]);

    const handlePrev = useCallback(() => {
        setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
    }, [totalPages]);

    return (
        <section className="w-full">
            <div className="mb-4">
                <h2 className="text-[2rem] font-bold">Portraits</h2>
            </div>

            <div className="relative py-8">
                {/* Navigation Buttons */}
                <button
                    onClick={handlePrev}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center bg-white/90 rounded-full text-[#1a1a1a] shadow-md hover:scale-110 transition-all cursor-pointer border-none focus:outline-none -ml-6"
                    tabIndex={0}
                    aria-label="Previous Page"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15 18l-6-6 6-6" />
                    </svg>
                </button>

                <div className="overflow-hidden">
                    <div
                        className="flex gap-8 transition-transform duration-500 ease-in-out"
                        style={{
                            transform: `translateX(calc(-${currentPage} * (100% + ${gap}px)))`
                        }}
                    >
                        {items.map((item) => (
                            <PortraitCard key={item.id} item={item} itemsPerPage={itemsPerPage} gap={gap} />
                        ))}
                    </div>
                </div>

                <button
                    onClick={handleNext}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center bg-white/90 rounded-full text-[#1a1a1a] shadow-md hover:scale-110 transition-all cursor-pointer border-none focus:outline-none -mr-6"
                    tabIndex={0}
                    aria-label="Next Page"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 18l6-6-6-6" />
                    </svg>
                </button>
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center gap-2 mt-4">
                {Array.from({ length: totalPages }).map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentPage(idx)}
                        className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${currentPage === idx ? 'bg-gray-800 w-4' : 'bg-gray-300'}`}
                        aria-label={`Go to page ${idx + 1}`}
                    />
                ))}
            </div>
        </section>
    );
}
