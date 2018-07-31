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
                <a href="#" class="btn btn-primary" title="Add Workout" data-toggle="modal" data-target="#quickAddModal">
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
                  @foreach($exercise->workout_sets()->where('user_id', $user->id)->where('warmup', 0)->get()->sortByDesc('created_at')->take(5) as $set)
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

        <!-- Modal -->
        <div class="modal fade" id="quickAddModal" tabindex="-1" role="dialog" aria-labelledby="quickAddModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="quickAddModalLabel">Quick add {{ $exercise->name }}</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <button class="btn btn-outline-secondary" name="reps" id="reps-1" type="button" onclick="btnGroupSelected(1)">1</button>
                    <button class="btn btn-outline-secondary" name="reps" id="reps-2" type="button" onclick="btnGroupSelected(2)">2</button>
                    <button class="btn btn-outline-secondary" name="reps" id="reps-3" type="button" onclick="btnGroupSelected(3)">3</button>
                    <button class="btn btn-outline-secondary" name="reps" id="reps-4" type="button" onclick="btnGroupSelected(4)">4</button>
                    <button class="btn btn-outline-secondary" name="reps" id="reps-5" type="button" onclick="btnGroupSelected(5)">5</button>
                  </div>
                  <input type="text" class="form-control" id="reps-count" placeholder="Reps" aria-label="" aria-describedby="basic-addon1">
                </div>
              </div>
            </div>
          </div>
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
