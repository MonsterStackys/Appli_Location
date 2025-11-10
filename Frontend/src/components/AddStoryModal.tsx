import { useState, useRef } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Camera, Image as ImageIcon, Type, X } from 'lucide-react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'motion/react';

interface AddStoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStoryAdded?: () => void;
}

const BACKGROUND_COLORS = [
  '#009E60', // Vert Gabon
  '#3A75C4', // Bleu Gabon
  '#FCD116', // Jaune Gabon
  '#1877f2', // Bleu Facebook
  '#e4405f', // Rose Instagram
  '#00a884', // Vert WhatsApp
  '#7c3aed', // Violet
  '#ef4444', // Rouge
];

export function AddStoryModal({ isOpen, onClose, onStoryAdded }: AddStoryModalProps) {
  const [storyType, setStoryType] = useState<'text' | 'image' | 'video' | null>(null);
  const [textContent, setTextContent] = useState('');
  const [backgroundColor, setBackgroundColor] = useState(BACKGROUND_COLORS[0]);
  const [mediaFile, setMediaFile] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<'image' | 'video' | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setMediaFile(reader.result as string);
        setMediaType(file.type.startsWith('video') ? 'video' : 'image');
        setStoryType(file.type.startsWith('video') ? 'video' : 'image');
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePublish = () => {
    if (storyType === 'text' && !textContent.trim()) {
      toast.error('Veuillez saisir un texte');
      return;
    }

    if ((storyType === 'image' || storyType === 'video') && !mediaFile) {
      toast.error('Veuillez sélectionner un fichier');
      return;
    }

    // Ici, vous enverriez les données au backend
    toast.success('Statut publié avec succès !');
    onStoryAdded?.();
    handleClose();
  };

  const handleClose = () => {
    setStoryType(null);
    setTextContent('');
    setMediaFile(null);
    setMediaType(null);
    setBackgroundColor(BACKGROUND_COLORS[0]);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-hidden p-0">
        {!storyType ? (
          // Selection du type de statut
          <div className="p-6">
            <DialogHeader className="mb-6">
              <DialogTitle>Ajouter un statut</DialogTitle>
            </DialogHeader>
            
            <div className="grid grid-cols-3 gap-4">
              {/* Texte */}
              <button
                onClick={() => setStoryType('text')}
                className="aspect-square rounded-2xl bg-gradient-to-br from-[#009E60] to-[#007d4d] hover:shadow-lg transition-all flex flex-col items-center justify-center gap-2 text-white p-4"
              >
                <Type className="w-8 h-8" />
                <span className="text-sm">Texte</span>
              </button>

              {/* Galerie */}
              <button
                onClick={() => fileInputRef.current?.click()}
                className="aspect-square rounded-2xl bg-gradient-to-br from-[#3A75C4] to-[#2d5ea3] hover:shadow-lg transition-all flex flex-col items-center justify-center gap-2 text-white p-4"
              >
                <ImageIcon className="w-8 h-8" />
                <span className="text-sm">Galerie</span>
              </button>

              {/* Caméra */}
              <button
                onClick={() => cameraInputRef.current?.click()}
                className="aspect-square rounded-2xl bg-gradient-to-br from-[#FCD116] to-[#e5bd0a] hover:shadow-lg transition-all flex flex-col items-center justify-center gap-2 text-white p-4"
              >
                <Camera className="w-8 h-8" />
                <span className="text-sm">Caméra</span>
              </button>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,video/*"
              className="hidden"
              onChange={handleFileSelect}
            />
            <input
              ref={cameraInputRef}
              type="file"
              accept="image/*,video/*"
              capture="environment"
              className="hidden"
              onChange={handleFileSelect}
            />
          </div>
        ) : storyType === 'text' ? (
          // Statut texte
          <div className="h-[600px] flex flex-col">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <DialogTitle>Créer un statut texte</DialogTitle>
              <Button variant="ghost" size="icon" onClick={handleClose}>
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Aperçu */}
            <div 
              className="flex-1 p-6 flex items-center justify-center"
              style={{ backgroundColor }}
            >
              <Textarea
                value={textContent}
                onChange={(e) => setTextContent(e.target.value)}
                placeholder="Écrivez votre statut..."
                className="bg-transparent border-none text-white text-center text-2xl resize-none focus-visible:ring-0 placeholder:text-white/60"
                rows={6}
                maxLength={200}
              />
            </div>

            {/* Couleurs */}
            <div className="p-4 border-t border-border">
              <p className="text-sm mb-3">Couleur de fond</p>
              <div className="flex gap-2 flex-wrap">
                {BACKGROUND_COLORS.map((color) => (
                  <button
                    key={color}
                    onClick={() => setBackgroundColor(color)}
                    className="w-10 h-10 rounded-full border-2 transition-all hover:scale-110"
                    style={{
                      backgroundColor: color,
                      borderColor: backgroundColor === color ? '#000' : color,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="p-4 border-t border-border flex gap-3">
              <Button
                variant="outline"
                onClick={() => setStoryType(null)}
                className="flex-1"
              >
                Retour
              </Button>
              <Button
                onClick={handlePublish}
                className="flex-1 bg-[#009E60] hover:bg-[#007d4d]"
              >
                Publier
              </Button>
            </div>
          </div>
        ) : (
          // Statut image/video
          <div className="h-[600px] flex flex-col">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <DialogTitle>Aperçu du statut</DialogTitle>
              <Button variant="ghost" size="icon" onClick={handleClose}>
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Aperçu média */}
            <div className="flex-1 bg-black flex items-center justify-center overflow-hidden">
              {mediaType === 'image' ? (
                <img 
                  src={mediaFile!} 
                  alt="Story preview" 
                  className="max-w-full max-h-full object-contain"
                />
              ) : (
                <video 
                  src={mediaFile!} 
                  controls 
                  className="max-w-full max-h-full"
                />
              )}
            </div>

            {/* Actions */}
            <div className="p-4 border-t border-border flex gap-3">
              <Button
                variant="outline"
                onClick={() => {
                  setMediaFile(null);
                  setMediaType(null);
                  setStoryType(null);
                }}
                className="flex-1"
              >
                Changer
              </Button>
              <Button
                onClick={handlePublish}
                className="flex-1 bg-[#009E60] hover:bg-[#007d4d]"
              >
                Publier
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
