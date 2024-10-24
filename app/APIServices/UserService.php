<?php

namespace App\APIServices;

use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use App\User;
use App\Traits\HelperTrait;

class UserService
{
    use HelperTrait;
    protected $user;
    protected $password;
    protected $status;
    public function __construct() {}

    public function getAllUsers()
    {


        return User::all();
    }

    public function getUser()
    {
        return $this->user;
    }
    public function getPassword()
    {
        return $this->password;
    }
    public function getStatus()
    {
        return $this->status;
    }



    public function setUser($userId)
    {
        $this->user = User::find($userId);
    }



    public function createUser($request)
    {
        $this->user = new User;
        $this->user->name = $request->name;
        $this->user->email = $request->email;
        $this->user->phone_number = $request->phone_number;
        if ($request->has('autoGeneratePassword')) {
            $this->password = $this->generateRandomPassword();
        } else {
            $this->password = $request->password;
        }
        $this->user->password = bcrypt($this->password);
        $out  = $this->user->save();
        if ($out) {
            $this->status = 'success';
        }
    }

    public function assignRoles($roleIds)
    {
        $this->user->syncRoles($roleIds);
    }


    public function updateUser($request)
    {

        $this->user->name = $request->name;
        $this->user->email = $request->email;
        $this->user->phone_number = $request->phone_number;
        if ($request->has('autoGeneratePassword')) {
            $this->password = $this->generateRandomPassword();
        }
        $out  = $this->user->save();
        if ($out) {
            $this->status = 'success';
        }
    }

    public function deleteUser()
    {
        $out  = $this->user->delete();
        if ($out) {
            $this->status = 'success';
        }
    }

    public function getRoles()
    {
        $roles =  $this->user->roles;
        return $roles;
    }
}
