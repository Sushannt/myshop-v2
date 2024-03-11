import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShippingAddress } from "../slices/cartSlice.mjs";

// react hook form
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { shippingSchema } from "../helper/formValidation.mjs";

import FormContainer from "../components/FormContainer";
import InputControl from "../components/InputControl";

const ShippingScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      address: shippingAddress?.address || "",
      city: shippingAddress?.city || "",
      postalCode: shippingAddress?.postalCode || "",
      country: shippingAddress?.country || "",
    },
    resolver: yupResolver(shippingSchema),
  });

  const onSubmit = (data) => {
    dispatch(saveShippingAddress(data));
    navigate("/payment");
  };

  return (
    <FormContainer>
      <h1 className="text-3xl font-semibold tracking-wide pt-10 text-secondary-800">
        Shipping
      </h1>
      <form
        className="space-y-5 w-full md:w-3/4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <InputControl label={"Address"} altLabel={errors.address?.message}>
          <input
            {...register("address")}
            className={`input bg-neutral-200 text-secondary-800 input-bordered ${
              errors?.address ? "border-red-500/25" : null
            }`}
          />
        </InputControl>
        <InputControl label={"City"} altLabel={errors.city?.message}>
          <input
            {...register("city")}
            className={`input bg-neutral-200 text-secondary-800 input-bordered ${
              errors?.city ? "border-red-500/25" : null
            }`}
          />
        </InputControl>
        <InputControl
          label={"Postal Code"}
          altLabel={errors.postalCode?.message}
        >
          <input
            type="number"
            inputMode="number"
            {...register("postalCode")}
            className={`input bg-neutral-200 text-secondary-800 input-bordered ${
              errors?.postalCode ? "border-red-500/25" : null
            }`}
          />
        </InputControl>
        <InputControl label={"Country"} altLabel={errors.country?.message}>
          <input
            {...register("country")}
            className={`input bg-neutral-200 text-secondary-800 input-bordered ${
              errors?.country ? "border-red-500/25" : null
            }`}
          />
        </InputControl>
        <div className="flex flex-col">
          <button type="submit" className="btn btn-primary">
            {/* {isLoading ? ( */}
            {/* <span className="loading loading-spinner loading-sm"></span> */}
            {/* ) : ( */}
            <span>Continue</span>
            {/* )} */}
          </button>
        </div>
      </form>
    </FormContainer>
  );
};

export default ShippingScreen;
