<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\APIServices\PermissionService;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Validator;
use DB;
use App\Permission;

class PermissionController extends Controller
{

    public function __construct()
    {
        // $this->authorizeResource(Permission::class, 'permission');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(PermissionService $permissionService)
    {
        $responseData = [];
        $responseData['result'] = [];
        $responseData['status'] = 'success';
        $responseData['result']['permissions'] = $permissionService->getAllPermissions();
        return Response::json($responseData);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, PermissionService $permissionService)
    {

        $validator = Validator::make($request->all(), []);
        if ($validator->passes()) {

            return DB::transaction(function () use ($request, $permissionService) {
                $responseData = [];
                $responseData['result'] = [];
                $responseData['result']['permission'] = $permissionService->createPermission($request);
                $responseData['status'] = $permissionService->getStatus();
                return Response::json($responseData);
            });
        } else {
            return Response::json(['status' => 'error', 'message' => $validator->errors()]);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Permission $permission, PermissionService $permissionService)
    {
        $responseData = [];
        $responseData['status'] = 'success';
        $responseData['result'] = [];
        $responseData['result']['permission'] =  $permission;
        return Response::json($responseData);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Permission $permission, PermissionService $permissionService)
    {
        $validator = Validator::make($request->all(), []);
        if ($validator->passes()) {

            return DB::transaction(function () use ($request, $permissionService, $permission) {
                $permissionService->setPermission($permission->id);
                $responseData = [];
                $responseData['result'] = [];
                $responseData['result']['permission'] = $permissionService->updatePermission($request);
                $responseData['status'] = $permissionService->getStatus();
                return Response::json($responseData);
            });
        } else {
            return Response::json(['status' => 'error', 'message' => $validator->errors()]);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Permission $permission, Request $request, PermissionService $permissionService)
    {
        $validator = Validator::make($request->all(), []);
        if ($validator->passes()) {

            return DB::transaction(function () use ($request, $permissionService, $permission) {
                $permissionService->setPermission($permission->id);
                $responseData = [];
                $responseData['result'] = [];
                $responseData['result']['permission'] = $permissionService->deletePermission($permission->id);
                $responseData['status'] = $permissionService->getStatus();
                return Response::json($responseData);
            });
        } else {
            return Response::json(['status' => 'error', 'message' => $validator->errors()]);
        }
    }
}
