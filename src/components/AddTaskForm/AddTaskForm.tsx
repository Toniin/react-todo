import Button from "../../sharedComponents/Button.tsx";
import {useNavigate} from "react-router-dom";
import {uid} from "../../utils/uid.ts";
import {useState} from "react";
import { toast } from 'sonner'

const AddTaskForm = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState("")
    const [date, setDate] = useState("")
    const [time, setTime] = useState("")
    const [priority, setPriority] = useState("")
    const [fulfillment, setFulfillment] = useState("0")

    const [nameError, setNameError] = useState("")
    const [descriptionError, setDescriptionError] = useState("")
    const [categoryError, setCategoryError] = useState("")
    const [priorityError, setPriorityError] = useState("")

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onSubmit = async (event: any) => {
        event.preventDefault();
        if (!name) {
            setNameError("Task name is required")
        } else {
            setNameError("")
        }

        if (!description) {
            setDescriptionError("Description is required")
        } else {
            setDescriptionError("")
        }

        if (!category) {
            setCategoryError("Category is required")
        } else {
            setCategoryError("")
        }

        if (!priority) {
            setPriorityError("Priority is required")
        } else {
            setPriorityError("")
        }

        if (name && description && category && priority) {
            const newTask = {
                id: uid(),
                name,
                description,
                category,
                date,
                time,
                priority,
                fulfillment,
            };

            const postMethod = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newTask),
            };

            await fetch("http://localhost:3000/tasks", postMethod);
            toast.success('Todo has been added')
            navigate("/dashboard");
        }
    };

    const onCancel = () => {
        navigate("/dashboard");
    };

    return (
        <div className="add-task-form">
            <h2>Add a new to-do:</h2>
            <form onSubmit={onSubmit}>
                <div className="add-task-column">
                    <div className="label-input">
                        <label htmlFor="task-name">Name:</label>
                        <input
                            type="text"
                            name="task-name"
                            id="task-name"
                            placeholder="name for the task you’re going to do"
                            onChange={e => setName(e.target.value)}
                        />
                        {nameError &&
                            <p className="error-message">{nameError}</p>
                        }
                    </div>
                    <div className="label-input">
                        <label htmlFor="task-description">Description:</label>
                        <input
                            type="text"
                            name="task-description"
                            id="task-description"
                            placeholder="a short description of the task - can be omitted"
                            onChange={e => setDescription(e.target.value)}
                        />
                        {descriptionError &&
                            <p className="error-message">{descriptionError}</p>
                        }
                    </div>
                    <div className="label-input">
                        <label htmlFor="task-category">Category:</label>
                        <input
                            type="text"
                            name="task-category"
                            id="task-category"
                            placeholder="e.g. household, school, work"
                            onChange={e => setCategory(e.target.value)}
                        />
                        {categoryError &&
                            <p className="error-message">{categoryError}</p>
                        }
                    </div>
                    <div className="label-input">
                        <label htmlFor="task-date">Date:</label>
                        <input
                            type="text"
                            name="task-date"
                            id="task-date"
                            placeholder="dd/mm/yyyy  - can be omitted"
                            onChange={e => setDate(e.target.value)}
                        />
                    </div>
                    <div className="label-input">
                        <label htmlFor="task-time">Time:</label>
                        <input
                            type="text"
                            name="task-time"
                            id="task-time"
                            placeholder="hh:mm - can be omitted"
                            onChange={e => setTime(e.target.value)}
                        />
                    </div>
                </div>
                <div className="add-task-column">
                    <div className="col-2">
                        <div className="label-input">
                            <label htmlFor="task-priority">Priority:</label>
                            <select id="task-priority" name="task-priority" size={3}
                                    onChange={e => setPriority(e.target.value)}>
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                            </select>
                            {priorityError &&
                                <p className="error-message">{priorityError}</p>
                            }
                        </div>
                        <div className="label-input">
                            <label htmlFor="task-fulfillment">Fulfillment:</label>
                            <input
                                type="range"
                                id="task-fulfillment"
                                name="task-fulfillment"
                                step="10"
                                value={fulfillment}
                                min="0"
                                max="100"
                                onChange={e => setFulfillment(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="add-task-buttons">
                        <Button textContent={"Save"} action={() => {
                        }}/>
                        <Button textContent={"Cancel"} action={onCancel}/>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddTaskForm;
