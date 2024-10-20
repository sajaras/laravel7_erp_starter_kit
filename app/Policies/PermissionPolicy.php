<?php

namespace App\Policies;

use App\Permission;
use App\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class PermissionPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view any models.
     *
     * @param  \App\User  $user
     * @return mixed
     */
    public function viewAny(User $user)
    {
       
        if($user->can('show-permission'))
        {
            return true;
        }
    }

    /**
     * Determine whether the user can view the model.
     *
     * @param  \App\User  $user
     * @param  \App\Permission  $permission
     * @return mixed
     */
    public function view(User $user, Permission $permission)
    {
        if($user->can('show-permission'))
        {
            return true;
        }
    }

    /**
     * Determine whether the user can create models.
     *
     * @param  \App\User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        if($user->can('create-permission'))
        {
            return true;
        }
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param  \App\User  $user
     * @param  \App\Permission  $permission
     * @return mixed
     */
   
    public function update(User $user, Permission $permission)
    {
      
        if($user->can('edit-permission',\App\Permission::class))
        {
            return true;
        }
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param  \App\User  $user
     * @param  \App\Permission  $permission
     * @return mixed
     */
    public function delete(User $user, Permission $permission)
    {
        if($user->can('delete-permission'))
        {
            return true;
        }
    }

    // /**
    //  * Determine whether the user can restore the model.
    //  *
    //  * @param  \App\User  $user
    //  * @param  \App\Permission  $permission
    //  * @return mixed
    //  */
    // public function restore(User $user, Permission $permission)
    // {
       
    //     if($user->can('create-permission'))
    //     {
    //         return true;
    //     }
    // }

    // /**
    //  * Determine whether the user can permanently delete the model.
    //  *
    //  * @param  \App\User  $user
    //  * @param  \App\Permission  $permission
    //  * @return mixed
    //  */
    // public function forceDelete(User $user, Permission $permission)
    // {
    //     if($user->can('delete-permission'))
    //     {
    //         return true;
    //     }
    // }
}
