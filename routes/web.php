<?php

$app->group(['namespace' => 'Backend', 'prefix' => 'admin'], function() use ($app) {
    $app->get('/', 'Example@index');
    $app->get('example', 'Example@index');
    $app->addRoute(['GET', 'POST'], 'example/create', 'Example@create');
});

//匹配任意路由
$app->get('{path:.*}', function (\Illuminate\Http\Request $request) {
    //return $request->getPathInfo();
    return view('miss');
});