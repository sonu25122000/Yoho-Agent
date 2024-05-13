import {
  Card,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
} from "@material-tailwind/react";
import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import DefaultLayout from "../../layout/DefaultLayout";

const TABLE_HEAD = [
  "YohoID",
  "Full Name",
  "Phone Number",
  "Coin",
  "Commision",
  "Amount",
  "Purchase Type",
  "Recharge Status",
];

export function HistoryTable() {
  const [rechargeHistory, setRechargeHistory] = useState<any>([]);
  const [page, setPage] = useState(1);
  const loggedInUserId = localStorage.getItem("loggedInUserId");
  const itemsPerPage = 5; // Number of items to display per page

  // Function to calculate the start and end indexes of the current page
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, rechargeHistory?.length);

  // function to get recharge history
  const getRechargeHistory = async () => {
    try {
      const res = await axios.get(`${baseUrl}/history`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const filterRecharge = await res.data.data.filter(
        (el: any) => el.recruiterID._id == loggedInUserId
      );
      setRechargeHistory(filterRecharge);

      toast.success(res.data.message);
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message || error.response.data.error);
    }
  };

  useEffect(() => {
    getRechargeHistory();
  }, []);

  return (
    <DefaultLayout>
      <Card className="h-full w-full dark:bg-[#23303f] md:px-5">
        <CardBody className="overflow-scroll " placeholder={undefined}>
          <table className="mt-4 w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="cursor-pointer dark:bg-[#303d4a] dark:text-white  border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors "
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rechargeHistory
                ?.slice(startIndex, endIndex)
                .map((item: any, index: any) => {
                  return (
                    <tr key={index} className="dark:text-white text-black">
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {item.YohoId || "--"}
                        </p>
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {/* fullName */}
                          {item.fullName
                            ? item.fullName
                            : `${item.recruiterID.firstName}${" "}${
                                item.recruiterID.lastName
                              }`}
                        </p>
                      </td>

                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {item.recruiterID.phoneNumber}
                        </p>
                      </td>

                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {item.coin}
                        </p>
                      </td>

                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {item.recruiterID.commision} %
                        </p>
                      </td>

                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          ₹ {(item.amount && item.amount.toFixed(2)) || 0}
                        </p>
                      </td>

                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <div className="w-max">
                          <Chip
                            size="sm"
                            // purchaseType
                            className=""
                            value={item.purchaseType}
                            color={
                              item.purchaseType == "buy"
                                ? "blue"
                                : item.purchaseType == "withdraw"
                                ? "green"
                                : "red"
                            }
                          />
                        </div>
                      </td>

                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <div className="w-max">
                          <Chip
                            size="sm"
                            className=""
                            value={item.status}
                            color={
                              item.status == "approved"
                                ? "green"
                                : item.status == "pending"
                                ? "yellow"
                                : "red"
                            }
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </CardBody>
        <CardFooter className="flex items-center justify-between p-4">
          <Typography
            variant="small"
            color="blue-gray"
            className="font-normal dark:text-white"
          >
            Page {page} of {Math.ceil(rechargeHistory?.length / 5)}
          </Typography>
          <div className="flex gap-2">
            <Button
              disabled={page <= 1}
              onClick={() => setPage(page - 1)}
              className="text-white bg-primary border border-black"
              size="sm"
            >
              Previous
            </Button>
            <Button
              disabled={Math.ceil(rechargeHistory?.length / 5) == page}
              onClick={() => setPage(page + 1)}
              className="text-white bg-primary border border-black"
              size="sm"
            >
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>
    </DefaultLayout>
  );
}
