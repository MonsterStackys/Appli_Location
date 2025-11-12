<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateAlertRequest;
use App\Models\Alert;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AlertController extends Controller
{
    public function index(){
        $alerts = Alert::where('user_id',Auth::id())->orderBy('created_at','desc')->get();
        return response()->json(['alerts'=>$alerts],200);
    }

    public function store(CreateAlertRequest $request){
        $alert = auth()->user()->alerts()->create($request->validated());
        return response()->json(['alert'=>$alert],200);
    }

    public function destroy($id){
        $alert = Alert::find($id);

        if(!$alert || $alert->user_id != Auth::id()){
            return response()->json(['error'=>'Alert not found or unauthorized'],404);
        }

        return response()->json(['message'=>'Alert deleted successfully'],200);
    }
}
