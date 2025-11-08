import { useState, useMemo, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { PropertyCard } from './components/PropertyCard';
import { AuthModal } from './components/AuthModal';
import { ContactModal } from './components/ContactModal';
import { FilterBar } from './components/FilterBar';
import { ProfilePage } from './components/ProfilePage';
import { AddPropertyForm } from './components/AddPropertyForm';
import { TabNavigation } from './components/TabNavigation';
import { Footer } from './components/Footer';
import { FloatingSearch } from './components/FloatingSearch';
import { AgencyStories } from './components/AgencyStories';
import { CategoryFilter } from './components/CategoryFilter';
import { AlertsModal } from './components/AlertsModal';
import { BuildingLoader } from './components/BuildingLoader';
import { EditProfileModal } from './components/EditProfileModal';
import { MobileStories } from './components/MobileStories';
import { TextPostCard, TextPost } from './components/TextPostCard';
import { mockProperties, Property, mockStories } from './lib/mockData';
import { Toaster } from './components/ui/sonner';
import { toast } from 'sonner';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from './components/ui/pagination';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Users, Sparkles, Bell } from 'lucide-react';
import { Button } from './components/ui/button';

const ITEMS_PER_PAGE = 5;

// Mock text posts
const mockTextPosts: TextPost[] = [
  {
    id: 't1',
    author: {
      id: 's1',
      name: 'Gabon Prestige Immobilier',
      avatar: 'https://images.unsplash.com/photo-1652878530627-cc6f063e3947?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      type: 'agence',
    },
    content: '🏠 Nouveau quartier résidentiel en construction ! Des villas modernes avec piscine à partir de 150M FCFA. Contactez-nous vite !',
    backgroundColor: '#009E60',
    category: 'Villa',
    likes: 45,
    likedByCurrentUser: false,
    comments: 12,
    views: 234,
    postedAt: '2024-11-07T10:30:00Z',
  },
  {
    id: 't2',
    author: {
      id: 's3',
      name: 'Immobilier Gabon Plus',
      avatar: 'https://images.unsplash.com/photo-1652878530627-cc6f063e3947?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      type: 'agence',
    },
    content: '💼 Bureaux équipés disponibles immédiatement au centre-ville de Libreville. Internet haut débit inclus !',
    backgroundColor: '#3A75C4',
    category: 'Bureau',
    likes: 28,
    likedByCurrentUser: true,
    comments: 5,
    views: 156,
    postedAt: '2024-11-06T14:20:00Z',
  },
];

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showAlertsModal, setShowAlertsModal] = useState(false);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [currentPage, setCurrentPage] = useState('home');
  const [activeTab, setActiveTab] = useState('accueil');
  const [properties, setProperties] = useState(mockProperties);
  const [searchActive, setSearchActive] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [selectedSellerId, setSelectedSellerId] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [textPosts, setTextPosts] = useState(mockTextPosts);


  useEffect(() => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}, [currentPageNumber]); // Se déclenche à chaque changement de page

  const handleAuthenticate = () => {
    setIsAuthenticated(true);
    toast.success('Connexion réussie !', {
      description: 'Bienvenue sur GabonImmo'
    });
  };

  const handleLogout = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsAuthenticated(false);
      setCurrentPage('home');
      setIsLoading(false);
      toast.success('Déconnexion réussie', {
        description: 'À bientôt !'
      });
    }, 1000);
  };

  const handleContact = (property: Property) => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }
    setSelectedProperty(property);
    setShowContactModal(true);
  };

  const handleViewProfile = (sellerId: string) => {
    setSelectedSellerId(sellerId);
    setCurrentPage('seller-profile');
  };

  const handleViewDetails = (propertyId: string) => {
    // In a real app, navigate to property details page
    console.log('View property:', propertyId);
  };

  const handleNavigate = (page: string) => {
    if (!isAuthenticated && page !== 'home') {
      setShowAuthModal(true);
      return;
    }
    setCurrentPage(page);
    setCurrentPageNumber(1); // Reset pagination when navigating
  };

  const handleFilterChange = (filters: any) => {
    // In a real app, filter properties based on filters
    console.log('Filters:', filters);
  };

  const handleSearch = (query: string, filters: any) => {
    setSearchActive(true);
    // Filter properties based on search query and filters
    let filtered = [...mockProperties];

    if (query) {
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.location.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (filters.type !== 'all') {
      filtered = filtered.filter(p => p.type === filters.type);
    }

    if (filters.propertyType !== 'all') {
      filtered = filtered.filter(p => p.propertyType === filters.propertyType);
    }

    if (filters.location !== 'all') {
      filtered = filtered.filter(p => p.location.includes(filters.location));
    }

    if (filters.priceRange !== 'all') {
      const [min, max] = filters.priceRange.split('-').map((v: string) => 
        v.includes('+') ? Infinity : parseInt(v)
      );
      filtered = filtered.filter(p => p.price >= min && p.price <= (max || Infinity));
    }

    setProperties(filtered);
    setCurrentPage('home');
    setActiveTab('accueil');
    setCurrentPageNumber(1);
    
    // Reset search active after a delay
    setTimeout(() => setSearchActive(false), 300);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setCurrentPageNumber(1);
    // Filter properties based on tab
    if (tab === 'ventes') {
      const filtered = mockProperties.filter(p => p.type === 'vente');
      setProperties(selectedCategory === 'all' ? filtered : filtered.filter(p => p.propertyType === selectedCategory));
    } else if (tab === 'locations') {
      const filtered = mockProperties.filter(p => p.type === 'location');
      setProperties(selectedCategory === 'all' ? filtered : filtered.filter(p => p.propertyType === selectedCategory));
    } else if (tab === 'accueil') {
      setProperties(selectedCategory === 'all' ? mockProperties : mockProperties.filter(p => p.propertyType === selectedCategory));
    }
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPageNumber(1);
    
    // Get base properties from current tab
    let baseProperties = mockProperties;
    if (activeTab === 'ventes') {
      baseProperties = mockProperties.filter(p => p.type === 'vente');
    } else if (activeTab === 'locations') {
      baseProperties = mockProperties.filter(p => p.type === 'location');
    }
    
    // Filter by category
    if (category === 'all') {
      setProperties(baseProperties);
    } else {
      setProperties(baseProperties.filter(p => p.propertyType === category));
    }
  };

  // Pagination logic
  const paginatedProperties = useMemo(() => {
    const startIndex = (currentPageNumber - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return properties.slice(startIndex, endIndex);
  }, [properties, currentPageNumber]);

  const totalPages = Math.ceil(properties.length / ITEMS_PER_PAGE);

  const renderTabContent = () => {
    if (activeTab === 'communaute') {
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl shadow-lg border border-border p-8 text-center"
        >
          <div className="w-20 h-20 bg-gradient-to-br from-[#009E60] to-[#007d4d] rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="w-10 h-10 text-white" />
          </div>
          <h2 className="mb-3">Communauté GabonImmo</h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Rejoignez notre communauté d'acheteurs, vendeurs et professionnels de l'immobilier. 
            Partagez vos expériences et découvrez des conseils d'experts.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
            <div className="p-4 bg-gradient-to-br from-[#009E60]/10 to-transparent rounded-xl">
              <p className="text-3xl text-[#009E60] mb-1">2,500+</p>
              <p className="text-sm text-muted-foreground">Membres actifs</p>
            </div>
            <div className="p-4 bg-gradient-to-br from-[#3A75C4]/10 to-transparent rounded-xl">
              <p className="text-3xl text-[#3A75C4] mb-1">850+</p>
              <p className="text-sm text-muted-foreground">Discussions</p>
            </div>
            <div className="p-4 bg-gradient-to-br from-[#FCD116]/10 to-transparent rounded-xl">
              <p className="text-3xl text-[#FCD116] mb-1">1,200+</p>
              <p className="text-sm text-muted-foreground">Avis partagés</p>
            </div>
          </div>
        </motion.div>
      );
    }

    if (activeTab === 'suggestions') {
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="mb-6 bg-gradient-to-r from-[#FCD116] via-[#009E60] to-[#3A75C4] rounded-2xl shadow-lg p-6 text-white">
            <div className="flex items-center gap-3 mb-3">
              <Sparkles className="w-6 h-6" />
              <h2 className="text-white">Suggestions personnalisées</h2>
            </div>
            <p className="text-white/90 text-sm">
              Basé sur vos recherches et vos favoris, nous avons trouvé ces propriétés pour vous
            </p>
          </div>
          
          {mockProperties.slice(0, 2).map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onViewProfile={handleViewProfile}
              onContact={handleContact}
              onViewDetails={handleViewDetails}
            />
          ))}
        </motion.div>
      );
    }

    // Default: show properties for accueil, ventes, locations
    return (
      <>
        {/* Mobile Stories - Visible uniquement sur mobile et si connecté */}
        {isAuthenticated && (
          <div className="block lg:hidden mb-4">
            <MobileStories />
          </div>
        )}
        
        {/* Filtres - Affichés uniquement une fois */}
        <CategoryFilter 
          selectedCategory={selectedCategory} 
          onCategoryChange={handleCategoryChange} 
        />
        <FilterBar onFilterChange={handleFilterChange} />
        
        <AnimatePresence mode="popLayout">
          {paginatedProperties.map((property, index) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: index * 0.1 }}
            >
              <PropertyCard
                property={property}
                onViewProfile={handleViewProfile}
                onContact={handleContact}
                onViewDetails={handleViewDetails}
              />
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6"
          >
            <Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious 
        size="default"
        onClick={() => setCurrentPageNumber(prev => Math.max(1, prev - 1))}
        className={currentPageNumber === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
      />
    </PaginationItem>
    
    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
      if (
        page === 1 ||
        page === totalPages ||
        (page >= currentPageNumber - 1 && page <= currentPageNumber + 1)
      ) {
        return (
          <PaginationItem key={page}>
            <PaginationLink
              size="default"
              onClick={() => setCurrentPageNumber(page)}
              isActive={currentPageNumber === page}
              className="cursor-pointer"
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        );
      } else if (page === currentPageNumber - 2 || page === currentPageNumber + 2) {
        return <PaginationEllipsis key={page} />;
      }
      return null;
    })}
    
    <PaginationItem>
      <PaginationNext 
        size="default"
        onClick={() => setCurrentPageNumber(prev => Math.min(totalPages, prev + 1))}
        className={currentPageNumber === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
      />
    </PaginationItem>
  </PaginationContent>
</Pagination>
          </motion.div>
        )}
      </>
    );
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'profile':
        return <ProfilePage onEditClick={() => setShowEditProfileModal(true)} />;
      
      case 'seller-profile':
        return <ProfilePage userId={selectedSellerId} />;
      
      case 'add-property':
        return <AddPropertyForm />;
      
      case 'favorites':
        const favoriteProperties = properties.filter(p => p.likedByCurrentUser);
        return (
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <Heart className="w-6 h-6 text-red-500 fill-current" />
                <h2>Mes favoris</h2>
              </div>
              {favoriteProperties.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg border border-border">
                  <Heart className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">Aucun favori pour le moment</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Cliquez sur le cœur pour ajouter des propriétés à vos favoris
                  </p>
                </div>
              ) : (
                favoriteProperties.map((property) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    onViewProfile={handleViewProfile}
                    onContact={handleContact}
                    onViewDetails={handleViewDetails}
                  />
                ))
              )}
            </motion.div>
          </div>
        );
      
      case 'my-properties':
        return (
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-6"
            >
              <h2 className="mb-4">Mes propriétés</h2>
              <div className="text-center py-12 bg-white rounded-lg border border-border">
                <p className="text-muted-foreground">Vous n'avez pas encore de propriétés</p>
                <button
                  onClick={() => handleNavigate('add-property')}
                  className="mt-4 px-4 py-2 bg-[#009E60] text-white rounded-lg hover:bg-[#007d4d]"
                >
                  Ajouter une propriété
                </button>
              </div>
            </motion.div>
          </div>
        );
      
      default: // home
        return (
          <>
            <TabNavigation onTabChange={handleTabChange} activeTab={activeTab} />
            {renderTabContent()}
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#f0f2f5]">
      <Navbar 
        onShowAuthModal={() => setShowAuthModal(true)}
        isAuthenticated={isAuthenticated}
        onNavigate={handleNavigate}
        onLogout={handleLogout}
      />

      {isLoading && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-8 shadow-2xl">
            <BuildingLoader />
          </div>
        </div>
      )}
      
      <div className="pt-16 sm:pt-20 md:pt-24 px-2 sm:px-4 pb-20 sm:pb-8">
        <div className={`max-w-7xl mx-auto flex gap-3 sm:gap-4 md:gap-6 ${!isAuthenticated ? 'justify-center' : ''}`}>
          {isAuthenticated && (
            <Sidebar 
              onNavigate={handleNavigate}
              currentPage={currentPage}
            />
          )}
          
          <main className={`flex-1 w-full ${isAuthenticated ? 'max-w-2xl mx-auto lg:mx-0' : 'max-w-2xl'}`}>
            {renderContent()}
          </main>

          {/* Right Sidebar - Stories & Alerts */}
          {isAuthenticated && currentPage === 'home' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="hidden xl:block w-80 space-y-4"
            >
              {/* Alerts Button */}
              <Button
                onClick={() => setShowAlertsModal(true)}
                className="w-full bg-gradient-to-r from-[#FCD116] to-[#009E60] hover:from-[#e5bc00] hover:to-[#007d4d] text-white gap-2"
              >
                <Bell className="w-4 h-4" />
                Créer une alerte
              </Button>

              {/* Agency Stories */}
              <AgencyStories stories={mockStories} />

              {/* Trending Properties */}
              <div className="bg-white rounded-lg shadow-sm border border-border p-4 sticky top-20">
                <h3 className="mb-3">🔥 Propriétés tendance</h3>
                <div className="space-y-3">
                  {properties.slice(0, 3).map((property) => (
                    <div 
                      key={property.id}
                      className="flex gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
                      onClick={() => handleViewDetails(property.id)}
                    >
                      <img 
                        src={property.images[0]} 
                        alt={property.title}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm line-clamp-2">{property.title}</p>
                        <p className="text-xs text-[#009E60]">
                          {new Intl.NumberFormat('fr-FR', {
                            style: 'currency',
                            currency: 'XAF',
                            minimumFractionDigits: 0,
                            notation: 'compact'
                          }).format(property.price)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* App Download */}
              <div className="bg-gradient-to-br from-[#009E60] to-[#007d4d] rounded-lg shadow-sm p-4 text-white">
                <h3 className="mb-2">📱 Application mobile</h3>
                <p className="text-sm opacity-90 mb-3">
                  Téléchargez notre app pour ne rien manquer
                </p>
                <button className="w-full bg-white text-[#009E60] py-2 rounded-lg hover:bg-gray-100 transition-colors">
                  Télécharger
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onAuthenticate={handleAuthenticate}
      />

      <ContactModal
        isOpen={showContactModal}
        onClose={() => setShowContactModal(false)}
        property={selectedProperty}
      />

      <AlertsModal
        isOpen={showAlertsModal}
        onClose={() => setShowAlertsModal(false)}
      />

      <EditProfileModal
        isOpen={showEditProfileModal}
        onClose={() => setShowEditProfileModal(false)}
      />

      <FloatingSearch
        onSearch={handleSearch}
      />

      <Toaster position="top-center" />
      <Footer />
    </div>
  );
}