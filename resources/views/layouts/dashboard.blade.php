<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>@yield('title') | Strong Boy</title>

    <!-- Scripts -->
    <script src="{{ asset('js/app.js') }}" defer></script>
    <script src="{{ asset('js/jquery.min.js') }}"></script>

    <!-- Styles -->
    <link href="{{ asset('css/dashboard.css') }}" rel="stylesheet">
    <link href="{{ asset('css/mobile.css') }}" rel="stylesheet">
    <link href="{{ asset('css/bootstrap.min.css') }}" rel="stylesheet">

</head>
<body>
    <div id="app">
      <div class="row">
        <div id="dashboard-title">
          <a href="{{ URL::to('/')  }}">StrongBoy</a>
        </div>
        <div id="dashboard-top">
          @yield('title')
        </div>
      </div>
      <div class="row">
        <nav id="dashboard-nav">
          <a href="{{ URL::to('/exercise')}}">
            <div name="dashboard-nav-item">
              Exercises
            </div>
          </a>
          <!-- Need to create layout for records -->
          <!--a href="{{ URL::to('/records')}}">
            <div name="dashboard-nav-item">
              Records
            </div>
          </a-->
          <a href="{{ URL::to('/logout')  }}">
            <div class="dashboard-nav-item dashboard-navbar-footer position-fixed">
              Logout
            </div>
          </a>
        </nav>
        <main id="dashboard-content">
            @yield('content')
        </main>
      </div>
    </div>
    <script src="{{ asset('js/custom.js') }}"></script>
    <script src="{{ asset('js/dashboard.js') }}"></script>
</body>
</html>
