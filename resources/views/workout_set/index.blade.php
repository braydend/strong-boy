@extends('layouts.dashboard')

@section('title', 'All Sets')

@section('content')
<div class="container justify-content-center">
    <div class="row">
        <div class="col-md">
          <h2 class="display-2">Workouts</h2>
        </div>
    </div>
    <br />
    <div class="row">
      <div class="col-md">
        <a href="{{ URL::to('sets/create')  }}" class="btn btn-success">Log workout</a>
      </div>
    </div>
    <br />
    <div class="row">
      <div class="col-md">
        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">Exercise</th>
              <th scope="col">Reps</th>
              <th scope="col">Weight</th>
              <th scope="col">Date</th>
            </tr>
          </thead>
          <tbody>
            @foreach($sets as $set)
              <tr>
                <td>
                  <a href="{{ URL::to('sets/' . $set->id) }}">
                    {{  $set->exercise->name }}
                  </a>
                </td>
                <td>{{  $set->reps  }}</td>
                <td>{{  $set->weight  }} kg ({{  round($set->weight / 0.453592, 1) }} lb)</td>
                <td>{{  $set->created_at->toFormattedDateString()  }}</td>
              </tr>
            @endforeach
          </tbody>
        </table>
      </div>
    </div>
    <div class="row">
      <div class="col-md">
        {{  $sets->links()  }}
      </div>
    </div>
</div>
@endsection
