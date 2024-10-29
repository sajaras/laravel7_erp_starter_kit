@php
 $currentRouteName  = \Request::route()->getName();
@endphp
<nav id="sidebar">

<div class="navbar-nav theme-brand flex-row  text-center">
    <div class="nav-logo">
        <div class="nav-item theme-logo">
            <a href="index.html">
                <img src="{{URL::asset(config('app.logo'))}}" class="navbar-logo" alt="logo">
            </a>
        </div>
        <div class="nav-item theme-text">
            <a href="index.html" class="nav-link"> {{config('app.name')}} </a>
        </div>
    </div>
    <div class="nav-item sidebar-toggle">
        <div class="btn-toggle sidebarCollapse">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevrons-left">
                <polyline points="11 17 6 12 11 7"></polyline>
                <polyline points="18 17 13 12 18 7"></polyline>
            </svg>
        </div>
    </div>
</div>
<div class="profile-info">
    <div class="user-info">
        <div class="profile-img">
            <img src="" id="loggedinuseravatar" alt="avatar">
        </div>
        <div class="profile-content">
            <h6 id="loggedInUserName_place2"></h6>
            <p id="loggedInUserDesignation_place2" class=""></p>
        </div>
    </div>
</div>

<div class="shadow-bottom"></div>
<ul class="list-unstyled menu-categories" id="accordionExample">
    <!-- <li class="menu active">
        <a href="#dashboard" data-bs-toggle="collapse" aria-expanded="true" class="dropdown-toggle">
            <div class="">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-home">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
                <span>Dashboard</span>
            </div>
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-right">
                    <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
            </div>
        </a>
        <ul class="collapse submenu list-unstyled show" id="dashboard" data-bs-parent="#accordionExample">
            <li>
                <a href="index.html"> Analytics </a>
            </li>
            <li class="active">
                <a href="index2.html"> Sales </a>
            </li>
        </ul>
    </li> -->

    <li class="menu menu-heading">
        <div class="heading"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-minus">
                <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg><span>Data</span></div>
    </li>

    <li class="menu @if($currentRouteName == 'home') active @endif">
        <a href="{{route('home')}}" aria-expanded="false" class="dropdown-toggle">
            <div class="">
            @component('svg_icons.dashboard') @slot('width')24 @endslot @slot('height') 24 @endslot @endcomponent

                <span>Dashboard</span>
            </div>
        </a>
    </li>



    <li class="menu menu-heading">
        <div class="heading"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-minus">
                <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg><span>Authentication </span></div>
    </li>

    <li class="menu @if($currentRouteName == 'users') active @endif">
        <a href="{{route('users')}}" aria-expanded="false" class="dropdown-toggle">
            <div class="">
            @component('svg_icons.users2') @slot('width')24 @endslot @slot('height') 24 @endslot @endcomponent
                <span>Users</span>
            </div>
        </a>
    </li>

    <li class="menu @if($currentRouteName == 'roles') active @endif">
        <a href="{{route('roles')}}" aria-expanded="false" class="dropdown-toggle">
            <div class="">
            @component('svg_icons.roles') @slot('width')24 @endslot @slot('height') 24 @endslot @endcomponent
                <span>Roles</span>
            </div>
        </a>
    </li>
    <li class="menu @if($currentRouteName == 'permissions') active @endif">
        <a href="{{route('permissions')}}" aria-expanded="false" class="dropdown-toggle">
            <div class="">
            @component('svg_icons.permissions3') @slot('width')24 @endslot @slot('height') 24 @endslot @endcomponent

                <span>Permissions</span>
            </div>
        </a>
    </li>

    <li class="menu menu-heading">
        <div class="heading">
       
            <span>Logs </span></div>
    </li>

    <li class="menu @if($currentRouteName == 'auditlogs') active @endif">
        <a href="{{route('auditlogs')}}" aria-expanded="false" class="dropdown-toggle">
            <div class="">
            @component('svg_icons.auditlog') @slot('width')24 @endslot @slot('height') 24 @endslot @endcomponent

                <span>Audit Log</span>
            </div>
        </a>
    </li>


</ul>

</nav>
