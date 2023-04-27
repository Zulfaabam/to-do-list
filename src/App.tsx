import AddButton from "./components/AddButton";
import Navbar from "./components/Navbar";
import stateEmpty from "./assets/activity-empty-state.svg";
import instance from "./utils/axios";
import { useEffect, useState } from "react";
import ActivityCard from "./components/ActivityCard";
import DeleteConfirmationModal from "./components/DeleteConfirmationModal";
import { Snackbar, Alert } from "@mui/material";
import { AiOutlineInfoCircle } from "react-icons/ai";
import AddActivityModal from "./components/AddActivityModal";

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

interface ActivitiesData {
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
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteData, setDeleteData] = useState({
    id: 0,
    title: "",
  });
  const [alert, setAlert] = useState("");

  function handleOpenAddModal() {
    setOpenAddModal(true);
  }

  function handleCloseAddModal() {
    setOpenAddModal(false);
  }

  function handleOpenDeleteModal(activityId: number, title: string) {
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
        handleCloseAddModal();
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
      <div className="px-[220px] mt-11">
        <div className="flex justify-between w-full">
          <h1 data-cy="activity-title" className="font-bold text-dark text-4xl">
            Activity
          </h1>
          <AddButton onClick={handleOpenAddModal} />
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
          <div className="mt-[49px] flex flex-wrap justify-between gap-5">
            {activities?.data.map((activity, idx) => (
              <ActivityCard
                key={activity.id}
                idx={idx + 1}
                activityId={activity.id}
                title={activity.title}
                date={activity.created_at}
                deleteActivity={handleOpenDeleteModal}
              />
            ))}
          </div>
        )}
      </div>
      {openAddModal ? (
        <AddActivityModal
          open={openAddModal}
          onClose={handleCloseAddModal}
          handleSave={addNewActivity}
        />
      ) : null}
      {openDeleteModal ? (
        <DeleteConfirmationModal
          open={openDeleteModal}
          onClose={handleCloseDeleteModal}
          title={deleteData.title}
          id={deleteData.id}
          handleDelete={deleteActivity}
        />
      ) : null}
      {alert ? (
        <Snackbar
          open={Boolean(alert)}
          autoHideDuration={5000}
          onClose={handleClose}
          data-cy="modal-information"
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={handleClose}
            severity="info"
            sx={{
              width: "100%",
              fontWeight: 500,
              color: "#111111",
              fontSize: 14,
            }}
            icon={<AiOutlineInfoCircle data-cy="modal-information-icon" />}
          >
            <p
              className="text-sm text-dark font-medium"
              data-cy="modal-information-title"
            >
              {alert}
            </p>
          </Alert>
        </Snackbar>
      ) : null}
    </div>
  );
}

export default App;
