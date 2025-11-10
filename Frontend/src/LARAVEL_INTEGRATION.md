# 🔗 Guide d'Intégration Laravel

Ce guide explique comment connecter le frontend GabonImmo à un backend Laravel pour des données réelles.

## 📋 Table des matières

- [Vue d'ensemble](#vue-densemble)
- [Configuration Initiale](#configuration-initiale)
- [Structure Backend Laravel](#structure-backend-laravel)
- [Endpoints API Requis](#endpoints-api-requis)
- [Modifications Frontend](#modifications-frontend)
- [Authentification](#authentification)
- [Upload de Fichiers](#upload-de-fichiers)
- [WebSockets](#websockets)

## Vue d'ensemble

### Architecture
```
┌─────────────────┐          ┌──────────────────┐
│   React Frontend │ <─HTTP──> │  Laravel Backend │
│   (GabonImmo)    │          │   (API REST)     │
└─────────────────┘          └──────────────────┘
         │                            │
         │                            │
    LocalStorage              MySQL Database
    (JWT Token)               (Données réelles)
```

## Configuration Initiale

### 1. Backend Laravel

```bash
# Créer un nouveau projet Laravel
composer create-project laravel/laravel gabonimmo-api

cd gabonimmo-api

# Installer les dépendances nécessaires
composer require laravel/sanctum
composer require intervention/image
composer require spatie/laravel-medialibrary

# Configuration de la base de données
# Éditer .env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=gabonimmo
DB_USERNAME=root
DB_PASSWORD=

# Configuration CORS
# config/cors.php
```

### 2. Configuration CORS

**Fichier : `config/cors.php`**
```php
<?php
return [
    'paths' => ['api/*', 'sanctum/csrf-cookie'],
    'allowed_methods' => ['*'],
    'allowed_origins' => ['http://localhost:5173'], // URL de votre frontend
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => true,
];
```

### 3. Frontend - Configuration API

**Créer : `/lib/api.ts`**
```typescript
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

// Instance Axios configurée
export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true, // Pour les cookies Sanctum
});

// Intercepteur pour ajouter le token JWT
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Intercepteur pour gérer les erreurs
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Déconnexion automatique
      localStorage.removeItem('token');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export default api;
```

**Fichier `.env` Frontend**
```bash
VITE_API_URL=http://localhost:8000/api
```

## Structure Backend Laravel

### 1. Migrations de Base de Données

**Migration Users - `database/migrations/xxxx_create_users_table.php`**
```php
<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->string('phone', 20);
            $table->string('whatsapp', 20)->nullable();
            $table->enum('type', ['particulier', 'agence'])->default('particulier');
            $table->text('description')->nullable();
            $table->string('avatar')->nullable();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->rememberToken();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('users');
    }
};
```

**Migration Properties - `database/migrations/xxxx_create_properties_table.php`**
```php
<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('properties', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('title');
            $table->text('description');
            $table->decimal('price', 15, 2);
            $table->string('location');
            $table->enum('type', ['vente', 'location']);
            $table->enum('property_type', ['Maison', 'Appartement', 'Villa', 'Terrain', 'Bureau']);
            $table->integer('bedrooms')->nullable();
            $table->integer('bathrooms')->nullable();
            $table->integer('area'); // Surface en m²
            $table->integer('likes')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('properties');
    }
};
```

**Migration Property Images**
```php
<?php
Schema::create('property_images', function (Blueprint $table) {
    $table->id();
    $table->foreignId('property_id')->constrained()->onDelete('cascade');
    $table->string('path');
    $table->integer('order')->default(0);
    $table->timestamps();
});
```

**Migration Favorites**
```php
<?php
Schema::create('favorites', function (Blueprint $table) {
    $table->id();
    $table->foreignId('user_id')->constrained()->onDelete('cascade');
    $table->foreignId('property_id')->constrained()->onDelete('cascade');
    $table->timestamps();
    $table->unique(['user_id', 'property_id']);
});
```

**Migration Stories**
```php
<?php
Schema::create('stories', function (Blueprint $table) {
    $table->id();
    $table->foreignId('user_id')->constrained()->onDelete('cascade');
    $table->string('image');
    $table->string('title');
    $table->text('description');
    $table->timestamp('expires_at');
    $table->timestamps();
});
```

**Migration Alerts**
```php
<?php
Schema::create('alerts', function (Blueprint $table) {
    $table->id();
    $table->foreignId('user_id')->constrained()->onDelete('cascade');
    $table->string('location');
    $table->string('property_type')->default('all');
    $table->enum('type', ['vente', 'location', 'all'])->default('all');
    $table->decimal('max_price', 15, 2)->nullable();
    $table->integer('min_area')->nullable();
    $table->boolean('is_active')->default(true);
    $table->timestamps();
});
```

### 2. Modèles Eloquent

**Modèle Property - `app/Models/Property.php`**
```php
<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Property extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'title', 'description', 'price', 'location',
        'type', 'property_type', 'bedrooms', 'bathrooms', 'area', 'is_active'
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'is_active' => 'boolean',
    ];

    protected $appends = ['liked_by_current_user'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function images()
    {
        return $this->hasMany(PropertyImage::class)->orderBy('order');
    }

    public function favorites()
    {
        return $this->hasMany(Favorite::class);
    }

    public function getLikedByCurrentUserAttribute()
    {
        if (!auth()->check()) {
            return false;
        }
        return $this->favorites()->where('user_id', auth()->id())->exists();
    }

    // Scope pour les filtres
    public function scopeFilter($query, $filters)
    {
        if (!empty($filters['type'])) {
            $query->where('type', $filters['type']);
        }
        
        if (!empty($filters['property_type'])) {
            $query->where('property_type', $filters['property_type']);
        }
        
        if (!empty($filters['location'])) {
            $query->where('location', 'like', '%' . $filters['location'] . '%');
        }
        
        if (!empty($filters['min_price'])) {
            $query->where('price', '>=', $filters['min_price']);
        }
        
        if (!empty($filters['max_price'])) {
            $query->where('price', '<=', $filters['max_price']);
        }
        
        return $query;
    }
}
```

**Modèle User - `app/Models/User.php`**
```php
<?php
namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens;

    protected $fillable = [
        'name', 'email', 'phone', 'whatsapp', 'type', 
        'description', 'avatar', 'password',
    ];

    protected $hidden = [
        'password', 'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function properties()
    {
        return $this->hasMany(Property::class);
    }

    public function favorites()
    {
        return $this->hasMany(Favorite::class);
    }

    public function stories()
    {
        return $this->hasMany(Story::class);
    }

    public function alerts()
    {
        return $this->hasMany(Alert::class);
    }
}
```

### 3. Contrôleurs

**PropertyController - `app/Http/Controllers/Api/PropertyController.php`**
```php
<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Property;
use Illuminate\Http\Request;

class PropertyController extends Controller
{
    public function index(Request $request)
    {
        $query = Property::with(['user', 'images'])
            ->where('is_active', true)
            ->filter($request->only(['type', 'property_type', 'location', 'min_price', 'max_price']))
            ->latest();

        // Recherche par mot-clé
        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%")
                  ->orWhere('location', 'like', "%{$search}%");
            });
        }

        $properties = $query->paginate($request->per_page ?? 15);

        return response()->json($properties);
    }

    public function show($id)
    {
        $property = Property::with(['user', 'images'])->findOrFail($id);
        return response()->json($property);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric',
            'location' => 'required|string',
            'type' => 'required|in:vente,location',
            'property_type' => 'required|in:Maison,Appartement,Villa,Terrain,Bureau',
            'bedrooms' => 'nullable|integer',
            'bathrooms' => 'nullable|integer',
            'area' => 'required|integer',
            'images' => 'required|array|min:1',
            'images.*' => 'image|mimes:jpeg,png,jpg|max:5120', // 5MB max
        ]);

        $property = auth()->user()->properties()->create($validated);

        // Upload des images
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $index => $image) {
                $path = $image->store('properties', 'public');
                $property->images()->create([
                    'path' => $path,
                    'order' => $index,
                ]);
            }
        }

        return response()->json($property->load('images'), 201);
    }

    public function update(Request $request, $id)
    {
        $property = Property::findOrFail($id);
        
        // Vérifier que l'utilisateur est le propriétaire
        if ($property->user_id !== auth()->id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'price' => 'sometimes|numeric',
            'location' => 'sometimes|string',
            'type' => 'sometimes|in:vente,location',
            'property_type' => 'sometimes|in:Maison,Appartement,Villa,Terrain,Bureau',
            'bedrooms' => 'nullable|integer',
            'bathrooms' => 'nullable|integer',
            'area' => 'sometimes|integer',
        ]);

        $property->update($validated);

        return response()->json($property);
    }

    public function destroy($id)
    {
        $property = Property::findOrFail($id);
        
        if ($property->user_id !== auth()->id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $property->delete();

        return response()->json(['message' => 'Property deleted successfully']);
    }

    public function toggleFavorite($id)
    {
        $property = Property::findOrFail($id);
        $user = auth()->user();

        $favorite = $user->favorites()->where('property_id', $id)->first();

        if ($favorite) {
            $favorite->delete();
            $property->decrement('likes');
            return response()->json(['liked' => false]);
        } else {
            $user->favorites()->create(['property_id' => $id]);
            $property->increment('likes');
            return response()->json(['liked' => true]);
        }
    }
}
```

**AuthController - `app/Http/Controllers/Api/AuthController.php`**
```php
<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'phone' => 'required|string|max:20',
            'whatsapp' => 'nullable|string|max:20',
            'type' => 'required|in:particulier,agence',
            'description' => 'nullable|string',
        ]);

        $user = User::create([
            ...$validated,
            'password' => Hash::make($validated['password']),
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token,
        ], 201);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['Les informations d\'identification sont incorrectes.'],
            ]);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token,
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Déconnecté avec succès']);
    }

    public function me(Request $request)
    {
        return response()->json($request->user());
    }
}
```

### 4. Routes API

**Fichier : `routes/api.php`**
```php
<?php
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\PropertyController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\StoryController;
use App\Http\Controllers\Api\AlertController;
use Illuminate\Support\Facades\Route;

// Routes publiques
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::get('/properties', [PropertyController::class, 'index']);
Route::get('/properties/{id}', [PropertyController::class, 'show']);
Route::get('/users/{id}', [UserController::class, 'show']);
Route::get('/stories', [StoryController::class, 'index']);

// Routes protégées
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);
    
    // Properties
    Route::post('/properties', [PropertyController::class, 'store']);
    Route::put('/properties/{id}', [PropertyController::class, 'update']);
    Route::delete('/properties/{id}', [PropertyController::class, 'destroy']);
    Route::post('/properties/{id}/favorite', [PropertyController::class, 'toggleFavorite']);
    Route::get('/my-properties', [PropertyController::class, 'myProperties']);
    Route::get('/favorites', [PropertyController::class, 'favorites']);
    
    // User Profile
    Route::put('/profile', [UserController::class, 'updateProfile']);
    Route::post('/profile/avatar', [UserController::class, 'updateAvatar']);
    
    // Stories
    Route::post('/stories', [StoryController::class, 'store']);
    Route::post('/stories/{id}/view', [StoryController::class, 'markAsViewed']);
    
    // Alerts
    Route::get('/alerts', [AlertController::class, 'index']);
    Route::post('/alerts', [AlertController::class, 'store']);
    Route::delete('/alerts/{id}', [AlertController::class, 'destroy']);
});
```

## Endpoints API Requis

### Authentification

| Méthode | Endpoint | Description | Auth |
|---------|----------|-------------|------|
| POST | `/api/register` | Inscription | Non |
| POST | `/api/login` | Connexion | Non |
| POST | `/api/logout` | Déconnexion | Oui |
| GET | `/api/me` | Utilisateur connecté | Oui |

### Propriétés

| Méthode | Endpoint | Description | Auth |
|---------|----------|-------------|------|
| GET | `/api/properties` | Liste des propriétés | Non |
| GET | `/api/properties/{id}` | Détails d'une propriété | Non |
| POST | `/api/properties` | Créer une propriété | Oui |
| PUT | `/api/properties/{id}` | Modifier une propriété | Oui |
| DELETE | `/api/properties/{id}` | Supprimer une propriété | Oui |
| POST | `/api/properties/{id}/favorite` | Liker/Unliker | Oui |
| GET | `/api/my-properties` | Mes propriétés | Oui |
| GET | `/api/favorites` | Mes favoris | Oui |

### Utilisateurs

| Méthode | Endpoint | Description | Auth |
|---------|----------|-------------|------|
| GET | `/api/users/{id}` | Profil utilisateur | Non |
| PUT | `/api/profile` | Modifier son profil | Oui |
| POST | `/api/profile/avatar` | Changer l'avatar | Oui |

### Stories

| Méthode | Endpoint | Description | Auth |
|---------|----------|-------------|------|
| GET | `/api/stories` | Liste des stories | Non |
| POST | `/api/stories` | Créer un story | Oui |
| POST | `/api/stories/{id}/view` | Marquer comme vu | Oui |

### Alertes

| Méthode | Endpoint | Description | Auth |
|---------|----------|-------------|------|
| GET | `/api/alerts` | Mes alertes | Oui |
| POST | `/api/alerts` | Créer une alerte | Oui |
| DELETE | `/api/alerts/{id}` | Supprimer une alerte | Oui |

## Modifications Frontend

### 1. Service API Properties

**Créer : `/lib/services/propertyService.ts`**
```typescript
import api from '../api';
import { Property } from '../mockData';

export const propertyService = {
  // Récupérer toutes les propriétés
  async getProperties(filters: any = {}, page = 1, perPage = 15) {
    const response = await api.get('/properties', {
      params: { ...filters, page, per_page: perPage }
    });
    return response.data;
  },

  // Récupérer une propriété
  async getProperty(id: string) {
    const response = await api.get(`/properties/${id}`);
    return response.data;
  },

  // Créer une propriété
  async createProperty(data: FormData) {
    const response = await api.post('/properties', data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },

  // Modifier une propriété
  async updateProperty(id: string, data: Partial<Property>) {
    const response = await api.put(`/properties/${id}`, data);
    return response.data;
  },

  // Supprimer une propriété
  async deleteProperty(id: string) {
    await api.delete(`/properties/${id}`);
  },

  // Toggle favori
  async toggleFavorite(id: string) {
    const response = await api.post(`/properties/${id}/favorite`);
    return response.data;
  },

  // Mes propriétés
  async getMyProperties() {
    const response = await api.get('/my-properties');
    return response.data;
  },

  // Mes favoris
  async getFavorites() {
    const response = await api.get('/favorites');
    return response.data;
  }
};
```

### 2. Service Auth

**Créer : `/lib/services/authService.ts`**
```typescript
import api from '../api';

export const authService = {
  async register(data: {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    phone: string;
    whatsapp?: string;
    type: 'particulier' | 'agence';
    description?: string;
  }) {
    const response = await api.post('/register', data);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  async login(email: string, password: string) {
    const response = await api.post('/login', { email, password });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  async logout() {
    await api.post('/logout');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  async getCurrentUser() {
    const response = await api.get('/me');
    localStorage.setItem('user', JSON.stringify(response.data));
    return response.data;
  },

  getStoredUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
};
```

### 3. Modifier App.tsx

**Remplacer les appels mockData par des appels API**
```typescript
// Ancien
import { mockProperties } from './lib/mockData';
const [properties, setProperties] = useState(mockProperties);

// Nouveau
import { propertyService } from './lib/services/propertyService';
const [properties, setProperties] = useState([]);
const [isLoading, setIsLoading] = useState(false);

useEffect(() => {
  loadProperties();
}, []);

const loadProperties = async () => {
  setIsLoading(true);
  try {
    const data = await propertyService.getProperties();
    setProperties(data.data); // Laravel pagination returns {data: [], meta: {}}
  } catch (error) {
    console.error('Error loading properties:', error);
    toast.error('Erreur de chargement des propriétés');
  } finally {
    setIsLoading(false);
  }
};
```

### 4. Modifier AuthModal.tsx

```typescript
import { authService } from '../lib/services/authService';

const handleLogin = async (email: string, password: string) => {
  try {
    const data = await authService.login(email, password);
    onAuthenticate(data.user);
    toast.success('Connexion réussie !');
    onClose();
  } catch (error) {
    console.error('Login error:', error);
    toast.error('Identifiants invalides');
  }
};
```

## Upload de Fichiers

### Frontend - Upload d'images

```typescript
const handleUploadImages = async (files: File[]) => {
  const formData = new FormData();
  
  // Ajouter les fichiers
  files.forEach((file, index) => {
    formData.append(`images[${index}]`, file);
  });
  
  // Ajouter les autres données
  formData.append('title', title);
  formData.append('description', description);
  formData.append('price', price.toString());
  // ... autres champs

  try {
    const property = await propertyService.createProperty(formData);
    toast.success('Propriété créée avec succès !');
    return property;
  } catch (error) {
    console.error('Upload error:', error);
    toast.error('Erreur lors de l\'upload');
  }
};
```

### Backend - Configuration Storage

**Fichier : `config/filesystems.php`**
```php
'disks' => [
    'public' => [
        'driver' => 'local',
        'root' => storage_path('app/public'),
        'url' => env('APP_URL').'/storage',
        'visibility' => 'public',
    ],
],
```

**Créer le lien symbolique**
```bash
php artisan storage:link
```

## WebSockets (Optionnel)

Pour les notifications en temps réel (nouvelles alertes, messages), utiliser Laravel Broadcasting avec Pusher ou Laravel Websockets.

### Installation
```bash
composer require pusher/pusher-php-server
npm install --save laravel-echo pusher-js
```

### Configuration

**Frontend - `lib/echo.ts`**
```typescript
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

window.Pusher = Pusher;

export const echo = new Echo({
  broadcaster: 'pusher',
  key: import.meta.env.VITE_PUSHER_APP_KEY,
  cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
  forceTLS: true,
  authEndpoint: `${import.meta.env.VITE_API_URL}/broadcasting/auth`,
  auth: {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  },
});
```

**Écouter les événements**
```typescript
echo.private(`user.${userId}`)
  .listen('NewPropertyAlert', (e: any) => {
    toast.success(`Nouvelle propriété : ${e.property.title}`);
  });
```

## Checklist de Migration

- [ ] Configurer Laravel et base de données
- [ ] Créer les migrations et modèles
- [ ] Implémenter les contrôleurs API
- [ ] Configurer CORS
- [ ] Créer les services frontend
- [ ] Remplacer mockData par appels API
- [ ] Tester l'authentification
- [ ] Tester CRUD propriétés
- [ ] Tester upload d'images
- [ ] Implémenter les favoris
- [ ] Implémenter les alertes
- [ ] Tests end-to-end
- [ ] Déploiement

## Fichiers Frontend à Modifier

1. **`/App.tsx`** : Remplacer mockProperties par API calls
2. **`/components/AuthModal.tsx`** : Intégrer authService
3. **`/components/PropertyCard.tsx`** : Utiliser vraies images
4. **`/components/ProfilePage.tsx`** : Charger données utilisateur
5. **`/components/AddPropertyForm.tsx`** : Upload vers API
6. **`/lib/mockData.ts`** : Garder les interfaces TypeScript, supprimer les données

## Support

Pour toute question concernant l'intégration :
- Consultez la [documentation Laravel](https://laravel.com/docs)
- Consultez la [documentation Sanctum](https://laravel.com/docs/sanctum)
- Ouvrez une issue sur GitHub

---

**Note** : Ce guide est une base pour l'intégration. Adaptez-le selon vos besoins spécifiques et votre architecture.
