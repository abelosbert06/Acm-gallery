import React from "react";

const PortraitCard = ({ item }) => (
  <div className="aspect-[4/5] bg-gray-200 rounded-2xl overflow-hidden group">
    <img src={item.imageUrl} alt="Portrait" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
  </div>
);

const PortraitGrid = ({ items }) => (
  <div>
    <h2 className="text-3xl font-semibold text-gray-800 mb-8">Portraits</h2>
    <div className="flex overflow-x-auto gap-8 pb-4">
      {items.map((item) => (
        <div key={item.id} className="w-72 flex-shrink-0">
          <PortraitCard item={item} />
        </div>
      ))}
    </div>
  </div>
);

export default PortraitGrid;
