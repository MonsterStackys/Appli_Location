import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { currentUser } from '../lib/mockData';
import { Camera } from 'lucide-react';
import { toast } from 'sonner';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EditProfileModal({ isOpen, onClose }: EditProfileModalProps) {
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [phone, setPhone] = useState(currentUser.phone);
  const [whatsapp, setWhatsapp] = useState(currentUser.whatsapp || '');
  const [description, setDescription] = useState(currentUser.description || '');
  const [avatar, setAvatar] = useState(currentUser.avatar);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mise à jour du profil (simulation)
    currentUser.name = name;
    currentUser.email = email;
    currentUser.phone = phone;
    currentUser.whatsapp = whatsapp;
    currentUser.description = description;
    currentUser.avatar = avatar;

    toast.success('Profil mis à jour avec succès !');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Modifier mon profil</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Avatar */}
          <div className="flex flex-col items-center gap-3">
            <div className="relative">
              <Avatar className="w-24 h-24">
                <AvatarImage src={avatar} />
                <AvatarFallback>{name[0]}</AvatarFallback>
              </Avatar>
              <label 
                htmlFor="avatar-upload"
                className="absolute bottom-0 right-0 bg-[#009E60] text-white p-2 rounded-full cursor-pointer hover:bg-[#007d4d] transition-colors"
              >
                <Camera className="w-4 h-4" />
              </label>
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
              />
            </div>
            <p className="text-sm text-muted-foreground">Cliquez sur l'icône pour changer la photo</p>
          </div>

          {/* Nom */}
          <div className="space-y-2">
            <Label htmlFor="name">Nom complet *</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Téléphone */}
          <div className="space-y-2">
            <Label htmlFor="phone">Téléphone *</Label>
            <Input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+241 01 23 45 67"
              required
            />
          </div>

          {/* WhatsApp */}
          <div className="space-y-2">
            <Label htmlFor="whatsapp">WhatsApp</Label>
            <Input
              id="whatsapp"
              type="tel"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              placeholder="+241 01 23 45 67"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Parlez-nous de vous..."
              rows={4}
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Annuler
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-[#009E60] hover:bg-[#007d4d]"
            >
              Enregistrer
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
