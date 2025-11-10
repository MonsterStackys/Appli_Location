import { Home, Heart, Building2, User, Settings, LogOut, TrendingUp } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { motion } from 'motion/react';

interface SidebarProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

export function Sidebar({ onNavigate, currentPage }: SidebarProps) {
  const menuItems = [
    { id: 'home', icon: Home, label: 'Accueil', color: '#009E60' },
    { id: 'favorites', icon: Heart, label: 'Favoris', color: '#3A75C4' },
    { id: 'my-properties', icon: Building2, label: 'Mes propriétés', color: '#FCD116' },
    { id: 'profile', icon: User, label: 'Profil', color: '#009E60' },
  ];

  const stats = [
    { label: 'Propriétés vues', value: '24', color: '#009E60' },
    { label: 'Favoris', value: '8', color: '#3A75C4' },
    { label: 'Contacts', value: '12', color: '#FCD116' },
  ];

  return (
    <div className="hidden lg:block w-64 space-y-4">
      {/* Menu */}
      <Card className="p-3 space-y-1">
        {menuItems.map((item) => (
          <motion.button
            key={item.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onNavigate(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
              currentPage === item.id
                ? 'bg-[#e8f5f0] text-[#009E60]'
                : 'hover:bg-gray-100'
            }`}
          >
            <item.icon 
              className="w-5 h-5" 
              style={{ color: currentPage === item.id ? item.color : undefined }}
            />
            <span>{item.label}</span>
          </motion.button>
        ))}
      </Card>

      {/* Stats */}
      <Card className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="w-5 h-5 text-[#009E60]" />
          <h3>Statistiques</h3>
        </div>
        <div className="space-y-3">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between"
            >
              <span className="text-sm text-muted-foreground">{stat.label}</span>
              <span 
                className="font-medium" 
                style={{ color: stat.color }}
              >
                {stat.value}
              </span>
            </motion.div>
          ))}
        </div>
      </Card>

      {/* Quick Tips */}
      <Card className="p-4 bg-gradient-to-br from-[#e8f5f0] to-[#f0f8ff]">
        <h3 className="mb-2">💡 Astuce</h3>
        <p className="text-sm text-muted-foreground">
          Ajoutez des photos de qualité pour attirer plus d'acheteurs potentiels !
        </p>
      </Card>
    </div>
  );
}
