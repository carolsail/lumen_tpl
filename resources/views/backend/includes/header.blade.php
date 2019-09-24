<div id="header" class="header navbar navbar-default navbar-fixed-top">

	<div class="container-fluid">
	  <div class="navbar-header">
	    <a href="{{url('admin')}}" class="navbar-brand"><span class="navbar-logo"></span> Lumen</a>
	  </div>
	  
	  <ul class="nav navbar-nav navbar-left">
	    <li>
	      <a href="{{url('admin/example')}}">
	        <span class="visible-xs">E</span>
	        <span class="hidden-xs">Example</span>
	      </a>
	    </li>
	  </ul>

	  <ul class="nav navbar-nav navbar-right">
	    <li class="dropdown navbar-user">
	      <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown">
	        <!-- <span class="hidden-xs">{:session('member.username')}</span> <b class="caret"></b> -->
	      </a>
	      <ul class="dropdown-menu animated fadeInLeft">
	        <li class="arrow"></li>
	        <li><a href="javascript:;" class='action-change-psw'>修改密碼</a></li>
	        <li class="divider"></li>
	        <li><a href="javascript:;" class='action-logout'>登出</a></li>
	      </ul>
	    </li>
	  </ul>
	</div>
   
</div>