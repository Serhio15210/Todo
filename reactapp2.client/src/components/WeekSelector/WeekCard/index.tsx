import "@/App.css";
import dayjs from "dayjs";
interface WeekCardProps {
  card: string;
  count: number;
  isActive: boolean;
  date: string;
  onClick: () => void;
}
const WeekCard = ({ card, onClick, count, isActive, date }: WeekCardProps) => {
  const formatDate = (date: string) => {
    return dayjs(date).format("DD.MM");
  };

  return (
    <div onClick={onClick} className={`weekCard ${isActive ? "active" : ""}`}>
      <div className="row">
        <p> {card}</p>
        <p> {formatDate(date)}</p>
        <span> {count}</span>
      </div>
    </div>
  );
};

export default WeekCard;
