import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { motion } from 'motion/react';
import { Filter, SlidersHorizontal, MapPin, DollarSign, Home as HomeIcon, X } from 'lucide-react';
import { useState } from 'react';
import { Badge } from './ui/badge';

interface FilterBarProps {
  onFilterChange: (filters: any) => void;
}

export function FilterBar({ onFilterChange }: FilterBarProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const handleFilterSelect = (filterType: string, value: string) => {
    onFilterChange({ [filterType]: value });
    if (value !== 'all') {
      setActiveFilters([...activeFilters.filter(f => !f.startsWith(filterType)), `${filterType}:${value}`]);
    }
  };

  const clearFilters = () => {
    setActiveFilters([]);
    onFilterChange({});
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative mb-6"
    >
      {/* Main Filter Bar */}
      <div className="bg-gradient-to-r from-white via-white to-[#e8f5f0] rounded-2xl shadow-lg border border-border p-5 backdrop-blur-sm">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#009E60] to-[#007d4d] rounded-xl flex items-center justify-center shadow-md">
              <SlidersHorizontal className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-sm">Filtres avancés</h3>
              <p className="text-xs text-muted-foreground">Trouvez votre propriété idéale</p>
            </div>
          </div>
          
          {activeFilters.length > 0 && (
            <Button 
              variant="ghost" 
              size="sm"
              onClick={clearFilters}
              className="text-[#009E60] hover:bg-[#009E60]/10"
            >
              <X className="w-4 h-4 mr-1" />
              Effacer ({activeFilters.length})
            </Button>
          )}
        </div>

        {/* Quick Filters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {/* Type de transaction */}
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Select onValueChange={(value: string) => handleFilterSelect('type', value)}>
              <SelectTrigger className="bg-white border-2 border-[#009E60]/20 hover:border-[#009E60] transition-colors shadow-sm">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-[#009E60]" />
                  <SelectValue placeholder="Transaction" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tout</SelectItem>
                <SelectItem value="vente">💰 Vente</SelectItem>
                <SelectItem value="location">🔑 Location</SelectItem>
              </SelectContent>
            </Select>
          </motion.div>

          {/* Type de bien */}
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Select onValueChange={(value: string) => handleFilterSelect('propertyType', value)}>
              <SelectTrigger className="bg-white border-2 border-[#3A75C4]/20 hover:border-[#3A75C4] transition-colors shadow-sm">
                <div className="flex items-center gap-2">
                  <HomeIcon className="w-4 h-4 text-[#3A75C4]" />
                  <SelectValue placeholder="Type de bien" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous</SelectItem>
                <SelectItem value="Maison">🏠 Maison</SelectItem>
                <SelectItem value="Appartement">🏢 Appartement</SelectItem>
                <SelectItem value="Villa">🏰 Villa</SelectItem>
                <SelectItem value="Terrain">🌳 Terrain</SelectItem>
                <SelectItem value="Bureau">🏪 Bureau</SelectItem>
              </SelectContent>
            </Select>
          </motion.div>

          {/* Localisation */}
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Select onValueChange={(value: string) => handleFilterSelect('location', value)}>
              <SelectTrigger className="bg-white border-2 border-[#FCD116]/40 hover:border-[#FCD116] transition-colors shadow-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#FCD116]" />
                  <SelectValue placeholder="Ville" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes</SelectItem>
                <SelectItem value="Libreville">📍 Libreville</SelectItem>
                <SelectItem value="Port-Gentil">📍 Port-Gentil</SelectItem>
                <SelectItem value="Franceville">📍 Franceville</SelectItem>
                <SelectItem value="Oyem">📍 Oyem</SelectItem>
                <SelectItem value="Akanda">📍 Akanda</SelectItem>
              </SelectContent>
            </Select>
          </motion.div>

          {/* Prix */}
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Select onValueChange={(value: any) => handleFilterSelect('priceRange', value)}>
              <SelectTrigger className="bg-white border-2 border-[#009E60]/20 hover:border-[#009E60] transition-colors shadow-sm">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-[#009E60]" />
                  <SelectValue placeholder="Budget" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous budgets</SelectItem>
                <SelectItem value="0-50000000">0 - 50M</SelectItem>
                <SelectItem value="50000000-100000000">50M - 100M</SelectItem>
                <SelectItem value="100000000-200000000">100M - 200M</SelectItem>
                <SelectItem value="200000000+">200M+</SelectItem>
              </SelectContent>
            </Select>
          </motion.div>
        </div>

        {/* Active Filters Display */}
        {activeFilters.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border"
          >
            {activeFilters.map((filter, index) => (
              <Badge 
                key={index}
                variant="secondary"
                className="bg-gradient-to-r from-[#009E60] to-[#007d4d] text-white border-none shadow-sm"
              >
                {filter.split(':')[1]}
              </Badge>
            ))}
          </motion.div>
        )}

        {/* More Filters Button */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-4 flex justify-center"
        >
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-[#009E60] border-[#009E60] hover:bg-[#009E60] hover:text-white transition-all duration-300 shadow-sm"
          >
            <SlidersHorizontal className="w-4 h-4 mr-2" />
            {isExpanded ? 'Moins de filtres' : 'Plus de filtres'}
          </Button>
        </motion.div>

        {/* Extended Filters */}
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4 pt-4 border-t border-border"
          >
            <Select>
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Chambres" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1+</SelectItem>
                <SelectItem value="2">2+</SelectItem>
                <SelectItem value="3">3+</SelectItem>
                <SelectItem value="4">4+</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Surface min" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="50">50m²+</SelectItem>
                <SelectItem value="100">100m²+</SelectItem>
                <SelectItem value="200">200m²+</SelectItem>
                <SelectItem value="300">300m²+</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="État" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="neuf">Neuf</SelectItem>
                <SelectItem value="excellent">Excellent état</SelectItem>
                <SelectItem value="bon">Bon état</SelectItem>
                <SelectItem value="renover">À rénover</SelectItem>
              </SelectContent>
            </Select>
          </motion.div>
        )}
      </div>

      {/* Decorative background elements */}
      <div className="absolute -top-4 -right-4 w-32 h-32 bg-gradient-to-br from-[#009E60]/10 to-transparent rounded-full blur-3xl -z-10"></div>
      <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-[#3A75C4]/10 to-transparent rounded-full blur-3xl -z-10"></div>
    </motion.div>
  );
}