<?php

namespace App\APIServices;

use Spatie\Permission\Models\Permission;
use App\AppConstants;

class PermissionService
{

    protected $permission;
    protected $status;
    public function __construct() {}

    public function getPermission()
    {
        return $this->permission;
    }
    public function setPermission($permissionId)
    {
        $this->permission =  Permission::find($permissionId);
    }
    public function getStatus()
    {
      return $this->status;
    }


    public function getAllPermissions()
    {
        return Permission::all();
    }

    public function createPermission($request)
    {
        $this->permission = Permission::create(['name' => $request->name]);
        if($this->permission)
        {
            $this->status = AppConstants::CREATED;
        }
    }

    public function updatePermission($request)
    {
       $this->permission->name = $request->name;
       if($this->permission->save())
       {
          $this->status = AppConstants::UPDATED;
       }
        
    }
    public function deletePermission()
    {
        if($this->permission->delete())
        {
            $this->status = AppConstants::DELETED;
        }
    }
}
