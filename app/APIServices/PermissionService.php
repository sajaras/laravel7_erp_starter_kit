<?php

namespace App\APIServices;

use Spatie\Permission\Models\Permission;


class PermissionService
{

    protected $permission;
    public function __construct() {}

    public function getAllPermissions()
    {


        return Permission::all();
    }

    public function createPermission($permissionName)
    {
        $this->permission = Permission::create(['name' => $permissionName]);
        return $this->permission;
    }


    public function getPermission($permissionId)
    {
        return Permission::find($permissionId);
    }

    public function updatePermission($permissionId,$name)
    {
       
        $permission  = Permission::find($permissionId);
        $permission->name = $name;
        $permission->save();
        return $permission;
    }
    public function deletePermission($permissionId)
    {
        return Permission::find($permissionId)->delete();
    }
}
