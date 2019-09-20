@extends('backend.layouts.default')

@section('content')
<h1 class="page-header">Example <small>list</small></h1>
<div class='bs-table-container'>
    <div class="panel panel-inverse">
        <div class="panel-body">
            <form class="form-inline search">
                <div class="form-group">
                    <a href="{:url('/admin/member_create')}" class="btn btn-sm btn-success"><i class="fa fa-plus"></i> 新增</a>
                </div>
                <div class="form-group">
                    <input type="text" class="none" />
                    <input type="hidden" class="operate" data-name="name" value="like">
                    <input type="text" name="name" class="form-control input-sm" placeholder="用戶名" value=''>
                </div>
                <div class="form-group">
                    <input type="hidden" class="operate" data-name="create_time" value="RANGE">
                    <input type="text" name="create_time" class="form-control input-sm datetimerange" placeholder="創建時間" value="">
                </div>
                <button type="button" class="btn btn-sm btn-primary table-action-search"><i class="fa fa-search"></i> 查詢</button>
                <button type="button" class="btn btn-sm btn-default table-action-reset"><i class="fa fa-refresh"></i> 重置</button>
            </form>
        </div>
    </div>

    <div class="panel panel-inverse">
        <div class="panel-heading">
            <div class="panel-heading-btn">
                <a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-default" data-click="panel-expand"><i class="fa fa-expand"></i></a>
                <a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-warning" data-click="panel-collapse"><i class="fa fa-minus"></i></a>
            </div>
            <h4 class="panel-title">列表</h4>
        </div>
        <div class="panel-body">
            <div class="table-view-group-btn m-b-5">
                <a href="javascript:;" class="btn btn-sm btn-danger disabled batch-action-del"><i class="fa fa-trash"></i> 批量刪除</a>
            </div>
            <table id="table" class="table table-striped table-hover"></table>
        </div>
    </div>
</div>
@endsection