<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            // utf8mb4 一文字4バイト
            $table->string('title', 80); // 20文字 * 4バイト = 80
            $table->string('body', 1200); // 300文字 * 4バイト = = 1200
            $table->boolean('is_public'); // 公開 / 非公開
            // 通行手段 bool
            $table->boolean('walk_available'); 
            $table->boolean('bicycle_available'); 
            $table->boolean('car_available'); 
            $table->boolean('bus_available'); 
            $table->boolean('train_available'); 
            $table->boolean('shinkansen_available'); 
            $table->boolean('plane_available'); 
            $table->boolean('ship_available'); 
            // タイムスタンプ
            $table->timestamps(); // created_at と updated_at
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('posts');
    }
};
