<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tasks = auth()->user()->tasks()->with('assignedUser')->get();
        return view('tasks.index', compact('tasks'));
    }

      

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
         $validated = $request->validate([
        'title' => 'required|string|max:255',
        'description' => 'nullable|string',
        'status' => 'required|in:to_do,in_progress,done',
        'assigned_to' => 'nullable|exists:users,id',
    ]);

    $task = \App\Models\Task::create([
        'title' => $validated['title'],
        'description' => $validated['description'] ?? null,
        'status' => $validated['status'],
        'created_by' => auth()->id(),
        'assigned_user_id' => $validated['assigned_to'] ?? null,
    ]);

    // Optionally, redirect or return a response
    return redirect()->route('dashboard')->with('success', 'Task created!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Task $task)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        //
    }
}
