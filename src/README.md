# 🏠 GabonImmo - Plateforme Immobilière

![GabonImmo](https://img.shields.io/badge/GabonImmo-Immobilier-009E60?style=for-the-badge)
![React](https://img.shields.io/badge/React-18+-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178C6?style=for-the-badge&logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind-4.0-06B6D4?style=for-the-badge&logo=tailwindcss)

GabonImmo est une plateforme moderne de vente et location immobilière inspirée du design de Facebook, avec les couleurs du drapeau gabonais (vert, jaune, bleu).

## 📋 Table des matières

- [Fonctionnalités](#-fonctionnalités)
- [Stack Technique](#-stack-technique)
- [Structure du Projet](#-structure-du-projet)
- [Installation](#-installation)
- [Composants Principaux](#-composants-principaux)
- [Données Mockées](#-données-mockées)
- [Styles et Thème](#-styles-et-thème)
- [Animations](#-animations)
- [Responsive Design](#-responsive-design)
- [Intégration Backend](#-intégration-backend)

## ✨ Fonctionnalités

### 🔐 Authentification
- Modal de connexion/inscription
- Système de déconnexion avec animation
- Protection des routes (favoris, profil, ajout d'annonce)

### 🏡 Gestion des Propriétés
- **Affichage des annonces** avec cartes interactives
- **Filtrage avancé** :
  - Par type (vente/location)
  - Par catégorie (maison, appartement, villa, bureau, terrain)
  - Par localisation
  - Par fourchette de prix
- **Recherche flottante** animée en bas à droite
- **Pagination** (5 annonces par page)
- **Système de likes** (favoris)

### 👤 Profils Utilisateurs
- **Profils personnels et publics**
- **Gestion des permissions** :
  - Bouton "Modifier" uniquement sur son propre profil
  - Bouton WhatsApp sur les profils des autres
- **Statistiques** : nombre de propriétés, vues, contacts
- **Liste des propriétés** de l'utilisateur

### 📱 Statuts des Agences (Style Facebook)
- **Stories circulaires** avec indicateur de non-vu
- **Modal plein écran** pour visionner
- **Navigation** entre les statuts
- **Barres de progression** animées

### 🔔 Système d'Alertes
- **Création d'alertes personnalisées** :
  - Localisation
  - Type de bien
  - Transaction (vente/location)
  - Prix maximum
  - Surface minimale
- **Gestion des alertes actives**
- **Notifications** par email (simulation)

### 🎨 Interface & UX
- **Design moderne** inspiré de Facebook
- **Palette Gabon** : Vert (#009E60), Jaune (#FCD116), Bleu (#3A75C4)
- **Animations fluides** avec Motion (Framer Motion)
- **Loader personnalisé** en forme d'immeuble
- **Responsive** : mobile, tablette, desktop

## 🛠 Stack Technique

### Frontend
- **React 18+** avec TypeScript
- **Tailwind CSS 4.0** pour le styling
- **Motion (Framer Motion)** pour les animations
- **Shadcn/ui** pour les composants UI
- **Lucide React** pour les icônes
- **Sonner** pour les notifications toast

### Bibliothèques Complémentaires
- `react-slick` - Carousels
- `date-fns` - Manipulation de dates

## 📁 Structure du Projet

```
/
├── App.tsx                      # Point d'entrée principal
├── components/
│   ├── Navbar.tsx               # Barre de navigation
│   ├── Sidebar.tsx              # Menu latéral gauche
│   ├── PropertyCard.tsx         # Carte d'annonce
│   ├── ProfilePage.tsx          # Page de profil
│   ├── AgencyStories.tsx        # Statuts des agences
│   ├── CategoryFilter.tsx       # Filtrage par catégorie
│   ├── AlertsModal.tsx          # Modal de gestion des alertes
│   ├── BuildingLoader.tsx       # Loader personnalisé
│   ├── FloatingSearch.tsx       # Recherche flottante
│   ├── TabNavigation.tsx        # Navigation par onglets
│   ├── FilterBar.tsx            # Barre de filtres
│   ├── ContactModal.tsx         # Modal de contact vendeur
│   ├── AuthModal.tsx            # Modal d'authentification
│   ├── AddPropertyForm.tsx      # Formulaire d'ajout d'annonce
│   ├── Footer.tsx               # Pied de page
│   └── ui/                      # Composants Shadcn/ui
├── lib/
│   └── mockData.ts              # Données de démonstration
└── styles/
    └── globals.css              # Styles globaux et tokens CSS

```

## 🚀 Installation

```bash
# Cloner le projet
git clone <your-repo-url>

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

## 🧩 Composants Principaux

### App.tsx
Le composant racine qui gère :
- L'état global (authentification, page courante, filtres)
- La logique de navigation
- Le rendu conditionnel des pages
- La gestion de la pagination

### Navbar.tsx
Barre de navigation fixe en haut avec :
- Logo animé GabonImmo
- Icônes de navigation (Accueil, Favoris, Ajouter, Notifications)
- Menu déroulant de profil avec déconnexion

### PropertyCard.tsx
Carte d'annonce immobilière affichant :
- Carousel d'images
- Informations (prix, localisation, caractéristiques)
- Profil du vendeur
- Boutons d'action (Like, Contacter, Voir profil)

### ProfilePage.tsx
Page de profil utilisateur avec :
- Avatar et informations personnelles
- Badge (Agence/Particulier)
- Statistiques (propriétés, vues, contacts)
- Liste des propriétés actives
- Bouton WhatsApp (pour les autres profils)

### AgencyStories.tsx
Composant de statuts façon Instagram/Facebook :
- Aperçu circulaire avec bordure colorée
- Modal plein écran pour visionner
- Navigation gauche/droite
- Barres de progression

### FloatingSearch.tsx
Barre de recherche animée :
- Icône flottante en bas à droite
- Expansion avec animation
- Fond flou (backdrop)
- Filtres intégrés

### BuildingLoader.tsx
Loader personnalisé animé :
- Immeuble avec fenêtres qui clignotent
- Grue de construction qui tourne
- Particules flottantes
- Texte de chargement

## 📊 Données Mockées

### Fichier : `/lib/mockData.ts`

#### Interfaces TypeScript

```typescript
interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  type: 'vente' | 'location';
  propertyType: 'Maison' | 'Appartement' | 'Villa' | 'Terrain' | 'Bureau';
  bedrooms?: number;
  bathrooms?: number;
  area: number;
  images: string[];
  description: string;
  seller: {
    id: string;
    name: string;
    type: 'particulier' | 'agence';
    avatar: string;
    phone: string;
    email: string;
  };
  likes: number;
  likedByCurrentUser: boolean;
  postedAt: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  phone: string;
  type: 'particulier' | 'agence';
  description?: string;
  properties?: number;
  whatsapp?: string;
}

interface Story {
  id: string;
  agencyId: string;
  agencyName: string;
  agencyAvatar: string;
  image: string;
  title: string;
  description: string;
  postedAt: string;
  viewed: boolean;
}
```

#### Données Disponibles

- **`mockProperties`** : 12 propriétés de test (ventes et locations)
- **`currentUser`** : Utilisateur connecté actuel
- **`allUsers`** : Liste de tous les utilisateurs (4 utilisateurs)
- **`mockStories`** : 4 statuts d'agences

### Comptes de Démonstration

1. **Utilisateur Principal**
   - ID: `u1`
   - Nom: Utilisateur Demo
   - Type: Particulier
   - WhatsApp: +24101112233

2. **Gabon Prestige Immobilier**
   - ID: `s1`
   - Type: Agence
   - Propriétés: 45
   - WhatsApp: +24101234567

3. **Marie Obame**
   - ID: `s2`
   - Type: Particulier
   - Propriétés: 3
   - WhatsApp: +24107891234

4. **Immobilier Gabon Plus**
   - ID: `s3`
   - Type: Agence
   - Propriétés: 38
   - WhatsApp: +24106554433

5. **Jean-Pierre Mba**
   - ID: `s4`
   - Type: Particulier
   - Propriétés: 5
   - WhatsApp: +24105223344

## 🎨 Styles et Thème

### Fichier : `/styles/globals.css`

#### Tokens CSS
```css
:root {
  /* Couleurs Gabon */
  --gabon-green: #009E60;
  --gabon-yellow: #FCD116;
  --gabon-blue: #3A75C4;
  
  /* Couleurs UI */
  --background: #ffffff;
  --foreground: oklch(0.145 0 0);
  --primary: #009E60;
  --muted: #ececf0;
  --border: rgba(0, 0, 0, 0.1);
}
```

#### Classes Utilitaires
- `.scrollbar-hide` : Cache la scrollbar
- Typography responsive automatique (h1, h2, h3, p, label, button, input)

## ⚡ Animations

### Motion (Framer Motion)

Toutes les animations utilisent Motion pour des transitions fluides :

```tsx
// Exemple d'animation d'entrée
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.1 }}
>
  {/* Contenu */}
</motion.div>
```

### Types d'Animations
- **Fade in/out** : Apparition/disparition
- **Slide** : Glissement (cards, modals)
- **Scale** : Zoom (boutons hover)
- **Stagger** : Animation en cascade (liste de propriétés)

## 📱 Responsive Design

### Breakpoints Tailwind
- **Mobile** : < 640px (sm)
- **Tablette** : 640px - 1024px (sm-lg)
- **Desktop** : 1024px - 1280px (lg-xl)
- **Large Desktop** : > 1280px (xl)

### Adaptations
- **Mobile** : Une colonne, menu burger
- **Tablette** : Deux colonnes, sidebar réduite
- **Desktop** : Trois colonnes (sidebar + contenu + suggestions)

### Classes Responsive
```tsx
<div className="px-2 sm:px-4 md:px-6">
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
    {/* Contenu */}
  </div>
</div>
```

## 🔌 Intégration Backend

Consultez le fichier [LARAVEL_INTEGRATION.md](./LARAVEL_INTEGRATION.md) pour un guide complet d'intégration avec Laravel.

### Points Clés
1. Remplacer les données mockées par des appels API
2. Gérer l'authentification avec JWT/Sanctum
3. Implémenter les endpoints RESTful
4. Gérer l'upload d'images
5. Configurer les notifications en temps réel

## 🤝 Contribution

Ce projet est actuellement une démo frontend. Pour contribuer :

1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📝 License

Ce projet est sous licence MIT.

## 👨‍💻 Auteur

Développé avec ❤️ pour le Gabon 🇬🇦
