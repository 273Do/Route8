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
        // 一度カラムを削除
        Schema::table('posts', function (Blueprint $table) {
            $table->dropColumn('map_url');
        });

        // カラムを再度追加
        Schema::table('posts', function (Blueprint $table) {
            $table->string('map_url', 1200)->after('is_public');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('posts', function (Blueprint $table) {
            //
            $table->string('map_url', 600)->change();
        });
    }
};
