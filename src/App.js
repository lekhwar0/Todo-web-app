import React, { useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import { BsCheckCircle } from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [tempTask, setTempTask] = useState("");
  const [toggleAddButton, setToggleAddButton] = useState(false);
  const [isEditTask, setIsEditTask] = useState(null);
  const [searchedTask, setSearchedTask] = useState("");
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [isDarkModeEnabled, setIsDarkModeEnabled] = useState(true);

  const hadndleDarkModeOnToggle = () => {
    setIsDarkModeEnabled(() => !isDarkModeEnabled);
  };

  const handleTempTaskInputOnChange = (event) => {
    setTempTask(event.target.value);
  };

  const handleSearchInputChange = (event) => {
    const searchText = event.target.value;
    setSearchedTask(searchText);

    if (searchText === "") {
      setFilteredTasks([]);
    } else {
      const filteredTasksData = tasks.filter((task) => {
        return task.name.includes(searchText);
      });
      setFilteredTasks(filteredTasksData);
    }
  };

  const handleDeleteOnclick = (id) => {
    const updatedTasksAfterDeletion = tasks.filter((task) => {
      return id !== task.id;
    });

    setTasks(updatedTasksAfterDeletion);
    toast.success("Task deleted successfully", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const handleDeleteAllOnClick = () => {
    setTasks([]);
    toast.success("All task deleted successfully", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const handleEditOnClick = (id) => {
    let newEditTasks = tasks.find((task) => {
      return id === task.id;
    });
    setToggleAddButton(true);
    setTempTask(newEditTasks.name);
    setIsEditTask(id);
  };

  const handleFormOnSubmit = (event) => {
    event.preventDefault();
    if (tempTask === "") {
      toast.info("Please fill some task first to add", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else if (tempTask && toggleAddButton) {
      setTasks(
        tasks.map((task) => {
          if (task.id === isEditTask) {
            return { ...task, name: tempTask };
          }
          return task;
        })
      );

      setToggleAddButton(false);
      setTempTask("");
      setIsEditTask(null);
      toast.success("Task updated successfully", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      const allTasks = { id: new Date().getTime().toString(), name: tempTask };
      setTasks([...tasks, allTasks]);
      setTempTask("");
      toast.success("Task Added successfully", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  return (
    <main className="bg-blue-900 py-10">
      <ToastContainer />
      <div className="container w-[100vw] h-[100vh] mx-auto">
        <div
          className={`${
            isDarkModeEnabled ? "bg-black" : "bg-white"
          } bg-opacity-80 px-5 py-3 space-y-5 rounded drop-shadow-xl transition-all duration-500`}
        >
          <div className="flex justify-between items-center">
            <h1 className="text-slate-500 text-2xl font-bold">
              Todo List 2023
            </h1>
            <label
              for="check"
              className="bg-gray-100 w-10 h-5 relative rounded-full cursor-pointer"
            >
              <input
                type="checkbox"
                id="check"
                className="sr-only peer"
                value={isDarkModeEnabled}
                onChange={hadndleDarkModeOnToggle}
              ></input>
              <span className="w-1/3 h-3/5 bg-blue-400 absolute left-1 top-1 rounded-full peer-checked:bg-yellow-400 peer-checked:left-6 transition-all duration-500"></span>
            </label>
          </div>

          <hr />
          <form
            className="flex justify-between gap-6"
            onSubmit={handleFormOnSubmit}
          >
            <input
              type="text"
              name="tempTask"
              value={tempTask}
              onChange={handleTempTaskInputOnChange}
              className="w-full p-2 outline-blue-900 rounded capitalize"
              placeholder="Add Items . . . . "
            />

            {!toggleAddButton ? (
              <button
                type="submit"
                className="bg-blue-500 p-2 inline-flex items-center gap-2 hover:bg-green-500 text-white rounded transition-all duration-500"
              >
                <MdOutlineAddCircleOutline /> Add
              </button>
            ) : (
              <button
                type="submit"
                className="bg-blue-500 px-6 py-2 inline-flex items-center gap-2 hover:bg-green-500 text-white rounded transition-all duration-500"
              >
                <BsCheckCircle /> Update
              </button>
            )}
          </form>
          <div className="flex justify-between gap-10">
            <h3 className="text-slate-500 text-xl font-medium">Tasks Lists</h3>
            <div className="flex items-center border border-rounded">
              <input
                className="w-full p-2 bg-black bg-opacity-70 text-right text-white rounded outline-blue-900"
                placeholder="Search . . . ."
                name="search"
                value={searchedTask}
                onChange={handleSearchInputChange}
              />
              <button
                type="button"
                className="bg-black bg-opacity-70 p-2 hover:bg-green-500 transition-all duration-500 border-l"
                // onClick={handleSearchOnclick}
              >
                <IoMdSearch className="h-6 w-6 fill-white" />
              </button>
            </div>
          </div>

          {searchedTask !== "" ? (
            filteredTasks.length > 0 ? (
              filteredTasks.map((task, index) => {
                const originalIndex = tasks.findIndex((t) => t.id === task.id);
                return (
                  <div
                    className="bg-black bg-opacity-70 px-5 py-3 flex justify-between gap-32 rounded text-white text-md"
                    key={task?.id}
                  >
                    <p className="capitalize">
                      {" "}
                      {originalIndex + 1}
                      {". "} {task?.name}
                    </p>
                    <div className="space-x-4">
                      <button
                        type="button"
                        onClick={() => handleEditOnClick(task?.id)}
                        className="font-medium text-blue-500 hover:text-green-500 transition-all duration-500"
                      >
                        <BiEditAlt />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteOnclick(task?.id)}
                        className="font-medium text-slate-500 hover:text-red-500 transition-all duration-500"
                      >
                        <RiDeleteBin5Line />
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-white text-xl text-center font-medium">
                😞 No matching task found.
              </p>
            )
          ) : (
            tasks.map((task, index) => {
              return (
                <div
                  className="bg-black bg-opacity-70 px-5 py-3 flex justify-between gap-32 rounded text-white text-md"
                  key={task?.id}
                >
                  <p className="capitalize">
                    {" "}
                    {index + 1}
                    {". "} {task?.name}
                  </p>
                  <div className="space-x-4">
                    <button
                      type="button"
                      onClick={() => handleEditOnClick(task?.id)}
                      className="font-medium text-blue-500 hover:text-green-500 transition-all duration-500"
                    >
                      <BiEditAlt />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteOnclick(task?.id)}
                      className="font-medium text-slate-500 hover:text-red-500 transition-all duration-500"
                    >
                      <RiDeleteBin5Line />
                    </button>
                  </div>
                </div>
              );
            })
          )}

          {tasks?.length >= 2 && (
            <button
              className="bg-slate-500 px-5 py-2 inline-flex items-center gap-2 hover:bg-red-500 text-white rounded transition-all duration-500"
              type="button"
              onClick={handleDeleteAllOnClick}
            >
              <RiDeleteBin5Line />
              Delete All
            </button>
          )}
        </div>
      </div>
    </main>
  );
};

export default App;
