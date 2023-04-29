import Navbar from "./components/Navbar";
import stateEmpty from "./assets/activity-empty-state.svg";
import instance from "./utils/axios";
import { useEffect, useState } from "react";
import ActivityCard from "./components/ActivityCard";
import DeleteConfirmationModal from "./components/DeleteConfirmationModal";
import { Link } from "react-router-dom";
import MySnackbar from "./components/MySnackbar";
import { CircularProgress } from "@mui/material";
import { FiPlus } from "react-icons/fi";

export interface NewActivityBody {
  email: string;
  title: string;
}

interface Activities {
  data: ActivitiesData[];
  limit: number;
  skip: number;
  total: number;
}

export interface ActivitiesData {
  created_at: string;
  id: number;
  title: string;
}

export interface NewActivityData {
  created_at: string;
  email: string;
  id: number;
  title: string;
  updated_at: string;
}

function App() {
  const [activities, setActivities] = useState<Activities | null>(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteData, setDeleteData] = useState({
    id: 0,
    title: "",
  });
  const [alert, setAlert] = useState("");

  function handleOpenDeleteModal(
    e: React.FormEvent,
    activityId: number,
    title: string
  ) {
    e.preventDefault();
    setDeleteData({ id: activityId, title: title });
    setOpenDeleteModal(true);
  }

  function handleCloseDeleteModal() {
    setOpenDeleteModal(false);
  }

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    event?.preventDefault();

    setAlert("");
  };

  async function getAllActivity(email: string) {
    await instance
      .get("/activity-groups", {
        params: {
          email,
        },
      })
      .then((res) => setActivities(res.data))
      .catch((error) => setAlert(error));
  }

  async function addNewActivity(body: NewActivityBody) {
    await instance
      .post("/activity-groups", body)
      .then((res) => {
        const newData: NewActivityData = res.data;

        const arr = activities?.data;

        arr?.unshift({
          id: newData.id,
          title: newData.title,
          created_at: newData.created_at,
        });

        if (arr) {
          setActivities({
            ...activities,
            data: arr,
            total: activities.total + 1,
          });
        }
        setAlert("Activity berhasil ditambahkan");
      })
      .catch((error) => setAlert(error));
  }

  async function deleteActivity(activityId: number) {
    await instance
      .delete(`/activity-groups/${activityId}`)
      .then(() => {
        const arr = activities?.data;

        const updatedActivities = arr?.filter((d) => d.id !== activityId);

        if (arr && updatedActivities) {
          setActivities({
            ...activities,
            data: updatedActivities,
            total: activities.total - 1,
          });
        }
        handleCloseDeleteModal();
        setAlert("Activity berhasil dihapus");
      })
      .catch((error) => setAlert(error));
  }

  useEffect(() => {
    getAllActivity("zulfafatahakbar@gmail.com");
  }, []);

  return (
    <div className="bg-gray min-h-screen">
      <Navbar />
      <div className="px-5 lg:px-[220px] mt-6 lg:mt-11">
        <div className="flex justify-between items-center w-full">
          <h1
            data-cy="activity-title"
            className="font-bold text-dark text-base lg:text-4xl"
          >
            Activity
          </h1>
          <button
            data-cy="activity-add-button"
            className="bg-blue text-white flex justify-center items-center gap-2 px-5 py-3 rounded-[45px] text-xs lg:text-lg font-semibold"
            onClick={() =>
              addNewActivity({
                email: "zulfafatahakbar@gmail.com",
                title: "new activity",
              })
            }
          >
            <FiPlus /> Tambah
          </button>
        </div>
        {activities === null ? (
          <div className="flex justify-center items-center h-[413px]">
            <CircularProgress />
          </div>
        ) : activities?.total === 0 ? (
          <img
            src={stateEmpty}
            data-cy="activity-empty-state"
            alt="activity-empty-state"
            className="mt-36 lg:mt-[59px] mx-auto"
            onClick={() =>
              addNewActivity({
                email: "zulfafatahakbar@gmail.com",
                title: "new activity",
              })
            }
          />
        ) : (
          <div className="mt-[49px] flex flex-wrap gap-5">
            {activities?.data.map((activity, idx) => (
              <Link key={idx} to={`activity/${activity.id}`}>
                <ActivityCard
                  activityId={activity.id}
                  title={activity.title}
                  date={activity.created_at}
                  deleteActivity={handleOpenDeleteModal}
                />
              </Link>
            ))}
          </div>
        )}
      </div>
      {openDeleteModal ? (
        <DeleteConfirmationModal
          open={openDeleteModal}
          onClose={handleCloseDeleteModal}
          title={deleteData.title}
          id={deleteData.id}
          handleDelete={deleteActivity}
        />
      ) : null}
      {alert ? <MySnackbar alert={alert} handleClose={handleClose} /> : null}
    </div>
  );
}

export default App;
