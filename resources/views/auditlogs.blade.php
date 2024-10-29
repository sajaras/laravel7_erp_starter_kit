@extends('layouts.app')


@section('title')
AuditLogs
@endsection



@section('mustache_templates')
<template id="auditlogRowTemplate">

    <tr class="@{{highlight}}">
        <td>@{{id}}<input type='hidden' class="editid" value="@{{id}}"><input type='hidden' class="deleteDisplay" value="@{{name}}"></td>
        <td class="auditlogName">@{{name}}</td>
        <td class="">@{{email}}</td>
        <td>
            <button type="button" title="Edit AuditLog" class="editButton"> @component('svg_icons.edit1') @slot('width') 18 @endslot @slot('height') 18 @endslot @endcomponent</button>
            <button type="button" title="Delete AuditLog" class="ms-2 deleteButton"> @component('svg_icons.delete') @slot('width') 18 @endslot @slot('height') 18 @endslot @endcomponent
                <button type="button" title="Reset Password" class="ms-2 resetPasswordButton"> @component('svg_icons.resetpassword') @slot('width') 18 @endslot @slot('height') 18 @endslot @endcomponent


        </td>


    </tr>

</template>

<template id="auditlogRolesRowTemplate">

    <tr>

        <td><input type='hidden' class="roleId" name="roles[]" value="@{{id}}">
            <input type="text" class="form-control form-control-sm roleValue" value="@{{roleValue}}">
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

            <div class="col-lg-12 col-12 layout-spacing">
                <div class="statbox widget box box-shadow">
                    <div class="widget-header">
                        <div class="row p-2">
                            <div class="  mt-5 col-xl-12 col-md-12 col-sm-12 col-12 row">


                                <div class="col-6 col-lg-3">
                                    <div class="form-group row border">
                                        <label for="entity" class="p-1 m-0 col-form-label col-form-label-sm">Start Date</label>

                                        <input type="date" value="{{$currentDate}}" class="form-control form-control-sm" >

                                    </div>
                                </div>
                                <div class="col-6 col-lg-3">
                                    <div class="form-group row border">
                                        <label for="entity" class="p-1 m-0 col-form-label col-form-label-sm">End Date</label>

                                        <input type="date" value="{{$currentDate}}" class="form-control form-control-sm" >

                                    </div>
                                </div>

                                <div class="col-6 col-lg-3">
                                    <div class="form-group row border">
                                        <label for="user" class="p-1 m-0 col-form-label col-form-label-sm">User</label>

                                        <input type="text" class="form-control form-control-sm" id="user_id" placeholder="Choose User">

                                    </div>
                                </div>

                                <div class="col-6 col-lg-3">
                                    <div class="form-group row border">
                                        <label for="sort-by" class="p-1 m-0 col-form-label col-form-label-sm">Sort By</label>

                                        <input type="text" class="form-control form-control-sm" id="sort_by" placeholder="Sort By">

                                    </div>
                                </div>
                                <div class="col-6 col-lg-3">
                                    <div class="form-group row border">
                                        <label for="search-key" class="p-1 m-0 col-form-label col-form-label-sm">Search Key</label>

                                        <input type="text" class="form-control form-control-sm" id="search_key" placeholder="Enter Search Key if any">

                                    </div>
                                </div>
                                <div class="pt-3 col-6  col-lg-3">

                                    <div class="btn-group  mb-2 me-4" permission="group">
                                        <button id="getAuditLogButton" type="button" class="btn btn-sm btn-success" title="Add User">
                                            @component('svg_icons.submit2') @slot('width') 24 @endslot @slot('height') 24 @endslot @slot('fill') #ffff @endslot @endcomponent
                                            <span class="d-none d-lg-inline-block">Get Activity Log</span>
                                        </button>

                                      


                                    </div>
                                </div>



                            </div>
                        </div>
                    </div>
                    <div class="widget-content widget-content-area">

                        <div class="table-responsive clusteriseScrollHeight" id="AuditLogsTableDiv">
                            <table id="AuditLogsTable" class="table table-bordered">
                                <thead>
                                    <tr class="row">
                                        <th class="col-2">Entity</th>
                                        <th class="col-2">Action</th>
                                        <th class="col-4">Old Val</th>
                                        <th class="col-4">New Val</th>
                                    </tr>
                                </thead>
                                <tbody id="AuditLogsTableBody">


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



<script src="{{URL::asset('/Application/Services/AuditLogServices.js')}}"></script>
<script src="{{URL::asset('/Application/auditlogs.js')}}"></script>

@endsection

@endsection