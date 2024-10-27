<?php

namespace App\APIServices;

use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\AppConstants;

class RoleService
{

    protected $role;
    protected $status;
    public function __construct() {}

    public function getRole()
    {
        return $this->role;
    }
  
    public function setRole($roleId)
    {
        $this->role = Role::find($roleId);
    }
    public function getStatus()
    {
        return $this->status;
    }




    public function getAllRoles()
    {

        return Role::all();
    }

    public function createRole($request)
    {
        $this->role = Role::create(['name' => $request->name]);

        if($this->role)
        {
            $this->status = AppConstants::CREATED;
        }
        
      
    }

    public function assignPermissions($permissionIds)
    {
        $this->role->syncPermissions($permissionIds);
        
    }

    public function updateRole($request)
    {
        $this->role->name = $request->name;
        if($this->role->save())
        {
            $this->status = AppConstants::UPDATED;
        }
    }
    public function deleteRole()
    {
        if($this->role->delete())
        {
            $this->status = AppConstants::DELETED;
        }
    }

    public function getPermissions(){

        return $this->role->getAllPermissions();
    }
}
