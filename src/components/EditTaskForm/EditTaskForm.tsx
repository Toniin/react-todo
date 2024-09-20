import Button from "../../sharedComponents/Button.tsx";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {useParams} from 'react-router-dom';
import { toast } from "sonner";
import { useEditTaskReducer } from "../../store/editTaskReducer.ts";

const EditTaskForm = () => {
    const navigate = useNavigate();
    const {taskId} = useParams();
    const { state, dispatch } = useEditTaskReducer()

    const [nameError, setNameError] = useState("")
    const [descriptionError, setDescriptionError] = useState("")
    const [categoryError, setCategoryError] = useState("")
    const [priorityError, setPriorityError] = useState("")

    const {id, name, description, category, date, time, priority, fulfillment} = state.task

    useEffect(() => {
        fetch(`http://localhost:3000/tasks/${taskId}`)
            .then(response => response.json())
            .then(task => {
                dispatch({type: "INIT_TASK_VALUES", payload: task})
            })
            .catch((error) => {
                toast.error(error.message);
            });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [taskId]);

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
            const updateTask = {
                name,
                description,
                category,
                date,
                time,
                priority,
                fulfillment,
            };

            const putMethod = {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updateTask),
            };

            await fetch(`http://localhost:3000/tasks/${id}`, putMethod);
            toast.success('Todo has been updated')
            navigate("/dashboard");
        }
    };

    const onCancel = () => {
        navigate("/dashboard");
    };

    return (
        <div className="edit-task-form">
            <h2>Edit task:</h2>
            <form onSubmit={onSubmit}>
                <div className="edit-task-column">
                    <div className="label-input">
                        <label htmlFor="task-name">Name:</label>
                        <input
                            type="text"
                            name="task-name"
                            id="task-name"
                            placeholder="name for the task you’re going to do"
                            defaultValue={name}
                            onChange={e => dispatch({type: "SET_NAME", payload: e.target.value})}
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
                            defaultValue={description}
                            onChange={e => dispatch({type: "SET_DESCRIPTION", payload: e.target.value})}
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
                            defaultValue={category}
                            onChange={e => dispatch({type: "SET_CATEGORY", payload: e.target.value})}
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
                            defaultValue={date}
                            onChange={e => dispatch({type: "SET_DATE", payload: e.target.value})}
                        />
                    </div>
                    <div className="label-input">
                        <label htmlFor="task-time">Time:</label>
                        <input
                            type="text"
                            name="task-time"
                            id="task-time"
                            placeholder="hh:mm - can be omitted"
                            defaultValue={time}
                            onChange={e => dispatch({type: "SET_TIME", payload: e.target.value})}
                        />
                    </div>
                </div>
                <div className="edit-task-column">
                    <div className="col-2">
                        <div className="label-input">
                            <label htmlFor="task-priority">Priority:</label>
                            <select id="task-priority" name="task-priority" value={priority} onChange={e => dispatch({type: "SET_PRIORITY", payload: e.target.value})}>
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
                                min="0"
                                max="100"
                                value={fulfillment}
                                onChange={e => dispatch({type: "SET_FULFILLMENT", payload: e.target.value})}
                            />
                        </div>
                    </div>

                    <div className="edit-task-buttons">
                        <Button textContent={"Edit"} action={() => {
                        }}/>
                        <Button textContent={"Cancel"} action={onCancel}/>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default EditTaskForm;
