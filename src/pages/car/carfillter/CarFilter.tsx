import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface QueryParams {
    search?: string;
    pricePerHour?: string;
    model?: string;
    sort?: string;
    location?: string;
    carType?: string
  }
  
  interface SearchProps {
    setQueryParams: (params: QueryParams) => void;
    queryParams: QueryParams;
  }

  type QueryField = keyof QueryParams;

  const CarFilter: React.FC<SearchProps> = ({ setQueryParams, queryParams }) => {
    const { register, reset } = useForm();
    const [priceRange, setPriceRange] = useState({ min: "", max: "" });
    const [sort, setSort] = useState("");
  
    // Use the defined type for the field parameter
    const handleInputChange = (field: QueryField, value: string) => {
      setQueryParams({ ...queryParams, [field]: value });
    };
  
    const handlePriceChange = (field: "min" | "max", value: string) => {
      const updatedPriceRange = { ...priceRange, [field]: value };
      setPriceRange(updatedPriceRange);
  
      setQueryParams({
        ...queryParams,
        pricePerHour: `${updatedPriceRange.min || 0}-${updatedPriceRange.max || 0}`,
      });
    };
  

  const handleClear = () => {
    setPriceRange({ min: "", max: "" });
    setSort("");
    setQueryParams({});
    reset({search: "",
      carType: "",
      location: "",
      sort: ''
    });
  };

  return (
    <div className="bg-gray-800 p-6 rounded-sm">
      <h3 className="text-2xl font-semibold text-white mb-6">Filter Cars</h3>
      <Button
        type="button"
        onClick={handleClear}
        className="w-full mt-2 mb-2 cursor-pointer bg-[#FEA633] text-white relative h-[50px] overflow-hidden border shadow-2xl transition-all before:absolute before:left-0 before:right-0 before:top-0 before:h-0 before:w-full before:bg-gray-600 before:duration-500 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0 after:w-full after:bg-gray-600 after:duration-500 hover:shadow-gray-600 hover:before:h-2/4 hover:after:h-2/4 hover:text-white font-bold text-2xl"
      >
        <span className=" relative z-10">Clear All</span>
      </Button>
      <div className="mb-6">
        <Label className="block text-white mb-2">Search</Label>
        <Input
          type="search"
          {...register("search")}
          placeholder="Search by name"
          onChange={(e) => handleInputChange("search", e.target.value)}
          className="w-full p-3 rounded-sm bg-gray-700 text-white"
        />
      </div>

      <div className="mb-6">
        <Label className="block text-white mb-2">Car Type</Label>
        <select
          {...register("carType")}
          onChange={(e) => handleInputChange("carType", e.target.value)}
          className="w-full p-3 bg-gray-700 text-white rounded-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">All Type</option>
          <option value="SUV">SUV</option>
          <option value="Hybrid">Hybrid</option>
          <option value="Sedan">Sedan</option>
          <option value="Coupe">Coupe</option>
          <option value="Convertible">Convertible</option>
          <option value="Luxury">Luxury</option>
        </select>
       
      </div>
      <div className="mb-6">
        <Label className="block text-white mb-2">Location</Label>
        <select
          {...register("location")}
          onChange={(e) => handleInputChange("location", e.target.value)}
          
          className="w-full p-3 bg-gray-700 text-white rounded-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">All location</option>
          <option value="dhaka">Dhaka</option>
          <option value="chittagong">Chittagong</option>
          <option value="feni">Feni</option>
          <option value="noakhali">Noakhali</option>
          <option value="coxbazar">Coxbazar</option>
        </select>
       
      </div>

      <div className="mb-6">
        <Label className="block text-white mb-2">Price Range</Label>
        <div className="flex items-center justify-between gap-4">
          <Input
            type="number"
            min="0"
            value={priceRange.min}
            onChange={(e) => handlePriceChange("min", e.target.value)}
            placeholder="Min"
            className="w-1/2 p-3 rounded-sm bg-gray-700 text-white"
          />
          <Input
            type="number"
            min="0"
            value={priceRange.max}
            onChange={(e) => handlePriceChange("max", e.target.value)}
            placeholder="Max"
            className="w-1/2 p-3 rounded-sm bg-gray-700 text-white"
          />
        </div>
        <p className="text-white mt-2">
          Price Range: {priceRange.min || 0} - {priceRange.max || 0}
        </p>
      </div>

      <div>
        <Label className="block text-white mb-2">Sort By</Label>
        <select
          value={sort}
          onChange={(e) => {
            const selectedSort = e.target.value;
            setSort(selectedSort);
            handleInputChange("sort", selectedSort);
          }}
          className="w-full p-3 bg-gray-700 text-white rounded-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
        <option value="">Default</option>
          <option value="pricePerHour:asc">Price: Low to High</option>
          <option value="pricePerHour:desc">Price: High to Low</option>
        </select>
      </div>
    </div>
  );
};

export default CarFilter;
