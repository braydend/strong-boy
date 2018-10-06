@extends('layouts.dashboard')

@section('title')
  {{  $exercise->name }}
@endsection

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md">
            <h2 class="display-2">{{  $exercise->name }}</h2>

            <div id="chart_div"></div>
            <?= Lava::render('LineChart', 'Weight', 'chart_div') ?>
            @linechart('Weight', 'chart_div')
        </div>
    </div>
    <br />
    <div class="row">
      <div class="col-md">
        <a href="{{ URL::to('/sets/create/' . $exercise->id)  }}" class="btn btn-primary" title="Add Workout">
          Add Workout
        </a>
      </div>
    </div>
    <br />
    <div class="row justify-content-center">
      <div class="col-md">
        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">Date</th>
              <th scope="col">Weight</th>
              <th scope="col">Reps</th>
            </tr>
          </thead>
          <tbody>
            @foreach($sets as $set)
              @if($set->warmup == 1)
                <tr class="table-secondary">
                  <td>Warmup</td>
              @elseif($pb_id == $set->id)
                <tr class="table-success">
                  <td>PB</td>
              @else
                <tr>
                  <td></td>
              @endif
              <td>{{  $set->created_at->toFormattedDateString()  }}</td>
              <td>{{  $set->weight  }} kg ({{  round($set->weight / 0.453592, 1) }} lb)</td>
              <td>{{  $set->reps  }}</td>
            </tr>
            @endforeach
          </tbody>
        </table>
      </div>
    </div>
</div>
@endsection
