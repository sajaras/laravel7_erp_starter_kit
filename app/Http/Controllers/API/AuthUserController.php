<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\APIServices\UserService;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Validator;
use DB;
class AuthUserController extends Controller
{
   
    public function unreadNotifications(UserService $userService)
    {
        $responseData = [];
        $responseData['status'] = 'success';
        $responseData['result'] = [];
        $userService->setUser($userService->getAuthenticatedUser()->id);
        $responseData['result']['unreadNotifications'] = $userService->getUnreadNotifications();
        return Response::json($responseData);

    }

  

}
