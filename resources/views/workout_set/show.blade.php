@extends('layouts.dashboard')

@section('title', 'View Set')

@section('content')
<div class="container justify-content-center">
    <div class="row">
        <div class="col-md">
          <h2 class="display-2">{{  $set->exercise->name  }} workout</h2>
        </div>
    </div>
    <div class="row">
      <div class="col-md">
        <div class="card">
          <p>{{ $set->reps  }}</p>
          <p>{{ $set->weight  }} kg ({{  round($set->weight / 0.453592, 1) }} lb)</p>
        </div>
      </div>
    </div>
</div>
@endsection
