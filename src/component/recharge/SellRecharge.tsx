import { baseUrl } from "../../utils/baseUrl";
import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";
import { CoinValue } from "../../utils/coinValue";
import Modal1 from "../modal/Modal1";
import SellRechargeConfirm from "./SellRechargeConfirm";

const SellRecharge = ({ closeModal }: any) => {
  const [payload, setPayload] = useState({
    YohoId: "",
    coin: "",
    note: "",
    amount: "",
  });
  // const handleCoinChange = (e: any) => {
  //   const { name, value } = e.target;
  //   // Calculate amount based on entered coin and CoinValue
  //   const calculatedAmount = +(+value * CoinValue).toFixed(2);
  //   const amount = calculatedAmount > 0 ? calculatedAmount.toString() : "";
  //   setPayload({ ...payload, [name]: value, amount });
  // };

  // const handleAmountChange = (e: any) => {
  //   const { name, value } = e.target;
  //   // Calculate coin based on entered amount and CoinValue
  //   const calculatedCoin = +(+value / CoinValue).toFixed(2);
  //   const coin = calculatedCoin > 0 ? calculatedCoin.toString() : "";
  //   setPayload({ ...payload, coin, [name]: value });
  // };
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const openModal1 = () => {
    setIsModalOpen1(true);
  };

  const closeModal1 = () => {
    setIsModalOpen1(false);
  };
  const handleChange1 = (e: any) => {
    const { name, value } = e.target;
    setPayload({ ...payload, [name]: value });
  };

  const handleSellRecharge = async () => {
    const loggedInUserId = localStorage.getItem("loggedInUserId");
    try {
      const response = await axios.post(
        `${baseUrl}/recruiter/sellRecharge`,
        { ...payload, id: loggedInUserId },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success(response.data.message);
      closeModal();
      window.location.reload();
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.error || error.response.data.message);
      closeModal();
    }
  };

  return (
    <div>
      <form className="">
        <div>
          <label className="block text-xl mb-2 font-semibold text-gray-900 dark:text-black">
            YohoID
          </label>
          <input
            onChange={handleChange1}
            name="YohoId"
            className="text-xl
          font-normal border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5  dark:bg-black-700 dark:border-black-600 dark:placeholder-black-400 dark:text-black"
            type="text"
            placeholder="Enter yohoId"
          />
          {payload.YohoId == "" && (
            <p className="text-red-800 font-normal">YohoId is required</p>
          )}
        </div>
        <div className="">
          <label className="block text-xl mb-2 font-semibold text-gray-900 dark:text-black">
            Enter Yoho Coin
          </label>
          <input
            type="number"
            name="coin"
            // value={payload.coin}
            aria-describedby="helper-text-explanation"
            onChange={handleChange1}
            className="text-xl
                    focus:outline-none
                    [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
                    font-normal border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5  dark:bg-black-700 dark:border-black-600 dark:placeholder-black-400 dark:text-black"
            placeholder="Enter Coin"
            required
          />
          {payload.coin == "" && (
            <p className="text-red-800 font-normal">coin is required</p>
          )}
        </div>

        <div className="">
          <label className="block text-xl mb-2 font-semibold text-gray-900 dark:text-black">
            Amount
          </label>
          <input
            type="number"
            onChange={handleChange1}
            name="amount"
            aria-describedby="helper-text-explanation"
            className="text-xl
                    focus:outline-none
                    [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
                    font-normal border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5  dark:bg-black-700 dark:border-black-600 dark:placeholder-black-400 dark:text-black"
            placeholder="Enter Amount"
            required
            // value={payload.amount}
          />
        </div>

        <div>
          <label className="block text-xl mb-2 font-semibold text-gray-900 dark:text-black">
            Note
          </label>
          <input
            onChange={handleChange1}
            name="note"
            className="text-xl
          font-normal border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5  dark:bg-black-700 dark:border-black-600 dark:placeholder-black-400 dark:text-black"
            type="text"
            placeholder="Enter note"
          />
        </div>
      </form>

      <div className="flex gap-3 mt-3 flex-row-reverse">
        <button
          onClick={openModal1}
          type="button"
          disabled={payload.YohoId == "" || payload.coin == ""}
          className="text-gray-900 border-black bg-white border border-gray-300 focus:outline-none hover:bg-gray-100  focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-black-800 dark:text-black dark:border-black dark:hover:bg-black-700 dark:hover:border-black "
        >
          Recharge
        </button>
        {isModalOpen1 && (
          <Modal1
            closeModal={closeModal1}
            handleOpen={openModal1}
            isModalOpen={isModalOpen1}
          >
            <SellRechargeConfirm
              closeModal={closeModal1}
              confirmRecharge={handleSellRecharge}
              data={payload}
            />
          </Modal1>
        )}
        <button
          onClick={closeModal}
          type="button"
          className="text-gray-900 border border-black bg-white focus:outline-none hover:bg-gray-100  focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-black-800 dark:text-black dark:border-black dark:hover:bg-black-700 dark:hover:border-black "
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default SellRecharge;
