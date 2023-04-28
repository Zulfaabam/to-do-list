import { TbTrash } from "react-icons/tb";
import moment from "moment";

interface ActivityCardProps {
  idx: number;
  activityId: number;
  title: string;
  date: string;
  deleteActivity: (
    e: React.FormEvent,
    activityId: number,
    title: string
  ) => void;
}

const ActivityCard = ({
  idx,
  activityId,
  title,
  date,
  deleteActivity,
}: ActivityCardProps) => {
  return (
    <div
      className="bg-white rounded-xl w-[150px] h-[150px] lg:w-[235px] lg:h-[235px] py-[22px] px-6 flex flex-col justify-between shadow-custom"
      data-cy={`activity-item-${idx}`}
    >
      <h2
        data-cy="activity-item-title"
        className="font-bold text-sm lg:text-lg text-dark"
      >
        {title}
      </h2>
      <div className="flex justify-between items-center text-gray-text">
        <p data-cy="activity-item-date" className="text-[10px] lg:text-sm">
          {moment(date).format("D MMMM YYYY")}
        </p>
        <button
          data-cy="activity-item-delete-button"
          onClick={(e) => deleteActivity(e, activityId, title)}
          className="text-xs"
        >
          <TbTrash />
        </button>
      </div>
    </div>
  );
};

export default ActivityCard;
