import AddButton from "./components/AddButton";
import Navbar from "./components/Navbar";
import stateEmpty from "./assets/activity-empty-state.svg";
import instance from "./utils/axios";
import { useEffect, useState } from "react";
import ActivityCard from "./components/ActivityCard";

interface NewActivityBody {
  email: string;
  title: string;
}

interface Activities {
  data: ActivitiesData[];
  limit: number;
  skip: number;
  total: number;
}
interface ActivitiesData {
  created_at: string;
  id: number;
  title: string;
}
interface NewActivityData {
  created_at: string;
  email: string;
  id: number;
  title: string;
  updated_at: string;
}

function App() {
  const [activities, setActivities] = useState<Activities | null>(null);

  const getAllActivity = async (email: string) => {
    await instance
      .get("/activity-groups", {
        params: {
          email,
        },
      })
      .then((res) => setActivities(res.data))
      .catch((error) => console.log(error));
  };

  const addNewActivity = async (body: NewActivityBody) => {
    await instance
      .post("/activity-groups", body)
      .then((res) => {
        const newData: NewActivityData = res.data;

        const arr = activities?.data;

        arr?.push({
          id: newData.id,
          title: newData.title,
          created_at: newData.created_at,
        });

        if (arr) {
          setActivities({
            ...activities,
            total: activities.total + 1,
            data: arr,
          });
        }
      })
      .catch((error) => console.log(error));
  };

  const deleteActivity = async (activityId: number) => {
    await instance
      .delete(`/activity-groups/${activityId}`)
      .then(() => {
        console.log("delete success");

        const arr = activities?.data;

        const updatedActivities = arr?.filter((d) => d.id !== activityId);

        if (arr && updatedActivities) {
          setActivities({
            ...activities,
            data: updatedActivities,
            total: activities.total - 1,
          });
        }
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllActivity("zulfafatahakbar@gmail.com");
  }, []);

  console.log(activities);

  return (
    <div className="bg-gray min-h-screen">
      <Navbar />
      <div className="px-[220px] mt-11">
        <div className="flex justify-between w-full">
          <h1 data-cy="activity-title" className="font-bold text-dark text-4xl">
            Activity
          </h1>
          <AddButton
            onClick={() =>
              addNewActivity({
                email: "zulfafatahakbar@gmail.com",
                title: "activity 2",
              })
            }
          />
        </div>
        {activities === null ? (
          <div>Loading...</div>
        ) : activities?.total === 0 ? (
          <img
            src={stateEmpty}
            data-cy="activity-empty-state"
            alt="activity-empty-state"
            className="mt-[59px] mx-auto"
          />
        ) : (
          <div className="mt-[49px] flex flex-wrap gap-5">
            {activities?.data.map((activity, idx) => (
              <ActivityCard
                key={activity.id}
                idx={idx + 1}
                activityId={activity.id}
                title={activity.title}
                date={activity.created_at}
                deleteActivity={deleteActivity}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
