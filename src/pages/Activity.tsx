import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import AddButton from "../components/AddButton";
import { Link, useParams } from "react-router-dom";
import instance from "../utils/axios";
import { ActivitiesData } from "../App";
import { IoIosArrowBack } from "react-icons/io";
import { GrFormEdit, GrCheckmark } from "react-icons/gr";
import stateEmpty from "../assets/todo-empty-state.svg";
import MySnackbar from "../components/MySnackbar";

interface Activity extends ActivitiesData {
  todo_items: [];
}

const Activity = () => {
  const { activityId } = useParams();

  const [activity, setActivity] = useState<Activity | null>(null);

  const [activityTitle, setActivityTitle] = useState<string | undefined>("");

  const [editTitle, setEditTitle] = useState(false);

  const [alert, setAlert] = useState("");

  async function getActivity(activityId: number) {
    await instance
      .get(`/activity-groups/${activityId}`)
      .then((res) => setActivity(res.data))
      .catch((error) => setAlert(error));
  }

  async function updateTitle(activityId: number, title: string) {
    await instance
      .patch(`/activity-groups/${activityId}`, { title })
      .then(() => setAlert("Update title berhasil"))
      .catch((error) => setAlert(error));
  }

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setAlert("");
  };

  useEffect(() => {
    if (activityId) {
      getActivity(parseInt(activityId));
    }
  }, [activityId]);

  useEffect(() => {
    setActivityTitle(activity?.title);
  }, [activity]);

  return (
    <div className="bg-gray min-h-screen">
      <Navbar />
      <div className="px-4 xl:px-[220px] mt-11">
        <div className="flex justify-between w-full">
          <div className="flex gap-4 items-center">
            <Link to="/" data-cy="todo-back-button">
              <IoIosArrowBack size="32px" />
            </Link>
            {editTitle ? (
              <>
                <input
                  className="border border-gray rounded-md py-3 px-4 w-[250px]"
                  value={activityTitle}
                  onChange={(e) => setActivityTitle(e.target.value)}
                />
                <button
                  className="text-[#A4A4A4]"
                  data-cy="todo-title-edit-button"
                  onClick={() => {
                    if (activityId && activityTitle) {
                      updateTitle(parseInt(activityId), activityTitle);
                    }
                    setEditTitle(false);
                  }}
                >
                  <GrCheckmark size="26px" />
                </button>
              </>
            ) : (
              <>
                <h1
                  data-cy="todo-title"
                  className="font-bold text-dark text-4xl"
                >
                  {activityTitle}
                </h1>
                <button
                  className="text-[#A4A4A4]"
                  data-cy="todo-title-edit-button"
                  onClick={() => setEditTitle(true)}
                >
                  <GrFormEdit size="26px" />
                </button>
              </>
            )}
          </div>
          <AddButton
            dataCy="todo-add-button"
            onClick={() => console.log("clicked")}
          />
        </div>
        <img
          src={stateEmpty}
          alt="todo-empty-state"
          data-cy="todo-empty-state"
          className="mt-[59px] mx-auto"
        />
      </div>
      {alert ? <MySnackbar alert={alert} handleClose={handleClose} /> : null}
    </div>
  );
};

export default Activity;
