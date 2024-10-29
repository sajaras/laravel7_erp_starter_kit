<?php

namespace App;
use Spatie\Permission\Models\Permission as PermissionModel;
use Illuminate\Database\Eloquent\Model;
use OwenIt\Auditing\Contracts\Auditable;

class Permission extends PermissionModel implements Auditable
{
    use \OwenIt\Auditing\Auditable;
}
