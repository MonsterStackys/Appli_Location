export interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  type: "vente" | "location";
  property_type: "Maison" | "Appartement" | "Villa" | "Terrain" | "Bureau";
  bedrooms?: number;
  bathrooms?: number;
  area: number;
  images: PropertyImage[]
  description: string;
  user: {
    id: string;
    name: string;
    type: "particulier" | "agence";
    avatar: string;
    phone: string;
    email: string;
  };
  likes: number;
  likedByCurrentUser: boolean;
  updated_at: string;
}

export interface PropertyImage{
   id: string;
  property_id: string;
  order: number;
  path: string;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  phone: string;
  type: "particulier" | "agence";
  description?: string;
  properties?: number;
  whatsapp?: string;
}

export interface Story {
  id: string;
  agencyId: string;
  agencyName: string;
  agencyAvatar: string;
  image: string;
  title: string;
  description: string;
  updated_at: string;
  viewed: boolean;
}

export const mockProperties: any[] = [
  {
    id: "1",
    title: "Villa moderne avec piscine - Libreville",
    price: 250000000,
    location: "Libreville, Gabon",
    type: "vente",
    propertyType: "Villa",
    bedrooms: 5,
    bathrooms: 4,
    area: 350,
    images: [
      "https://images.unsplash.com/photo-1757264119016-7e6b568b810d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB2aWxsYSUyMHBvb2x8ZW58MXx8fHwxNzYyNDYxNzgzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBob3VzZSUyMGV4dGVyaW9yfGVufDF8fHx8MTc2MjQxMDkxMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1592839656073-833413ae8874?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3VzZSUyMGtpdGNoZW4lMjBtb2Rlcm58ZW58MXx8fHwxNzYyNDc5OTcxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    ],
    description:
      "Magnifique villa moderne avec piscine, jardin tropical et finitions luxueuses. Située dans un quartier calme et sécurisé de Libreville.",
    user: {
      id: "s1",
      name: "Gabon Prestige Immobilier",
      type: "agence",
      avatar:
        "https://images.unsplash.com/photo-1652878530627-cc6f063e3947?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsJTIwZXN0YXRlJTIwYWdlbnQlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzYyNDExMjk0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      phone: "+241 01 23 45 67",
      email: "contact@gabonprestige.ga",
    },
    likes: 124,
    likedByCurrentUser: false,
    updated_at: "2024-11-05T10:30:00Z",
  },
  {
    id: "2",
    title: "Appartement de luxe vue sur mer",
    price: 850000,
    location: "Port-Gentil, Gabon",
    type: "location",
    propertyType: "Appartement",
    bedrooms: 3,
    bathrooms: 2,
    area: 120,
    images: [
      "https://images.unsplash.com/photo-1738168279272-c08d6dd22002?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBhcGFydG1lbnQlMjBsaXZpbmclMjByb29tfGVufDF8fHx8MTc2MjQ2MDU5MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1515263487990-61b07816b324?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcGFydG1lbnQlMjBidWlsZGluZ3xlbnwxfHx8fDE3NjI0MTc3NTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    ],
    description:
      "Appartement entièrement meublé avec une vue imprenable sur l'océan. Proche de toutes commodités. Disponible immédiatement.",
    user: {
      id: "s2",
      name: "Marie Obame",
      type: "particulier",
      avatar:
        "https://images.unsplash.com/photo-1652878530627-cc6f063e3947?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsJTIwZXN0YXRlJTIwYWdlbnQlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzYyNDExMjk0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      phone: "+241 07 89 12 34",
      email: "marie.obame@email.ga",
    },
    likes: 67,
    likedByCurrentUser: true,
    updated_at: "2024-11-04T14:20:00Z",
  },
  {
    id: "3",
    title: "Maison familiale spacieuse - Akanda",
    price: 180000000,
    location: "Akanda, Gabon",
    type: "vente",
    propertyType: "Maison",
    bedrooms: 4,
    bathrooms: 3,
    area: 250,
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBob3VzZSUyMGV4dGVyaW9yfGVufDF8fHx8MTc2MjQxMDkxMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    ],
    description:
      "Belle maison familiale avec grand jardin, garage double et espace de jeux pour enfants. Quartier résidentiel calme.",
    user: {
      id: "s3",
      name: "Immobilier Gabon Plus",
      type: "agence",
      avatar:
        "https://images.unsplash.com/photo-1652878530627-cc6f063e3947?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsJTIwZXN0YXRlJTIwYWdlbnQlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzYyNDExMjk0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      phone: "+241 06 55 44 33",
      email: "info@gabonplus.ga",
    },
    likes: 89,
    likedByCurrentUser: false,
    updated_at: "2024-11-03T09:15:00Z",
  },
  {
    id: "4",
    title: "Studio moderne centre ville",
    price: 350000,
    location: "Libreville, Gabon",
    type: "location",
    propertyType: "Appartement",
    bedrooms: 1,
    bathrooms: 1,
    area: 45,
    images: [
      "https://images.unsplash.com/photo-1738168279272-c08d6dd22002?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBhcGFydG1lbnQlMjBsaXZpbmclMjByb29tfGVufDF8fHx8MTc2MjQ2MDU5MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    ],
    description:
      "Studio parfait pour jeune professionnel. Entièrement équipé, climatisé, proche des transports.",
    user: {
      id: "s4",
      name: "Jean-Pierre Mba",
      type: "particulier",
      avatar:
        "https://images.unsplash.com/photo-1652878530627-cc6f063e3947?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsJTIwZXN0YXRlJTIwYWdlbnQlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzYyNDExMjk0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      phone: "+241 05 22 33 44",
      email: "jpmba@email.ga",
    },
    likes: 45,
    likedByCurrentUser: false,
    updated_at: "2024-11-02T16:45:00Z",
  },
  {
    id: "5",
    title: "Bureau moderne avec vue panoramique",
    price: 800000,
    location: "Libreville, Gabon",
    type: "location",
    propertyType: "Bureau",
    area: 80,
    images: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    ],
    description:
      "Espace de bureau moderne avec vue imprenable. Climatisation centrale, parking sécurisé.",
    user: {
      id: "s1",
      name: "Gabon Prestige Immobilier",
      type: "agence",
      avatar:
        "https://images.unsplash.com/photo-1652878530627-cc6f063e3947?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsJTIwZXN0YXRlJTIwYWdlbnQlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzYyNDExMjk0fDA&ixlib=rb-4.1.0&q=80&w=1080",
      phone: "+241 01 23 45 67",
      email: "contact@gabonprestige.ga",
    },
    likes: 32,
    likedByCurrentUser: false,
    updated_at: "2024-11-01T11:00:00Z",
  },
  {
    id: "6",
    title: "Terrain constructible - Zone résidentielle",
    price: 80000000,
    location: "Owendo, Gabon",
    type: "vente",
    propertyType: "Terrain",
    area: 500,
    images: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    ],
    description:
      "Beau terrain dans une zone résidentielle calme. Viabilisé, proche des écoles et commerces.",
    user: {
      id: "s3",
      name: "Immobilier Gabon Plus",
      type: "agence",
      avatar:
        "https://images.unsplash.com/photo-1652878530627-cc6f063e3947?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsJTIwZXN0YXRlJTIwYWdlbnQlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzYyNDExMjk0fDA&ixlib=rb-4.1.0&q=80&w=1080",
      phone: "+241 06 55 44 33",
      email: "info@gabonplus.ga",
    },
    likes: 78,
    likedByCurrentUser: false,
    updated_at: "2024-10-31T09:30:00Z",
  },
  {
    id: "7",
    title: "Duplex familial avec jardin",
    price: 1200000,
    location: "Port-Gentil, Gabon",
    type: "location",
    propertyType: "Maison",
    bedrooms: 4,
    bathrooms: 3,
    area: 180,
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    ],
    description:
      "Duplex spacieux avec grand jardin. Idéal pour famille. Quartier calme et sécurisé.",
    user: {
      id: "s2",
      name: "Marie Obame",
      type: "particulier",
      avatar:
        "https://images.unsplash.com/photo-1652878530627-cc6f063e3947?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsJTIwZXN0YXRlJTIwYWdlbnQlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzYyNDExMjk0fDA&ixlib=rb-4.1.0&q=80&w=1080",
      phone: "+241 07 89 12 34",
      email: "marie.obame@email.ga",
    },
    likes: 56,
    likedByCurrentUser: true,
    updated_at: "2024-10-30T15:20:00Z",
  },
  {
    id: "8",
    title: "Villa de standing avec piscine",
    price: 320000000,
    location: "Franceville, Gabon",
    type: "vente",
    propertyType: "Villa",
    bedrooms: 6,
    bathrooms: 5,
    area: 420,
    images: [
      "https://images.unsplash.com/photo-1757264119016-7e6b568b810d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    ],
    description:
      "Magnifique villa haut de gamme. Piscine chauffée, domotique, salle de sport privée.",
    user: {
      id: "s1",
      name: "Gabon Prestige Immobilier",
      type: "agence",
      avatar:
        "https://images.unsplash.com/photo-1652878530627-cc6f063e3947?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsJTIwZXN0YXRlJTIwYWdlbnQlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzYyNDExMjk0fDA&ixlib=rb-4.1.0&q=80&w=1080",
      phone: "+241 01 23 45 67",
      email: "contact@gabonprestige.ga",
    },
    likes: 156,
    likedByCurrentUser: false,
    updated_at: "2024-10-29T08:45:00Z",
  },
  {
    id: "9",
    title: "Appartement F3 meublé",
    price: 650000,
    location: "Libreville, Gabon",
    type: "location",
    propertyType: "Appartement",
    bedrooms: 2,
    bathrooms: 1,
    area: 75,
    images: [
      "https://images.unsplash.com/photo-1738168279272-c08d6dd22002?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    ],
    description:
      "Appartement moderne entièrement meublé. Balcon avec vue, parking inclus.",
    user: {
      id: "s4",
      name: "Jean-Pierre Mba",
      type: "particulier",
      avatar:
        "https://images.unsplash.com/photo-1652878530627-cc6f063e3947?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsJTIwZXN0YXRlJTIwYWdlbnQlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzYyNDExMjk0fDA&ixlib=rb-4.1.0&q=80&w=1080",
      phone: "+241 05 22 33 44",
      email: "jpmba@email.ga",
    },
    likes: 43,
    likedByCurrentUser: false,
    updated_at: "2024-10-28T14:00:00Z",
  },
  {
    id: "10",
    title: "Maison traditionnelle rénovée",
    price: 120000000,
    location: "Akanda, Gabon",
    type: "vente",
    propertyType: "Maison",
    bedrooms: 3,
    bathrooms: 2,
    area: 150,
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    ],
    description:
      "Charmante maison entièrement rénovée. Grand terrain arboré, garage.",
    user: {
      id: "s3",
      name: "Immobilier Gabon Plus",
      type: "agence",
      avatar:
        "https://images.unsplash.com/photo-1652878530627-cc6f063e3947?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsJTIwZXN0YXRlJTIwYWdlbnQlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzYyNDExMjk0fDA&ixlib=rb-4.1.0&q=80&w=1080",
      phone: "+241 06 55 44 33",
      email: "info@gabonplus.ga",
    },
    likes: 91,
    likedByCurrentUser: false,
    updated_at: "2024-10-27T10:15:00Z",
  },
  {
    id: "11",
    title: "Penthouse de luxe vue océan",
    price: 2500000,
    location: "Port-Gentil, Gabon",
    type: "location",
    propertyType: "Appartement",
    bedrooms: 4,
    bathrooms: 3,
    area: 200,
    images: [
      "https://images.unsplash.com/photo-1738168279272-c08d6dd22002?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    ],
    description:
      "Penthouse exceptionnel avec terrasse panoramique. Finitions luxueuses, conciergerie 24/7.",
    user: {
      id: "s1",
      name: "Gabon Prestige Immobilier",
      type: "agence",
      avatar:
        "https://images.unsplash.com/photo-1652878530627-cc6f063e3947?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsJTIwZXN0YXRlJTIwYWdlbnQlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzYyNDExMjk0fDA&ixlib=rb-4.1.0&q=80&w=1080",
      phone: "+241 01 23 45 67",
      email: "contact@gabonprestige.ga",
    },
    likes: 203,
    likedByCurrentUser: true,
    updated_at: "2024-10-26T16:30:00Z",
  },
  {
    id: "12",
    title: "Terrain en bord de mer",
    price: 150000000,
    location: "Port-Gentil, Gabon",
    type: "vente",
    propertyType: "Terrain",
    area: 800,
    images: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    ],
    description:
      "Terrain exceptionnel en bord de mer. Possibilité de construire un complexe touristique.",
    user: {
      id: "s2",
      name: "Marie Obame",
      type: "particulier",
      avatar:
        "https://images.unsplash.com/photo-1652878530627-cc6f063e3947?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsJTIwZXN0YXRlJTIwYWdlbnQlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzYyNDExMjk0fDA&ixlib=rb-4.1.0&q=80&w=1080",
      phone: "+241 07 89 12 34",
      email: "marie.obame@email.ga",
    },
    likes: 187,
    likedByCurrentUser: false,
    updated_at: "2024-10-25T12:00:00Z",
  },
];

