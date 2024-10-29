<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Spatie\Permission\Models\Role as RoleModel;
use OwenIt\Auditing\Contracts\Auditable;

class Role extends RoleModel implements Auditable
{
   use \OwenIt\Auditing\Auditable;
}
