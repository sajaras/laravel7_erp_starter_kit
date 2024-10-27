@extends('layouts.app')

@section('pagemodals')

@component('bladecomponents.modal')

@slot('modalid')
addUserModal
@endslot
@slot('modalclass')
erpModal
@endslot
@slot('modaldialogclass')
erpModal
@endslot
@slot('enableLoader')
1
@endslot
@slot('modaltitle')
@component('svg_icons.createform1') @slot('width') 40 @endslot @slot('height') 40 @endslot @endcomponent
Create New User
@endslot
@slot('modalbody')
<form id="deleteUserForm" class="form-horizontal" autocomplete="ignore">
{{csrf_field()}}
</form>
<form id="addUserForm" class="form-horizontal" autocomplete="ignore">
    {{csrf_field()}}

    @component('bladecomponents.form-tabs')
    @slot('represents')@endslot
    @slot('tab1')
    @component('svg_icons.main') @slot('width') 15 @endslot @slot('height') 15 @endslot @endcomponent
    &nbsp; Main
    @endslot

    @slot('tab1content')
    <div class="input-group input-group-sm mb-3">
        <span class="input-group-text">
            @component('svg_icons.permissions') @slot('width') 24 @endslot @slot('height') 24 @endslot @endcomponent
            &nbsp;
            Name</span>
        <input type="text" class="form-control" placeholder="User Name" name="name" aria-label="notification">
    </div>

    <div class="input-group input-group-sm mb-3">
        <span class="input-group-text">
            @component('svg_icons.permissions') @slot('width') 24 @endslot @slot('height') 24 @endslot @endcomponent
            &nbsp;
            Email</span>
        <input type="text" class="form-control" placeholder="Enter Email" name="email" aria-label="email">
    </div>
    
    <div class="input-group input-group-sm mb-3">
        <span class="input-group-text">
            @component('svg_icons.permissions') @slot('width') 24 @endslot @slot('height') 24 @endslot @endcomponent
            &nbsp;
            Phone Number</span>
        <input type="text" class="form-control" placeholder="Enter Phone Number" name="phone_number" aria-label="phone_number">
    </div>
    
    @endslot

    @slot('tab2')
    @component('svg_icons.role') @slot('width')15 @endslot @slot('height') 15 @endslot @endcomponent
    &nbsp; Roles
    @endslot

    @slot('tab2content')
    <div class="table-responsive" id="userRolesTableDiv">
                            <table id="userRolesTable" class="table table-bordered userRolesTable">
                                <thead>
                                    <tr>
                                        <th scope="col">Roles</th>
                                        <th scope="col" class="text-center">Actions
                                        <button type="button" title="Add Row" class="userRoleAddButton"> @component('svg_icons.create2') @slot('width') 18 @endslot @slot('height') 18 @endslot  @endcomponent</button>
                                        <button type="button"  title="Delete selected Rows" class="ms-2 userRoledeleteButton"> @component('svg_icons.delete') @slot('width') 18 @endslot @slot('height') 18 @endslot  @endcomponent
                                             </th>

                                    </tr>
                                </thead>
                                <tbody id="userRolesTableBody">


                                </tbody>
                            </table>
                        </div>
    @endslot

    @endcomponent
</form>

@endslot
@slot('modalfooter')

@component('bladecomponents.crud_addbuttons') @endcomponent

@endcomponent



 <!-- Edit Modal  -->
 @component('bladecomponents.modal')

@slot('modalid')
editUserModal
@endslot
@slot('enableLoader')
1
@endslot
@slot('modalclass')
erpModal
@endslot
@slot('modaldialogclass')
erpModal
@endslot
@slot('modaltitle')
@component('svg_icons.createform1') @slot('width') 40 @endslot @slot('height') 40 @endslot @endcomponent
 Edit User
@endslot
@slot('modalbody')

<form id="editUserForm" class="form-horizontal" autocomplete="ignore">
    {{csrf_field()}}
    <input type="hidden" id="editingId">
    @component('bladecomponents.form-tabs')
    @slot('represents')
    edit
    @endslot
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
        <input type="text" id="editUserName" class="form-control" placeholder="User Name" name="name" aria-label="notification">
    </div>

    <div class="input-group input-group-sm mb-3">
        <span class="input-group-text">
            @component('svg_icons.permissions') @slot('width') 24 @endslot @slot('height') 24 @endslot @endcomponent
            &nbsp;
            Email</span>
        <input type="text" id="editUserEmail" class="form-control" placeholder="Enter Email" name="email" aria-label="email">
    </div>
    
    <div class="input-group input-group-sm mb-3">
        <span class="input-group-text">
            @component('svg_icons.permissions') @slot('width') 24 @endslot @slot('height') 24 @endslot @endcomponent
            &nbsp;
            Phone Number</span>
        <input type="text" id="editUserPhoneNumber" class="form-control" placeholder="Enter Phone Number" name="phone_number" aria-label="phone_number">
    </div>
    @endslot

    @slot('tab2')
    @component('svg_icons.permissions') @slot('width')15 @endslot @slot('height') 15 @endslot @endcomponent
    &nbsp; Roles
    @endslot

    @slot('tab2content')
    <div class="table-responsive" id="userRolesEditTableDiv">
                            <table id="userRolesEditTable" class="table table-bordered userRolesTable">
                                <thead>
                                    <tr>
                                        <th scope="col">Roles</th>
                                        <th scope="col" class="text-center">Actions
                                        <button type="button" title="Add Row" class="userRoleAddButton"> @component('svg_icons.create2') @slot('width') 18 @endslot @slot('height') 18 @endslot  @endcomponent</button>
                                        <button type="button"  title="Delete selected Rows" class="ms-2 userRoledeleteButton"> @component('svg_icons.delete') @slot('width') 18 @endslot @slot('height') 18 @endslot  @endcomponent
                                             </th>

                                    </tr>
                                </thead>
                                <tbody id="userRolesEditTableBody">


                                </tbody>
                            </table>
                        </div>
    @endslot

    @endcomponent
