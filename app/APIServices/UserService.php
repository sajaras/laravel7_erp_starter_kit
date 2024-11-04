<?php

namespace App\APIServices;

use App\Notifications\PasswordChanged;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use App\User;
use App\Traits\HelperTrait;
use Auth;
use App\APIServices\AccountService;

class UserService
{
    use HelperTrait;
    protected $user;
    protected $password;
    protected $status;
    protected $account;
    public function __construct($accountId = null)
    {
        $accountService = new AccountService();
        $this->account = $accountService->getAccountFromId($accountId);
    }

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
        } else if ($request->filled('password')) {
            $this->password = $request->password;
        }
        $this->user->password = bcrypt($this->password);
        $this->user->account_id = $this->account->id;
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
        if ($this->account->id == $this->user->account_id) {
            $this->user->name = $request->name;
            $this->user->email = $request->email;
            $this->user->phone_number = $request->phone_number;
            $out  = $this->user->save();
            if ($out) {
                $this->status = 'success';
            }
        }
    }

    public function deleteUser()
    {
        if ($this->account->id == $this->user->account_id) {

            $out  = $this->user->delete();
            if ($out) {
                $this->status = 'success';
            }
        }
    }

    public function getRoles()
    {
        $roles =  $this->user->roles;
        return $roles;
    }

    public function changePassword($request)
    {
        if ($this->account->id == $this->user->account_id) {
            if ($request->has('autoGeneratePassword') && $request->autoGeneratePassword == 'yes') {
                $this->password = $this->generateRandomPassword();
            } else if ($request->filled('password')) {
                $this->password = $request->password;
            }
            $this->user->password = bcrypt($this->password);
            if ($this->user->save()) {
                $this->status = 'success';
            }
        }
    }

    public function notifyPasswordChange()
    {
        $this->user->notify(new PasswordChanged($this->password));
    }
    public function getUnreadNotifications()
    {
        return $this->user->unreadNotifications;
    }

    public function getAuthenticatedUser()
    {
        return Auth::guard('api')->user();
    }
}
