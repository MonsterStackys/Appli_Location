<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class StoryController extends Controller
{
    public function index(Request $request)
    {
        $now = Carbon::now();
        $deleteCount = Story::where('expires_at', '<', $now)->delete();
        $activeStories = Story::where('expires_at', '>=', $now)
                        ->latest()
                        ->get();
        return response()->json([
            'stories' => $activesStories,
            'message' => $deleteCount > 0 ? "{$deletedCount} stories expirées nettoyées." : null  
        ], 200);
    }
}
