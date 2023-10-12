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
        Schema::table('posts', function (Blueprint $table) {
            //
            $table->dropColumn('walk_available');
            $table->dropColumn('bicycle_available');
            $table->dropColumn('car_available');
            $table->dropColumn('bus_available');
            $table->dropColumn('train_available');
            $table->dropColumn('shinkansen_available');
            $table->dropColumn('plane_available');
            $table->dropColumn('ship_available');
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
            $table->boolean('walk_available');
            $table->boolean('bicycle_available');
            $table->boolean('car_available');
            $table->boolean('bus_available');
            $table->boolean('train_available');
            $table->boolean('shinkansen_available');
            $table->boolean('plane_available');
            $table->boolean('ship_available');
        });
    }
};
