import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Bell, X, MapPin, Home, DollarSign } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface AlertPreference {
  id: string;
  location: string;
  propertyType: string;
  type: 'vente' | 'location' | 'all';
  maxPrice?: number;
  minArea?: number;
}

interface AlertsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AlertsModal({ isOpen, onClose }: AlertsModalProps) {
  const [alerts, setAlerts] = useState<AlertPreference[]>([
    {
      id: '1',
      location: 'Libreville',
      propertyType: 'Villa',
      type: 'vente',
      maxPrice: 300000000
    }
  ]);

  const [newAlert, setNewAlert] = useState<Partial<AlertPreference>>({
    location: '',
    propertyType: 'all',
    type: 'all'
  });

  const handleAddAlert = () => {
    if (!newAlert.location) {
      toast.error('Veuillez sélectionner une localisation');
      return;
    }

    const alert: AlertPreference = {
      id: Date.now().toString(),
      location: newAlert.location,
      propertyType: newAlert.propertyType || 'all',
      type: newAlert.type as 'vente' | 'location' | 'all',
      maxPrice: newAlert.maxPrice,
      minArea: newAlert.minArea
    };

    setAlerts([...alerts, alert]);
    setNewAlert({
      location: '',
      propertyType: 'all',
      type: 'all'
    });
    toast.success('Alerte créée avec succès !');
  };

  const handleRemoveAlert = (id: string) => {
    setAlerts(alerts.filter(a => a.id !== id));
    toast.success('Alerte supprimée');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-[#009E60]" />
            Mes alertes immobilières
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Active Alerts */}
          <div>
            <h3 className="mb-3">Alertes actives ({alerts.length})</h3>
            <div className="space-y-3">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  className="p-4 border border-border rounded-lg hover:border-[#009E60] transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge className="bg-[#009E60]">
                          <MapPin className="w-3 h-3 mr-1" />
                          {alert.location}
                        </Badge>
                        {alert.propertyType !== 'all' && (
                          <Badge variant="outline">
                            <Home className="w-3 h-3 mr-1" />
                            {alert.propertyType}
                          </Badge>
                        )}
                        <Badge variant="outline">
                          {alert.type === 'vente' ? 'Vente' : alert.type === 'location' ? 'Location' : 'Tous'}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        {alert.maxPrice && (
                          <span className="flex items-center gap-1">
                            <DollarSign className="w-3 h-3" />
                            Max: {new Intl.NumberFormat('fr-FR', {
                              style: 'currency',
                              currency: 'XAF',
                              minimumFractionDigits: 0,
                              notation: 'compact'
                            }).format(alert.maxPrice)}
                          </span>
                        )}
                        {alert.minArea && (
                          <span>Min: {alert.minArea}m²</span>
                        )}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveAlert(alert.id)}
                    >
                      <X className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Create New Alert */}
          <div className="border-t border-border pt-6">
            <h3 className="mb-4">Créer une nouvelle alerte</h3>
            <div className="space-y-4">
              <div>
                <Label>Localisation *</Label>
                <Select
                  value={newAlert.location}
                  onValueChange={(value: string) => setNewAlert({ ...newAlert, location: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choisir une localisation" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Libreville">Libreville</SelectItem>
                    <SelectItem value="Port-Gentil">Port-Gentil</SelectItem>
                    <SelectItem value="Franceville">Franceville</SelectItem>
                    <SelectItem value="Akanda">Akanda</SelectItem>
                    <SelectItem value="Owendo">Owendo</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Type de bien</Label>
                  <Select
                    value={newAlert.propertyType}
                    onValueChange={(value: string) => setNewAlert({ ...newAlert, propertyType: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous les types</SelectItem>
                      <SelectItem value="Maison">Maison</SelectItem>
                      <SelectItem value="Appartement">Appartement</SelectItem>
                      <SelectItem value="Villa">Villa</SelectItem>
                      <SelectItem value="Terrain">Terrain</SelectItem>
                      <SelectItem value="Bureau">Bureau</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Transaction</Label>
                  <Select
                    value={newAlert.type}
                    onValueChange={(value: string) => setNewAlert({ ...newAlert, type: value as any })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Vente & Location</SelectItem>
                      <SelectItem value="vente">Vente uniquement</SelectItem>
                      <SelectItem value="location">Location uniquement</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Prix maximum (optionnel)</Label>
                  <Input
                    type="number"
                    placeholder="Ex: 200000000"
                    value={newAlert.maxPrice || ''}
                    onChange={(e) => setNewAlert({ ...newAlert, maxPrice: parseInt(e.target.value) || undefined })}
                  />
                </div>

                <div>
                  <Label>Surface minimale (optionnel)</Label>
                  <Input
                    type="number"
                    placeholder="Ex: 100"
                    value={newAlert.minArea || ''}
                    onChange={(e) => setNewAlert({ ...newAlert, minArea: parseInt(e.target.value) || undefined })}
                  />
                </div>
              </div>

              <Button
                onClick={handleAddAlert}
                className="w-full bg-[#009E60] hover:bg-[#007d4d]"
              >
                <Bell className="w-4 h-4 mr-2" />
                Créer l'alerte
              </Button>
            </div>
          </div>

          <div className="bg-[#FCD116]/10 border border-[#FCD116] rounded-lg p-4">
            <p className="text-sm text-muted-foreground">
              💡 <strong>Astuce :</strong> Vous recevrez une notification par email dès qu'une nouvelle annonce correspondant à vos critères sera publiée.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
