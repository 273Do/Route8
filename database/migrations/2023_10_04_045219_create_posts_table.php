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
