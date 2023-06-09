import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Link, useParams } from "react-router-dom";
import instance from "../utils/axios";
import { ActivitiesData } from "../App";
import { IoIosArrowBack } from "react-icons/io";
import { BiSortAlt2 } from "react-icons/bi";
import { GrFormEdit, GrCheckmark } from "react-icons/gr";
import stateEmpty from "../assets/todo-empty-state.svg";
import MySnackbar from "../components/MySnackbar";
import MyAddModal from "../components/MyAddModal";
import { CircularProgress } from "@mui/material";
import ListItem from "../components/ListItem";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal";
import SortMenu from "../components/SortMenu";
import { FiPlus } from "react-icons/fi";
import { priorityOptions } from "../utils/const";

export interface TodoItems {
  activity_group_id: number;
  id: number;
  is_active: number;
  priority: string;
  title: string;
}

interface Activity extends ActivitiesData {
  todo_items: TodoItems[];
}

interface ListItem {
  title: string;
  priority: string;
  activity_group_id: number | "" | undefined;
}

const Activity = () => {
  const { activityId } = useParams();

  const [activity, setActivity] = useState<Activity | null>(null);
  const [activityTitle, setActivityTitle] = useState<string | undefined>("");
  const [editTitle, setEditTitle] = useState(false);
  const [alert, setAlert] = useState("");
  const [openAddModal, setOpenAddModal] = useState(false);
  const [listItem, setListItem] = useState<ListItem>({
    title: "",
    priority: "very-high",
    activity_group_id: activityId && parseInt(activityId),
  });
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteData, setDeleteData] = useState({
    id: 0,
    title: "",
  });
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const openSortMenu = Boolean(anchorEl);

  function handleOpenSortMenu(event: React.MouseEvent<HTMLElement>) {
    setAnchorEl(event.currentTarget);
  }

  function handleCloseSortMenu() {
    setAnchorEl(null);
  }

  function handleOpenAddModal() {
    setOpenAddModal(true);
  }

  function handleCloseAddModal() {
    setListItem({ ...listItem, title: "" });
    setOpenAddModal(false);
  }

  function handleOpenDeleteModal(itemId: number, title: string) {
    setDeleteData({ id: itemId, title: title });
    setOpenDeleteModal(true);
  }

  function handleCloseDeleteModal() {
    setOpenDeleteModal(false);
  }

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

  async function addListItem(body: ListItem) {
    await instance
      .post("/todo-items", body)
      .then(() => {
        if (activityId) {
          getActivity(parseInt(activityId));
        }
        handleCloseAddModal();
        setAlert("List item berhasil ditambahkan");
      })
      .catch((error) => setAlert(error));
  }

  async function deleteListItem(itemId: number) {
    await instance
      .delete(`/todo-items/${itemId}`)
      .then(() => {
        if (activityId) {
          getActivity(parseInt(activityId));
        }
        handleCloseDeleteModal();
        setAlert("List item berhasil dihapus");
      })
      .catch((error) => setAlert(error));
  }

  async function updateListItem(
    itemId: number,
    isActive: boolean,
    title: string
  ) {
    await instance
      .patch(`/todo-items/${itemId}`, { is_active: isActive, title: title })
      .then(() => {
        if (activityId) {
          getActivity(parseInt(activityId));
        }
        handleCloseDeleteModal();
        setAlert("List item berhasil diupdate");
      })
      .catch((error) => setAlert(error));
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
      <div className="hidden lg:block">
        <Navbar />
      </div>
      <nav
        data-cy="header-background"
        className="bg-blue py-5 lg:py-8 pl-5 lg:hidden flex items-center gap-2"
      >
        <Link to="/" data-cy="todo-back-button">
          <IoIosArrowBack size="20px" color="#ffffff" />
        </Link>
        <a href="/" className="text-white font-bold" data-cy="header-title">
          {activityTitle}
        </a>
      </nav>
      <div className="px-5 lg:px-[220px] mt-6 lg:mt-11">
        <div className="flex flex-col lg:flex-row justify-between items-end lg:items-center w-full gap-6">
          <div className="flex lg:gap-4 items-center w-full border-b border-b-[#D8D8D8] lg:border-none pb-2 lg:pb-0 justify-between lg:justify-start">
            <Link to="/" data-cy="todo-back-button" className="hidden lg:block">
              <IoIosArrowBack size="32px" />
            </Link>
            {editTitle ? (
              <>
                <input
                  className="border border-gray rounded-md py-2 lg:py-3 px-4 w-[250px]"
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
                  className="font-bold text-dark text-base lg:text-4xl"
                  onClick={() => setEditTitle(true)}
                >
                  {activityTitle}
                </h1>
                <button
                  data-cy="todo-title-edit-button"
                  onClick={() => setEditTitle(true)}
                >
                  <GrFormEdit size="26px" color="#888888" />
                </button>
              </>
            )}
          </div>
          <div className="flex gap-3 items-center">
            <button
              className="border border-gray-text rounded-full p-2 lg:p-3"
              data-cy="todo-sort-button"
              onClick={handleOpenSortMenu}
            >
              <BiSortAlt2 color="#888888" size="20px" />
            </button>
            <button
              data-cy="todo-add-button"
              className="bg-blue text-white flex justify-center items-center gap-2 px-5 py-3 rounded-[45px] text-xs lg:text-lg font-semibold"
              onClick={handleOpenAddModal}
            >
              <FiPlus /> Tambah
            </button>
          </div>
        </div>
        {activity === null ? (
          <div className="flex justify-center items-center h-[413px]">
            <CircularProgress />
          </div>
        ) : activity.todo_items.length === 0 ? (
          <img
            src={stateEmpty}
            alt="todo-empty-state"
            data-cy="todo-empty-state"
            className="mt-36 lg:mt-[59px] mx-auto"
            onClick={handleOpenAddModal}
          />
        ) : (
          <div className="flex flex-col gap-[10px] mt-12">
            {activity.todo_items.map((item, idx) => (
              <ListItem
                key={idx}
                idx={idx}
                item={item}
                updateListItem={updateListItem}
                handleClickDelete={handleOpenDeleteModal}
              />
            ))}
          </div>
        )}
      </div>
      {openAddModal ? (
        <MyAddModal
          open={openAddModal}
          onClose={handleCloseAddModal}
          handleSave={() => addListItem(listItem)}
          title="Tambah List Item"
          disabled={!listItem.title}
        >
          <div className="flex flex-col gap-2">
            <label
              htmlFor="list-item-title-input"
              className="text-dark text-xs uppercase font-semibold"
              data-cy="modal-add-name-title"
            >
              Nama List Item
            </label>
            <input
              id="list-item-title-input"
              placeholder="Tambahkan nama list item"
              className="border border-gray rounded-md py-3 px-4 w-[200px] lg:w-[400px] mb-6"
              data-cy="modal-add-name-input"
              value={listItem.title}
              onChange={(e) =>
                setListItem({ ...listItem, title: e.target.value })
              }
            />
            <label
              htmlFor="list-item-priority-input"
              className="text-dark text-xs uppercase font-semibold"
              data-cy="modal-add-priority-title"
            >
              Priority
            </label>
            <select
              id="list-item-priority-input"
              className="border border-gray rounded-md py-3 px-4 w-[200px]"
              data-cy="modal-add-priority-dropdown"
              value={listItem.priority}
              onChange={(e) =>
                setListItem({ ...listItem, priority: e.target.value })
              }
            >
              {priorityOptions.map((priority) => (
                <option value={priority.value}>{priority.label}</option>
              ))}
            </select>
          </div>
        </MyAddModal>
      ) : null}
      {openDeleteModal ? (
        <DeleteConfirmationModal
          open={openDeleteModal}
          onClose={handleCloseDeleteModal}
          title={deleteData.title}
          id={deleteData.id}
          handleDelete={deleteListItem}
        />
      ) : null}
      {openSortMenu ? (
        <SortMenu
          open={openSortMenu}
          anchorEl={anchorEl}
          handleClose={handleCloseSortMenu}
        />
      ) : null}
      {alert ? <MySnackbar alert={alert} handleClose={handleClose} /> : null}
    </div>
  );
};

export default Activity;
