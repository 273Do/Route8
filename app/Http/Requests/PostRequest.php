<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PostRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {   //バリデーションチェック
        return [
            'title' => 'required|string|max:20',
            'body' => 'required|string|max:300',
            'map_url' => 'required|string|max:600',
            'start_point' => 'required|string|max:20',
            'goal_point' => 'required|string|max:20',
        ];
    }
}
