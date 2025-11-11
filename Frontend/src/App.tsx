import { useState, useMemo, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { Sidebar } from "./components/Sidebar";
import { PropertyCard } from "./components/PropertyCard";
import { AuthModal } from "./components/AuthModal";
import { ContactModal } from "./components/ContactModal";
import { FilterBar } from "./components/FilterBar";
import { ProfilePage } from "./components/ProfilePage";
import { AddPropertyForm } from "./components/AddPropertyForm";
import { TabNavigation } from "./components/TabNavigation";
import { Footer } from "./components/Footer";
import { FloatingSearch } from "./components/FloatingSearch";
import { AgencyStories } from "./components/AgencyStories";
import { CategoryFilter } from "./components/CategoryFilter";
import { AlertsModal } from "./components/AlertsModal";
import { BuildingLoader } from "./components/BuildingLoader";
import { EditProfileModal } from "./components/EditProfileModal";
import { MobileStories } from "./components/MobileStories";
import { TextPostCard, TextPost } from "./components/TextPostCard";
import { Property, mockStories } from "./lib/mockData";
import { Toaster } from "./components/ui/sonner";
import { toast } from "sonner";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./components/ui/pagination";
import { motion, AnimatePresence } from "motion/react";
import { Heart, Users, Sparkles, Bell } from "lucide-react";
import { Button } from "./components/ui/button";
import { propertyService } from "./lib/services/propertyService";

const ITEMS_PER_PAGE = 5;

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showAlertsModal, setShowAlertsModal] = useState(false);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState("home");
  const [activeTab, setActiveTab] = useState("accueil");
  const [allProperties, setAllProperties] = useState<Property[]>([]); // Toutes les propriétés originales
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]); // Propriétés filtrées
  const [searchActive, setSearchActive] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [selectedSellerId, setSelectedSellerId] = useState<
    string | undefined
  >();
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    type: "all",
    propertyType: "all",
    location: "all",
    priceRange: "all",
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPageNumber]);

  useEffect(() => {
    loadProperties();
  }, []);

  // Appliquer les filtres chaque fois que les critères changent
  useEffect(() => {
    applyFilters();
  }, [allProperties, activeTab, selectedCategory, searchQuery, filters]);

  const loadProperties = async () => {
    setIsLoading(true);
    try {
      const data = await propertyService.getProperties();
      setAllProperties(data.data || data);
      setFilteredProperties(data.data || data); // Initialiser avec toutes les propriétés
    } catch (error) {
      console.error("Error loading properties:", error);
      toast.error("Erreur de chargement des propriétés");
    } finally {
      setIsLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...allProperties];

    // Filtre par recherche
    if (searchQuery) {
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filtre par tab (accueil, ventes, locations)
    if (activeTab === "ventes") {
      filtered = filtered.filter((p) => p.type === "vente");
    } else if (activeTab === "locations") {
      filtered = filtered.filter((p) => p.type === "location");
    }

    // Filtre par catégorie
    if (selectedCategory !== "all") {
      filtered = filtered.filter((p) => p.property_type === selectedCategory);
    }

    // Filtres supplémentaires
    if (filters.type !== "all") {
      filtered = filtered.filter((p) => p.type === filters.type);
    }

    if (filters.propertyType !== "all") {
      filtered = filtered.filter(
        (p) => p.property_type === filters.propertyType
      );
    }

    if (filters.location !== "all") {
      filtered = filtered.filter((p) => p.location.includes(filters.location));
    }

    if (filters.priceRange !== "all") {
      const [min, max] = filters.priceRange
        .split("-")
        .map((v: string) => (v.includes("+") ? Infinity : parseInt(v)));
      filtered = filtered.filter(
        (p) => p.price >= min && p.price <= (max || Infinity)
      );
    }

    setFilteredProperties(filtered);
    setCurrentPageNumber(1); // Reset à la première page après filtrage
  };

  const handleAuthenticate = () => {
    setIsAuthenticated(true);
    toast.success("Connexion réussie !", {
      description: "Bienvenue sur GabonImmo",
    });
  };

  const handleLogout = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsAuthenticated(false);
      setCurrentPage("home");
      setIsLoading(false);
      toast.success("Déconnexion réussie", {
        description: "À bientôt !",
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
    setCurrentPage("seller-profile");
  };

  const handleViewDetails = (propertyId: string) => {
    console.log("View property:", propertyId);
  };

  const handleNavigate = (page: string) => {
    if (!isAuthenticated && page !== "home") {
      setShowAuthModal(true);
      return;
    }
    setCurrentPage(page);
    setCurrentPageNumber(1);
    // Réinitialiser les filtres quand on change de page
    if (page === "home") {
      resetFilters();
    }
  };

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  const handleSearch = (query: string, searchFilters: any) => {
    setSearchQuery(query);
    setFilters(searchFilters);
    setSearchActive(true);
    setCurrentPage("home");
    setActiveTab("accueil");

    // Reset search active after a delay
    setTimeout(() => setSearchActive(false), 300);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setSelectedCategory("all"); // Reset category quand on change d'onglet
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const resetFilters = () => {
    setSearchQuery("");
    setFilters({
      type: "all",
      propertyType: "all",
      location: "all",
      priceRange: "all",
    });
    setSelectedCategory("all");
    setActiveTab("accueil");
  };

  // Pagination logic - utiliser filteredProperties
  const paginatedProperties = useMemo(() => {
    const startIndex = (currentPageNumber - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredProperties.slice(startIndex, endIndex);
  }, [filteredProperties, currentPageNumber]);

  const totalPages = Math.ceil(filteredProperties.length / ITEMS_PER_PAGE);

  const renderTabContent = () => {
    if (activeTab === "communaute") {
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
            Rejoignez notre communauté d'acheteurs, vendeurs et professionnels
            de l'immobilier. Partagez vos expériences et découvrez des conseils
            d'experts.
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

    if (activeTab === "suggestions") {
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
              Basé sur vos recherches et vos favoris, nous avons trouvé ces
              propriétés pour vous
            </p>
          </div>

          {filteredProperties.slice(0, 2).map((property) => (
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

        {/* Indicateur de recherche/filtres actifs
        {(searchQuery ||
          filters.type !== "all" ||
          filters.propertyType !== "all" ||
          selectedCategory !== "all") && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-blue-800">
                <span>Filtres actifs:</span>
                {searchQuery && (
                  <span className="bg-blue-100 px-2 py-1 rounded">
                    Recherche: "{searchQuery}"
                  </span>
                )}
                {filters.type !== "all" && (
                  <span className="bg-blue-100 px-2 py-1 rounded">
                    Type: {filters.type}
                  </span>
                )}
                {selectedCategory !== "all" && (
                  <span className="bg-blue-100 px-2 py-1 rounded">
                    Catégorie: {selectedCategory}
                  </span>
                )}
              </div>
              <button
                onClick={resetFilters}
                className="text-blue-600 hover:text-blue-800 text-sm underline"
              >
                Effacer tout
              </button>
            </div>
          </motion.div>
        )} */}

        {/* Résultats */}
        {filteredProperties.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 bg-white rounded-lg border border-border"
          >
            <p className="text-muted-foreground mb-2">
              Aucune propriété trouvée
            </p>
            <p className="text-sm text-muted-foreground">
              Essayez de modifier vos critères de recherche ou vos filtres
            </p>
            <button
              onClick={resetFilters}
              className="mt-4 px-4 py-2 bg-[#009E60] text-white rounded-lg hover:bg-[#007d4d]"
            >
              Afficher toutes les propriétés
            </button>
          </motion.div>
        ) : (
          <>
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
                        onClick={() =>
                          setCurrentPageNumber((prev) => Math.max(1, prev - 1))
                        }
                        className={
                          currentPageNumber === 1
                            ? "pointer-events-none opacity-50"
                            : "cursor-pointer"
                        }
                      />
                    </PaginationItem>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => {
                        if (
                          page === 1 ||
                          page === totalPages ||
                          (page >= currentPageNumber - 1 &&
                            page <= currentPageNumber + 1)
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
                        } else if (
                          page === currentPageNumber - 2 ||
                          page === currentPageNumber + 2
                        ) {
                          return <PaginationEllipsis key={page} />;
                        }
                        return null;
                      }
                    )}

                    <PaginationItem>
                      <PaginationNext
                        size="default"
                        onClick={() =>
                          setCurrentPageNumber((prev) =>
                            Math.min(totalPages, prev + 1)
                          )
                        }
                        className={
                          currentPageNumber === totalPages
                            ? "pointer-events-none opacity-50"
                            : "cursor-pointer"
                        }
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </motion.div>
            )}
          </>
        )}
      </>
    );
  };

  const renderContent = () => {
    switch (currentPage) {
      case "profile":
        return (
          <ProfilePage onEditClick={() => setShowEditProfileModal(true)} />
        );

      case "seller-profile":
        return <ProfilePage userId={selectedSellerId} />;

      case "add-property":
        return <AddPropertyForm />;

      case "favorites":
        const favoriteProperties = allProperties.filter(
          (p) => p.likedByCurrentUser
        );
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
                  <p className="text-muted-foreground">
                    Aucun favori pour le moment
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Cliquez sur le cœur pour ajouter des propriétés à vos
                    favoris
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

      case "my-properties":
        return (
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-6"
            >
              <h2 className="mb-4">Mes propriétés</h2>
              <div className="text-center py-12 bg-white rounded-lg border border-border">
                <p className="text-muted-foreground">
                  Vous n'avez pas encore de propriétés
                </p>
                <button
                  onClick={() => handleNavigate("add-property")}
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
            <TabNavigation
              onTabChange={handleTabChange}
              activeTab={activeTab}
            />
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
        <div
          className={`max-w-7xl mx-auto flex gap-3 sm:gap-4 md:gap-6 ${
            !isAuthenticated ? "justify-center" : ""
          }`}
        >
          {isAuthenticated && (
            <Sidebar onNavigate={handleNavigate} currentPage={currentPage} />
          )}

          <main
            className={`flex-1 w-full ${
              isAuthenticated ? "max-w-2xl mx-auto lg:mx-0" : "max-w-2xl"
            }`}
          >
            {renderContent()}
          </main>

          {/* Right Sidebar - Stories & Alerts */}
          {isAuthenticated && currentPage === "home" && (
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
                  {allProperties.slice(0, 3).map((property) => (
                    <div
                      key={property.id}
                      className="flex gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
                      onClick={() => handleViewDetails(property.id)}
                    >
                      <img
                        src={property.images[0].path}
                        alt={property.title}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm line-clamp-2">{property.title}</p>
                        <p className="text-xs text-[#009E60]">
                          {new Intl.NumberFormat("fr-FR", {
                            style: "currency",
                            currency: "XAF",
                            minimumFractionDigits: 0,
                            notation: "compact",
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

      <FloatingSearch onSearch={handleSearch} />

      <Toaster position="top-center" />
      <Footer />
    </div>
  );
}
