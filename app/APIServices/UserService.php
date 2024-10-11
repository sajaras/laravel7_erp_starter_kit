<?php

namespace App\APIServices;

use App\User;

class UserService
{

    public function __construct() {}

    public function getAllUsers()
    {


        return User::all();
    }
}
