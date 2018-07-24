@extends('layouts.app')

@section('title', 'Edit Exercise')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">Exercises</div>

                <div class="card-body">
                    {{  $user->name }}
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
