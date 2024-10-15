<?php

namespace App\APIServices;

use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RoleService
{

    public function __construct() {}

    public function getAllRoles()
    {


        return Role::all();
    }
}
