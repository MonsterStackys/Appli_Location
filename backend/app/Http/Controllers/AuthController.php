<?php

namespace App\Http\Controllers;

use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users,email',
                'password' => 'required|string|min:8|confirmed',
                'phone' => 'required|string|max:20|regex',
                'whatsapp' => 'nullable|string|max:20',
                'type' => 'required|in:particulier,agence',
                'description' => 'nullable|string',
            ], [
                'email.unique' => 'Cet email est déjà utilisé',
                'password.confirmed' => 'Les mots de passe ne correspondent pas',
            ]);

            $user = User::create([
                ...$validated,
                'password' => Hash::make($validated['password']),
            ]);

            $token = $user->createToken('auth_token', ['*'], now()->addDays(7))->plainTextToken;

            return response()->json([
                'success' => true,
                'message' => "Compte créé avec succès",
                'user' => $user,
                'token' => $token,
            ], 201);
        } catch (Exception $e) {
            // FORCER la réponse JSON même en cas de redirection
            return response()->json([
                'success' => false,
                'message' => 'Erreur de validation',
                'errors' => $e->getMessage(),
            ], 422);
        }
    }

    public function login(Request $request)
    {
        try {
            $request->validate([
                'email' => 'required|email',
                'password' => 'required',
            ], [
                'email.required' => "L'email est requis",
                'email.email' => "Renseigner un email valide",
                'password.required' => "Le mot de passe est requis"
            ]);

            $user = User::where('email', $request->email)->first();

            if (!$user || !Hash::check($request->password, $user->password)) {
                throw ValidationException::withMessages([
                    'email' => ['Les informations d\'identification sont incorrectes.'],
                ]);
            }

            $token = $user->createToken('auth_token', ['*'], now()->addDays(7))->plainTextToken;

            return response()->json([
                'success' => true,
                'message' => 'Connexion réussie',
                'user' => $user,
                'token' => $token,
            ]);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Echec de la connexion',
                'errors' => $e->getMessage(),
            ]);
        }
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
