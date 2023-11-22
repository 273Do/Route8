<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        
        <meta
         property="og:description"
         content="Route8は走行時の状態や移動手段なども合わせて経路を共有サイトです。走行前でも投稿できます。"
        />
        
        <link rel="icon" href="{{ asset('/route8_favicon32.ico')}}" />
        <link rel="apple-touch-icon" href="{{ asset('/route8_favicon128.ico')}}"  />
        
        <title>Route8</title>

        <!--<title inertia>{{ config('app.name', 'Laravel') }}</title>-->

        <!-- Fonts -->
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap">

        <!-- Scripts -->
        @routes
        @viteReactRefresh
         @vite([
            
            'resources/scss/app.scss',
            'resources/js/app.tsx',
         ])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
