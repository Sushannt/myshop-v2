import FormContainer from "../components/FormContainer";
import InputControl from "../components/InputControl";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useRegisterMutation } from "../slices/usersApiSlice.mjs";
import { setCredentials } from "../slices/authSlice.mjs";

// react hook form
import { useForm } from "react-hook-form";

// yup hook form resolver
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";

// validation schema
import { registerSchema } from "../helper/formValidation.mjs";

const LoginScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [errorMsg, setErrorMsg] = useState(null);
  const [registerUser, { isLoading }] = useRegisterMutation();

  //state
  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  //   check if user is logged in
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });
  const onSubmit = async (data) => {
    try {
      // eslint-disable-next-line no-unused-vars
      const { confirmPassword, ...formData } = data; //removing confirm password field from the data
      const res = await registerUser({ ...formData }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (error) {
      setErrorMsg(error?.message || error?.data?.message);
    }
  };

  return (
    <FormContainer>
      {errorMsg && (
        <div className="toast">
          <div className="alert alert-error">
            <span>{errorMsg}</span>
          </div>
        </div>
      )}
      <h1 className="text-3xl font-semibold tracking-wide pt-10">Register</h1>
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <InputControl label={"Name"} altLabel={errors.name?.message}>
          <input
            {...register("name")}
            className={`input input-bordered ${
              errors?.name ? "border-red-500/25" : null
            }`}
          />
        </InputControl>

        <InputControl label={"Email"} altLabel={errors.email?.message}>
          <input
            {...register("email")}
            className={`input input-bordered ${
              errors?.email ? "border-red-500/25" : null
            }`}
          />
        </InputControl>

        <InputControl label={"Password"} altLabel={errors.password?.message}>
          <input
            {...register("password")}
            type="password"
            className={`input input-bordered ${
              errors?.password ? "border-red-500/25" : null
            }`}
          />
        </InputControl>

        <InputControl
          label={"Confirm Password"}
          altLabel={errors.confirmPassword?.message}
        >
          <input
            {...register("confirmPassword")}
            type="password"
            className={`input input-bordered ${
              errors?.confirmPassword ? "border-red-500/25" : null
            }`}
          />
        </InputControl>

        <div className="flex flex-col">
          <button type="submit" className="btn btn-primary">
            {isLoading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              <span>Let&apos;s get started</span>
            )}
          </button>
        </div>
      </form>

      <div className="py-3">
        <p>
          Already have an account?{" "}
          <Link
            to={redirect ? `/register?redirect=${redirect}` : "/login"}
            className="link link-secondary"
          >
            Sign in here
          </Link>
        </p>
      </div>
    </FormContainer>
  );
};

export default LoginScreen;
