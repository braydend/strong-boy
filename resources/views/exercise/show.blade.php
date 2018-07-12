@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md">
            <h2 class="display-2">{{  $exercise->name }}</h2>

            <div id="chart_div"></div>
            // With Lava class alias
            <?= Lava::render('LineChart', 'Weight', 'chart_div') ?>

            // With Blade Templates
            @linechart('Weight', 'chart_div')
        </div>
    </div>
</div>
@endsection
