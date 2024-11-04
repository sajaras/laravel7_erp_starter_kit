<?php

namespace App\APIServices;

use App\Traits\HelperTrait;
use App\Account;
use Auth;

class AccountService
{
    use HelperTrait;

    protected $account;
    public function __construct() {}

    public function getAccountFromId($accountId = null)
    {

        if ($accountId) {
            $this->account = Account::find($accountId);
        } else {
           
            $this->account = Account::find(Auth::user()->id);
        }
        return $this->account;
    }
}
