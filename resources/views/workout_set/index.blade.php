@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">Sets</div>

                <div class="card-body">
                  @foreach($sets as $set)
                    <p>{{ $set->exercise->name  }} | {{ $set->reps  }} | {{ $set->weight  }}</p>
                  @endforeach
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
