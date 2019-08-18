<?php

namespace App\Http\Controllers;

use App\Weight;
use Illuminate\Support\Facades\Input;
use View;
use Illuminate\Support\Facades\Auth;

class WeightController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function getWeightData()
    {
        return(response()->json(Auth::user()->getWeights()->get()));
    }

    public function storeWeightData()
	{
		$weight = new Weight();
		$weight->user_id = Auth::user()->id;
		$weight->weight = Input::get('weight');
		$weight->save();
	}
}
