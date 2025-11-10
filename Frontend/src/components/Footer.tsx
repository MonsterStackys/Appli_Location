import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

export function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-[#009E60] via-[#007d4d] to-[#005a3a] text-white mt-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-8 sm:py-10 md:py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {/* Logo & Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="flex gap-0.5">
                <div className="w-2.5 sm:w-3 h-6 sm:h-8 bg-white rounded-sm"></div>
                <div className="w-2.5 sm:w-3 h-6 sm:h-8 bg-[#FCD116] rounded-sm"></div>
                <div className="w-2.5 sm:w-3 h-6 sm:h-8 bg-[#3A75C4] rounded-sm"></div>
              </div>
              <span className="text-lg sm:text-xl text-white">GabonImmo</span>
            </div>
            <p className="text-white/80 text-sm leading-relaxed mb-4">
              La plateforme immobilière n°1 au Gabon. Trouvez votre propriété idéale facilement et en toute sécurité.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-9 h-9 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all hover:scale-110"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all hover:scale-110"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all hover:scale-110"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all hover:scale-110"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="mb-4">Services</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-white/80 hover:text-white transition-colors text-sm flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-[#FCD116] rounded-full group-hover:scale-150 transition-transform"></span>
                  Acheter une propriété
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-white transition-colors text-sm flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-[#FCD116] rounded-full group-hover:scale-150 transition-transform"></span>
                  Louer une propriété
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-white transition-colors text-sm flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-[#FCD116] rounded-full group-hover:scale-150 transition-transform"></span>
                  Vendre votre bien
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-white transition-colors text-sm flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-[#FCD116] rounded-full group-hover:scale-150 transition-transform"></span>
                  Estimation gratuite
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-white transition-colors text-sm flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-[#FCD116] rounded-full group-hover:scale-150 transition-transform"></span>
                  Guide de l'acheteur
                </a>
              </li>
            </ul>
          </motion.div>

          {/* À propos */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="mb-4">À propos</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-white/80 hover:text-white transition-colors text-sm flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-[#3A75C4] rounded-full group-hover:scale-150 transition-transform"></span>
                  Qui sommes-nous ?
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-white transition-colors text-sm flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-[#3A75C4] rounded-full group-hover:scale-150 transition-transform"></span>
                  Notre équipe
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-white transition-colors text-sm flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-[#3A75C4] rounded-full group-hover:scale-150 transition-transform"></span>
                  Carrières
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-white transition-colors text-sm flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-[#3A75C4] rounded-full group-hover:scale-150 transition-transform"></span>
                  Conditions d'utilisation
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-white transition-colors text-sm flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-[#3A75C4] rounded-full group-hover:scale-150 transition-transform"></span>
                  Politique de confidentialité
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="mb-4">Contact</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm text-white/80">Boulevard Triomphal</p>
                  <p className="text-sm text-white/80">Libreville, Gabon</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <a href="tel:+24101234567" className="text-sm text-white/80 hover:text-white transition-colors">
                  +241 01 23 45 67
                </a>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <a href="mailto:contact@gabonimmo.ga" className="text-sm text-white/80 hover:text-white transition-colors">
                  contact@gabonimmo.ga
                </a>
              </div>
            </div>

            {/* Newsletter */}
            <div className="mt-6 p-4 bg-white/10 rounded-xl backdrop-blur-sm">
              <p className="text-sm mb-3">Newsletter</p>
              <div className="flex gap-2">
                <Input 
                  placeholder="Votre email"
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/50 focus:bg-white/30"
                />
                <Button className="bg-[#FCD116] text-black hover:bg-[#e5bd0a] flex-shrink-0">
                  OK
                </Button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 pt-8 border-t border-white/20 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <p className="text-sm text-white/60">
            © 2024 GabonImmo. Tous droits réservés.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-white/60 hover:text-white transition-colors">
              Plan du site
            </a>
            <a href="#" className="text-sm text-white/60 hover:text-white transition-colors">
              Mentions légales
            </a>
            <a href="#" className="text-sm text-white/60 hover:text-white transition-colors">
              Cookies
            </a>
          </div>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#FCD116]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#3A75C4]/10 rounded-full blur-3xl"></div>
    </footer>
  );
}