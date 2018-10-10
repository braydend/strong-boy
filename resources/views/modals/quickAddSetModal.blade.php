
<!-- Modal for quick workout logging -->
<div class="modal fade" id="quickAdd{{  $exercise->first()->exercise->name }}Modal" tabindex="-1" role="dialog" aria-labelledby="quickAdd{{  $exercise->first()->exercise->name }}ModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="quickAdd{{  $exercise->first()->exercise->name }}ModalLabel">Quick add {{ $exercise->first()->exercise->name }}</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        {{	Form::open(array('url' => 'sets'))	}}
        <input type="text" class="form-control" id="exercise_id" name="exercise_id" value="{{ $exercise->first()->exercise_id }}" aria-label="" aria-describedby="basic-addon1" hidden>
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <button class="btn btn-outline-secondary" name="{{ $exercise->first()->exercise_id }}-reps-btn" id="{{ $exercise->first()->exercise_id }}-reps-1" type="button" onclick="btnGroupSelected({{ $exercise->first()->exercise_id }}, 1, 1, 'reps')">1</button>
              <button class="btn btn-outline-secondary" name="{{ $exercise->first()->exercise_id }}-reps-btn" id="{{ $exercise->first()->exercise_id }}-reps-2" type="button" onclick="btnGroupSelected({{ $exercise->first()->exercise_id }}, 2, 2, 'reps')">2</button>
              <button class="btn btn-outline-secondary" name="{{ $exercise->first()->exercise_id }}-reps-btn" id="{{ $exercise->first()->exercise_id }}-reps-3" type="button" onclick="btnGroupSelected({{ $exercise->first()->exercise_id }}, 3, 3, 'reps')">3</button>
              <button class="btn btn-outline-secondary" name="{{ $exercise->first()->exercise_id }}-reps-btn" id="{{ $exercise->first()->exercise_id }}-reps-4" type="button" onclick="btnGroupSelected({{ $exercise->first()->exercise_id }}, 4, 4, 'reps')">4</button>
              <button class="btn btn-outline-secondary" name="{{ $exercise->first()->exercise_id }}-reps-btn" id="{{ $exercise->first()->exercise_id }}-reps-5" type="button" onclick="btnGroupSelected({{ $exercise->first()->exercise_id }}, 5, 5, 'reps')">5</button>
            </div>
            <input type="number" class="form-control" id="{{ $exercise->first()->exercise_id }}-reps" name="reps" placeholder="Reps" aria-label="" aria-describedby="basic-addon1">
          </div>
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <button class="btn btn-outline-secondary" name="{{ $exercise->first()->exercise_id }}-weight-btn" id="{{ $exercise->first()->exercise_id }}-weight-1" type="button" onclick="btnGroupSelected({{ $exercise->first()->exercise_id }}, 1, 20, 'weight')">20</button>
              <button class="btn btn-outline-secondary" name="{{ $exercise->first()->exercise_id }}-weight-btn" id="{{ $exercise->first()->exercise_id }}-weight-2" type="button" onclick="btnGroupSelected({{ $exercise->first()->exercise_id }}, 2, 30, 'weight')">30</button>
              <button class="btn btn-outline-secondary" name="{{ $exercise->first()->exercise_id }}-weight-btn" id="{{ $exercise->first()->exercise_id }}-weight-3" type="button" onclick="btnGroupSelected({{ $exercise->first()->exercise_id }}, 3, 40, 'weight')">40</button>
              <button class="btn btn-outline-secondary" name="{{ $exercise->first()->exercise_id }}-weight-btn" id="{{ $exercise->first()->exercise_id }}-weight-4" type="button" onclick="btnGroupSelected({{ $exercise->first()->exercise_id }}, 4, 50, 'weight')">50</button>
              <button class="btn btn-outline-secondary" name="{{ $exercise->first()->exercise_id }}-weight-btn" id="{{ $exercise->first()->exercise_id }}-weight-5" type="button" onclick="btnGroupSelected({{ $exercise->first()->exercise_id }}, 5, 60, 'weight')">60</button>
            </div>
            <input type="number" step="0.01" class="form-control" id="{{ $exercise->first()->exercise_id }}-weight" name="weight" placeholder="Weight" aria-label="" aria-describedby="basic-addon1">
          </div>
          <div class="btn-group" role="group" aria-label="Basic example">
            <button type="button" class="btn btn-info" id="{{ $exercise->first()->exercise_id }}-weightFormat-1" name="{{ $exercise->first()->exercise_id }}-weightFormat-btn" onclick="toggleBtn({{ $exercise->first()->exercise_id }}, 1, 'kg', 'weightFormat')">Kg</button>
            <button type="button" class="btn btn-secondary" id="{{ $exercise->first()->exercise_id }}-weightFormat-2" name="{{ $exercise->first()->exercise_id }}-weightFormat-btn" onclick="toggleBtn({{ $exercise->first()->exercise_id }}, 2, 'lb', 'weightFormat')">Lb</button>
          </div>
          <input type="text" class="form-control" id="{{ $exercise->first()->exercise_id }}-weightFormat" name="weightFormat" placeholder="Weight Type" value="kg" aria-label="" aria-describedby="basic-addon1" hidden>
          <div class="btn-group" role="group" aria-label="Basic example">
            <button type="button" class="btn btn-secondary" id="{{ $exercise->first()->exercise_id }}-warmup-1" name="{{ $exercise->first()->exercise_id }}-warmup-btn" onclick="toggleBtn({{ $exercise->first()->exercise_id }}, 1, '1', 'warmup')">Warmup</button>
            <button type="button" class="btn btn-info" id="{{ $exercise->first()->exercise_id }}-warmup-2" name="{{ $exercise->first()->exercise_id }}-warmup-btn" onclick="toggleBtn({{ $exercise->first()->exercise_id }}, 2, '0', 'warmup')">Real</button>
          </div>
          <input type="text" class="form-control" id="{{ $exercise->first()->exercise_id }}-warmup" name="warmup" placeholder="Warmup" value="0" aria-label="" aria-describedby="basic-addon1" hidden>
        {{	Form::submit('Log the Workout!', array('class' => 'btn btn-primary')) }}
        {{	Form::reset('Reset', array('class' => 'btn btn-danger')) }}
        {{	Form::close()	}}
      </div>
    </div>
  </div>
</div>
