import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { motion } from "motion/react";
import { Mail, Lock, User, Phone, FileText } from "lucide-react";
import { authService } from "../lib/services/authService";
import { toast } from "sonner";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthenticate: (user: any) => void;
}

export function AuthModal({ isOpen, onClose, onAuthenticate }: AuthModalProps) {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPhone, setSignupPhone] = useState("");
  const [signupType, setSignupType] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupPasswordConfirm, setSignupPasswordConfirm] = useState("");
  const [hasWhatsApp, setHasWhatsApp] = useState(false);
  const [signupWhatsapp, setSignupWhatsapp] = useState("");
  const [signupDescription, setSignupDescription] = useState("");

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      toast.error("veuillez remplir tous les champs");
    }

    try {
      const data = await authService.login(email, password);
      onAuthenticate(data.user);
      // toast.success("Connexion réussie !");
      onClose();
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Identifiants invalides");
    }
  };

  const handleSignup = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password_confirmation = formData.get(
      "password_confirmation"
    ) as string;
    const password = formData.get("password") as string;

    const phone = formData.get("phone") as string;
    const whatsapp = (formData.get("whatsapp") as string) ?? phone;

    const type = formData.get("type") as "particulier" | "agence";

    const description = (formData.get("description") as string) ?? null;

    if (!name || !email || !password || !password_confirmation || !phone) {
      toast.error("Merci de remplir tous les champs obligatoires");
      return;
    }

    if (!type) {
      toast.error("Veuillez indiquer votre type de compte");
      return;
    }

    if (password !== password_confirmation) {
      toast.error("Les deux mots de passe sont differents");
      return;
    }

    const data = {
      name,
      email,
      password,
      password_confirmation,
      phone,
      whatsapp,
      type,
      description,
    };

    try {
      const res = await authService.register(data);

      onAuthenticate(res.user);
      toast.success("Connexion réussie !");

      setLoginEmail(email);
      setLoginPassword(password);

      setSignupName("");
      setSignupEmail("");
      setSignupPhone("");
      setSignupType("");
      setSignupPassword("");
      setSignupPasswordConfirm("");
      setHasWhatsApp(false);
      setSignupWhatsapp("");
      setSignupDescription("");

      onClose();
    } catch (error: any) {
      if (error.response?.data?.errors) {
        // Erreurs de validation détaillées
        const validationErrors = error.response.data.errors;
        Object.keys(validationErrors).forEach((cle) => {
          toast.error(`Erreur: ${validationErrors[cle][0]}`);
        });

        // Exemple: { email: ["L'email est déjà utilisé"], password: ["Le mot de passe est trop court"] }
      } else if (error.response?.data?.message) {
        // Message d'erreur général
        toast.error("Erreur:", error.response.data.message);
      } else {
        // Erreur réseau ou autre
        toast.error("Erreur inconnue:", error.message);
      }
    }
  };

  

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg max-h-[95vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-center gap-2">
            <div className="flex gap-0.5">
              <div className="w-2 h-6 bg-[#009E60] rounded-sm"></div>
              <div className="w-2 h-6 bg-[#FCD116] rounded-sm"></div>
              <div className="w-2 h-6 bg-[#3A75C4] rounded-sm"></div>
            </div>
            <span className="text-[#009E60]">GabonImmo</span>
          </DialogTitle>
          <DialogDescription className="text-center">
            Connectez-vous ou créez un compte pour accéder à toutes les
            fonctionnalités
          </DialogDescription>
        </DialogHeader>

        <div className="flex-2 overflow-hidden">
          <Tabs defaultValue="login" className="w-full h-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Connexion</TabsTrigger>
              <TabsTrigger value="signup">Inscription</TabsTrigger>
            </TabsList>

            <div className="mt-4 h-[calc(100%-50px)]">
              <TabsContent value="login" className="h-full m-0">
                <motion.form
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  onSubmit={handleLogin}
                  className="space-y-4 h-full"
                >
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="login-email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="login-email"
                          type="email"
                          placeholder="votre@email.ga"
                          className="pl-10"
                          name="email"
                          value={loginEmail}
                          onChange={(e) => setLoginEmail(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="login-password">Mot de passe</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="login-password"
                          type="password"
                          placeholder="••••••••"
                          className="pl-10"
                          name="password"
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 pt-4">
                    <Button
                      type="submit"
                      className="w-full bg-[#009E60] hover:bg-[#007d4d]"
                    >
                      Se connecter
                    </Button>

                    <div className="text-center">
                      <a
                        href="#"
                        className="text-sm text-[#009E60] hover:underline"
                      >
                        Mot de passe oublié ?
                      </a>
                    </div>
                  </div>
                </motion.form>
              </TabsContent>

              <TabsContent value="signup" className="h-full m-0">
                <div className="h-full max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                  <motion.form
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    onSubmit={handleSignup}
                    className="space-y-4 pb-4"
                  >
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="signup-name">Nom complet</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="signup-name"
                            type="text"
                            placeholder="Jean Dupont"
                            className="pl-10"
                            name="name"
                            value={signupName}
                            onChange={(e) => setSignupName(e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="signup-email">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="signup-email"
                            type="email"
                            name="email"
                            placeholder="votre@email.ga"
                            className="pl-10"
                            value={signupEmail}
                            onChange={(e) => setSignupEmail(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="signup-phone">Téléphone</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="signup-phone"
                            type="tel"
                            name="phone"
                            placeholder="+241 01 23 45 67"
                            className="pl-10"
                            value={signupPhone}
                            onChange={(e) => setSignupPhone(e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="signup-type">Type de compte</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground " />
                          <select
                            id="signup-type"
                            name="type"
                            className="flex h-10 w-full pl-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-10"
                            value={signupType}
                            onChange={(e) => setSignupType(e.target.value)}
                            required
                          >
                            <option value="">Type de compte</option>
                            <option value="particulier">Particulier</option>
                            <option value="agence">Agence</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="signup-password">Mot de passe</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="signup-password"
                            type="password"
                            name="password"
                            placeholder="••••••••"
                            className="pl-10"
                            value={signupPassword}
                            onChange={(e) => setSignupPassword(e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="signup-password-confirm">
                          Confirmation
                        </Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="signup-password-confirm"
                            type="password"
                            name="password_confirmation"
                            placeholder="••••••••"
                            className="pl-10"
                            value={signupPasswordConfirm}
                            onChange={(e) =>
                              setSignupPasswordConfirm(e.target.value)
                            }
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="whatsapp-checkbox"
                          checked={hasWhatsApp}
                          onChange={(e) => setHasWhatsApp(e.target.checked)}
                          className="rounded border-gray-300"
                        />
                        <Label
                          htmlFor="whatsapp-checkbox"
                          className="text-sm font-medium"
                        >
                          Connecter un autre numéro WhatsApp ?
                        </Label>
                      </div>

                      {hasWhatsApp && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="relative"
                        >
                          <Label htmlFor="signup-whatsapp">
                            Numéro WhatsApp
                          </Label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                              id="signup-whatsapp"
                              type="tel"
                              name="whatsapp"
                              placeholder="+241 01 23 45 67"
                              className="pl-10 mt-2"
                              value={signupWhatsapp}
                              onChange={(e) =>
                                setSignupWhatsapp(e.target.value)
                              }
                            />
                          </div>
                        </motion.div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signup-description">
                        Description{" "}
                        <span className="text-muted-foreground text-xs">
                          (optionnel)
                        </span>
                      </Label>
                      <div className="relative">
                        <FileText className="absolute left-3 top-2 w-4 h-4 text-muted-foreground mt-1" />
                        <textarea
                          id="signup-description"
                          name="description"
                          placeholder="Parlez-nous un peu de vous..."
                          className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-10 resize-none"
                          value={signupDescription}
                          onChange={(e) => setSignupDescription(e.target.value)}
                          rows={3}
                        />
                      </div>
                    </div>

                    <div className="sticky bottom-0 bg-background pt-4 pb-2 border-t border-border">
                      <Button
                        type="submit"
                        className="w-full bg-[#009E60] hover:bg-[#007d4d]"
                      >
                        S'inscrire
                      </Button>

                      <p className="text-xs text-center text-muted-foreground mt-3">
                        En vous inscrivant, vous acceptez nos conditions
                        d'utilisation et notre politique de confidentialité.
                      </p>
                    </div>
                  </motion.form>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}
