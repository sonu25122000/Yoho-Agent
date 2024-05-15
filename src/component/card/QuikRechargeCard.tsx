import { useEffect, useState } from "react";
import DefaultLayout from "../../layout/DefaultLayout";
import PageHeader from "../pageHeader/PageHeader";
import "./card.css";
import { toast } from "react-toastify";
import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";
import ConfirmQuikRecharge from "./ConfirmModal";
import Modal from "../modal/ParentModal";
export const QuikRechargeCard = () => {
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [coin, setCoin] = useState(0);
  const [loading, setLoading] = useState(false);
  const openModal1 = () => {
    setIsModalOpen1(true);
  };

  const closeModal1 = () => {
    setIsModalOpen1(false);
  };
  const [admin, setAdmin] = useState<any>([]);
  const getAdminDetails = async () => {
    try {
      const res = await axios.get(`${baseUrl}/superAdmin`);
      setAdmin(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCoin = (coinValue: number) => {
    setCoin(coinValue);
    openModal1();
  };
  const handleQuikRecharge = async () => {
    setLoading(true);
    const loggedInUserId = localStorage.getItem("loggedInUserId");
    try {
      const response = await axios.patch(
        `${baseUrl}/recruiter/recharge/${loggedInUserId}`,
        {
          adminID: admin[0]._id,
          coin: coin,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success(response.data.message);
      closeModal1();
      setLoading(false);
    } catch (error: any) {
      console.log(error);
      closeModal1();
      toast.error(error.response.data.error || error.response.data.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAdminDetails();
  }, []);

  return (
    <DefaultLayout>
      <PageHeader pageName="Quick Recharge" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 ">
        {[
          { coinValue: 1000000, label: "10 L" },
          { coinValue: 3000000, label: "30 L" },
          { coinValue: 5000000, label: "50 L" },
          { coinValue: 10000000, label: "1 Cr" },
        ].map((card, index) => (
          <div key={index} className="card">
            <div className="card-content">
              <p className="card-title">Coin : {card.label}</p>
              <button
                onClick={() => handleCoin(card.coinValue)}
                className="card-para text-black capitalize"
              >
                Quik recharge
              </button>
              {isModalOpen1 && (
                <Modal
                  closeModal={closeModal1}
                  handleOpen={openModal1}
                  isModalOpen={isModalOpen1}
                >
                  <ConfirmQuikRecharge
                    closeModal={closeModal1}
                    confirmQuikRecharge={handleQuikRecharge}
                    coin={coin}
                    loading={loading}
                  />
                </Modal>
              )}
            </div>
          </div>
        ))}
      </div>
    </DefaultLayout>
  );
};
