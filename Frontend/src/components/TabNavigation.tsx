import { Home, TrendingUp, Key, Users, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  const tabs = [
    { id: 'accueil', label: 'Accueil', icon: Home },
    { id: 'ventes', label: 'Ventes', icon: TrendingUp },
    { id: 'locations', label: 'Locations', icon: Key },
    { id: 'communaute', label: 'Communauté', icon: Users },
    { id: 'suggestions', label: 'Suggestions', icon: Sparkles },
  ];

  return (
    <div className="relative mt-2 mb-4 sm:mb-6 flex justify-center px-2 sm:px-0">
      {/* iPhone Dynamic Island Style Container */}
      <div className="bg-white rounded-full shadow-lg border border-border p-1 sm:p-1.5 inline-flex items-center gap-0.5 sm:gap-1 relative overflow-hidden max-w-full">
        <div className="absolute inset-0 bg-gradient-to-r from-[#009E60]/5 via-[#FCD116]/5 to-[#3A75C4]/5 rounded-full"></div>
        
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          
          return (
            <motion.button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`relative px-2 py-1.5 sm:px-4 sm:py-2.5 rounded-full transition-all duration-300 flex items-center gap-1 sm:gap-2 ${
                isActive ? 'text-white' : 'text-muted-foreground hover:text-foreground'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 2 }}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-gradient-to-r from-[#009E60] via-[#007d4d] to-[#009E60] rounded-full shadow-md"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
              
              <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 relative z-10 ${isActive ? 'text-white' : ''}`} />
              <span className="relative z-10 text-xs sm:text-sm hidden md:inline whitespace-nowrap">{tab.label}</span>
              
              {/* Notification badge  */}
              {tab.id === 'suggestions' && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-0.5 sm:-top-1 -right-0.5 sm:-right-1 w-4 h-4 sm:w-5 sm:h-5 bg-[#FCD116] text-black text-[10px] sm:text-xs rounded-full flex items-center justify-center z-20 shadow-sm"
                >
                  3
                </motion.span>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Decorative elements */}
      <div className="absolute -top-2 -right-2 w-16 h-16 sm:w-20 sm:h-20 bg-[#009E60]/10 rounded-full blur-2xl -z-10 pointer-events-none"></div>
      <div className="absolute -bottom-2 -left-2 w-16 h-16 sm:w-20 sm:h-20 bg-[#3A75C4]/10 rounded-full blur-2xl -z-10 pointer-events-none"></div>
    </div>
  );
}