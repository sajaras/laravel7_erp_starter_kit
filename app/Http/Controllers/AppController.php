<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AppController extends Controller
{
   
    public function index()
    {
        return view('home');
    }
    public function profile()
    {
        return view('profile');
    }
    public function users()
    {
        return view('users');
    }
}
