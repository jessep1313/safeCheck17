<?php

namespace App\Http\Controllers;

use App\Http\Requests\TourQuestionReorder;
use App\Http\Requests\TourQuestionStore;
use App\Http\Requests\TourQuestionUpdate;
use App\Models\TourDefaultQuestion;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TourSettingController extends Controller
{
    public function index() {
        $questions = TourDefaultQuestion::select([
            'id',
            'position',
            'question'
        ])
            ->orderBy('position', 'asc')
            ->get();

        return Inertia::render('settings/tour', [
            'questions' => $questions
        ]);
    }

    public function store (TourQuestionStore $request) {
        $question = TourDefaultQuestion::create([
            'question' => $request->question,
            'position' => TourDefaultQuestion::max('position') + 1
        ]);
        return redirect()->back();
    }

    public function update(TourQuestionUpdate $request, string $id) {
        $question = TourDefaultQuestion::findOrFail($id);
        $question->question = $request->question;
        $question->save();
        return redirect()->back();
    }

    public function destroy (string $id) {
        $question = TourDefaultQuestion::findOrFail($id);
        $question->delete();
        return redirect()->back();        
    }

    public function reorder (TourQuestionReorder $request) {
        $questions = $request->questions;
        $position = 1;
        foreach($questions as $question) {
            $question = TourDefaultQuestion::findOrFail($question['id']);
            $question->position = $position;
            $question->save();
            $position++;
        }
        return redirect()->back();
    }
}
