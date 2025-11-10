import { useState } from 'react';
import { Search, X, Filter, MapPin, Home as HomeIcon, DollarSign } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface FloatingSearchProps {
  onSearch: (query: string, filters: any) => void;
}

export function FloatingSearch({ onSearch }: FloatingSearchProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    type: 'all',
    propertyType: 'all',
    location: 'all',
    priceRange: 'all',
  });

  const handleSearch = () => {
    onSearch(searchQuery, filters);
    setIsExpanded(false);
  };

  const handleClose = () => {
    setIsExpanded(false);
    setSearchQuery('');
  };

  return (
    <>
      {/* Floating Search Button */}
      <AnimatePresence>
        {!isExpanded && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsExpanded(true)}
              className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-r from-[#009E60] to-[#007d4d] rounded-full shadow-2xl flex items-center justify-center text-white hover:shadow-[#009E60]/50 transition-shadow"
            >
              <Search className="w-6 h-6 md:w-7 md:h-7" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expanded Search Overlay */}
      <AnimatePresence>
        {isExpanded && (
          <>
            {/* Blur Background */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="fixed inset-0 bg-black/40 backdrop-blur-md z-40"
            />

            {/* Search Panel */}
            <motion.div
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 left-0 right-0 bg-white shadow-2xl z-50 rounded-b-3xl"
            >
              <div className="max-w-4xl mx-auto px-4 py-6 md:py-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-[#009E60] to-[#007d4d] rounded-2xl flex items-center justify-center shadow-lg">
                      <Search className="w-5 h-5 md:w-6 md:h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-lg md:text-xl">Recherche avancée</h2>
                      <p className="text-xs md:text-sm text-muted-foreground">
                        Trouvez votre propriété idéale
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleClose}
                    className="hover:bg-red-50 hover:text-red-500 rounded-full"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                {/* Main Search Input */}
                <div className="relative mb-6">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                  <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Rechercher par mot-clé, quartier, ville..."
                    className="pl-12 pr-4 h-14 md:h-16 text-base md:text-lg border-2 border-[#009E60]/20 focus:border-[#009E60] rounded-2xl shadow-sm"
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  />
                </div>

                {/* Filters Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6">
                  {/* Transaction Type */}
                  <div className="space-y-2">
                    <label className="text-xs md:text-sm text-muted-foreground flex items-center gap-2">
                      <Filter className="w-3 h-3 md:w-4 md:h-4 text-[#009E60]" />
                      Transaction
                    </label>
                    <Select
                      value={filters.type}
                      onValueChange={(value: any) =>
                        setFilters({ ...filters, type: value })
                      }
                    >
                      <SelectTrigger className="h-11 md:h-12 border-2 border-border hover:border-[#009E60]/50 transition-colors rounded-xl">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tout</SelectItem>
                        <SelectItem value="vente">💰 Vente</SelectItem>
                        <SelectItem value="location">🔑 Location</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Property Type */}
                  <div className="space-y-2">
                    <label className="text-xs md:text-sm text-muted-foreground flex items-center gap-2">
                      <HomeIcon className="w-3 h-3 md:w-4 md:h-4 text-[#3A75C4]" />
                      Type de bien
                    </label>
                    <Select
                      value={filters.propertyType}
                      onValueChange={(value: any) =>
                        setFilters({ ...filters, propertyType: value })
                      }
                    >
                      <SelectTrigger className="h-11 md:h-12 border-2 border-border hover:border-[#3A75C4]/50 transition-colors rounded-xl">
                        <SelectValue />
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
                  </div>

                  {/* Location */}
                  <div className="space-y-2">
                    <label className="text-xs md:text-sm text-muted-foreground flex items-center gap-2">
                      <MapPin className="w-3 h-3 md:w-4 md:h-4 text-[#FCD116]" />
                      Localisation
                    </label>
                    <Select
                      value={filters.location}
                      onValueChange={(value: any) =>
                        setFilters({ ...filters, location: value })
                      }
                    >
                      <SelectTrigger className="h-11 md:h-12 border-2 border-border hover:border-[#FCD116]/50 transition-colors rounded-xl">
                        <SelectValue />
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
                  </div>

                  {/* Price Range */}
                  <div className="space-y-2">
                    <label className="text-xs md:text-sm text-muted-foreground flex items-center gap-2">
                      <DollarSign className="w-3 h-3 md:w-4 md:h-4 text-[#009E60]" />
                      Budget
                    </label>
                    <Select
                      value={filters.priceRange}
                      onValueChange={(value: any) =>
                        setFilters({ ...filters, priceRange: value })
                      }
                    >
                      <SelectTrigger className="h-11 md:h-12 border-2 border-border hover:border-[#009E60]/50 transition-colors rounded-xl">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tous budgets</SelectItem>
                        <SelectItem value="0-50000000">0 - 50M</SelectItem>
                        <SelectItem value="50000000-100000000">50M - 100M</SelectItem>
                        <SelectItem value="100000000-200000000">100M - 200M</SelectItem>
                        <SelectItem value="200000000+">200M+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    onClick={handleSearch}
                    className="flex-1 h-12 md:h-14 bg-gradient-to-r from-[#009E60] to-[#007d4d] hover:from-[#007d4d] hover:to-[#005a3a] text-base md:text-lg rounded-xl shadow-lg"
                  >
                    <Search className="w-5 h-5 mr-2" />
                    Rechercher
                  </Button>
                  <Button
                    onClick={() => {
                      setSearchQuery('');
                      setFilters({
                        type: 'all',
                        propertyType: 'all',
                        location: 'all',
                        priceRange: 'all',
                      });
                    }}
                    variant="outline"
                    className="sm:w-auto h-12 md:h-14 border-2 rounded-xl text-base"
                  >
                    Réinitialiser
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
