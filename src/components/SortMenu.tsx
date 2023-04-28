import { Divider, Menu, MenuItem } from "@mui/material";
import { RiSortDesc, RiSortAsc } from "react-icons/ri";
import {
  TbSortAscendingLetters,
  TbSortDescendingLetters,
} from "react-icons/tb";
import { BiSortAlt2 } from "react-icons/bi";

interface SortMenuProps {
  anchorEl: null | HTMLElement;
  open: boolean;
  handleClose: () => void;
}

const SortMenu = ({ anchorEl, open, handleClose }: SortMenuProps) => {
  return (
    <Menu
      anchorEl={anchorEl}
      id="sort-menu"
      open={open}
      onClose={handleClose}
      onClick={handleClose}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: "visible",
          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
          mt: 1.5,
          "& .MuiAvatar-root": {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
        },
      }}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      data-cy="sort-parent"
    >
      <MenuItem
        onClick={handleClose}
        className="flex gap-5"
        data-cy="sort-latest"
      >
        <RiSortDesc color="#16ABF8" />{" "}
        <p className="font-sans text-sm lg:text-base">Terbaru</p>
      </MenuItem>
      <Divider />
      <MenuItem
        onClick={handleClose}
        className="flex gap-5"
        data-cy="sort-oldest"
      >
        <RiSortAsc color="#16ABF8" />{" "}
        <p className="font-sans text-sm lg:text-base">Terlama</p>
      </MenuItem>
      <Divider />
      <MenuItem onClick={handleClose} className="flex gap-5" data-cy="sort-az">
        <TbSortAscendingLetters color="#16ABF8" />{" "}
        <p className="font-sans text-sm lg:text-base">A-Z</p>
      </MenuItem>
      <Divider />
      <MenuItem onClick={handleClose} className="flex gap-5" data-cy="sort-za">
        <TbSortDescendingLetters color="#16ABF8" />{" "}
        <p className="font-sans text-sm lg:text-base">Z-A</p>
      </MenuItem>
      <Divider />
      <MenuItem
        onClick={handleClose}
        className="flex gap-5"
        data-cy="sort-unfinished"
      >
        <BiSortAlt2 color="#16ABF8" />{" "}
        <p className="font-sans text-sm lg:text-base">Belum Selesai</p>
      </MenuItem>
    </Menu>
  );
};

export default SortMenu;
