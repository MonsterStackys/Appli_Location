import { Heart, MessageCircle, Share2, MapPin, Bed, Bath, Maximize } from 'lucide-react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { Property } from '../lib/mockData';
import { motion } from 'motion/react';
import { useState } from 'react';
import { ImageWithFallback } from './ui/image-with-fallback';

interface PropertyCardProps {
  property: Property;
  onViewProfile: (sellerId: string) => void;
  onContact: (property: Property) => void;
  onViewDetails: (propertyId: string) => void;
}

export function PropertyCard({ property, onViewProfile, onContact, onViewDetails }: PropertyCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(property.likedByCurrentUser);
  const [likes, setLikes] = useState(property.likes);

  // Vérifier si les images existent et ont le bon format
  const propertyImages = property.images || [];
  const mainImage = propertyImages[currentImageIndex]?.path || '/placeholder-image.jpg';

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XAF',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Il y a quelques minutes';
    if (diffInHours < 24) return `Il y a ${diffInHours}h`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return 'Hier';
    if (diffInDays < 7) return `Il y a ${diffInDays} jours`;
    return date.toLocaleDateString('fr-FR');
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (propertyImages.length > 1) {
      setCurrentImageIndex((prev) => (prev + 1) % propertyImages.length);
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (propertyImages.length > 1) {
      setCurrentImageIndex((prev) => (prev - 1 + propertyImages.length) % propertyImages.length);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-white rounded-lg shadow-sm border border-border overflow-hidden mb-4">
        {/* Header */}
        <div className="p-4 flex items-center justify-between">
          <div 
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => onViewProfile(property.user.id)}
          >
            <Avatar>
              <AvatarImage src={property.user.avatar} alt={property.user.name} />
              <AvatarFallback>{property.user.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{property.user.name}</p>
              <div className="flex items-center gap-2">
                <p className="text-sm text-muted-foreground">{formatDate(property.updated_at)}</p>
                <Badge 
                  variant="secondary" 
                  className="text-xs bg-[#009E60] text-white"
                >
                  {property.user.type === 'agence' ? 'Agence' : 'Particulier'}
                </Badge>
              </div>
            </div>
          </div>
          <Badge 
            className={property.type === 'vente' 
              ? 'bg-[#3A75C4] hover:bg-[#2d5ea3]' 
              : 'bg-[#FCD116] text-black hover:bg-[#e5bd0a]'
            }
          >
            {property.type === 'vente' ? 'À vendre' : 'À louer'}
          </Badge>
        </div>

        {/* Content */}
        <div className="px-4 pb-3">
          <h3 className="mb-2">{property.title}</h3>
          <div className="flex items-center gap-1 text-muted-foreground mb-3">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">{property.location}</span>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="relative bg-black group cursor-pointer" onClick={() => onViewDetails(property.id)}>
          <ImageWithFallback
            src={mainImage}
            alt={property.title}
            className="w-full h-96 object-cover"
            // fallbackSrc="/placeholder-image.jpg"
          />
          
          {propertyImages.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <span className="sr-only">Image précédente</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <span className="sr-only">Image suivante</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                {propertyImages.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full ${
                      index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Details */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-4">
              {property.bedrooms && (
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Bed className="w-4 h-4" />
                  <span>{property.bedrooms}</span>
                </div>
              )}
              {property.bathrooms && (
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Bath className="w-4 h-4" />
                  <span>{property.bathrooms}</span>
                </div>
              )}
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Maximize className="w-4 h-4" />
                <span>{property.area}m²</span>
              </div>
            </div>
          </div>

          <p className="text-muted-foreground mb-3 line-clamp-2">{property.description}</p>
          
          <div className="flex items-center justify-between">
            <span className="text-[#009E60] font-semibold text-lg">
              {formatPrice(property.price)}
            </span>
            <Badge variant="outline">{property.property_type}</Badge>
          </div>
        </div>

        {/* Actions */}
        <div className="border-t border-border px-4 py-2 flex items-center justify-between">
          <motion.div whileTap={{ scale: 0.95 }}>
            <Button
              variant="ghost"
              size="sm"
              className={`gap-2 ${isLiked ? 'text-red-500' : ''}`}
              onClick={handleLike}
            >
              <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
              <span>{likes}</span>
            </Button>
          </motion.div>
          
          <Button
            variant="ghost"
            size="sm"
            className="gap-2 text-[#009E60] hover:bg-[#e8f5f0]"
            onClick={() => onContact(property)}
          >
            <MessageCircle className="w-5 h-5" />
            <span>Contacter</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="gap-2"
          >
            <Share2 className="w-5 h-5" />
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}