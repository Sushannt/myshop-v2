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
        <>
          <div className="w-11/12 mx-auto pt-5 text-xl text-amber-500 font-black">
            <h1>Latest Products</h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-5">
            {products?.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default HomeScreen;
