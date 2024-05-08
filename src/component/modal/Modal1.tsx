import { Dialog, Card, CardBody } from "@material-tailwind/react";
function Modal1({ children, handleOpen, isModalOpen }: any) {
  return (
    <div>
      <Dialog
        size="xs"
        open={isModalOpen}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardBody className="flex flex-col gap-4">{children}</CardBody>
        </Card>
      </Dialog>
    </div>
  );
}

export default Modal1;
