<!DOCTYPE html>
<!--[if IE 8]> <html lang="en" class="ie8"> <![endif]-->
<!--[if !IE]><!-->
<html lang="en">
<!--<![endif]-->
<head>
	<meta charset="utf-8" />
	<title>系统后台</title>
	<meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" name="viewport" />
	<meta content="" name="description" />
	<meta content="" name="author" />
	
	<link href="{{URL::asset('/assets/plugins/jquery-ui/themes/base/minified/jquery-ui.min.css')}}" rel="stylesheet" />
	<link href="{{URL::asset('/assets/plugins/bootstrap/css/bootstrap.min.css')}}" rel="stylesheet" />
	<link href="{{URL::asset('/assets/plugins/font-awesome/css/font-awesome.min.css')}}" rel="stylesheet" />
	<link href="{{URL::asset('/assets/plugins/color-tpl/css/animate.min.css')}}" rel="stylesheet" />
	<link href="{{URL::asset('/assets/plugins/color-tpl/css/style.min.css')}}" rel="stylesheet" />
	<link href="{{URL::asset('/assets/plugins/color-tpl/css/style-responsive.min.css')}}" rel="stylesheet" />
	<link href="{{URL::asset('/assets/plugins/color-tpl/css/theme/default.css')}}" rel="stylesheet" />
	<link href="{{URL::asset('/assets/css/backend.css')}}" rel="stylesheet" />
	
	<link rel="stylesheet" href="{{URL::asset('/assets/plugins/parsley/src/parsley.css')}}" />
	<link rel="stylesheet" href="{{URL::asset('/assets/plugins/bootstrap-table/dist/bootstrap-table.min.css')}}" />
	<link rel="stylesheet" href="{{URL::asset('/assets/plugins/layer/2.4/skin/layer.css')}}" />
	<link rel="stylesheet" href="{{URL::asset('/assets/plugins/select2/dist/css/select2.css')}}"/>
	<link rel="stylesheet" href="{{URL::asset('/assets/plugins/bootstrap-daterangepicker/daterangepicker.css')}}"/>

	<script src="{{URL::asset('/assets/plugins/pace/pace.min.js')}}"></script>
</head>
<body>
	<div id="page-loader" class="fade in"><span class="spinner"></span></div>
	
	<div id="page-container" class="fade page-header-fixed page-without-sidebar">
		@includeWhen($hasNavbar, 'backend.includes.header')
		
		<div id="content" class="content">
			@yield('content')
		</div>

		<a href="javascript:;" class="btn btn-icon btn-circle btn-success btn-scroll-to-top fade" data-click="scroll-top"><i class="fa fa-angle-up"></i></a>
	</div>

	<div id="modal-dialog"></div>

	<script src="{{URL::asset('/assets/plugins/jquery/jquery-1.9.1.min.js')}}"></script>
	<script src="{{URL::asset('/assets/plugins/jquery/jquery-migrate-1.1.0.min.js')}}"></script>
	<script src="{{URL::asset('/assets/plugins/jquery-ui/ui/minified/jquery-ui.min.js')}}"></script>
	<script src="{{URL::asset('/assets/plugins/bootstrap/js/bootstrap.min.js')}}"></script>
	<!--[if lt IE 9]>
		<script src="{{URL::asset('/assets/plugins/crossbrowserjs/html5shiv.js')}}"></script>
		<script src="{{URL::asset('/assets/plugins/crossbrowserjs/respond.min.js')}}"></script>
		<script src="{{URL::asset('/assets/plugins/crossbrowserjs/excanvas.min.js')}}"></script>
	<![endif]-->
	
	<script src="{{URL::asset('/assets/plugins/layer/2.4/layer.js')}}"></script>
	<script src="{{URL::asset('/assets/plugins/parsley/dist/parsley.min.js')}}"></script>
	<script src="{{URL::asset('/assets/plugins/bootstrap-table/dist/bootstrap-table.min.js')}}"></script>
	<script src="{{URL::asset('/assets/plugins/kindeditor/kindeditor-all-min.js')}}"></script>
	<script src="{{URL::asset('/assets/plugins/select2/dist/js/select2.min.js')}}"></script>
	<script src="{{URL::asset('/assets/plugins/plupload/js/plupload.full.min.js')}}"></script>
	<script src="{{URL::asset('/assets/plugins/art-template/dist/template-native.js')}}"></script>
	<script src="{{URL::asset('/assets/plugins/moment/min/moment.min.js')}}"></script>
	<script src="{{URL::asset('/assets/plugins/bootstrap-daterangepicker/daterangepicker.js')}}"></script>
	<script src="{{URL::asset('/assets/plugins/dragsort/jquery.dragsort.js')}}"></script>
	<script src="{{URL::asset('/assets/plugins/lodash/lodash.min.js')}}"></script>
	<script src="{{URL::asset('/assets/plugins/color-tpl/js/apps.js')}}"></script>
	<script>
		var Config = {!! json_encode($config) !!}
		$(function(){
			App.init();
		})
	</script>
	<script src="{{URL::asset('/assets/js/backend.js')}}" type="text/javascript"></script>
	<script>
		if(I[Config.controller]){
			I[Config.controller][Config.action] != undefined && I[Config.controller][Config.action]()
		}
	</script>
</body>
</html>
