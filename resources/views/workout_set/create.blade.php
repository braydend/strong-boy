@extends('layouts.app')

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
        <div class="form-group">
					{{	Form::label('exercise_id', 'Exercise')	}}
					<select name="exercise_id" class="form-control">
						@foreach($exercises as $exercise)
							<option value="{{	$exercise->id	}}">{{	$exercise->name	}}</option>
						@endforeach
					</select>
					<small id="missingExercise" class="form-text text-muted">Exercise not listed? <a href="{{	URL::to('/exercise/create')	}}">Click here to create the exercise</a></small>
				</div>
        <div class="form-group">
  				{{	Form::label('reps', 'Reps')	}}
  				{{	Form::text('reps', Input::old('reps'), array('class' => 'form-control'))	}}
  			</div>
        <div class="form-group">
  				{{	Form::label('weight', 'Weight')	}}
  				{{	Form::text('weight', Input::old('weight'), array('class' => 'form-control'))	}}
  			</div>
        <div class="form-group">
          {{ Form::label('weight-kg', 'Kilograms (kg)') }}
          {{ Form::radio('weight', 'kg', true, array('id'=>'weight-kg')) }}
        </div>
        <div class="form-group">
          {{ Form::label('weight-lb', 'Pounds (lb)') }}
          {{ Form::radio('weight', 'lb', false, array('id'=>'weight-lb')) }}
  			</div>
  			{{	Form::submit('Log the Workout!', array('class' => 'btn btn-primary')) }}
  			{{	Form::close()	}}
  	</div>
  </div>
</div>
@endsection
