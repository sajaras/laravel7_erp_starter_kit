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
Create New Role
@endslot
@slot('modalbody')

<form id="addRoleForm" class="form-horizontal" autocomplete="ignore">
    {{csrf_field()}}


    <div class="simple-pill">

        <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li class="nav-item" role="presentation">
                <button class="nav-link active" id="pills-home-icon-tab" data-bs-toggle="pill" data-bs-target="#pills-home-icon" type="button" role="tab" aria-controls="pills-home-icon" aria-selected="true">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-home">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                        <polyline points="9 22 9 12 15 12 15 22"></polyline>
                    </svg>
                    Main
                </button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="pills-profile-icon-tab" data-bs-toggle="pill" data-bs-target="#pills-profile-icon" type="button" role="tab" aria-controls="pills-profile-icon" aria-selected="false">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    Permissions
                </button>
            </li>

        </ul>
        <div class="tab-content" id="pills-tabContent">
            <div class="tab-pane fade show active" id="pills-home-icon" role="tabpanel" aria-labelledby="pills-home-icon-tab" tabindex="0">

               
                <div class="form-group row">
                    <label for="company-name" class="text-end col-sm-3 col-form-label col-form-label-sm">Name</label>
                    <div class="col-sm-9">
                        <input type="text" class="form-control form-control-sm" id="role-name" placeholder="Role Name">
                    </div>
                </div>

            </div>
            <div class="tab-pane fade" id="pills-profile-icon" role="tabpanel" aria-labelledby="pills-profile-icon-tab" tabindex="0">
                <p class="mt-3">Aliquam at sem nunc. Maecenas tincidunt lacus justo, non ultrices mauris egestas eu. Vestibulum ut ipsum ac eros rutrum blandit in eget quam. Nullam et lobortis nunc. Nam sodales, ante sed sodales rhoncus, diam ipsum faucibus mauris, non interdum nisl lacus vel justo.</p>
                <p>Sed imperdiet mi tincidunt mauris convallis, ut ullamcorper nunc interdum. Praesent maximus massa eu varius gravida. Nullam in malesuada enim. Morbi commodo pellentesque velit sodales pretium. Mauris scelerisque augue vel est pulvinar laoreet.</p>
            </div>

        </div>

    </div>

</form>

@endslot
@slot('modalfooter')

<button id="saveAndNextButton" class="erpButton btn bg-green text-white">Save &amp; Next</button>
<button id="saveAndExitButton" type="button" class="erpButton btn bg-orange text-white">Save &amp; Exit</button>
<button id="clearButton" type="button" class="erpButton btn bg-black text-white">Clear</button>
<button id="closeButton" class="btn bg-red text-white" data-bs-dismiss="modal">Close</button>
@endslot

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
                                        <button id="btndefault6" type="button" class="btn btn-sm btn-dark dropdown-toggle _effect--ripple waves-effect waves-light" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Select Option <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-down">
                                                <polyline points="6 9 12 15 18 9"></polyline>
                                            </svg></button>
                                        <div class="dropdown-menu" aria-labelledby="btndefault6" style="">
                                            <a href="#" class="dropdown-item" id="addRoleButton"><i class="flaticon-gear-fill mr-1"></i>Add New Role</a>
                                            <a href="#" class="dropdown-item" onclick="loadRolesTable(this);"><i class="flaticon-bell-fill-2 mr-1"></i>View Roles</a>
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