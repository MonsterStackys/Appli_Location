import { Home, PlusSquare, Bell, Heart, LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { motion } from "motion/react";
import { currentUser } from "../lib/mockData";
import { AlertsModal } from "./AlertsModal";
import { useState } from "react";

interface NavbarProps {
  onShowAuthModal: () => void;
  isAuthenticated: boolean;
  onNavigate: (page: string) => void;
  onLogout?: () => void;
}

export function Navbar({
  onShowAuthModal,
  isAuthenticated,
  onNavigate,
  onLogout,
}: NavbarProps) {
  const [showAlertsModal, setShowAlertsModal] = useState(false);


  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-b border-border z-50 shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 h-16 sm:h-18 md:h-20 flex items-center justify-between gap-2 sm:gap-4">
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-1.5 sm:gap-2 cursor-pointer"
          onClick={() => onNavigate("home")}
        >
          <div className="flex gap-0.5 relative">
            <div className="w-2.5 sm:w-3 h-7 sm:h-8 md:h-9 bg-gradient-to-b from-[#009E60] to-[#007d4d] rounded-sm shadow-sm"></div>
            <div className="w-2.5 sm:w-3 h-7 sm:h-8 md:h-9 bg-gradient-to-b from-[#FCD116] to-[#e5bd0a] rounded-sm shadow-sm"></div>
            <div className="w-2.5 sm:w-3 h-7 sm:h-8 md:h-9 bg-gradient-to-b from-[#3A75C4] to-[#2d5ea3] rounded-sm shadow-sm"></div>
            <div className="absolute -inset-1 bg-gradient-to-r from-[#009E60] via-[#FCD116] to-[#3A75C4] opacity-20 blur-sm -z-10"></div>
          </div>
          <span className="bg-gradient-to-r from-[#009E60] to-[#007d4d] bg-clip-text text-transparent text-lg sm:text-xl md:text-2xl">
            GabonImmo
          </span>
        </motion.div>

        {/* Navigation Icons */}
        <div className="flex items-center gap-0.5 sm:gap-1 md:gap-2">
          {isAuthenticated ? (
            <>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="hidden sm:block"
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-[#e8f5f0] rounded-xl transition-all relative h-10 w-10 md:h-11 md:w-11"
                  onClick={() => onNavigate("home")}
                >
                  <Home className="w-5 h-5 md:w-6 md:h-6 text-[#009E60]" />
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="hidden sm:block"
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-[#ffe8f0] rounded-xl transition-all h-10 w-10 md:h-11 md:w-11"
                  onClick={() => onNavigate("favorites")}
                >
                  <Heart className="w-5 h-5 md:w-6 md:h-6 text-red-500" />
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-[#e8f0ff] rounded-xl transition-all h-10 w-10 md:h-11 md:w-11"
                  onClick={() => onNavigate("add-property")}
                >
                  <PlusSquare className="w-5 h-5 md:w-6 md:h-6 text-[#3A75C4]" />
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="hidden md:block"
                
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-[#fff8e8] rounded-xl transition-all relative h-10 w-10 md:h-11 md:w-11"
                  onClick={() => setShowAlertsModal(true)}
                >
                  <Bell className="w-5 h-5 md:w-6 md:h-6 text-[#FCD116]" />
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"
                  ></motion.span>
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    
                    <div className="hover:bg-gray-100 rounded-xl transition-all p-1.5 cursor-pointer">
                      <Avatar className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 ring-2 ring-[#009E60]/20 cursor-pointer">
                        <AvatarImage src={currentUser.avatar} />
                        <AvatarFallback>U</AvatarFallback>
                      </Avatar>
                    </div>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
                    <DropdownMenuSeparator />

                    
                    <div
                      className="flex items-center px-2 py-1.5 text-sm rounded-sm cursor-pointer hover:bg-accent transition-colors select-none"
                      onClick={() => {
                        onNavigate("profile");
                      }}
                    >
                      <Avatar className="w-8 h-8 mr-2">
                        <AvatarImage src={currentUser.avatar} />
                        <AvatarFallback>U</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">
                          {currentUser.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Voir le profil
                        </p>
                      </div>
                    </div>

                    <DropdownMenuSeparator />

                    <div
                      className="flex items-center px-2 py-1.5 text-sm rounded-sm cursor-pointer hover:bg-accent transition-colors text-red-600 select-none"
                      onClick={() => {
                        console.log("✅ Déconnexion !");
                        onLogout?.();
                      }}
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Se déconnecter
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              </motion.div>
            </>
          ) : (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={onShowAuthModal}
                className="bg-gradient-to-r from-[#009E60] to-[#007d4d] hover:from-[#007d4d] hover:to-[#005a3a] shadow-md rounded-xl text-sm sm:text-base h-10 sm:h-11 md:h-12 px-4 sm:px-5 md:px-6"
              >
                Se connecter
              </Button>
            </motion.div>
          )}
        </div>
      </div>

          <AlertsModal
        isOpen={showAlertsModal}
        onClose={() => setShowAlertsModal(false)}
      />

    </motion.nav>

  );
}
