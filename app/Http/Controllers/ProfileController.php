<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Models\User;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current-password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }

    //DarkTheme
    public function darkTheme(ProfileUpdateRequest $request, User $user)
    {
        $input = $request->all();
        $user -> dark_theme_enabled = $input["theme"];
        $user -> save();
        // return redirect()->back();
        // return Redirect::back();

        // $user->dark_theme_enabled = !$user->dark_theme_enabled;
        // return redirect("/posts");
    }

    //MapEffect
    public function mapEffect(ProfileUpdateRequest $request, User $user)
    {
        $input = $request->all();
        $user -> map_effect_enabled = $input["effect"];
        $user -> save();
        // $user->map_effect_enabled = !$user->map_effect_enabled;
        // return redirect("/posts");
    }
}
