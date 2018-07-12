@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md">
          @if($message != null)
            <div class="alert alert-danger" role="alert">
              {{  $message  }}
            </div>
          @endif
            <div class="card">
                <div class="card-header">Dashboard</div>

                <div class="card-body">
                    @if (session('status'))
                        <div class="alert alert-success" role="alert">
                            {{ session('status') }}
                        </div>
                    @endif

                    You are logged in!

                    <a href="{{ URL::to('/exercise')  }}">Exercises</a>
                    <a href="{{ URL::to('/sets')  }}">Sets</a>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
