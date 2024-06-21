import { useContext, useState } from "react";
import { taskscontext } from "../Context/TasksContext";

const Show = () => {
    const [tasks, settasks] = useContext(taskscontext);
    const [editIndex, setEditIndex] = useState(null);
    const [editTitle, setEditTitle] = useState("");

    const CompleteHandler = (index) => {
        const copyTasks = [...tasks];
        copyTasks[index].completed = !copyTasks[index].completed;
        settasks(copyTasks);
        localStorage.setItem("tasks", JSON.stringify(copyTasks));
    };

    const DeleteHandler = (id) => {
        const updatedTasks = tasks.filter((t) => t.id != id);
        settasks(updatedTasks);
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    };

    const EditHandler = (index) => {
        setEditIndex(index);
        setEditTitle(tasks[index].title);
    };

    const UpdateHandler = (index) => {
        if (editTitle.trim() === "") {
            return; // Prevent updating a task if the title is blank
        }

        const updatedTasks = [...tasks];
        updatedTasks[index].title = editTitle;
        settasks(updatedTasks);
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
        setEditIndex(null);
        setEditTitle("");
    };

    return (
        <ul className="list-none w-[35%]">
            {tasks.length > 0 ? (
                tasks.map((task, index) => (
                    <li
                        key={task.id}
                        className="mb-5 flex justify-between items-center border rounded-xl p-5"
                    >
                        <div className="flex items-center">
                            <div
                                onClick={() => CompleteHandler(index)}
                                className={`${
                                    task.completed ? "bg-green-600" : "border"
                                } mr-4 rounded-full w-[30px] h-[30px] border-orange-600`}
                            ></div>
                            {editIndex === index ? (
                                <input
                                    type="text"
                                    value={editTitle}
                                    onChange={(e) => setEditTitle(e.target.value)}
                                    onBlur={() => UpdateHandler(index)}
                                    onKeyPress={(e) => {
                                        if (e.key === "Enter") {
                                            UpdateHandler(index);
                                        }
                                    }}
                                    className="text-2xl font-extrabold text-black outline-none rounded-md"
                                />
                            ) : (
                                <h1
                                    className={`${
                                        task.completed ? "line-through" : ""
                                    } text-2xl font-extrabold text-yellow-100`}
                                >
                                    {task.title}
                                </h1>
                            )}
                        </div>
                        <div className="flex gap-3 text-2xl text-yellow-100">
                            <i
                                onClick={() => EditHandler(index)}
                                className="ri-file-edit-line"
                            ></i>
                            <i
                                onClick={() => DeleteHandler(task.id)}
                                className="ri-delete-bin-3-line"
                            ></i>
                        </div>
                    </li>
                ))
            ) : (
                <h1 className="mt-10 w-full text-center text-orange-600 text-3xl">
                    No Pending Tasks
                </h1>
            )}
        </ul>
    );
}

export default Show;
