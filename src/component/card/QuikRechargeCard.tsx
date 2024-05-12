import { useEffect, useState } from "react";
import DefaultLayout from "../../layout/DefaultLayout";
import PageHeader from "../pageHeader/PageHeader";
import "./card.css";
import { toast } from "react-toastify";
import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";
import { CoinValue } from "../../utils/coinValue";
export const QuikRechargeCard = () => {
  const [coin, setCoin] = useState(1000000);
  const [admin, setAdmin] = useState<any>([]);
  const getAdminDetails = async () => {
    try {
      const res = await axios.get(`${baseUrl}/superAdmin`);
      setAdmin(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleQuikRecharge = async (coinValue: number) => {
    const loggedInUserId = localStorage.getItem("loggedInUserId");
    try {
      const response = await axios.patch(
        `${baseUrl}/recruiter/recharge/${loggedInUserId}`,
        {
          adminID: admin[0]._id,
          coin: coinValue,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success(response.data.message);
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.error || error.response.data.message);
    }
  };

  useEffect(() => {
    getAdminDetails();
  }, []);

  return (
    <DefaultLayout>
      <PageHeader pageName="Quick Recharge" />

      {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-3 ">
        <div className="card">
          <div className="card-content">
            <p className="card-title">Coin : 10 L</p>
            <button
              onClick={handleQuikRecharge}
              className="card-para text-black capitalize"
            >
              Quik recharge
            </button>
          </div>
        </div>

        <div className="card">
          <div className="card-content">
            <p className="card-title">Coin : 30 L</p>
            <button className="card-para text-black capitalize">
              Quik recharge
            </button>
          </div>
        </div>

        <div className="card">
          <div className="card-content">
            <p className="card-title">Coin : 50 L</p>
            <button className="card-para text-black capitalize">
              Quik recharge
            </button>
          </div>
        </div>

        <div className="card">
          <div className="card-content">
            <p className="card-title">Coin : 1 Cr</p>
            <button className="card-para text-black capitalize">
              Quik recharge
            </button>
          </div>
        </div>
      </div> */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 ">
        {[
          { coinValue: 10000000, label: "10 L" },
          { coinValue: 30000000, label: "30 L" },
          { coinValue: 50000000, label: "50 L" },
          { coinValue: 100000000, label: "1 Cr" },
        ].map((card, index) => (
          <div key={index} className="card">
            <div className="card-content">
              <p className="card-title">Coin : {card.label}</p>
              <button
                onClick={() => handleQuikRecharge(card.coinValue)}
                className="card-para text-black capitalize"
              >
                Quik recharge
              </button>
            </div>
          </div>
        ))}
      </div>
    </DefaultLayout>
  );
};
