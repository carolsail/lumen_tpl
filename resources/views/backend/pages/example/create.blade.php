@extends('backend.layouts.default')

@section('content')
<ol class="breadcrumb pull-right">
    <li class="breadcrumb-item"><a href="{{url('admin/example')}}">Lists</a></li>
    <li class="breadcrumb-item active">Create</li>
</ol>
<h1 class="page-header">Example <small>Create</small></h1>

<form role="form" action="{{url('admin/example/create')}}" data-parsley-validate="true" novalidate>
    <div class="card">
        <div class="card-header">基本信息</div>
        <div class="card-block">
            <label class="control-label">Name</label>
            <div class="row row-space-10">
                <div class="col-md-6 m-b-15">
                    <input type="text" class="form-control" placeholder="First name">
                </div>
                <div class="col-md-6 m-b-15">
                    <input type="text" class="form-control" placeholder="Last name">
                </div>
            </div>
     
            <div class="row">
                <div class="col-md-4">
                    <div class="form-group">
                        <label>Email <span class="text-danger">*</span></label>
                        <div class="controls">
                            <input type="email" name="row[email]" class="form-control" placeholder="Email address" required="">
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label>Tel</label>
                        <div class="controls">
                            <input type="number" name="row[tel]" placeholder="Tel" class="form-control">
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label>Fax</label>
                        <div class="controls">
                            <input type="number" name="row[fax]" placeholder="Fax" class="form-control">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="card text-right">
        <div class="card-block">
            <button type="submit" class="btn btn-primary btn-lg">Save</button>
        </div>
    </div>
</form>
@endsection