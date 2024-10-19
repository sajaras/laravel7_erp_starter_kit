<?php

namespace App\APIServices;

use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RoleService
{

    protected $role;
    public function __construct() {}

    public function getAllRoles()
    {


        return Role::all();
    }

    public function createRole($roleName)
    {
        $this->role = Role::create(['name' => $roleName]);
        return $this->role;
    }

    public function assignPermissions($permissionIds)
    {
        $this->role->syncPermissions($permissionIds);
        return $this->role;
    }

    public function getRole($roleId)
    {
        $this->role = Role::find($roleId);
        return $this->role;
    }

    public function updateRole($roleId,$name)
    {
       
        $role  = Role::find($roleId);
        $role->name = $name;
        $role->save();
        $this->role = $role;
        return $role;
    }
    public function deleteRole($roleId)
    {
        return Role::find($roleId)->delete();
    }
}
