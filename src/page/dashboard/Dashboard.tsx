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
import SellRecharge from "../../component/recharge/SellRecharge";
import Modal1 from "../../component/modal/Modal1";
import { CoinValue } from "../../utils/coinValue";
import WithDrawCommission from "../../component/modal/withdrawModal";
import WithDraw from "../../component/recharge/Withdraw";

const DashBoard: React.FC = () => {
  const token = localStorage.getItem("token");
  const loggedInUserId = localStorage.getItem("loggedInUserId");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);

  const [recruiterProfile, setRecruiterProfile] = useState<any>({});
  const [requestedRecharge, setRequestedRecharge] = useState<any>([]);
  const [requestedRechargeSellType, setRequestedRechargeSellType] =
    useState<any>([]);
  const [withdrawType, SetwithdrawType] = useState<any>([]);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModal1 = () => {
    setIsModalOpen1(true);
  };

  const closeModal1 = () => {
    setIsModalOpen1(false);
  };

  const openModal2 = () => {
    setIsModalOpen2(true);
  };

  const closeModal2 = () => {
    setIsModalOpen2(false);
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
      const withdrawType = res.data.data.filter(
        (el: any) => el.purchaseType == "withdraw"
      );
      setRequestedRecharge(buyTypeRecharge);
      setRequestedRechargeSellType(sellTypeRecharge);
      SetwithdrawType(withdrawType);
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
            handleOpenModal1={openModal1}
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

          {isModalOpen1 && (
            <Modal1
              closeModal={closeModal1}
              handleOpen={openModal1}
              isModalOpen={isModalOpen1}
            >
              <SellRecharge closeModal={closeModal1} />
            </Modal1>
          )}
        </div>
        <DashBoardCard
          Icon1={<SiSololearn size="40" className="dark:text-white" />}
          icon={<SiSololearn size="20" />}
          coin={
            (recruiterProfile &&
              recruiterProfile.totalCommissionEarned +
                " = " +
                (recruiterProfile.totalCommissionEarned * CoinValue).toFixed(
                  2
                ) +
                " Rs") ||
            "No Commission Earned"
          }
          heading="Commision Earned"
        />
        <DashBoardCard
          Icon1={<SiSololearn size="40" className="dark:text-white" />}
          icon={<SiSololearn size="20" />}
          buttonContent="Withdraw"
          handleOpenModal={openModal2}
          coin={
            (recruiterProfile &&
              recruiterProfile.unlockCommission +
                " = " +
                (recruiterProfile.unlockCommission * CoinValue).toFixed(2) +
                " Rs") ||
            "No unlocked commission"
          }
          heading="Commision Unlocked"
        />
        {isModalOpen2 && (
          <WithDrawCommission
            closeModal={closeModal2}
            handleOpen={openModal2}
            isModalOpen={isModalOpen2}
          >
            <WithDraw closeModal={closeModal2} />
          </WithDrawCommission>
        )}
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
                  amount={item.amount}
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
                  name={
                    item.fullName
                      ? item.fullName
                      : `${item.recruiterID.firstName}${" "}${
                          item.recruiterID.lastName
                        }`
                  }
                  recruiterID={item.recruiterID._id}
                  adminID={item.adminID}
                  phoneNumber={item.recruiterID.phoneNumber}
                  amount={item.amount}
                  coin={item.coin}
                  id={item._id}
                  purchaseDate={item.createdAt}
                />
              );
            })
          : "abc"}
      </div>

      <PageHeader pageName="Withdraw Requested" />
      <div className="grid-cols-1 grid md:grid-cols-3 gap-4">
        {withdrawType
          ? withdrawType.map((item: any) => {
              return (
                <RechargeHistoryCard
                  name={
                    item.fullName
                      ? item.fullName
                      : `${item.recruiterID.firstName}${" "}${
                          item.recruiterID.lastName
                        }`
                  }
                  recruiterID={item.recruiterID._id}
                  adminID={item.adminID}
                  phoneNumber={item.recruiterID.phoneNumber}
                  amount={item.amount}
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
