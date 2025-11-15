<?php

namespace App\Http\Controllers;

use App\Models\Favorite;
use App\Models\Property;
use Exception;
use Illuminate\Support\Facades\Auth;
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
            $query->where(function ($q) use ($search) {
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
        try {
            $property = Property::with(['user', 'images'])->findOrFail($id);
            return response()->json(['property'=>$property,'success'=>true]);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de l\'affichage de la propriété',
                'error' => $e->getMessage()
            ]);
        }
    }

    public function store(Request $request)
    {
        try {
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
            ], [
                'title.required' => 'Le titre est requis',
                'description.required' => 'La description est requise',
                'price.required' => 'Le prix est requis',
                'location.required' => 'La localisation est requise',
                'type.required' => 'Le type de transaction est requis',
                'property_type.required' => 'Le type de bien est requis',
                'area.required' => 'La surface est requise',
                'images.required' => 'Au moins une image est requise',
                'images.array' => 'Le format des images est invalide',
                'images.min' => 'Au moins une image est requise',
                'images.*.image' => 'Chaque fichier doit être une image valide',
                'images.*.mimes' => 'Les images doivent être au format jpeg, png ou jpg',
                'images.*.max' => 'Chaque image ne doit pas dépasser 5MB',
            ]);

            $property = Property::create([
                'user_id' => Auth::id(),
                'title' => $request->title,
                'description' => $request->description,
                'price' => $request->price,
                'location' => $request->location,
                'type' => $request->type,
                'property_type' => $request->property_type,
                'bedrooms' => $request->bedrooms,
                'bathrooms' => $request->bathrooms,
                'area' => $request->area,
            ]);

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
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la création de la propriété',
                'error' => $e->getMessage(),
            ], 400);
        }
    }

    public function update(Request $request, $id)
    {
        $property = Property::findOrFail($id);

        // Vérifier que l'utilisateur est le propriétaire
        if ($property->user_id !== Auth::id()) {
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
        try {
            $property = Property::findOrFail($id);

            if ($property->user_id !== Auth::id()) {
                return response()->json(['error' => 'Unauthorized'], 403);
            }

            $property->delete();

            return response()->json(['message' => 'Property deleted successfully']);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la suppression de la propriété',
                'error' => $e->getMessage(),
            ], 400);
        }
    }

    public function toggleFavorite($id)
    {
        try {
            $property = Property::findOrFail($id);
            $user = Auth::user();
            $favorite = Favorite::where('property_id', $id)
                ->where('user_id', $user->id)
                ->first();

            if ($favorite) {
                $favorite->delete();
                $property->decrement('likes');
                return response()->json(['liked' => false]);
            } else {
                Favorite::create([
                    'property_id' => $id,
                    'user_id' => $user->id
                ]);
                $property->increment('likes');
                return response()->json(['liked' => true]);
            }
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la modification des favoris',
                'error' => $e->getMessage(),
            ], 400);
        }
    }
}
