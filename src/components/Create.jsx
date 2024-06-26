import { nanoid } from "nanoid";
import { useState } from "react";
import { useContext } from "react";
import { taskscontext } from "../Context/TasksContext";

const Create = (props)=>{
    const [tasks,settasks] = useContext(taskscontext);

    const [title, settitle] = useState("");
    
    const SubmitHandler = (e) => {
        e.preventDefault();
        
      
        
        const newtodo = { id: nanoid(), title, completed: false };
       

        // const copytasks = [...tasks]
        // copytasks.push(newtodo);
        // settasks(copytasks)

        settasks([...tasks, newtodo]);
        settitle("");
        localStorage.setItem("tasks", JSON.stringify([...tasks, newtodo]));
    };
    return(
        <form
                onSubmit={SubmitHandler}
                className="w-[35%] flex justify-between px-5 my-[2%]"
            >
                <input
                    onChange={(e) => settitle(e.target.value)}
                    value={title}
                    placeholder="write your next task..."
                    className="px-5 py-2 text-yellow-100 outline-none w-[80%] rounded-xl bg-zinc-700 "
                    type="text"
                />
                <button className="outline-none text-4xl font-extrabold flex justify-center items-center w-[5vmax] h-[5vmax] rounded-full bg-orange-600">
                    <i className="ri-add-fill"></i>
                </button>
            </form> 
    );

}

export default Create;