import { motion } from 'motion/react';
import { Home, Building2, TreePine, Briefcase, MapPinned } from 'lucide-react';

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const categories = [
  { id: 'all', label: 'Tout', icon: MapPinned },
  { id: 'Maison', label: 'Maisons', icon: Home },
  { id: 'Appartement', label: 'Appartements', icon: Building2 },
  { id: 'Villa', label: 'Villas', icon: TreePine },
  { id: 'Bureau', label: 'Bureaux', icon: Briefcase },
  { id: 'Terrain', label: 'Terrains', icon: MapPinned }
];

export function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-border p-4 mb-4">
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map((category) => {
          const Icon = category.icon;
          const isActive = selectedCategory === category.id;
          
          return (
            <motion.button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-[#009E60] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon className="w-4 h-4" />
              <span className="text-sm">{category.label}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
