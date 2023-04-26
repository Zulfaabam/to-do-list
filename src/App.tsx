import AddButton from "./components/AddButton";
import Navbar from "./components/Navbar";
import stateEmpty from "./assets/activity-empty-state.svg";
import instance from "./utils/axios";
import { useEffect } from "react";

interface NewActivityBody {
  email: string;
  title: string;
}

function App() {
  const getAllActivity = async (email: string) => {
    await instance
      .get("/activity-groups", {
        params: {
          email,
        },
      })
      .then((res) => console.log(res.data))
      .catch((error) => console.log(error));
  };

  const addNewActivity = async (body: NewActivityBody) => {
    await instance
      .post("/activity-groups", body)
      .then((res) => console.log(res.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllActivity("zulfafatahakbar@gmail.com");
  }, []);

  return (
    <>
      <Navbar />
      <div className="px-[220px] mt-11">
        <div className="flex justify-between w-full">
          <h1
            data-cy="activity-title"
            className="font-bold text-black text-4xl"
          >
            Activity
          </h1>
          <AddButton
            onClick={() =>
              addNewActivity({
                email: "zulfafatahakbar@gmail.com",
                title: "activity 1",
              })
            }
          />
        </div>
        <img
          src={stateEmpty}
          data-cy="activity-empty-state"
          alt="activity-empty-state"
          className="mt-[59px] mx-auto"
        />
      </div>
    </>
  );
}

export default App;
