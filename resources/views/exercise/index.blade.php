@extends('layouts.app')

@section('content')
<div class="container justify-content-center">
    <div class="row">
        <div class="col-md">
          <h2 class="display-2">Exercises</h2>
        </div>
    </div>
    <div class="row">
      <div class="col-md">
        <a href="{{ URL::to('exercise/create')  }}" class="btn btn-success">Create exercise</a>
      </div>
    </div>
    <div class="row">
      <div class="col-md">
        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Workouts logged</th>
              <th scope="col">Your personal best</th>
            </tr>
          </thead>
          <tbody>
            @foreach($exercises as $exercise)
              <tr>
                <td>{{  $exercise->name }}</td>
                <td>{{  $exercise->workout_sets->count()  }}</td>
                <td>{{  $exercise->workout_sets->max('weight')  }}</td>
              </tr>
            @endforeach
          </tbody>
        </table>
      </div>
    </div>
</div>
@endsection
