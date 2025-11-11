<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Property;
use App\Models\PropertyImage;
use App\Models\Favorite;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Créer les utilisateurs
        $users = $this->createUsers();
        
        // Créer les propriétés
        $properties = $this->createProperties($users);
        
        // Créer les favoris
        $this->createFavorites($users, $properties);
    }

    private function createUsers(): array
    {
        $usersData = [
            [
                'id' => Str::uuid(),
                'name' => 'Utilisateur Demo',
                'email' => 'demo@gabonimmo.ga',
                'phone' => '+241 01 11 22 33',
                'whatsapp' => '+24101112233',
                'type' => 'particulier',
                'description' => null,
                'avatar' => 'https://images.unsplash.com/photo-1652878530627-cc6f063e3947?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsJTIwZXN0YXRlJTIwYWdlbnQlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzYyNDExMjk0fDA&ixlib=rb-4.1.0&q=80&w=1080',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
            ],
            [
                'id' => Str::uuid(),
                'name' => 'Gabon Prestige Immobilier',
                'email' => 'contact@gabonprestige.ga',
                'phone' => '+241 01 23 45 67',
                'whatsapp' => '+24101234567',
                'type' => 'agence',
                'description' => 'Agence immobilière de référence au Gabon depuis 2015',
                'avatar' => 'https://images.unsplash.com/photo-1652878530627-cc6f063e3947?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsJTIwZXN0YXRlJTIwYWdlbnQlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzYyNDExMjk0fDA&ixlib=rb-4.1.0&q=80&w=1080',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
            ],
            [
                'id' => Str::uuid(),
                'name' => 'Marie Obame',
                'email' => 'marie.obame@email.ga',
                'phone' => '+241 07 89 12 34',
                'whatsapp' => '+24107891234',
                'type' => 'particulier',
                'description' => null,
                'avatar' => 'https://images.unsplash.com/photo-1652878530627-cc6f063e3947?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsJTIwZXN0YXRlJTIwYWdlbnQlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzYyNDExMjk0fDA&ixlib=rb-4.1.0&q=80&w=1080',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
            ],
            [
                'id' => Str::uuid(),
                'name' => 'Immobilier Gabon Plus',
                'email' => 'info@gabonplus.ga',
                'phone' => '+241 06 55 44 33',
                'whatsapp' => '+24106554433',
                'type' => 'agence',
                'description' => 'Votre partenaire immobilier de confiance',
                'avatar' => 'https://images.unsplash.com/photo-1652878530627-cc6f063e3947?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsJTIwZXN0YXRlJTIwYWdlbnQlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzYyNDExMjk0fDA&ixlib=rb-4.1.0&q=80&w=1080',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
            ],
            [
                'id' => Str::uuid(),
                'name' => 'Jean-Pierre Mba',
                'email' => 'jpmba@email.ga',
                'phone' => '+241 05 22 33 44',
                'whatsapp' => '+24105223344',
                'type' => 'particulier',
                'description' => null,
                'avatar' => 'https://images.unsplash.com/photo-1652878530627-cc6f063e3947?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsJTIwZXN0YXRlJTIwYWdlbnQlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzYyNDExMjk0fDA&ixlib=rb-4.1.0&q=80&w=1080',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
            ],
        ];

        $users = [];
        foreach ($usersData as $userData) {
            $user = User::create($userData);
            $users[$user->email] = $user;
        }

        return $users;
    }

    private function createProperties($users): array
    {
        $propertiesData = [
            [
                'title' => 'Villa moderne avec piscine - Libreville',
                'description' => 'Magnifique villa moderne avec piscine, jardin tropical et finitions luxueuses. Située dans un quartier calme et sécurisé de Libreville.',
                'price' => 250000000,
                'location' => 'Libreville, Gabon',
                'type' => 'vente',
                'property_type' => 'Villa',
                'bedrooms' => 5,
                'bathrooms' => 4,
                'area' => 350,
                'likes' => 124,
                'user_id' => $users['contact@gabonprestige.ga']->id,
                'images' => [
                    'https://images.unsplash.com/photo-1757264119016-7e6b568b810d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB2aWxsYSUyMHBvb2x8ZW58MXx8fHwxNzYyNDYxNzgzfDA&ixlib=rb-4.1.0&q=80&w=1080',
                    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBob3VzZSUyMGV4dGVyaW9yfGVufDF8fHx8MTc2MjQxMDkxMXww&ixlib=rb-4.1.0&q=80&w=1080',
                    'https://images.unsplash.com/photo-1592839656073-833413ae8874?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3VzZSUyMGtpdGNoZW4lMjBtb2Rlcm58ZW58MXx8fHwxNzYyNDc5OTcxfDA&ixlib=rb-4.1.0&q=80&w=1080'
                ],
                'created_at' => '2024-11-05 10:30:00',
            ],
            [
                'title' => 'Appartement de luxe vue sur mer',
                'description' => 'Appartement entièrement meublé avec une vue imprenable sur l\'océan. Proche de toutes commodités. Disponible immédiatement.',
                'price' => 850000,
                'location' => 'Port-Gentil, Gabon',
                'type' => 'location',
                'property_type' => 'Appartement',
                'bedrooms' => 3,
                'bathrooms' => 2,
                'area' => 120,
                'likes' => 67,
                'user_id' => $users['marie.obame@email.ga']->id,
                'images' => [
                    'https://images.unsplash.com/photo-1738168279272-c08d6dd22002?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBhcGFydG1lbnQlMjBsaXZpbmclMjByb29tfGVufDF8fHx8MTc2MjQ2MDU5MXww&ixlib=rb-4.1.0&q=80&w=1080',
                    'https://images.unsplash.com/photo-1515263487990-61b07816b324?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcGFydG1lbnQlMjBidWlsZGluZ3xlbnwxfHx8fDE3NjI0MTc3NTl8MA&ixlib=rb-4.1.0&q=80&w=1080'
                ],
                'created_at' => '2024-11-04 14:20:00',
            ],
            [
                'title' => 'Maison familiale spacieuse - Akanda',
                'description' => 'Belle maison familiale avec grand jardin, garage double et espace de jeux pour enfants. Quartier résidentiel calme.',
                'price' => 180000000,
                'location' => 'Akanda, Gabon',
                'type' => 'vente',
                'property_type' => 'Maison',
                'bedrooms' => 4,
                'bathrooms' => 3,
                'area' => 250,
                'likes' => 89,
                'user_id' => $users['info@gabonplus.ga']->id,
                'images' => [
                    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBob3VzZSUyMGV4dGVyaW9yfGVufDF8fHx8MTc2MjQxMDkxMXww&ixlib=rb-4.1.0&q=80&w=1080'
                ],
                'created_at' => '2024-11-03 09:15:00',
            ],
            [
                'title' => 'Studio moderne centre ville',
                'description' => 'Studio parfait pour jeune professionnel. Entièrement équipé, climatisé, proche des transports.',
                'price' => 350000,
                'location' => 'Libreville, Gabon',
                'type' => 'location',
                'property_type' => 'Appartement',
                'bedrooms' => 1,
                'bathrooms' => 1,
                'area' => 45,
                'likes' => 45,
                'user_id' => $users['jpmba@email.ga']->id,
                'images' => [
                    'https://images.unsplash.com/photo-1738168279272-c08d6dd22002?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBhcGFydG1lbnQlMjBsaXZpbmclMjByb29tfGVufDF8fHx8MTc2MjQ2MDU5MXww&ixlib=rb-4.1.0&q=80&w=1080'
                ],
                'created_at' => '2024-11-02 16:45:00',
            ],
            [
                'title' => 'Bureau moderne avec vue panoramique',
                'description' => 'Espace de bureau moderne avec vue imprenable. Climatisation centrale, parking sécurisé.',
                'price' => 800000,
                'location' => 'Libreville, Gabon',
                'type' => 'location',
                'property_type' => 'Bureau',
                'bedrooms' => null,
                'bathrooms' => null,
                'area' => 80,
                'likes' => 32,
                'user_id' => $users['contact@gabonprestige.ga']->id,
                'images' => [
                    'https://images.unsplash.com/photo-1497366216548-37526070297c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'
                ],
                'created_at' => '2024-11-01 11:00:00',
            ],
            [
                'title' => 'Terrain constructible - Zone résidentielle',
                'description' => 'Beau terrain dans une zone résidentielle calme. Viabilisé, proche des écoles et commerces.',
                'price' => 80000000,
                'location' => 'Owendo, Gabon',
                'type' => 'vente',
                'property_type' => 'Terrain',
                'bedrooms' => null,
                'bathrooms' => null,
                'area' => 500,
                'likes' => 78,
                'user_id' => $users['info@gabonplus.ga']->id,
                'images' => [
                    'https://images.unsplash.com/photo-1500382017468-9049fed747ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'
                ],
                'created_at' => '2024-10-31 09:30:00',
            ],
        ];

        $createdProperties = [];
        foreach ($propertiesData as $propertyData) {
            $images = $propertyData['images'];
            $createdAt = $propertyData['created_at'] ?? now();
            unset($propertyData['images'], $propertyData['created_at']);

            $property = Property::create(array_merge($propertyData, [
                'created_at' => $createdAt,
                'updated_at' => $createdAt,
            ]));
            $createdProperties[] = $property;

            // Ajouter les images
            foreach ($images as $index => $imageUrl) {
                PropertyImage::create([
                    'id' => Str::uuid(),
                    'property_id' => $property->id,
                    'path' => $imageUrl,
                    'order' => $index,
                    'created_at' => $createdAt,
                    'updated_at' => $createdAt,
                ]);
            }
        }

        return $createdProperties;
    }

    private function createFavorites($users, $properties): void
    {
        $favorites = [];

        // Utilisateur demo aime certaines propriétés
        $demoUser = $users['demo@gabonimmo.ga'];
        
        // Favoris prédéfinis pour l'utilisateur demo
        $demoFavorites = [
            ['user' => $demoUser, 'property' => $properties[1]], // Appartement de luxe
            ['user' => $demoUser, 'property' => $properties[2]], // Maison familiale
        ];

        foreach ($demoFavorites as $favorite) {
            $key = $favorite['user']->id . '_' . $favorite['property']->id;
            if (!isset($favorites[$key])) {
                Favorite::create([
                    'id' => Str::uuid(),
                    'user_id' => $favorite['user']->id,
                    'property_id' => $favorite['property']->id,
                ]);
                $favorites[$key] = true;
            }
        }

        // Ajouter d'autres favoris aléatoires sans doublons
        $allUsers = User::all();
        $allProperties = Property::all();
        $attempts = 0;
        $maxAttempts = 20;

        while (count($favorites) < 15 && $attempts < $maxAttempts) {
            $user = $allUsers->random();
            $property = $allProperties->random();
            $key = $user->id . '_' . $property->id;

            if (!isset($favorites[$key])) {
                Favorite::create([
                    'id' => Str::uuid(),
                    'user_id' => $user->id,
                    'property_id' => $property->id,
                ]);
                $favorites[$key] = true;
            }

            $attempts++;
        }
    }
}