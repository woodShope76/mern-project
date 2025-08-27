import React from 'react';

const icons = {
  'Wooden Cot': '🛏️',
  'Modern Wardrobe': '🚪',
  'Study Table': '📚',
  'Rolling Chair': '🪑',
  'Wooden Table': '🪵',
  'Wooden Sofa': '🛋️',
};

const CategorySidebar = ({ categories, selected, onSelect }) => {
  return (
    <div className="w-1/4 bg-white p-4 space-y-3">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelect(category)}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-md border ${
            selected === category ? 'bg-[#8a5a36] text-white' : 'hover:bg-gray-100'
          }`}
        >
          <span className="text-2xl">{icons[category]}</span>
          <span className="text-lg">{category}</span>
        </button>
      ))}
    </div>
  );
};

export default CategorySidebar;
