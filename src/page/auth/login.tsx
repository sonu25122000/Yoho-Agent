import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHook";
import {
  RecruiterData,
  recruiterLogin,
} from "../../redux/recruiter/recruiterSlice";
import { useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "all",
    defaultValues: {
      phoneNumber: "",
      password: "",
    },
  });
  const navigate = useNavigate();
  const IsLoggedIn = localStorage.getItem("isLoggedIn");
  useEffect(() => {
    if (IsLoggedIn) {
      navigate("/");
    }
  }, [IsLoggedIn]);

  const handleLogin = (data: any) => {
    dispatch(recruiterLogin(data));
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      <div className="max-w-screen-xl m-0 sm:m-10 bg-white sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div>
            <img
              src="https://storage.googleapis.com/devitary-image-host.appspot.com/15846435184459982716-LogoMakr_7POjrN.png"
              className="w-32 mx-auto"
            />
          </div>
          <div className="mt-28 flex flex-col items-center">
            <h1 className="text-2xl xl:text-3xl font-extrabold">
              WELCOME TO YOHO
            </h1>
            <div className="w-full flex-1 mt-8">
              <div className="flex flex-col items-center"></div>

              <div className="mx-auto max-w-xs">
                <input
                  {...register("phoneNumber", {
                    required: "phone number is required",
                  })}
                  className="w-full
                  [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="number"
                  placeholder="enter your phone number"
                />
                <p className="font-Lexend font-medium text-sm text-red-500">
                  {errors.phoneNumber?.message}
                </p>
                <input
                  {...register("password", {
                    required: "password is required",
                  })}
                  className="w-full  px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                  type="password"
                  placeholder="Password"
                />
                <p className="font-Lexend font-medium text-sm text-red-500">
                  {errors.password?.message}
                </p>
                <button
                  disabled={!isValid}
                  onClick={handleSubmit(handleLogin)}
                  className={`mt-5 tracking-wide font-bold bg-indigo-500  text-white w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none`}
                >
                  <span className="ml-3">Login</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
          <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat 
          bg-[url('https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg')]
          "
          ></div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};
