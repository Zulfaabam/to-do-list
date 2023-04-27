import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import AddButton from "../components/AddButton";
import { Link, useParams } from "react-router-dom";
import instance from "../utils/axios";
import { ActivitiesData } from "../App";
import { IoIosArrowBack } from "react-icons/io";
import { GrFormEdit } from "react-icons/gr";
import stateEmpty from "../assets/todo-empty-state.svg";

interface Activity extends ActivitiesData {
  todo_items: [];
}

const Activity = () => {
  const { activityId } = useParams();

  const [activity, setActivity] = useState<Activity | null>(null);

  console.log(activity);

  async function getActivity(activityId: number) {
    await instance
      .get(`/activity-groups/${activityId}`)
      .then((res) => setActivity(res.data))
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    if (activityId) {
      getActivity(parseInt(activityId));
    }
  }, [activityId]);

  return (
    <div className="bg-gray min-h-screen">
      <Navbar />
      <div className="px-4 xl:px-[220px] mt-11">
        <div className="flex justify-between w-full">
          <div className="flex gap-4 items-center">
            <Link to="/" data-cy="todo-back-button">
              <IoIosArrowBack size="32px" />
            </Link>
            <h1 data-cy="todo-title" className="font-bold text-dark text-4xl">
              {activity?.title}
            </h1>
            <button className="text-[#A4A4A4]" data-cy="todo-title-edit-button">
              <GrFormEdit size="26px" />
            </button>
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
    </div>
  );
};

export default Activity;
