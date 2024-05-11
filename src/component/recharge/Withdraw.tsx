import { GiTwoCoins } from "react-icons/gi";
import { baseUrl } from "../../utils/baseUrl";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { CoinValue } from "../../utils/coinValue";
const WithDraw = ({ closeModal }: any) => {
  const [payload, setPayload] = useState({
    amountToWithDraw: "",
    upiId: "",
  });
  const [admin, setAdmin] = useState<any>([]);
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setPayload({ ...payload, [name]: value });
  };

  const getAdminDetails = async () => {
    try {
      const res = await axios.get(`${baseUrl}/superAdmin`);
      setAdmin(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAdminDetails();
  }, []);
  const handleRecharge = async () => {
    const loggedInUserId = localStorage.getItem("loggedInUserId");

    try {
      const response = await axios.patch(
        `${baseUrl}/recruiter/withdrawCommission/${loggedInUserId}`,
        { ...payload, amountToWithDraw: +payload.amountToWithDraw },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success(response.data.message);
      closeModal();
      // window.location.reload();
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.error || error.response.data.message);
      closeModal();
    }
  };

  return (
    <div>
      <p className="text-red-600 font-bold">
        You can Only Withdraw , unlocked coin
      </p>
      <form className="">
        <label className="block text-xl mb-2 font-semibold text-gray-900 dark:text-black">
          Enter Coin
        </label>
        <div className="">
          <input
            type="number"
            name="amountToWithDraw"
            aria-describedby="helper-text-explanation"
            onChange={handleChange}
            className="text-xl
                    focus:outline-none
                    [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
                    font-normal border border-gray-300 text-gray-900 rounded-lg block w-full  p-2.5  dark:bg-black-700 dark:border-black-600 dark:placeholder-black-400 dark:text-black"
            placeholder="Enter Coin"
            required
          />
          {!payload.amountToWithDraw && (
            <p className="text-red-800 font-normal">enter coin </p>
          )}
        </div>
        <div>
          <label className="block text-xl mb-2 font-semibold text-gray-900 dark:text-black">
            Upi ID
          </label>
          <input
            onChange={handleChange}
            name="upiId"
            className="text-xl
          focus:outline-none
          [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
          font-normal border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5  dark:bg-black-700 dark:border-black-600 dark:placeholder-black-400 dark:text-black"
            type="text"
            placeholder="enter upi id"
          />
          {payload.upiId == "" && (
            <span className="text-red-800 font-normal">upiId is required.</span>
          )}
        </div>

        <div>
          <label className="block text-xl mb-2 font-semibold text-gray-900 dark:text-black">
            Amount
          </label>
          <input
            className="text-xl
          focus:outline-none
          [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
          font-normal border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5  dark:bg-black-700 dark:border-black-600 dark:placeholder-black-400 dark:text-black"
            type="number"
            disabled
            value={(+payload?.amountToWithDraw * CoinValue).toFixed(2)}
            placeholder="enter amount"
          />
        </div>
      </form>
      <div className="flex gap-3 mt-3 flex-row-reverse">
        <button
          disabled={payload.amountToWithDraw == "" || payload.upiId == ""}
          onClick={handleRecharge}
          type="button"
          className="text-gray-900 border-black bg-white border border-gray-300 focus:outline-none hover:bg-gray-100  focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-black-800 dark:text-black dark:border-black dark:hover:bg-black-700 dark:hover:border-black "
        >
          withdraw
        </button>
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

export default WithDraw;
