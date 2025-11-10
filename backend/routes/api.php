<?php

use App\Http\Controllers\AlertController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PropertyController;
use App\Http\Controllers\StoryController;
use App\Http\Controllers\UserController;
use App\Models\Property;
use Illuminate\Support\Facades\Route;

// Routes publiques
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::get('/properties', [PropertyController::class, 'index']);
Route::get('/properties/{id}', [PropertyController::class, 'show']);
// Route::get('/users/{id}', [UserController::class, 'show']);// A faire
// Route::get('/stories', [StoryController::class, 'index']); // A faire

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
    // Route::get('/propreties/{nomAgence}', [PropertyController::class,'showAllPropreties']); //A faire
    
    // User Profile
    // Route::put('/profile', [UserController::class, 'updateProfile']); //A faire
    // Route::post('/profile/avatar', [UserController::class, 'updateAvatar']); //A faire
    
    // Stories
    // Route::post('/stories', [StoryController::class, 'store']);// A faire
    // Route::post('/stories/{id}/view', [StoryController::class, 'markAsViewed']);// A faire
    
    // Alerts
    // Route::get('/alerts', [AlertController::class, 'index']); // A faire
    // Route::post('/alerts', [AlertController::class, 'store']); // A faire
    // Route::delete('/alerts/{id}', [AlertController::class, 'destroy']); // A faire
});