@extends('layouts.app')

@section('title')
  {{ $user->name }}'s Dashboard
@endsection

@section('content')
<div class="container">
  <div class="row">
    <div class="col-md">
      @if($message != null)
        <div class="alert alert-danger" role="alert">
          {{  $message  }}
        </div>
      @endif
    </div>
  </div>
  <div class="row">
    <div class="col-md text-center">
      <h2 class="display-2">Recent Workouts</h2>
    </div>
  </div>
  <div class="row">
    @foreach($exercises as $exercise)
      @if($exercise->workout_sets()->where('user_id', $user->id)->count() > 0)
        <div class="col-md-6">
          <div class="card text-center">
            <div class="card-header">
              <span class="h3"><b>{{ $exercise->name  }}</b></span>
              <span class="exercise_icons">
                <a href="{{ URL::to('/sets/create/' . $exercise->id)  }}" class="btn btn-primary" title="Add Workout">
                  <img src="{{ asset('icons/baseline_add_black_18dp.png') }}" alt="Add Workout">
                </a>
                <a href="{{ URL::to('/exercise/' . $exercise->id)  }}" class="btn btn-success" title="Show Progress">
                  <img src="{{ asset('icons/baseline_show_chart_black_18dp.png') }}" alt="Show Progress">
                </a>
              </span>
            </div>
            <div class="card-body">
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">Date</th>
                    <th scope="col">Weight</th>
                    <th scope="col">Reps</th>
                  </tr>
                </thead>
                <tbody>
                  @foreach($exercise->workout_sets()->where('user_id', $user->id)->get() as $set)
                    @if($set->warmup == 0)
                      <tr>
                          <td>{{  $set->created_at->toFormattedDateString()  }}</td>
                          <td>{{  $set->weight  }}kg ({{  round($set->weight / 0.453592, 1) }} lb)</td>
                          <td>{{  $set->reps  }}</td>
                      </tr>
                    @endif
                  @endforeach
                </tbody>
              </table>
            </div>
          </div>
          <hr />
        </div>
        @endif
    @endforeach
  </div>
  <div class="row">
    <div class="col-md">
      {{  $exercises->links()  }}
    </div>
  </div>
</div>
@endsection
