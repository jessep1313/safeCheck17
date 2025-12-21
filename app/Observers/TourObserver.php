<?php

namespace App\Observers;

use App\Models\Tour;
use App\Models\TourDefaultQuestion;

class TourObserver
{
    public function created(Tour $tour) {
        $tourDefaultQuestions = TourDefaultQuestion::orderBy("position", "asc")->get();
        foreach ($tourDefaultQuestions as $tourDefaultQuestion) {
            $tour->points()->create([
                "question" => $tourDefaultQuestion->question,
                "position" => $tourDefaultQuestion->position,
            ]);
        }
    }
}
