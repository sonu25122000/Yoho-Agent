import React from "react";

const SellRechargeConfirm = ({ closeModal, confirmRecharge, data }: any) => {
  return (
    <div>
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg dark:bg-gray-700">
          <div className="p-4 md:p-5">
            <h3 className="mb-2 text-red-700 text-2xl font-bold flex justify-center items-center">
              Are You Sure !
            </h3>
            <div className="flex justify-between mb-1 text-gray-500 dark:text-gray-400">
              <span className="text-base font-normal">Coin</span>
              <span className="text-sm font-semibold text-gray-900 dark:text-black">
                {data.coin || "--"}
              </span>
            </div>
            <div className="flex justify-between mb-1 text-gray-500 dark:text-gray-400">
              <span className="text-base font-normal">Amount</span>
              <span className="text-sm font-semibold text-gray-900 dark:text-black">
                {data.amount || "--"}
              </span>
            </div>
            <div className="flex justify-between mb-1 text-gray-500 dark:text-gray-400">
              <span className="text-base font-normal">YohoID</span>
              <span className="text-sm font-semibold text-gray-900 dark:text-black">
                {data.YohoId || "--"}
              </span>
            </div>
            <div className="flex gap-4 mb-1 font-normal text-gray-500 dark:text-gray-400">
              Note{" "}
              <span className="text-base font-bold">{data.note || "--"}</span>
            </div>

            <div className="flex gap-4 items-center mt-6 space-x-4 flex-row-reverse">
              <button
                onClick={confirmRecharge}
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800   font-bold rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 "
              >
                Confirm
              </button>
              <button
                onClick={closeModal}
                type="button"
                className="py-2.5 px-5 text-sm font-medium text-gray-900  bg-white rounded-lg border border-gray-200  hover:text-black dark:text-black dark:border-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellRechargeConfirm;
