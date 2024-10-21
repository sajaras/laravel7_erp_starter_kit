<?php

namespace App\APIServices;

use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use App\User;

class UserService
{

    protected $user;
    public function __construct() {}

    public function getAllUsers()
    {


        return User::all();
    }

    public function createUser($userName)
    {
        $this->user = User::create(['name' => $userName]);
        return $this->user;
    }

    public function assignRoles($roleIds)
    {
        $this->user->syncRoles($roleIds);
        return $this->user;
    }

    public function getUser($userId)
    {
        $this->user = User::find($userId);
        return $this->user;
    }

    public function updateUser($userId,$name)
    {
       
        $user  = User::find($userId);
        $user->name = $name;
        $user->save();
        $this->user = $user;
        return $user;
    }
    public function deleteUser($userId)
    {
        return User::find($userId)->delete();
    }

    public function getRoles($userId){

        return User::find($userId)->getAllRoles();

    }
}
