import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

// no profile
import noprofile from "../assets/noprofile.svg";

//hook
import useAuth from "../hooks/useAuth";
import useCart from "../hooks/useCart";

//apiSlice
import { useLogoutMutation } from "../slices/usersApiSlice.mjs";

//reducer
import { logout } from "../slices/authSlice.mjs";

const Header = () => {
  const { cartItems, itemsPrice } = useCart();
  const { userInfo } = useAuth();

  const [logoutApiCall] = useLogoutMutation(); //api call

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header className="bg-neutral-200 backdrop-blur-lg fixed top-0 left-0 w-full z-20">
      <div className="navbar md:w-11/12 mx-auto">
        <div className="flex-1">
          <Link
            className="text-accent bg-primary-300  text-xl font-bold border-2 py-2 px-3 rounded border-primary/50"
            to="/"
          >
            MyShop
          </Link>
        </div>
        <div className=" flex gap-x-4">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                {cartItems.length > 0 && (
                  <span className="badge badge-sm indicator-item">
                    {cartItems.reduce((a, c) => a + c.qty, 0)}
                  </span>
                )}
              </div>
            </div>
            <div
              tabIndex={0}
              className="mt-3 z-[1] card card-compact dropdown-content w-52 text-neutral bg-neutral-100 shadow"
            >
              <div className="card-body card-compact">
                <span className="font-bold text-lg">
                  {" "}
                  {cartItems.reduce((a, c) => a + c.qty, 0)} Items
                </span>
                <span>
                  Subtotal: <span className="font-semibold">${itemsPrice}</span>
                </span>
                <div className="card-actions">
                  <Link to={"/cart"}>
                    <button className="btn bg-neutral-900 text-primary btn-block">
                      View cart
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  src={userInfo ? userInfo.profile : noprofile}
                  alt="profile"
                />
              </div>
            </div>
            {userInfo ? (
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-neutral-100 rounded-box w-52"
              >
                <li>
                  <a className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </a>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <button onClick={logoutHandler}>Logout</button>
                </li>
              </ul>
            ) : (
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-neutral-200 rounded-box w-52"
              >
                <Link to={"/login"}>
                  <li className="mx-auto text-secondary-800 text-center font-semibold">
                    SignIn
                  </li>
                </Link>
              </ul>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
