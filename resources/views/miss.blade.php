<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>404 Page</title>
    <style type="text/css">
        a,fieldset,img{border:0;}
        a{color:#221919;text-decoration:none;outline:none;}
        a:hover{color:#3366cc;text-decoration:underline;}
        body{font-size:24px;color:#B7AEB4;}
        body a.link,body h1,body p{-webkit-transition:opacity 0.5s ease-in-out;-moz-transition:opacity 0.5s ease-in-out;transition:opacity 0.5s ease-in-out;}
        #wrapper{text-align:center;margin:100px auto;width:594px;}
        a.link{text-shadow:0px 1px 2px white;font-weight:600;color:#3366cc;opacity:0;}
        h1{text-shadow:0px 1px 2px white;font-size:24px;opacity:0;}
        img{-webkit-transition:opacity 1s ease-in-out;-moz-transition:opacity 1s ease-in-out;transition:opacity 1s ease-in-out;height:202px;width:199px;opacity:0;}
        p{text-shadow:0px 1px 2px white;font-weight:normal;font-weight:200;opacity:0;}
        .fade{opacity:1;}
        @media only screen and (min-device-width:320px) and (max-device-width:480px){
            #wrapper{margin:40px auto;text-align:center;width:280px;}
        }
    </style>
</head>
<body>
<div id="wrapper">
    <a href="javascript:history.back()"><img class="fade" src="{{URL::asset('assets/img/404.png')}}"></a>
    <div>
        <h1 class="fade">温馨提示：您访问的地址不存在！</h1>
        <p class="fade">你正在寻找的页面无法找到。
            <a style="opacity: 1;" class="link" href="javascript:history.back()">点击返回?</a>
        </p>
    </div>
</div>
</body>
</html>