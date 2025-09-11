<?php
namespace App\Policies;

use App\Models\Task;
use App\Models\User;

class TaskPolicy
{
    /**
     * Determine whether the user can delete the task.
     * Allow if user is creator or assigned user.
     */
    public function delete(User $user, Task $task)
    {
        return $user->id === $task->creator_id || $user->id === $task->assigned_user_id;
    }
}
