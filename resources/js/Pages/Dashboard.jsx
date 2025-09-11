import React, { useState } from "react";
import { useForm, Head, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Dashboard({ auth, tasks = [], users = [] }) {
    const [selectedTask, setSelectedTask] = useState(null);
    const [showAssignForm, setShowAssignForm] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        title: "",
        description: "",
        status: "to_do",
        assigned_to: "",
    });

    const handleAssignSubmit = (e) => {
        e.preventDefault();
        post(route("tasks.store"), {
            onSuccess: () => {
                reset();
                setShowAssignForm(false);
            },
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />
            <div className="py-12">
                {/* Assign Task Button */}
                <div className="mb-6 flex justify-end">
                    <button
                        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                        onClick={() => setShowAssignForm(true)}
                    >
                        Assign New Task
                    </button>
                </div>
                {/* Assign Task Form Modal */}
                {showAssignForm && (
                    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                        <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-md">
                            <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-gray-100">
                                Assign Task
                            </h3>
                            <form
                                onSubmit={handleAssignSubmit}
                                className="space-y-4"
                            >
                                <div>
                                    <label className="block text-gray-700 dark:text-gray-300 mb-1">
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={data.title}
                                        onChange={(e) =>
                                            setData("title", e.target.value)
                                        }
                                        className="w-full px-3 py-2 border rounded"
                                        required
                                    />
                                    {errors.title && (
                                        <div className="text-red-500 text-sm">
                                            {errors.title}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-gray-700 dark:text-gray-300 mb-1">
                                        Description
                                    </label>
                                    <textarea
                                        name="description"
                                        value={data.description}
                                        onChange={(e) =>
                                            setData(
                                                "description",
                                                e.target.value
                                            )
                                        }
                                        className="w-full px-3 py-2 border rounded"
                                    />
                                    {errors.description && (
                                        <div className="text-red-500 text-sm">
                                            {errors.description}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-gray-700 dark:text-gray-300 mb-1">
                                        Status
                                    </label>
                                    <select
                                        name="status"
                                        value={data.status}
                                        onChange={(e) =>
                                            setData("status", e.target.value)
                                        }
                                        className="w-full px-3 py-2 border rounded"
                                    >
                                        <option value="to_do">To Do</option>
                                        <option value="in_progress">
                                            In Progress
                                        </option>
                                        <option value="done">Done</option>
                                    </select>
                                    {errors.status && (
                                        <div className="text-red-500 text-sm">
                                            {errors.status}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-gray-700 dark:text-gray-300 mb-1">
                                        Assign To
                                    </label>
                                    <select
                                        name="assigned_to"
                                        value={data.assigned_to}
                                        onChange={(e) =>
                                            setData(
                                                "assigned_to",
                                                e.target.value
                                            )
                                        }
                                        className="w-full px-3 py-2 border rounded"
                                    >
                                        <option value="">Select user</option>
                                        {users.map((user) => (
                                            <option
                                                key={user.id}
                                                value={user.id}
                                            >
                                                {user.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.assigned_to && (
                                        <div className="text-red-500 text-sm">
                                            {errors.assigned_to}
                                        </div>
                                    )}
                                </div>
                                <div className="flex justify-end space-x-2">
                                    <button
                                        type="button"
                                        className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                                        onClick={() => setShowAssignForm(false)}
                                        disabled={processing}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                                        disabled={processing}
                                    >
                                        Assign
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100 text-center">
                            Welcome to Taskflow, Get started
                        </div>
                    </div>
                </div>
                {/* Tasks Grid */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tasks.length === 0 ? (
                        <div className="col-span-full text-center text-gray-500">
                            No tasks found.
                        </div>
                    ) : (
                        tasks.map((task) => (
                            <div
                                key={task.id}
                                className="bg-white dark:bg-gray-800 p-4 rounded shadow cursor-pointer hover:ring-2 hover:ring-red-500 transition"
                                onClick={() => setSelectedTask(task)}
                            >
                                <h3 className="font-bold text-lg mb-2">
                                    {task.title}
                                </h3>
                                <p className="text-gray-700 dark:text-gray-300 mb-1">
                                    {task.description}
                                </p>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="font-semibold">
                                        Status:
                                    </span>{" "}
                                    <span>{task.status}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm mt-1">
                                    <span className="font-semibold">
                                        Assigned to:
                                    </span>{" "}
                                    <span>
                                        {task.assigned_user
                                            ? task.assigned_user.name
                                            : "Unassigned"}
                                    </span>
                                </div>
                            </div>
                        ))
                    )}
                </div>
                {/* Task Details Popup */}
                {selectedTask && (
                    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                        <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-md">
                            <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-gray-100">
                                Task Details
                            </h3>
                            <div className="mb-2">
                                <strong>Title:</strong> {selectedTask.title}
                            </div>
                            <div className="mb-2">
                                <strong>Description:</strong>{" "}
                                {selectedTask.description}
                            </div>
                            <div className="mb-2">
                                <strong>Status:</strong> {selectedTask.status}
                            </div>
                            <div className="mb-2">
                                <strong>Assigned to:</strong>{" "}
                                {selectedTask.assigned_user
                                    ? selectedTask.assigned_user.name
                                    : "Unassigned"}
                            </div>
                            <div className="mb-2">
                                <strong>Created by:</strong>{" "}
                                {selectedTask.creator
                                    ? selectedTask.creator.name
                                    : "Unknown"}
                            </div>
                            <div className="flex justify-end space-x-2 mt-4">
                                <button
                                    className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                                    onClick={() => setSelectedTask(null)}
                                >
                                    Close
                                </button>
                                <button
                                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                    onClick={() =>
                                        (window.location.href = `/tasks/${selectedTask.id}/edit`)
                                    }
                                >
                                    Update
                                </button>
                                <button
                                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                                    onClick={() => {
                                        router.delete(
                                            `/tasks/${selectedTask.id}`,
                                            {
                                                onSuccess: () =>
                                                    setSelectedTask(null),
                                                onError: () =>
                                                    alert(
                                                        "Failed to delete task."
                                                    ),
                                            }
                                        );
                                    }}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
