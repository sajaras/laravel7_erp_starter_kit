@extends('layouts.app')


@section('mustache_templates')
<template id="userRowTemplate">

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

            <div id="UsersTableDiv" class="col-lg-12 col-12 layout-spacing">
                <div class="statbox widget box box-shadow">
                    <div class="widget-header">
                        <div class="row">
                            <div class="mt-5 col-xl-12 col-md-12 col-sm-12 col-12 row">
                                <div class="col-md-4">
                                    <h4>Users</h4>
                                </div>
                                <div class="col-md-4">
                                    <!-- <input class="form-control-sm" type="search" placeholder="search here" id="search"> -->
                                    <input type="text" class="w-100 form-control product-search br-30" id="input-search" placeholder="Search Here...">
                                </div>
                                <div class="col-md-4"></div>

                            </div>
                        </div>
                    </div>
                    <div class="widget-content widget-content-area">

                        <div class="table-responsive">
                            <table id="UsersTable" class="table table-bordered">
                                <thead>
                                    <tr>
                                        <th scope="col">ID</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Email</th>
                                        <th class="text-center" scope="col">Type</th>
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


<script src="{{URL::asset('/Application/Services/UserServices.js')}}"></script>
<script src="{{URL::asset('/Application/users.js')}}"></script>

@endsection

@endsection