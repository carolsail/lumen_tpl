<div id="header" class="header navbar navbar-default navbar-fixed-top">

	<div class="container-fluid">
	  <div class="navbar-header">
	    <a href="{:url('/admin')}" class="navbar-brand"><span class="navbar-logo"></span> 程運系統</a>
	  </div>
	  
	  <ul class="nav navbar-nav navbar-left">
	    <li {:authDisplay('member')}>
	      <a href="{:url('/admin/member')}">
	        <span class="visible-xs">客</span>
	        <span class="hidden-xs">客戶管理</span>
	      </a>
	    </li>

	    <li {:authDisplay('product')}>
	      <a href="{:url('/admin/product')}">
	        <span class="visible-xs">產</span>
	        <span class="hidden-xs">產品管理</span>
	      </a>
	    </li>

	    <li {:authDisplay('order')}>
	      <a href="{:url('/admin/order')}">
	        <span class="visible-xs">入</span>
	        <span class="hidden-xs">入倉管理</span>
	      </a>
	    </li>
	    
	    <li {:authDisplay('delivery')}>
	      <a href="{:url('/admin/delivery')}">
	        <span class="visible-xs">出</span>
	        <span class="hidden-xs">出倉管理</span>
	      </a>
	    </li>

	    <li {:authDisplay('declaration')}>
	      <a href="{:url('/admin/declaration')}">
	        <span class="visible-xs">報</span>
	        <span class="hidden-xs">報關管理</span>
	      </a>
	    </li>

	    <li {:authDisplay('tax')}>
	      <a href="{:url('/admin/tax')}">
	        <span class="visible-xs">稅</span>
	        <span class="hidden-xs">完稅表</span>
	      </a>
	    </li>

	    <li {:authDisplay('postal')}>
	      <a href="{:url('/admin/postal')}">
	        <span class="visible-xs">郵</span>
	        <span class="hidden-xs">郵政編號</span>
	      </a>
	    </li>

	    <li {:authDisplay('memberpoint')}>
	      <a href="{:url('/admin/point')}">
	        <span class="visible-xs">積</span>
	        <span class="hidden-xs">賬戶積分</span>
	      </a>
	    </li>

	    <li {:authDisplay('platform')}>
	      <a href="{:url('/admin/platform')}">
	        <span class="visible-xs">平</span>
	        <span class="hidden-xs">銷售平臺</span>
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