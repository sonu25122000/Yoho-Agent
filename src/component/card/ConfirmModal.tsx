import { PiSealWarningFill } from "react-icons/pi";

const ConfirmQuikRecharge = ({ closeModal, confirmQuikRecharge }: any) => {
  return (
    <div>
      <div className="flex justify-center mb-2 items-center">
        <PiSealWarningFill className="" size="50" />
      </div>
      <div className="flex justify-center items-center">
        <h1 className=" text-red-600 font-bold text-3xl">Are You Sure !</h1>
      </div>

      <div className="flex gap-4 items-center mt-6 space-x-4 flex-row-reverse">
        <button
          onClick={confirmQuikRecharge}
          type="button"
          className={`
           text-white bg-blue-700 hover:bg-blue-800   font-bold rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600`}
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
  );
};

export default ConfirmQuikRecharge;
