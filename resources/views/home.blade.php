@extends('layouts.dashboard')

@section('title')
  {{ $user->name }}'s Dashboard
@endsection

@section('content')
<div id="dashboard"></div>
  <div id="modal"></div>
@endsection
