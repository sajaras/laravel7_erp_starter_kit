<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->bigInteger('account_id');
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->bigInteger('phone_number');
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->string('avatar')->nullable();
            $table->rememberToken();
            $table->timestamps();

            $table->foreign('account_id')
            ->references('id')->on('accounts');
        });

        DB::table('users')->insert([
            [
                'account_id' => '1', 
                'id' => 1,
                'name'=> 'sajaras',
                'email'=> 'sajras@gmail.com',  
                'phone_number'=> '8848757578',  
                'password'=> '$2a$12$qYcKGgeaX.u/ruevM5Fruepds/an8VBcrzFtTJ0P/xBLkPHYvV9Hu',
                'created_at'=> '2024-10-04 11:07:46',
                'updated_at'=> '2024-10-04 11:07:46',
                'avatar'=> 'defaultavatar.jpg',
            ]
            
        ]);

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
