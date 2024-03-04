// RTK Query
import { useGetProductsQuery } from "../slices/productsApiSlice.mjs";

// components
import ProductCard from "../components/ProductCard.jsx";
import Alert from "../components/Alert.jsx";

const HomeScreen = () => {
  const { data: products, isLoading, isError, error } = useGetProductsQuery();

  return (
    <>
      {isLoading ? (
        <div className="flex w-full min-h-screen items-center justify-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : isError ? (
        <Alert variant="error">
          <span> message={error?.error || error?.data?.message} </span>
        </Alert>
      ) : (
        <section className="relative">
          <div className="fixed top-15 left-0 w-full z-10 backdrop-blur-lg">
            <div className="w-11/12 mx-auto py-2 md:py-5 text-xl text-amber-500 font-black grid grid-cols-1 md:grid-cols-2 place-content-between">
              <h1>Latest Products</h1>
              <label className="input input-bordered flex items-center gap-2">
                <input type="text" className="grow" placeholder="Search" />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4 opacity-70"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                    clipRule="evenodd"
                  />
                </svg>
              </label>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 pt-[15vh]">
            {products?.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </section>
      )}
    </>
  );
};

export default HomeScreen;
