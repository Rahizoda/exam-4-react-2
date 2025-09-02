import { Button } from "@mui/material";
import { ShoppingBag } from "lucide-react";

export default function EmptyProducts() {
  return (
    <div className="w-full h-[400px] flex flex-col items-center justify-center text-center border border-dashed rounded-xl p-6">
      {/* Icon */}
      <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-full mb-4 flex items-center justify-center">
        <ShoppingBag className="w-12 h-12 text-gray-600 dark:text-gray-300" />
      </div>

      {/* Title */}
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
        Add new products
      </h2>

      {/* Subtitle */}
      <p className="text-gray-500 dark:text-gray-400 max-w-sm mb-6">
        Start making sales by adding your products. You can import and manage your
        products at any time.
      </p>

      {/* Button */}
      <Button onClick={()=>window.location = '/addproducts'} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
        + Add product
      </Button>
    </div>
  );
}
