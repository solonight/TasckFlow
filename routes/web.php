<?php
use App\Http\Controllers\TaskController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/



Route::get('/', function () {
    return redirect()->route('login');
});

use App\Models\User;
use Inertia\Inertia;
Route::get('/dashboard', function () {
    $userId = auth()->id();
    $tasks = \App\Models\Task::with(['assignedUser', 'creator'])
        ->where('created_by', $userId)
        ->orWhere('assigned_user_id', $userId)
        ->get();
    $users = User::all();
    return Inertia::render('Dashboard', [
        'tasks' => $tasks,
        'users' => $users,
        'auth' => [
            'user' => auth()->user(),
        ],
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth'])->group(function () {
    Route::resource('tasks', TaskController::class);
});

require __DIR__.'/auth.php';

