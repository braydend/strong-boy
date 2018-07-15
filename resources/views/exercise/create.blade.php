@extends('layouts.app')

@section('content')
<div class="container justify-content-center">
    <div class="row">
        <div class="col-md">
            <h2 class="display-2">Create a new exercise</h1>
        </div>
    </div>
    <div class="row">
      <div class="col-md">
  			{{ HTML::ul($errors->all(), array('class' => 'alert alert-danger')) }}
  			{{	Form::open(array('url' => 'exercise'))	}}
  			<div class="form-group">
  				{{	Form::label('name', 'Excercise Name')	}}
  				{{	Form::text('name', Input::old('name'), array('class' => 'form-control'))	}}
  			</div>
  			{{	Form::submit('Create the Exercise!', array('class' => 'btn btn-primary')) }}
  			{{	Form::close()	}}
  	</div>
  </div>
</div>
@endsection