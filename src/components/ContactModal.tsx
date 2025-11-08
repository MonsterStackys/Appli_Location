import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Property } from '../lib/mockData';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Phone, Mail, MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { toast } from 'sonner';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  property: Property | null;
}

export function ContactModal({ isOpen, onClose, property }: ContactModalProps) {
  const [message, setMessage] = useState('');

  if (!property) return null;

  const handleSendMessage = () => {
    toast.success('Message envoyé avec succès!');
    setMessage('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Contacter le vendeur</DialogTitle>
          <DialogDescription>
            Contactez {property.seller.name} pour en savoir plus sur cette propriété
          </DialogDescription>
        </DialogHeader>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          {/* Seller Info */}
          <div className="flex items-center gap-3 p-4 bg-[#e8f5f0] rounded-lg">
            <Avatar className="w-12 h-12">
              <AvatarImage src={property.seller.avatar} />
              <AvatarFallback>{property.seller.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{property.seller.name}</p>
              <p className="text-sm text-muted-foreground">
                {property.seller.type === 'agence' ? 'Agence immobilière' : 'Particulier'}
              </p>
            </div>
          </div>

          {/* Property Info */}
          <div className="p-4 border border-border rounded-lg">
            <p className="text-sm text-muted-foreground mb-1">Propriété concernée</p>
            <p className="font-medium">{property.title}</p>
            <p className="text-sm text-muted-foreground">{property.location}</p>
          </div>

          {/* Contact Options */}
          <div className="grid gap-2">
            <a href={`tel:${property.seller.phone}`} className="w-full">
              <Button variant="outline" className="w-full gap-2 justify-start">
                <Phone className="w-4 h-4 text-[#009E60]" />
                <span>{property.seller.phone}</span>
              </Button>
            </a>

            <a href={`mailto:${property.seller.email}`} className="w-full">
              <Button variant="outline" className="w-full gap-2 justify-start">
                <Mail className="w-4 h-4 text-[#3A75C4]" />
                <span>{property.seller.email}</span>
              </Button>
            </a>
          </div>

          {/* Message */}
          <div className="space-y-2">
            <label className="text-sm">
              Envoyer un message
            </label>
            <Textarea
              placeholder="Bonjour, je suis intéressé(e) par cette propriété..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              className="resize-none"
            />
          </div>

          <Button 
            onClick={handleSendMessage}
            className="w-full bg-[#009E60] hover:bg-[#007d4d] gap-2"
            disabled={!message.trim()}
          >
            <MessageCircle className="w-4 h-4" />
            Envoyer le message
          </Button>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}