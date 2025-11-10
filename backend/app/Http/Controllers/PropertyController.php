<?php

namespace App\Http\Controllers;

use App\Models\Favorite;
use App\Models\Property;
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

        $property = Property::create([
            'user_id'=>Auth::id(),
            'title'=>$request->title,
            'description'=>$request->description,
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
        $property = Property::findOrFail($id);

        if ($property->user_id !== Auth::id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $property->delete();

        return response()->json(['message' => 'Property deleted successfully']);
    }

    public function toggleFavorite($id)
    {
        $property = Property::findOrFail($id);
        $user = Auth::user();
        $favorite = Favorite::where('property_id', $id)
            ->where('user_id',$user->id)
            ->first();

        if ($favorite) {
            $favorite->delete();
            $property->decrement('likes');
            return response()->json(['liked' => false]);
        } else {
            Favorite::create([
                'property_id'=>$id,
                'user_id'=>$user->id
            ]);
            $property->increment('likes');
            return response()->json(['liked' => true]);
        }
    }
}
