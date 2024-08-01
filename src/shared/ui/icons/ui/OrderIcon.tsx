// Icons
import { FaSortAmountUp } from "react-icons/fa";
import { FaSortAmountDownAlt } from "react-icons/fa";

export const OrderIcon = ({order}:{order?:"ASC" |"DESC"}) => {
    return (
        <>{order === "DESC" ? <FaSortAmountUp/> : <FaSortAmountDownAlt/>}</> 
    );
}