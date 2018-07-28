@extends('layouts.app')

@section('title')
Log
  @if(!empty($exercise))
{{  $exercise->name }}
  @endif
Set
@endsection

@section('content')
<div class="container justify-content-center">
    <div class="row">
        <div class="col-md">
            <h2 class="display-2">Log a new workout</h1>
        </div>
    </div>
    <div class="row">
      <div class="col-md">
  			{{ HTML::ul($errors->all(), array('class' => 'alert alert-danger')) }}
  			{{	Form::open(array('url' => 'sets'))	}}
        <div class="row">
          <div class="col-md">
            <div class="form-group">
    					{{	Form::label('exercise_id', 'Exercise')	}}
              @if(empty($exercise))
      					<select name="exercise_id" class="form-control">
      						@foreach($exercises as $exercise)
      							<option value="{{	$exercise->id	}}">{{	$exercise->name	}}</option>
      						@endforeach
      					</select>
                <small id="missingExercise" class="form-text text-muted">Exercise not listed? <a href="{{	URL::to('/exercise/create')	}}">Click here to create the exercise</a></small>
              @else
                <h3 class="h3">{{ $exercise->name }}</h3>
                <select name="exercise_id" class="form-control" hidden>
                  <option value="{{	$exercise->id	}}" selected="selected">{{	$exercise->name	}}</option>
                </select>
              @endif
    				</div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-6">
            <div class="form-group">
      				{{	Form::label('reps', 'Reps')	}}
      				{{	Form::text('reps', Input::old('reps'), array('class' => 'form-control'))	}}
      			</div>
          </div>
          <div class="col-sm-6">
            <div class="form-group">
      				{{	Form::label('weight', 'Weight')	}}
      				{{	Form::number('weight', Input::old('weight'), array('class' => 'form-control'))	}}
      			</div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-6">
            <h4 class="h4">Measurement</h4>
            <div class="form-group">
              {{ Form::label('weight-kg', 'Kilograms (kg)') }}
              {{ Form::radio('weightFormat', 'kg', true, array('id'=>'weight-kg')) }}
            </div>
            <div class="form-group">
              {{ Form::label('weight-lb', 'Pounds (lb)') }}
              {{ Form::radio('weightFormat', 'lb', false, array('id'=>'weight-lb')) }}
      			</div>
          </div>
          <div class="col-sm-6">
            <h4 class="h4">Warmup Set</h4>
            <div class="form-group">
              {{ Form::label('warmup-true', 'Yes') }}
              {{ Form::radio('warmup', '1', false, array('id'=>'warmup-true')) }}
            </div>
            <div class="form-group">
              {{ Form::label('warmup-false', 'No') }}
              {{ Form::radio('warmup', '0', true, array('id'=>'warmup-false')) }}
      			</div>
          </div>
        </div>
  			{{	Form::submit('Log the Workout!', array('class' => 'btn btn-primary')) }}
  			{{	Form::close()	}}
  	</div>
  </div>
</div>
@endsection
