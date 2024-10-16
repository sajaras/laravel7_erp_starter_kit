@extends('layouts.app')

@section('pagemodals')

@component('bladecomponents.modal')

@slot('modalid')
addRoleModal
@endslot
@slot('modalclass')
erpModal
@endslot
@slot('modaldialogclass')
erpModal
@endslot
@slot('modaltitle')
@component('svg_icons.createform1') @slot('width') 40 @endslot @slot('height') 40 @endslot @endcomponent
Create New Role
@endslot
@slot('modalbody')

<form id="addRoleForm" class="form-horizontal" autocomplete="ignore">
    {{csrf_field()}}

    @component('bladecomponents.form-tabs')
    @slot('tab1')
    @component('svg_icons.main') @slot('width') 15 @endslot @slot('height') 15 @endslot @endcomponent
    &nbsp; Main
    @endslot

    @slot('tab1content')
    <div class="input-group input-group-sm mb-3">
        <span class="input-group-text">
            @component('svg_icons.role') @slot('width') 24 @endslot @slot('height') 24 @endslot @endcomponent
            &nbsp;
            Name</span>
        <input type="text" class="form-control" placeholder="Role Name" name="name" aria-label="notification">
    </div>
    @endslot

    @slot('tab2')
    @component('svg_icons.permissions') @slot('width')15 @endslot @slot('height') 15 @endslot @endcomponent
    &nbsp; Permissions
    @endslot

    @slot('tab2content')
    second tab
    @endslot

    @endcomponent
</form>

@endslot
@slot('modalfooter')

    @component('bladecomponents.crud_addbuttons') @endcomponent

@endcomponent


@endsection

@section('mustache_templates')
<template id="roleRowTemplate">

    <tr>
        <td>@{{id}}</td>
        <td>@{{name}}</td>
        <td>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-calendar">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            <span class="table-inner-text">@{{email}}</span>
        </td>
        <td>@{{type}}</td>

    </tr>

</template>

@endsection
@section('content')

<div class="container">
    <div class="container">


        <div class="row layout-top-spacing">

            <div id="RolesTableDiv" class="col-lg-12 col-12 layout-spacing">
                <div class="statbox widget box box-shadow">
                    <div class="widget-header">
                        <div class="row">
                            <div class="mt-5 col-xl-12 col-md-12 col-sm-12 col-12 row">
                                <div class="col-md-4">
                                    <h4>Roles</h4>
                                </div>
                                <div class="col-md-4">
                                    <!-- <input class="form-control-sm" type="search" placeholder="search here" id="search"> -->
                                    <input type="text" class="w-100 form-control product-search br-30" id="input-search" placeholder="Search Here...">
                                </div>
                                <div class="col-md-4">
                                    <div class="btn-group  mb-2 me-4" role="group">
                                        <button id="btndefault6" type="button" class="btn btn-sm btn-dark dropdown-toggle _effect--ripple waves-effect waves-light" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        @component('svg_icons.selectlist') @slot('width') 24 @endslot @slot('height') 24 @endslot @slot('fill') #ffff @endslot @endcomponent
                                            Select Option </button>
                                        <div class="dropdown-menu" aria-labelledby="btndefault6" style="">
                                            
                                            <a href="#" class="dropdown-item" id="addRoleButton"><i class="flaticon-gear-fill mr-1"></i>
                                            @component('svg_icons.add') @slot('width') 24 @endslot @slot('height') 24 @endslot @slot('fill') #000 @endslot @endcomponent
                                        
                                            Add New Role</a>
                                            <a href="#" class="dropdown-item" id="viewRoleButton"><i class="flaticon-bell-fill-2 mr-1"></i>
                                            @component('svg_icons.view') @slot('width') 24 @endslot @slot('height') 24 @endslot @slot('fill') #000 @endslot @endcomponent
                                        
                                            View Roles</a>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div class="widget-content widget-content-area">

                        <div class="table-responsive">
                            <table id="RolesTable" class="table table-bordered">
                                <thead>
                                    <tr>
                                        <th scope="col">ID</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Email</th>
                                        <th class="text-center" scope="col">Type</th>
                                    </tr>
                                </thead>
                                <tbody id="RolesTableBody">


                                </tbody>
                            </table>
                        </div>

                    </div>

                </div>
            </div>
        </div>




    </div>

</div>

@section('pagejs')


<script src="{{URL::asset('/Application/Services/RoleServices.js')}}"></script>
<script src="{{URL::asset('/Application/roles.js')}}"></script>

@endsection

@endsection