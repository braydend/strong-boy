<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateExerciseMuscleTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('exercise_muscle', function (Blueprint $table) {
            $table->integer('exercise_id')->unsigned();
            $table->index('exercise_id');
            $table->foreign('exercise_id')->references('id')->on('exercises')->onDelete('cascade');
            $table->integer('muscle_id')->unsigned();
            $table->index('muscle_id');
            $table->foreign('muscle_id')->references('id')->on('muscles')->onDelete('cascade');
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
        Schema::table('exercise_muscle', function (Blueprint $table){
            $table->dropForeign('exercise_muscle_exercise_id_foreign');
            $table->dropIndex('exercise_muscle_exercise_id_index');
            $table->dropForeign('exercise_muscle_muscle_id_foreign');
            $table->dropIndex('exercise_muscle_muscle_id_index');
        });
        Schema::dropIfExists('exercise_muscle');
    }
}
