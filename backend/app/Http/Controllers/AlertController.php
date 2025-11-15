<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateAlertRequest;
use App\Models\Alert;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AlertController extends Controller
{
    public function index()
    {
        try {
            $alerts = Alert::where('user_id', Auth::id())->orderBy('created_at', 'desc')->get();
            return response()->json(['alerts' => $alerts], 200);
        } catch (Exception $e) {
            return $e->getMessage();
        }
    }

    public function store(CreateAlertRequest $request)
    {
        try {
            $alert = auth()->user()->alerts()->create($request->validated());
            return response()->json(['success' => true, 'alert' => $alert], 200);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'error' => 'Failed to create alert',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $alert = Alert::find($id);

            if (!$alert || $alert->user_id != Auth::id()) {
                return response()->json(['error' => 'Alert not found or unauthorized'], 404);
            }

            return response()->json(['success'=>true,'message' => 'Alert deleted successfully'], 200);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'error' => 'Failed to delete alert',
                'message' => $e->getMessage()
            ]);
        }
    }
}
