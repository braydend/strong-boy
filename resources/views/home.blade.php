@extends('layouts.dashboard')

@section('title')
  {{ $user->name }}'s DashboardLayout
@endsection

@section('content')
  <div id="dashboard"></div>
@endsection
