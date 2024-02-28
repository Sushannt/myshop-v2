import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// no profile
import noprofile from "../assets/noprofile.svg";

//apiSlice
import { useLogoutMutation } from "../slices/usersApiSlice.mjs";

//reducer
import { logout } from "../slices/authSlice.mjs";

const Header = () => {
  const { cartItems, itemsPrice } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

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
    <header className="bg-base-300 backdrop-blur-lg  fixed top-0 left-0 w-full z-10">
      <div className="navbar md:w-11/12 mx-auto">
        <div className="flex-1">
          <Link className="btn text-orange-300 text-xl font-semibold" to="/">
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
              className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
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
                    <button className="btn btn-atomic_tangerine btn-block">
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
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
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
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-300 rounded-box w-52"
              >
                <li>
                  <Link to={"/login"}>
                    <button className="btn btn-secondary btn-md btn-wide">
                      SignIn
                    </button>
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
