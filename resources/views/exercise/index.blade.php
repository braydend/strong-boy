@extends('layouts.dashboard')

@section('title', 'All Exercises')

@section('content')
<div class="container justify-content-center exercise-container">
    <div class="row">
        <div class="col-md">
          <h2 class="display-2">Exercises</h2>
        </div>
    </div>
    <br />
    <div class="row">
      <div class="col-md">
        <a href="{{ URL::to('exercise/create')  }}" class="btn btn-success">Create exercise</a>
      </div>
    </div>
    <br />
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
                <td>
                  <a href="{{ URL::to('exercise/' . $exercise->id)  }}">
                    {{  $exercise->name }}
                  </a>
                </td>
                <td>{{  $exercise->workout_sets()->where('user_id', $user->id)->count()  }}</td>
                @if($exercise->workout_sets()->where('user_id', $user->id)->count() < 1)
                  <td>Nothing Logged!</td>
                @else
                  <td>{{  $exercise->workout_sets()->where('user_id', $user->id)->max('weight')  }} kg ({{  round($exercise->workout_sets()->where('user_id', $user->id)->max('weight') / 0.453592, 1) }} lb)</td>
                @endif
              </tr>
            @endforeach
          </tbody>
        </table>
      </div>
    </div>
    <div class="row">
      <div class="col-md">
        {{  $exercises->links() }}
      </div>
    </div>
</div>
@endsection
