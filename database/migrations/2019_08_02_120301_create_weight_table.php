<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateWeightTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('weight', function (Blueprint $table) {
            $table->increments('id');
            $table->decimal('weight');
            $table->integer('user_id')->unsigned();
            $table->index('user_id');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('weight', function (Blueprint $table) {
            $table->dropForeign('weight_user_id_foreign');
            $table->dropIndex('weight_user_id_index');
        });
        Schema::dropIfExists('weight');
    }
}
