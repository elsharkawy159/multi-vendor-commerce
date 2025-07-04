
import AddProduct from "./add-product";
import { fetchCategoriesAction, fetchBrandsAction } from "./add-product.server";
import type { CategoryOption, BrandOption } from "./add-product.schema";

// Main page component
export default async function AddProductPage() {
  // Fetch categories and brands in parallel
  const [categoriesResult, brandsResult] = await Promise.all([
    fetchCategoriesAction(),
    fetchBrandsAction(),
  ]);

  // Handle errors
  if (!categoriesResult.success || !brandsResult.success) {
    return (
      <div className="min-h-screen bg-[#FAFAF8] flex items-center justify-center">
        <div className="max-w-md mx-auto text-center p-6">
          <div className="text-red-500 mb-4">
            <svg
              className="h-12 w-12 mx-auto"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 15.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Failed to Load Data
          </h2>
          <p className="text-gray-600 mb-4">
            {!categoriesResult.success && categoriesResult.message}
            {!brandsResult.success && brandsResult.message}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-[#145163] text-white rounded-lg hover:bg-[#145163]/90 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const categories: CategoryOption[] = categoriesResult.data || "";
  const brands: BrandOption[] = brandsResult.data || "";

  return <AddProduct categories={categories} brands={brands} />;
}

// Metadata for the page
export const metadata = {
  title: "Add New Product | Dashboard",
  description: "Create a new product listing for your store",
};
