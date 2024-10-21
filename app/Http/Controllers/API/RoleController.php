<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\APIServices\RoleService;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Validator;
use DB;
use App\Role;
class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

     public function __construct()
     {
         $this->authorizeResource(Role::class, 'role');
     }


    public function index(RoleService $roleService)
    {
        $result = [];
        $result['roles'] = $roleService->getAllRoles();
        return Response::json(['status' => 'success','result'=>$result]);

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request,RoleService $roleService)
    {
        
        $validator = Validator::make($request->all(),[]);
        if ($validator->passes()) {

             return DB::transaction(function () use ($request,$roleService){
                $result = [];
                $result['result'] = [];
                $role = $roleService->createRole($request->name);
                $roleService->assignPermissions($request->permissions);
                $result['result']['role'] = $role;
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
    public function show(Role $role,RoleService $roleService)
    {
        $response = [];
        $response['status'] = 'success';
        $response['result'] = [];
        $response['result']['role'] = $roleService->getRole($role->id);
        return Response::json($response);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Role $role,Request $request,RoleService $roleService)
    {
        $validator = Validator::make($request->all(),[]);
        if ($validator->passes()) {

             return DB::transaction(function () use ($request,$roleService,$role){
                $result = [];
                $result['result'] = [];
                $result['result']['role'] = $roleService->updateRole($role->id,$request->name);
                $roleService->assignPermissions($request->permissions);
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
    public function destroy(Role $role,Request $request,RoleService $roleService)
    {
        $validator = Validator::make($request->all(),[]);
        if ($validator->passes()) {

             return DB::transaction(function () use ($request,$roleService,$role){
                $result = [];
                $result['result'] = [];
                $roleService->getRole($id);
                $roleService->assignPermissions([]);
                $result['result']['role'] = $roleService->deleteRole($role->id);
                $result['status'] = 'success';
                return Response::json($result);
            });
            
        }
        else
        {
            return Response::json(['status'=> 'error','message'=> $validator->errors()]);
        }
    }

    public function getPermissions($roleId,RoleService $roleService)
    {
        $result = [];
        $result['status'] = 'success';
        $result['result'] = [];
        $result['result']['permissions'] = $roleService->getPermissions($roleId);
        return $result;

    }
}