export const currentUser: User = {
  id: "u1",
  name: "Utilisateur Demo",
  email: "demo@gabonimmo.ga",
  avatar:
    "https://images.unsplash.com/photo-1652878530627-cc6f063e3947?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsJTIwZXN0YXRlJTIwYWdlbnQlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzYyNDExMjk0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  phone: "+241 01 11 22 33",
  type: "particulier",
  whatsapp: "+24101112233",
};

export const mockStories: Story[] = [
  {
    id: "st1",
    agencyId: "s1",
    agencyName: "Gabon Prestige Immobilier",
    agencyAvatar:
      "https://images.unsplash.com/photo-1652878530627-cc6f063e3947?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsJTIwZXN0YXRlJTIwYWdlbnQlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzYyNDExMjk0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    image:
      "https://images.unsplash.com/photo-1757264119016-7e6b568b810d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB2aWxsYSUyMHBvb2x8ZW58MXx8fHwxNzYyNDYxNzgzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "🎉 Nouvelle villa de prestige !",
    description:
      "Découvrez notre dernière villa avec piscine à débordement. Prix exceptionnel : 250M FCFA",
    updated_at: "2024-11-07T08:00:00Z",
    viewed: false,
  },
  {
    id: "st2",
    agencyId: "s1",
    agencyName: "Gabon Prestige Immobilier",
    agencyAvatar:
      "https://images.unsplash.com/photo-1652878530627-cc6f063e3947?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsJTIwZXN0YXRlJTIwYWdlbnQlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzYyNDExMjk0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBob3VzZSUyMGV4dGVyaW9yfGVufDF8fHx8MTc2MjQxMDkxMXww&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Visite virtuelle disponible",
    description:
      "Visitez nos propriétés en 3D depuis chez vous. Prenez rendez-vous dès maintenant !",
    updated_at: "2024-11-06T14:30:00Z",
    viewed: false,
  },
  {
    id: "st3",
    agencyId: "s3",
    agencyName: "Immobilier Gabon Plus",
    agencyAvatar:
      "https://images.unsplash.com/photo-1652878530627-cc6f063e3947?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsJTIwZXN0YXRlJTIwYWdlbnQlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzYyNDExMjk0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBob3VzZSUyMGV4dGVyaW9yfGVufDF8fHx8MTc2MjQxMDkxMXww&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Journée portes ouvertes",
    description:
      "Ce samedi 9 novembre, venez découvrir nos nouvelles propriétés à Akanda. Buffet offert !",
    updated_at: "2024-11-05T10:00:00Z",
    viewed: true,
  },
  {
    id: "st4",
    agencyId: "s3",
    agencyName: "Immobilier Gabon Plus",
    agencyAvatar:
      "https://images.unsplash.com/photo-1652878530627-cc6f063e3947?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsJTIwZXN0YXRlJTIwYWdlbnQlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzYyNDExMjk0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    image:
      "https://images.unsplash.com/photo-1738168279272-c08d6dd22002?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBhcGFydG1lbnQlMjBsaXZpbmclMjByb29tfGVufDF8fHx8MTc2MjQ2MDU5MXww&ixlib=rb-4.1.0&q=80&w=1080",
    title: "🏆 Taux d'occupation record",
    description:
      "Merci à nos clients ! 95% de nos biens mis en location sont occupés. Confiez-nous vos propriétés.",
    updated_at: "2024-11-04T16:00:00Z",
    viewed: true,
  },
];

