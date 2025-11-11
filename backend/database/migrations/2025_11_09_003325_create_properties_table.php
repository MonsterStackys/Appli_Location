<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('properties', function (Blueprint $table) {
            $table->uuid('id')->primary();
            
            $table->foreignUuid('user_id')->constrained()->onDelete('cascade');
            
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

            // Index pour les performances
            $table->index(['type', 'property_type']);
            $table->index(['price']);
            $table->index(['location']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('properties');
    }
};