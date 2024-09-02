/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { ICarData } from "../addcar/AddCar";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import toast from "react-hot-toast";
import { useUpdateCarMutation } from "@/redux/features/cars/carApi";
import axios from "axios";



interface UpdateCarProps {
  item: ICarData;
  id: string;
}

const UpdateCar = ({ item, id }: UpdateCarProps) => {
  console.log(id);
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, reset, control, setValue } = useForm<ICarData>({
    defaultValues: item,
  });
    const  [updateCar] =  useUpdateCarMutation()
    const [, setUploading] = useState(false);

    const [features, setFeatures] = useState<string[]>(item.features || [""]);

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...features];
    newFeatures[index] = value;
    setFeatures(newFeatures);
  };

  const addFeatureField = () => {
    setFeatures([...features, ""]);
  };

  const removeFeatureField = (index: number) => {
    const newFeatures = features.filter((_, i) => i !== index);
    setFeatures(newFeatures);
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append(
        "upload_preset",
        import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
      );
      formData.append("cloud_name", import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);

      try {
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
            onUploadProgress: (progressEvent) => {
              const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / (progressEvent.total || 1)
              );
              console.log(`Upload progress: ${percentCompleted}%`);
            },
          }
        );
        const imageUrl = response.data.secure_url;
        setValue("image", imageUrl);
        toast.success("Image uploaded successfully!");
      } catch (error) {
        console.error("Image upload failed:", error);
        toast.error("Image upload failed");
      } finally {
        setUploading(false);
      }
    }
  };

  const onSubmit: SubmitHandler<ICarData> = async (data) => {
   
    const carData = {
      name: data.name,
      model: data.model,
      features,
      pricePerHour: Number(data.pricePerHour),
      image: data.image,
      isElectric: Boolean(data.isElectric),
      location: data.location,
      description: data.description,
      color: data.color,
      carType: data.carType,
    };

    console.log(carData);
    const updateCarData = {
      id,
      data: carData,
    };
    console.log(carData);
    try {
        const res = await updateCar(updateCarData).unwrap();
        console.log(res);
        if (res?.success) {
          toast.success("Update Car successfully!");
          reset();
          setOpen(false);
        }
      } catch (err) {
        const error = err as { data?: { message?: string } };
        toast.error(
          error?.data?.message || "Failed to update car. Please try again."
        );
      }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={() => setOpen(true)}
          className="mb-2 bg-[#FEA633] text-white hover:bg-gray-600"
        >
          <svg
            fill="none"
            strokeWidth={1.5}
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
            ></path>
          </svg>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-screen overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="hover:text-[#CB1836] font-semibold">
            Update Car
          </DialogTitle>
          <DialogDescription>Make changes to your Car here.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              {...register("name")}
              id="name"
              defaultValue={item.name}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="image" className="text-right">Image</Label>
            <Controller
              name="image"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    handleImageUpload(e);
                    field.onChange(e.target.files?.[0]);
                  }}
                  className="col-span-3"
                />
              )}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Input
              {...register("description")}
              id="description"
              defaultValue={item.description}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="carType" className="text-right">
            Car Type
            </Label>
            <Controller
              name="carType"
              control={control}
              rules={{ required: true }}
              defaultValue={item.carType}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className=" col-span-3 focus-visible:ring-offset-0">
                    <SelectValue placeholder="Select a option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value={"SUV"}>SUV</SelectItem>
                      <SelectItem value={"Hybrid"}>Hybrid</SelectItem>
                      <SelectItem value={"Sedan"}>Sedan</SelectItem>
                      <SelectItem value={"Coupe"}>Coupe</SelectItem>
                      <SelectItem value={"Convertible"}>Convertible</SelectItem>
                      <SelectItem value={"Luxury"}>Luxury</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="model" className="text-right">
              Model
            </Label>
            <Input
              {...register("model")}
              id="model"
              defaultValue={item.model}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="pricePerHour" className="text-right">
              Price Per Hour
            </Label>
            <Input
              {...register("pricePerHour")}
              id="pricePerHour"
              type="number"
              defaultValue={item.pricePerHour}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="features" className="text-right">
              Features
            </Label>
            <div className="col-span-3 flex flex-col gap-2">
              {features.map((feature, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={feature}
                    onChange={(e) => handleFeatureChange(index, e.target.value)}
                    className="flex-1"
                  />
                  {features.length > 1 && (
                    <Button
                      type="button"
                      onClick={() => removeFeatureField(index)}
                      className="bg-red-500 text-white"
                    >
                      -
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                onClick={addFeatureField}
                className="bg-[#FEA633] text-white mt-2"
              >
                + Add Feature
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="isElectric" className="text-right">
              Is Electric
            </Label>
            <Controller
              name="isElectric"
              control={control}
              rules={{ required: true }}
              defaultValue={item.isElectric}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value as any}>
                  <SelectTrigger className=" col-span-3 focus-visible:ring-offset-0">
                    <SelectValue placeholder="Select a option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value={"false"}>No</SelectItem>
                      <SelectItem value={"true"}>Yes</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="location" className="text-right">
              Location
            </Label>
            <Controller
              name="location"
              control={control}
              rules={{ required: true }}
              defaultValue={item.location}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className=" col-span-3 focus-visible:ring-offset-0">
                    <SelectValue placeholder="Select a option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value={"dhaka"}>Dhaka</SelectItem>
                      <SelectItem value={"chittagong"}>Chittagong</SelectItem>
                      <SelectItem value={"feni"}>Feni</SelectItem>
                      <SelectItem value={"noakhali"}>Noakhali</SelectItem>
                      <SelectItem value={"coxbazar"}>Cox Bazar</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="color" className="text-right">
            Color
            </Label>
            <Input
              {...register("color")}
              id="color"
              type="text"
              defaultValue={item.color}
              className="col-span-3"
            />
          </div>
          <DialogFooter>
          <Button
              type="submit"
              className="w-full mt-2 cursor-pointer bg-[#FEA633] text-white relative h-[50px] overflow-hidden border shadow-2xl transition-all before:absolute before:left-0 before:right-0 before:top-0 before:h-0 before:w-full before:bg-gray-600 before:duration-500 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0 after:w-full after:bg-gray-600 after:duration-500 hover:shadow-gray-600 hover:before:h-2/4 hover:after:h-2/4 hover:text-white font-bold text-2xl"
            >
              <span className=" relative z-10">Update Car</span>
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateCar;
