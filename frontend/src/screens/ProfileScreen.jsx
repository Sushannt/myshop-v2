import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { XMarkIcon } from "@heroicons/react/24/outline";

import { useGetMyOrdersQuery } from "../slices/ordersApiSlice.mjs";
import { useProfileMutation } from "../slices/usersApiSlice.mjs";
import { setCredentials } from "../slices/authSlice.mjs";

import { profileSchema } from "../helper/formValidation.mjs";
import FormContainer from "../components/FormContainer";
import InputControl from "../components/InputControl";
import { ErrorAlert, SuccessAlert } from "../components/Alert";
import Loader from "../components/Loader";

const ProfileScreen = () => {
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  const { data: orders, isLoading, error } = useGetMyOrdersQuery();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(profileSchema),
    defaultValues: {
      name: userInfo.name,
      email: userInfo.email,
    },
  });

  const submitHandler = async (data) => {
    try {
      const { name, email, password } = data;
      const res = await updateProfile({
        _id: userInfo._id,
        name,
        email,
        password,
      }).unwrap();
      dispatch(setCredentials(res));
      setSuccessMsg("Profile Updated Successfully");
      setTimeout(() => {
        setSuccessMsg(null);
      }, 3000);
    } catch (error) {
      setErrorMsg(error?.message || error?.data?.message);
      setTimeout(() => {
        setErrorMsg(null);
      }, 3000);
    }
  };

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-8 lg:grid-cols-12">
      <div className="md:col-span-8 lg:col-span-5">
        {errorMsg && (
          <div className="toast">
            <ErrorAlert message={errorMsg} />
          </div>
        )}
        {successMsg && (
          <div className="toast">
            <SuccessAlert message={successMsg} />
          </div>
        )}
        <FormContainer>
          <h2 className="pt-10 text-3xl font-semibold tracking-wide text-secondary-800">
            User Profile
          </h2>
          <form onSubmit={handleSubmit(submitHandler)}>
            <InputControl label="Name" altLabel={errors?.name?.message}>
              <input
                {...register("name")}
                className={`input input-bordered bg-neutral-200 text-secondary-800 ${
                  errors?.name ? "border-red-500/25" : ""
                }`}
              />
            </InputControl>
            <InputControl
              label="Email Address"
              altLabel={errors?.email?.message}
            >
              <input
                {...register("email")}
                className={`input input-bordered bg-neutral-200 text-secondary-800 ${
                  errors?.email ? "border-red-500/25" : ""
                }`}
              />
            </InputControl>
            <InputControl label="Password" altLabel={errors?.password?.message}>
              <input
                {...register("password")}
                className={`input input-bordered bg-neutral-200 text-secondary-800 ${
                  errors?.password ? "border-red-500/25" : ""
                }`}
              />
            </InputControl>
            <InputControl
              label="Confirm Password"
              altLabel={errors?.confirmPassword?.message}
            >
              <input
                {...register("confirmPassword")}
                className={`input input-bordered bg-neutral-200 text-secondary-800 ${
                  errors?.confirmPassword ? "border-red-500/25" : ""
                }`}
              />
            </InputControl>
            <button type="submit" className="btn mt-4">
              {loadingUpdateProfile ? (
                <span className="loading loading-spinner"></span>
              ) : (
                <span>Update</span>
              )}
            </button>
          </form>
        </FormContainer>
      </div>
      <div className="px-5 md:col-span-8 lg:col-span-7">
        <h2 className="pt-10 text-3xl font-semibold tracking-wide text-secondary-800">
          My Orders
        </h2>
        {isLoading ? (
          <Loader />
        ) : error ? (
          <ErrorAlert>{error?.data?.message || error?.error}</ErrorAlert>
        ) : (
          <table className="table">
            <thead>
              <tr className="text-xl uppercase">
                <th>id</th>
                <th>date</th>
                <th>total</th>
                <th>paid</th>
                <th>delivered</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>${order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <XMarkIcon color="red" className="h-5 w-5" />
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <XMarkIcon color="red" className="h-5 w-5" />
                    )}
                  </td>
                  <td>
                    <Link to={`/orders/${order._id}`}>
                      <button className="btn btn-ghost btn-link">
                        Details
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ProfileScreen;
