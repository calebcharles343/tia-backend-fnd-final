import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useFetchProducts } from "./useFetchProducts";
import { setProducts } from "../../store/productsSlice";
import { ProductType } from "../../interfaces";
import Modal from "../../ui/Modal";
import CreateProductForm from "./CreateProductForm";
import SingleProduct from "./SingleProduct";

export default function Products() {
  const dispatch = useDispatch();

  // Fetch products using React Query
  const { products, isLoadingProducts, refetchProducts } = useFetchProducts();

  // // Select products from Redux store
  // const storeProducts = useSelector((state: any) => state.products.products); // Replace `any` with the root state type if defined

  useEffect(() => {
    // Refetch products on component mount
    refetchProducts();
  }, [refetchProducts]);

  useEffect(() => {
    // Update Redux store when products data changes
    if (products?.data) {
      dispatch(setProducts(products.data));
      // Save the first product item in local storage
      localStorage.setItem("firstProduct", JSON.stringify(products.data[0]));
    }
  }, [products, dispatch]);

  // get user
  const storedUserJSON = localStorage.getItem("localUser");
  let storedUser = null;

  if (storedUserJSON) {
    try {
      storedUser = JSON.parse(storedUserJSON);
    } catch (error) {
      console.error("Error parsing stored user data:", error);
    }
  } else {
    console.log("No stored user found");
  }

  if (isLoadingProducts) {
    return <div>Loading products...</div>;
  }

  return (
    <div className="flex flex-col items-center min-w-full md:min-w-[400px] gap-4">
      {storedUser?.role === "Admin" && (
        <div className="flex items-center justify-between gap-2 mt-2">
          <Modal>
            <Modal.Open open="createProduct">
              <button
                className="text-xs text-white bg-blue-500 border border-blue-500 hover:bg-blue-600 px-2 py-1  rounded-md"
                type="button"
              >
                Add Product
              </button>
            </Modal.Open>

            <Modal.Window name="createProduct">
              <CreateProductForm />
            </Modal.Window>
          </Modal>
        </div>
      )}{" "}
      <ul className="grid grid-cols-1 mid:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-12">
        {products?.data.map((product: ProductType) => (
          <SingleProduct key={product.id} product={product} />
        ))}
      </ul>
    </div>
  );
}
