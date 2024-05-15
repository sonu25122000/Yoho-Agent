import { useState } from "react";
import DefaultLayout from "../../layout/DefaultLayout";
import { IoIosEyeOff } from "react-icons/io";
import { IoEye } from "react-icons/io5";
import { toast } from "react-toastify";
import { baseUrl } from "../../utils/baseUrl";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const ChangePassword = () => {
  const navigate = useNavigate();
  const [payload, setPayload] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setPayload({ ...payload, [name]: value });
  };
  const [visible, setVisible] = useState(true);

  const changePassword = async (e: any) => {
    e.preventDefault();
    const loggedInUserId = localStorage.getItem("loggedInUserId");
    try {
      const response = await axios.patch(
        `${baseUrl}/recruiter/change-recruiter-password`,
        { ...payload, id: loggedInUserId },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success(response.data.message);
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.error || error.response.data.message);
    }
  };
  const handleTogglePassword = () => {
    setVisible(!visible);
  };
  return (
    <DefaultLayout>
      <section className="bg-gray-50 dark:bg-gray-900 ">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-[70vh] lg:py-0">
          <div className="w-full p-6 bg-white rounded-lg shadow  md:mt-0 sm:max-w-md sm:p-8">
            <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-black md:text-2xl">
              Change Password
            </h2>
            <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" action="#">
              <div>
                <label className="block mb-2 text-sm font-medium text-black">
                  Old Password
                </label>
                <input
                  onChange={handleChange}
                  type="text"
                  name="oldPassword"
                  id="password"
                  placeholder="Enter Old Password"
                  className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                />
                {payload.oldPassword.length < 6 && (
                  <span className="text-red-600 font-medium text-sm">
                    Old Password is required and must be atleast 6 digit
                  </span>
                )}
              </div>

              <div className="relative">
                <label className="block mb-2 text-sm font-medium text-black">
                  New password
                </label>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <input
                    onChange={handleChange}
                    type={visible ? "password" : "text"}
                    name="newPassword"
                    id="confirm-password"
                    placeholder="Enter New Password"
                    className="bg-gray-50 text-gray-900 outline-none sm:text-sm rounded-lg flex-1 p-2.5"
                  />

                  {visible ? (
                    <IoIosEyeOff
                      className="mr-3 cursor-pointer"
                      size={"18"}
                      onClick={handleTogglePassword}
                    />
                  ) : (
                    <IoEye
                      className="mr-3 cursor-pointer"
                      size={"18"}
                      onClick={handleTogglePassword}
                    />
                  )}
                </div>
                {payload.newPassword.length < 6 && (
                  <span className="text-red-600 font-medium text-sm">
                    New Password is required and must be atleast 6 digit
                  </span>
                )}
              </div>

              <button
                onClick={changePassword}
                type="submit"
                disabled={
                  payload.newPassword.length < 6 ||
                  payload.oldPassword.length < 6
                }
                className="w-full text-white  bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Reset passwod
              </button>
            </form>
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
};
