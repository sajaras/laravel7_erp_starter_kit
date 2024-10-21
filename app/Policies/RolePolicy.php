<?php

namespace App\Policies;

use App\Role;
use App\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class RolePolicy
{
    use HandlesAuthorization;

 
    public function viewAny(User $user)
    {
       
        if($user->can('show-role'))
        {
            return true;
        }
    }

    public function view(User $user, Role $role)
    {
        if($user->can('show-role'))
        {
            return true;
        }
    }

    public function create(User $user)
    {
        if($user->can('create-role'))
        {
            return true;
        }
    }

   
    public function update(User $user, Role $role)
    {
      
        if($user->can('edit-role',\App\Role::class))
        {
            return true;
        }
    }

   
    public function delete(User $user, Role $role)
    {
        if($user->can('delete-role'))
        {
            return true;
        }
    }
}
