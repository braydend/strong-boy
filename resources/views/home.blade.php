@extends('layouts.app')

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
    <?PHP $row = false; ?>
    @foreach($sets as $set)
    <div class="col-md-6">
      <div class="card text-center">
        <div class="card-header">{{ $set->exercise->name  }}</div>
        <div class="card-body">
          <p>Weight: {{ $set->weight  }} kg</p>
          <p>Reps: {{ $set->reps  }}</p>
        </div>
        <div class="card-footer text-muted">
          {{  $set->days_since  }}
        </div>
      </div>
    </div>
    @if($row == true)
  </div>
  <br />
  <div class="row">
    @endif
    <?PHP $row = !$row; ?>
    @endforeach
  </div>
  <div class="row">
    <div class="col-md">
      {{  $sets->links()  }}
    </div>
  </div>
</div>
@endsection