</form>

@endslot
@slot('modalfooter')

@component('bladecomponents.crud_updatebuttons') @endcomponent

@endcomponent


 <!-- End of Edit Modal -->

@endsection

@section('mustache_templates')
<template id="userRowTemplate">

    <tr class="@{{highlight}}">
        <td>@{{id}}<input type='hidden' class="editid" value="@{{id}}"><input type='hidden' class="deleteDisplay" value="@{{name}}"></td>
        <td class="userName">@{{name}}</td>
        <td class="">@{{email}}</td>
        <td>
            <button type="button" title="Edit User" class="editButton"> @component('svg_icons.edit1') @slot('width') 18 @endslot @slot('height') 18 @endslot  @endcomponent</button>
            <button type="button"  title="Delete User" class="ms-2 deleteButton"> @component('svg_icons.delete') @slot('width') 18 @endslot @slot('height') 18 @endslot  @endcomponent
            

        </td>


    </tr>

</template>

<template id="userRolesRowTemplate">

    <tr>
       
        <td><input type='hidden' class="roleId" name="roles[]" value="@{{id}}">
        <input type="text" class="form-control form-control-sm roleValue"  value="@{{roleValue}}">
        <p class=" autoCompleteDisplayBox"> <span class="ms-1 roleDisplay"> @{{roleDisplay}} </span></p>
    </td>
        <td class="text-center">
           <input type="checkbox" class="rowCheckbox form-check-input">
        </td>


    </tr>

</template>

@endsection
@section('content')

<div class="container">
    <div class="">


        <div class="row layout-top-spacing">

            <div  class="col-lg-12 col-12 layout-spacing">
                <div class="statbox widget box box-shadow">
                    <div class="widget-header">
                    <div class="row">
                            <div class="mt-5 col-xl-12 col-md-12 col-sm-12 col-12 row">
                                <div class="col-6 col-lg-2">
                                    <h4 >Users
                                    <span id="pageLoader" class="erploader d-none"></span>
                                    </h4>
                                </div>
                               
                                <div class="col-6 col-lg-6">
                                    <div class="btn-group  mb-2 me-4" permission="group">
                                        <button id="addUserButton" type="button" class="btn btn-sm btn-success" title="Add User" >
                                            @component('svg_icons.add') @slot('width') 24 @endslot @slot('height') 24 @endslot @slot('fill') #ffff @endslot @endcomponent
                                            <span class="d-none d-lg-inline-block">Add New User</span>
                                             </button>

                                             <button id="viewUserButton" type="button" class="ms-1 btn btn-sm bg-orange text-white" title="View Users" >
                                            @component('svg_icons.view') @slot('width') 24 @endslot @slot('height') 24 @endslot @slot('fill') #ffff @endslot @endcomponent
                                            <span class="d-none d-lg-inline-block">View Users</span>
                                             </button>
                                             <button id="others" type="button" class="ms-1 btn btn-sm btn-dark dropdown-toggle _effect--ripple waves-effect waves-light" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            @component('svg_icons.selectlist') @slot('width') 24 @endslot @slot('height') 24 @endslot @slot('fill') #ffff @endslot @endcomponent
                                            <span class="d-none d-lg-inline-block">Select Option</span> </button>
                                        <div class="dropdown-menu" aria-labelledby="btndefault6" style="">

                                            <a href="#" class="dropdown-item" ><i class="flaticon-gear-fill mr-1"></i>
                                                @component('svg_icons.add') @slot('width') 24 @endslot @slot('height') 24 @endslot @slot('fill') #000 @endslot @endcomponent

                                               Report PDF</a>
                                            
                                        </div>
                                      

                                    </div>

                                </div>

                                <div class="col-12 col-lg-4">
                                    <input type="text" class="searchForm w-100 form-control permission-search br-30" id="UserTableSearch" placeholder="Search Here...">
                                </div>

                            </div>
                        </div>
                    </div>
                    <div class="widget-content widget-content-area">

                        <div class="table-responsive clusteriseScrollHeight" id="UsersTableDiv">
                            <table id="UsersTable" class="table table-bordered">
                                <thead>
                                    <tr>
                                        <th scope="col">ID</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Actions</th>

                                    </tr>
                                </thead>
                                <tbody id="UsersTableBody">


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
<script src="{{URL::asset('/Application/Services/UserServices.js')}}"></script>
<script src="{{URL::asset('/Application/users.js')}}"></script>

@endsection

@endsection