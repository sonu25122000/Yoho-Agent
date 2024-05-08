const PageHeader = ({ pageName }: any) => {
  return (
    <div className="my-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h2 className="text-title-md2 font-semibold text-black dark:text-white capitalize">
        {pageName}
      </h2>
    </div>
  );
};

export default PageHeader;
