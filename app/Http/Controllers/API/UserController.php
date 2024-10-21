<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\APIServices\UserService;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Validator;
use DB;
use App\User;
class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

     public function __construct()
     {
        //  $this->authorizeResource(User::class, 'user');
     }


    public function index(UserService $userService)
    {
        $result = [];
        $result['users'] = $userService->getAllUsers();
        return Response::json(['status' => 'success','result'=>$result]);

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request,UserService $userService)
    {
        
        $validator = Validator::make($request->all(),[]);
        if ($validator->passes()) {

             return DB::transaction(function () use ($request,$userService){
                $result = [];
                $result['result'] = [];
                $user = $userService->createUser($request->name);
                $userService->assignRoles($request->roles);
                $result['result']['user'] = $user;
                $result['status'] = 'success';
                return Response::json($result);
            });
            
        }
        else
        {
            return Response::json(['status'=> 'error','message'=> $validator->errors()]);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(User $user,UserService $userService)
    {
        $response = [];
        $response['status'] = 'success';
        $response['result'] = [];
        $response['result']['user'] = $userService->getUser($user->id);
        return Response::json($response);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(User $user,Request $request,UserService $userService)
    {
        $validator = Validator::make($request->all(),[]);
        if ($validator->passes()) {

             return DB::transaction(function () use ($request,$userService,$user){
                $result = [];
                $result['result'] = [];
                $result['result']['user'] = $userService->updateUser($user->id,$request->name);
                $userService->assignRoles($request->roles);
                $result['status'] = 'success';
                return Response::json($result);
            });
            
        }
        else
        {
            return Response::json(['status'=> 'error','message'=> $validator->errors()]);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user,Request $request,UserService $userService)
    {
        $validator = Validator::make($request->all(),[]);
        if ($validator->passes()) {

             return DB::transaction(function () use ($request,$userService,$user){
                $result = [];
                $result['result'] = [];
                $userService->getUser($id);
                $userService->assignRoles([]);
                $result['result']['user'] = $userService->deleteUser($user->id);
                $result['status'] = 'success';
                return Response::json($result);
            });
            
        }
        else
        {
            return Response::json(['status'=> 'error','message'=> $validator->errors()]);
        }
    }

    public function getRoles($userId,UserService $userService)
    {
        $result = [];
        $result['status'] = 'success';
        $result['result'] = [];
        $result['result']['roles'] = $userService->getRoles($userId);
        return $result;

    }
}
