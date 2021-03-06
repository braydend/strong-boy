<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateWorkoutSetsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('workout_sets', function (Blueprint $table) {
          $table->increments('id');
          $table->integer('exercise_id')->unsigned();
          $table->index('exercise_id');
          $table->foreign('exercise_id')->references('id')->on('exercises')->onDelete('cascade');
          $table->integer('user_id')->unsigned();
          $table->index('user_id');
          $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
          $table->double('weight', 5, 2)->unsigned();
          $table->integer('reps')->unsigned();
          $table->boolean('warmup');
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
        Schema::table('workout_sets', function (Blueprint $table) {
            $table->dropForeign('workout_sets_exercise_id_foreign');
            $table->dropIndex('workout_sets_exercise_id_index');
            $table->dropForeign('workout_sets_user_id_foreign');
            $table->dropIndex('workout_sets_user_id_index');
        });
        Schema::dropIfExists('workout_sets');
    }
}
