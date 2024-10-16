<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\APIServices\RoleService;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Validator;
use DB;
class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
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

            $result = DB::transaction(function () use ($request,$roleService){
                $result = [];
                $result['role'] = $roleService->createRole($request->name);
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
    public function show($id)
    {
        return Response::json(['status'=> 'success','result'=>Role::find($id)]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
