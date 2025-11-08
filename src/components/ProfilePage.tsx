import { Card } from './ui/card';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { currentUser, mockProperties, allUsers } from '../lib/mockData';
import { Mail, Phone, MapPin, Building2, Calendar, Edit, MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface ProfilePageProps {
  userId?: string;
  onEditClick?: () => void;
}

export function ProfilePage({ userId, onEditClick }: ProfilePageProps) {
  // Si userId est fourni et différent du currentUser, on affiche le profil d'un autre utilisateur
  const isOwnProfile = !userId || userId === currentUser.id;
  const user = userId && !isOwnProfile 
    ? allUsers.find(u => u.id === userId) || currentUser
    : currentUser;
  
  const userProperties = mockProperties.filter(p => 
    p.seller.id === (isOwnProfile ? currentUser.id : userId)
  ).slice(0, 3);

  const handleWhatsAppContact = () => {
    const phone = user.whatsapp || user.phone.replace(/\s/g, '');
    const message = encodeURIComponent(`Bonjour ${user.name}, je vous contacte depuis GabonImmo.`);
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto space-y-4"
    >
      {/* Profile Header */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <Avatar className="w-24 h-24">
            <AvatarImage src={user.avatar} />
            <AvatarFallback>{user.name[0]}</AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <div className="flex items-start justify-between mb-2 flex-wrap gap-2">
              <div>
                <h2>{user.name}</h2>
                <Badge className="mt-1 bg-[#009E60]">
                  {user.type === 'agence' ? 'Agence' : 'Particulier'}
                </Badge>
                {user.description && (
                  <p className="text-sm text-muted-foreground mt-2">{user.description}</p>
                )}
              </div>
              <div className="flex gap-2">
                {!isOwnProfile && (
                  <Button 
                    onClick={handleWhatsAppContact}
                    className="gap-2 bg-[#25D366] hover:bg-[#20BA5A]"
                  >
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp
                  </Button>
                )}
                {isOwnProfile && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="gap-2"
                    onClick={onEditClick}
                  >
                    <Edit className="w-4 h-4" />
                    Modifier
                  </Button>
                )}
              </div>
            </div>

            <div className="space-y-2 mt-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="w-4 h-4" />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="w-4 h-4" />
                <span>{user.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span>Membre depuis novembre 2024</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Propriétés</p>
              <p className="text-2xl text-[#009E60]">{user.properties || 0}</p>
            </div>
            <Building2 className="w-8 h-8 text-[#009E60] opacity-20" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Vues totales</p>
              <p className="text-2xl text-[#3A75C4]">1,234</p>
            </div>
            <svg className="w-8 h-8 text-[#3A75C4] opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Contacts reçus</p>
              <p className="text-2xl text-[#FCD116]">45</p>
            </div>
            <Mail className="w-8 h-8 text-[#FCD116] opacity-20" />
          </div>
        </Card>
      </div>

      {/* Properties */}
      <Card className="p-6">
        <h3 className="mb-4">
          {isOwnProfile ? 'Mes propriétés actives' : 'Propriétés de ' + user.name}
        </h3>
        <div className="space-y-4">
          {userProperties.length > 0 ? (
            <>
              {userProperties.map((property) => (
                <motion.div
                  key={property.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex gap-4 p-3 border border-border rounded-lg hover:border-[#009E60] transition-colors"
                >
                  <img 
                    src={property.images[0]} 
                    alt={property.title} 
                    className="w-24 h-24 object-cover rounded"
                  />
                  <div className="flex-1">
                    <p className="font-medium">{property.title}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                      <MapPin className="w-3 h-3" />
                      <span>{property.location}</span>
                    </div>
                    <div className="flex items-center gap-3 mt-2">
                      <Badge variant="outline">{property.type === 'vente' ? 'Vente' : 'Location'}</Badge>
                      <span className="text-[#009E60]">
                        {new Intl.NumberFormat('fr-FR', {
                          style: 'currency',
                          currency: 'XAF',
                          minimumFractionDigits: 0,
                        }).format(property.price)}
                      </span>
                    </div>
                  </div>
                  {isOwnProfile && (
                    <div className="flex flex-col gap-2">
                      <Button variant="outline" size="sm">Modifier</Button>
                      <Button variant="ghost" size="sm">Statistiques</Button>
                    </div>
                  )}
                </motion.div>
              ))}
              {isOwnProfile && (
                <Button variant="outline" className="w-full mt-4">
                  Voir toutes mes propriétés
                </Button>
              )}
            </>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              {isOwnProfile 
                ? "Vous n'avez pas encore de propriétés"
                : "Aucune propriété publique pour le moment"
              }
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
}