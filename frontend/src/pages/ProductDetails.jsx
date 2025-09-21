import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Product Details Page</h1>
      <p className="mt-4">Showing details for product ID: {id}</p>
    </div>
  );
};

export default ProductDetails;
