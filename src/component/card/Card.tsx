export function DashBoardCard(props: any) {
  return (
    <div className="max-w-sm p-6 bg-white dark:bg-[#23303f]  border border-gray-200 rounded-lg shadow dark:border-gray-700">
      {props.Icon1}
      <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
        {props.heading}
      </h5>
      <p className="mb-3 text-2xl flex gap-2 items-center text-gray-500 font-semibold  dark:text-white">
        {props.icon} {props.coin}
      </p>
      {props.buttonContent && (
        <button
          onClick={props.handleOpenModal}
          type="button"
          className="text-gray-900 bg-white border border-black focus:outline-none hover:bg-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-black-800 dark:text-black dark:border-black dark:hover:bg-black-700 dark:hover:border-black "
        >
          {props.buttonContent}
        </button>
      )}

      {props.buttonContent1 && (
        <button
          onClick={props.handleOpenModal1}
          type="button"
          className="text-gray-900 bg-white border border-black focus:outline-none hover:bg-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-black-800 dark:text-black dark:border-black dark:hover:bg-black-700 dark:hover:border-black "
        >
          {props.buttonContent1}
        </button>
      )}
    </div>
  );
}
