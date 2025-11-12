<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UserController extends Controller
{
    public function updateProfile(Request $request)
    {
        $user = Auth::user();
        if (!user){
            return response()->json(['message'=> 'Non autentifié'], 401);
        }
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users,email,' .$user->id, 'regex:/^.+@.+\..+$/i']
            'phone_number' => ['nullable', 'string', 'max:20', 'unique:users,phone_number,' . $user->id, 'regex:/^\+?\d{10,15}$/'],
            'profile_picture' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'date_of_birth' => 'nullable|date|before:today',
            'place_of_birth' => 'nullable|string|max:255',
        ]);
        $dataToUpdate = $validatedData;

        if($request->hasFile('profile_picture')){
            $path = $request->file('profile_picture')->store('profile', 'public');
            $dataToUpdate['profile_picture']= $path;
            // Supprimer l'ancienne photo si elle existe
            Storage::disk('public->delete($user->profile_picture');
        }
        $user->update($dataToUpdate);
        return response()->json([
            'message' => 'Profil mis à jour avec succès',
            'user' => $user->fresh(),
        ], 200);
    }
}
