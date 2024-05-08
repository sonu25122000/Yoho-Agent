import React, { useEffect, useState } from "react";
import DefaultLayout from "../../layout/DefaultLayout";
import axios from "axios";
import { toast } from "react-toastify";
import { SiSololearn } from "react-icons/si";

import { baseUrl } from "../../utils/baseUrl";
import Modal from "../../component/modal/ParentModal";
import { RechargeHistoryCard } from "../../component/card/rechargeHistoryCard";
import Recharge from "../../component/recharge/Recharge";
import { DashBoardCard } from "../../component/card/Card";
import { GiTwoCoins } from "react-icons/gi";
import { FaUser } from "react-icons/fa";
import PageHeader from "../../component/pageHeader/PageHeader";

const DashBoard: React.FC = () => {
  const token = localStorage.getItem("token");
  const loggedInUserId = localStorage.getItem("loggedInUserId");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [recruiterProfile, setRecruiterProfile] = useState<any>({});
  const [requestedRecharge, setRequestedRecharge] = useState<any>([]);
  const [requestedRechargeSellType, setRequestedRechargeSellType] =
    useState<any>([]);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  // get superadmin profile list
  const getRecruiterProfileDetails = async () => {
    try {
      const res = await axios.get(`${baseUrl}/recruiter/${loggedInUserId}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setRecruiterProfile(res.data.data);
      console.log(res.data.data);
      // toast.success(res.data.message);
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message || error.response.data.error);
    }
  };

  //  get pending recharge history
  const getPendingRecharge = async () => {
    try {
      const res = await axios.get(`${baseUrl}/history?status=pending`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `b ${token}`,
        },
      });
      const buyTypeRecharge = res.data.data.filter(
        (el: any) => el.purchaseType == "buy"
      );
      const sellTypeRecharge = res.data.data.filter(
        (el: any) => el.purchaseType == "sell"
      );
      setRequestedRecharge(buyTypeRecharge);
      setRequestedRechargeSellType(sellTypeRecharge);

      console.log(res.data.data);
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message || error.response.data.error);
    }
  };

  useEffect(() => {
    getRecruiterProfileDetails();
    getPendingRecharge();
  }, []);
  return (
    <DefaultLayout>
      <div className="grid-cols-1 grid md:grid-cols-3  gap-4">
        <div>
          <DashBoardCard
            Icon1={<GiTwoCoins size="40" className="dark:text-white" />}
            icon={<GiTwoCoins size="20" />}
            buttonContent="Recharge"
            handleOpenModal={openModal}
            buttonContent1="Recharge to customer"
            heading="My Coin"
            coin={(recruiterProfile && recruiterProfile.coin) || "No Coin"}
          />
          {isModalOpen && (
            <Modal
              closeModal={closeModal}
              handleOpen={openModal}
              isModalOpen={isModalOpen}
            >
              <Recharge closeModal={closeModal} />
            </Modal>
          )}
        </div>
        <DashBoardCard
          Icon1={<SiSololearn size="40" className="dark:text-white" />}
          icon={<SiSololearn size="20" />}
          coin={
            (recruiterProfile && recruiterProfile.commissionEarned) ||
            "No Commission"
          }
          heading="Commision Earned"
        />

        <DashBoardCard
          coin="300"
          heading="Today's Sell"
          Icon1={<FaUser size="40" className="dark:text-white" />}
          icon={<FaUser size="20" />}
        />
        <DashBoardCard
          coin="300"
          heading="Monthly Sells"
          Icon1={<FaUser size="40" className="dark:text-white" />}
          icon={<FaUser size="20" />}
        />
      </div>

      <PageHeader pageName="Recharge Requested For Buy" />
      <div className="grid-cols-1 grid md:grid-cols-3 gap-4">
        {requestedRecharge
          ? requestedRecharge.map((item: any) => {
              return (
                <RechargeHistoryCard
                  name={`${item.recruiterID.firstName}${" "}${
                    item.recruiterID.lastName
                  }`}
                  recruiterID={item.recruiterID._id}
                  adminID={item.adminID}
                  phoneNumber={item.recruiterID.phoneNumber}
                  YohoId={item.YohoId}
                  coin={item.coin}
                  id={item._id}
                  purchaseDate={item.createdAt}
                />
              );
            })
          : "abc"}
      </div>
      <PageHeader pageName="Recharge Requested For Sell" />
      <div className="grid-cols-1 grid md:grid-cols-3 gap-4">
        {requestedRechargeSellType
          ? requestedRechargeSellType.map((item: any) => {
              return (
                <RechargeHistoryCard
                  name={`${item.recruiterID.firstName}${" "}${
                    item.recruiterID.lastName
                  }`}
                  recruiterID={item.recruiterID._id}
                  adminID={item.adminID}
                  phoneNumber={item.recruiterID.phoneNumber}
                  YohoId={item.YohoId}
                  coin={item.coin}
                  id={item._id}
                  purchaseDate={item.createdAt}
                />
              );
            })
          : "abc"}
      </div>
    </DefaultLayout>
  );
};

export default DashBoard;
