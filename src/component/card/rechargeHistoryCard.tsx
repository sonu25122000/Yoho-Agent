import axios from "axios";
import { FaBitcoin } from "react-icons/fa";
import { baseUrl } from "../../utils/baseUrl";
import { toast } from "react-toastify";
import { GiTwoCoins } from "react-icons/gi";
import { destructureDate } from "./getTime";
export function RechargeHistoryCard({
  id,
  name,
  phoneNumber,
  YohoId,
  coin,
  purchaseDate,
  adminID,
  recruiterID,
}: any) {
  // get the time and date
  const time = destructureDate(new Date(purchaseDate));
  return (
    <div className="flex bg-white dark:bg-[#23303f] p-4 gap-7 border border-black  rounded-xl">
      <div className="w-1/3 flex flex-col justify-evenly items-center ">
        <GiTwoCoins size="100px" className="dark:text-white " />
        <h1 className="text-gray-900 flex justify-center items-center gap-3 dark:text-white text-xl font-bold">
          <GiTwoCoins size="30" /> {coin}
        </h1>
      </div>
      <div className="w-2/3 flex flex-col justify-center py-3">
        <h5 className="mb-2 uppercase text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
          {name}
        </h5>

        <h5 className="mb-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
          YOHOID : {YohoId}
        </h5>

        <h5 className="mb-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
          {time.day + "-" + time.month + "-" + time.year}
        </h5>
        <h5 className="mb-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
          {phoneNumber}
        </h5>
        <div className=""></div>
      </div>
    </div>
  );
}