export const allUsers: User[] = [
  currentUser,
  {
    id: "s1",
    name: "Gabon Prestige Immobilier",
    email: "contact@gabonprestige.ga",
    avatar:
      "https://images.unsplash.com/photo-1652878530627-cc6f063e3947?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsJTIwZXN0YXRlJTIwYWdlbnQlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzYyNDExMjk0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    phone: "+241 01 23 45 67",
    type: "agence",
    description: "Agence immobilière de référence au Gabon depuis 2015",
    properties: 45,
    whatsapp: "+24101234567",
  },
  {
    id: "s2",
    name: "Marie Obame",
    email: "marie.obame@email.ga",
    avatar:
      "https://images.unsplash.com/photo-1652878530627-cc6f063e3947?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsJTIwZXN0YXRlJTIwYWdlbnQlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzYyNDExMjk0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    phone: "+241 07 89 12 34",
    type: "particulier",
    properties: 3,
    whatsapp: "+24107891234",
  },
  {
    id: "s3",
    name: "Immobilier Gabon Plus",
    email: "info@gabonplus.ga",
    avatar:
      "https://images.unsplash.com/photo-1652878530627-cc6f063e3947?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsJTIwZXN0YXRlJTIwYWdlbnQlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzYyNDExMjk0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    phone: "+241 06 55 44 33",
    type: "agence",
    description: "Votre partenaire immobilier de confiance",
    properties: 38,
    whatsapp: "+24106554433",
  },
  {
    id: "s4",
    name: "Jean-Pierre Mba",
    email: "jpmba@email.ga",
    avatar:
      "https://images.unsplash.com/photo-1652878530627-cc6f063e3947?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsJTIwZXN0YXRlJTIwYWdlbnQlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzYyNDExMjk0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    phone: "+241 05 22 33 44",
    type: "particulier",
    properties: 5,
    whatsapp: "+24105223344",
  },
];
