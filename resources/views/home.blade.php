@extends('layouts.dashboard')

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
  <!-- Div for testing database -->
  <!--div class="row">
    <div class="col-md">
      <a href="{{ URL::to('/faker/exercise')  }}" class="btn btn-info">Exercise</a>
      <a href="{{ URL::to('/faker/set')  }}" class="btn btn-warning">Set</a>
    </div>
  </div-->
  <div class="row">
    <div class="col-md text-center">
      <h2 class="display-2">Recent Workouts</h2>
    </div>
  </div>
  <div class="row">
    @foreach($exercises as $exercise)
      @if(sizeof($exercise) > 0)
        <div class="col-md-6">
          <div class="card text-center">
            <div class="card-header">
              <span class="h3"><b>{{ $exercise->first()->exercise->name  }}</b></span>
              <span class="exercise_icons">
                <a href="#" class="btn btn-primary" title="Add Workout" data-toggle="modal" data-target="#quickAdd{{  $exercise->first()->exercise->name }}Modal">
                  <img src="{{ asset('icons/baseline_add_black_18dp.png') }}" alt="Add Workout">
                </a>
                <a href="{{ URL::to('/exercise/' . $exercise->first()->exercise_id)  }}" class="btn btn-success" title="Show Progress">
                  <img src="{{ asset('icons/baseline_show_chart_black_18dp.png') }}" alt="Show Progress">
                </a>
              </span>
            </div>
            <div class="card-body">
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col"></th>
                    <th scope="col">Date</th>
                    <th scope="col">Weight</th>
                    <th scope="col">Reps</th>
                  </tr>
                </thead>
                <tbody>
                  @foreach($exercise->where('warmup', '0')->take(5) as $set)
                    @if($set->warmup == 0)
                      <tr>
                          @if($set->created_at->diffInHours() < 1)
                            <td><a href="{{ URL::to('/sets/' . $set->id . '/edit')  }}" class="btn btn-warning">Edit</a></td>
                          @else
                            <td></td>
                          @endif
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
        @include('modals.quickAddSetModal')
        @endif
    @endforeach
  </div>
</div>
@endsection
