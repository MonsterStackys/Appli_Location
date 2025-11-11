<?php

namespace App\Http\Controllers;

use App\Models\Alert;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AlertController extends Controller
{
    public function index(){
        $alerts = Alert::where('user_id',Auth::id())->get();

        return response()->json(['alerts'=>$alerts],200);
    }
}
