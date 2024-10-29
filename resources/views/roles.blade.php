@extends('layouts.app')

@section('title')
Roles
@endsection

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
@slot('enableLoader')
1
@endslot
@slot('modaltitle')
@component('svg_icons.createform1') @slot('width') 40 @endslot @slot('height') 40 @endslot @endcomponent
Create New Role
@endslot
@slot('modalbody')
<form id="deleteRoleForm" class="form-horizontal" autocomplete="ignore">
{{csrf_field()}}
</form>
<form id="addRoleForm" class="form-horizontal" autocomplete="ignore">
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
    <div class="table-responsive" id="rolePermissionsTableDiv">
                            <table id="rolePermissionsTable" class="table table-bordered rolePermissionsTable">
                                <thead>
                                    <tr>
                                        <th scope="col">Permissions</th>
                                        <th scope="col" class="text-center">Actions
                                        <button type="button" title="Add Row" class="rolePermissionAddButton"> @component('svg_icons.create2') @slot('width') 18 @endslot @slot('height') 18 @endslot  @endcomponent</button>
                                        <button type="button"  title="Delete selected Rows" class="ms-2 rolePermissiondeleteButton"> @component('svg_icons.delete') @slot('width') 18 @endslot @slot('height') 18 @endslot  @endcomponent
                                             </th>

                                    </tr>
                                </thead>
                                <tbody id="rolePermissionsTableBody">


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
editRoleModal
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
 Edit Role
@endslot
@slot('modalbody')

<form id="editRoleForm" class="form-horizontal" autocomplete="ignore">
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
        <input type="text" id="editRoleName" class="form-control" placeholder="Role Name" name="name" aria-label="notification">
    </div>
    @endslot

    @slot('tab2')
    @component('svg_icons.permissions') @slot('width')15 @endslot @slot('height') 15 @endslot @endcomponent
    &nbsp; Permissions
    @endslot

    @slot('tab2content')
    <div class="table-responsive" id="rolePermissionsEditTableDiv">
                            <table id="rolePermissionsEditTable" class="table table-bordered rolePermissionsTable">
                                <thead>
                                    <tr>
                                        <th scope="col">Permissions</th>
                                        <th scope="col" class="text-center">Actions
                                        <button type="button" title="Add Row" class="rolePermissionAddButton"> @component('svg_icons.create2') @slot('width') 18 @endslot @slot('height') 18 @endslot  @endcomponent</button>
                                        <button type="button"  title="Delete selected Rows" class="ms-2 rolePermissiondeleteButton"> @component('svg_icons.delete') @slot('width') 18 @endslot @slot('height') 18 @endslot  @endcomponent
                                             </th>

                                    </tr>
                                </thead>
                                <tbody id="rolePermissionsEditTableBody">


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
<template id="roleRowTemplate">

    <tr class="@{{highlight}}">
        <td>@{{id}}<input type='hidden' class="editid" value="@{{id}}"><input type='hidden' class="deleteDisplay" value="@{{name}}"></td>
        <td class="roleName">@{{name}}</td>
        <td>
            <button type="button" title="Edit Role" class="editButton"> @component('svg_icons.edit1') @slot('width') 18 @endslot @slot('height') 18 @endslot  @endcomponent</button>
            <button type="button"  title="Delete Role" class="ms-2 deleteButton"> @component('svg_icons.delete') @slot('width') 18 @endslot @slot('height') 18 @endslot  @endcomponent
            

        </td>


    </tr>

</template>

<template id="rolePermissionsRowTemplate">

    <tr>
       
        <td><input type='hidden' class="permissionId" name="permissions[]" value="@{{id}}">
        <input type="text" class="form-control form-control-sm permissionValue"  value="@{{permissionValue}}">
        <p class=" autoCompleteDisplayBox"> <span class="ms-1 permissionDisplay"> @{{permissionDisplay}} </span></p>
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
                                    <h4 >Roles
                                    <span id="pageLoader" class="erploader d-none"></span>
                                    </h4>
                                </div>
                               
                                <div class="col-6 col-lg-6">
                                    <div class="btn-group  mb-2 me-4" permission="group">
                                        <button id="addRoleButton" type="button" class="btn btn-sm btn-success" title="Add Role" >
                                            @component('svg_icons.add') @slot('width') 24 @endslot @slot('height') 24 @endslot @slot('fill') #ffff @endslot @endcomponent
                                            <span class="d-none d-lg-inline-block">Add New Role</span>
                                             </button>

                                             <button id="viewRoleButton" type="button" class="ms-1 btn btn-sm bg-orange text-white" title="View Roles" >
                                            @component('svg_icons.view') @slot('width') 24 @endslot @slot('height') 24 @endslot @slot('fill') #ffff @endslot @endcomponent
                                            <span class="d-none d-lg-inline-block">View Roles</span>
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
                                    <input type="text" class="searchForm w-100 form-control permission-search br-30" id="RoleTableSearch" placeholder="Search Here...">
                                </div>

                            </div>
                        </div>
                    </div>
                    <div class="widget-content widget-content-area">

                        <div class="table-responsive clusteriseScrollHeight" id="RolesTableDiv">
                            <table id="RolesTable" class="table table-bordered">
                                <thead>
                                    <tr>
                                        <th scope="col">ID</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Actions</th>

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


<script src="{{URL::asset('/Application/Services/PermissionServices.js')}}"></script>
<script src="{{URL::asset('/Application/Services/RoleServices.js')}}"></script>
<script src="{{URL::asset('/Application/roles.js')}}"></script>

@endsection

@endsection