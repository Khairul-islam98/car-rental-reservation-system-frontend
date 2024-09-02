import { useGetMyBookingQuery } from "@/redux/features/booking/bookingApi";
import { useAppSelector } from "@/redux/hooks";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  useGetMyProfileQuery,
  useUpdateProfileMutation,
} from "@/redux/features/user/userApi";
import avater from "../../../../assets/images/profileavater.png";
import Modal from "./Modal";
import toast from "react-hot-toast";
import Loader from "@/components/Loader";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";

// Define types for Booking and User
interface Car {
  name: string;
  description: string;
  location: string;
}

interface Booking {
  date: string;
  car: Car;
  payment: "paid" | "unpaid";
  totalCost: number;
}

interface User {
  name: string;
  email: string;
  profilePicture?: string;
}

const UserOverview: React.FC = () => {
  const user = useAppSelector((state) => state.auth.user) as User;
  const { data, refetch, isLoading } = useGetMyBookingQuery({});
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [updateUser] = useUpdateProfileMutation();
  const { data: profile } = useGetMyProfileQuery(user);

  const { control, handleSubmit, reset, setValue } = useForm({
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      profilePicture: profile?.data?.profilePicture || "",
    },
  });
  const [, setUploading] = useState(false);
  useEffect(() => {
    if (data) {
      const bookingsData = data.data?.filter(
        (booking: Booking) => booking.payment === "paid"
      );
      setBookings(bookingsData || []);
    }
  }, [data]);

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append(
        "upload_preset",
        import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
      );
      formData.append("cloud_name", import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);

      try {
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${
            import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
          }/image/upload`,
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
        setValue("profilePicture", imageUrl);
        toast.success("Image uploaded successfully!");
      } catch (error) {
        console.error("Image upload failed:", error);
        toast.error("Image upload failed");
      } finally {
        setUploading(false);
      }
    }
  };

  console.log(user);

  // Function to handle the profile update
  const onSubmit = async (formData: {
    name: string;
    email: string;
    profilePicture: string;
  }) => {
    console.log(formData);
    try {
      const res = await updateUser(formData).unwrap();
      console.log(res);
      toast.success("Profile updated successfully!");
      setIsProfileModalOpen(false); // Close the modal after a successful update
      refetch();
      reset(); // Optionally reset form fields
    } catch (error) {
      console.error("Failed to update profile:", error);
      toast.error("Failed to update profile. Please try again.");
    }
  };

  if (isLoading) return <Loader />;

  return (
    <main className="flex-grow p-6 bg-gray-100 min-h-screen">
      {/* Overview Section */}
      <section id="profile" className="mb-6">
        <h2 className="font-bold text-3xl mb-6 text-gray-800">
          Profile Overview
        </h2>
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col md:flex-row items-center">
          <img
            src={profile?.data?.profilePicture || avater}
            alt="Profile"
            className="w-24 h-24 rounded-full mr-6 mb-4 md:mb-0"
          />
          <div className="flex-grow">
            <h3 className="text-2xl font-semibold text-gray-900">
              {profile?.data?.name}
            </h3>
            <p className="text-gray-600">{user?.email}</p>
            <Button
              className="cursor-pointer bg-[#FEA633] text-white font-bold px-3 mt-4 dark:text-gray-600"
              onClick={() => setIsProfileModalOpen(true)} // Open the profile modal on click
            >
              Edit Profile
            </Button>
          </div>
        </div>
      </section>

      {/* Booking History Section */}
      <section id="booking-history" className="mb-6">
        <h2 className="font-bold text-3xl mb-6 text-gray-800">
          Booking Payment History
        </h2>
        <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
          {/* Booking History Table */}
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="px-4 py-2 border-b-2 text-left font-medium">
                  Date
                </th>
                <th className="px-4 py-2 border-b-2 text-left font-medium">
                  Car
                </th>
                <th className="px-4 py-2 border-b-2 text-left font-medium">
                  Payment
                </th>
                <th className="px-4 py-2 border-b-2 text-left font-medium">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {bookings.length > 0 ? (
                bookings.map((booking, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 transition duration-200"
                  >
                    <td className="px-4 py-3 border-b text-gray-700">
                      {booking.date}
                    </td>
                    <td className="px-4 py-3 border-b text-gray-700">
                      {booking.car.name}
                    </td>
                    <td className="px-4 py-3 border-b">
                      <span
                        className={`inline-block px-2 py-1 text-sm rounded ${
                          booking.payment === "paid"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {booking.payment}
                      </span>
                    </td>
                    <td className="px-4 py-3 border-b">
                      <Button
                        className="text-white hover:underline bg-[#FEA633] dark:text-gray-600"
                        onClick={() => {
                          setSelectedBooking(booking);
                          setIsDetailsModalOpen(true); // Open the details modal
                        }}
                      >
                        View Details
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="text-center py-4 text-gray-500">
                    No bookings available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Settings Section */}
      <section id="settings">
        <h2 className="font-bold text-3xl mb-6 text-gray-600">Settings</h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-gray-600">
            Manage your preferences and notifications.
          </p>
        </div>
      </section>

      {/* Edit Profile Modal */}
      {isProfileModalOpen && (
        <Modal
          title="Edit Profile"
          onClose={() => setIsProfileModalOpen(false)}
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col space-y-4"
          >
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <input
                  type="text"
                  className="p-2 border rounded"
                  placeholder="Enter your name"
                  {...field}
                />
              )}
            />
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <input
                  type="email"
                  className="p-2 border rounded"
                  placeholder="Enter your email"
                  {...field}
                />
              )}
            />
            <Controller
              name="profilePicture"
              defaultValue={profile?.data?.profilePicture }
              control={control}
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
            <Button
              type="submit"
              className="bg-[#FEA633] text-white font-bold px-4 py-2 rounded mt-2"
            >
              Save Changes
            </Button>
          </form>
        </Modal>
      )}

      {/* Booking Details Modal */}
      {isDetailsModalOpen && selectedBooking && (
        <Modal
          title="Booking Details"
          onClose={() => setIsDetailsModalOpen(false)}
        >
          <div className="flex flex-col space-y-4">
            <p>
              <strong>Date:</strong> {selectedBooking.date}
            </p>
            <p>
              <strong>Car:</strong> {selectedBooking.car.name}
            </p>
            <p>
              <strong>Total Cost:</strong> ${selectedBooking.totalCost}
            </p>
            <p>
              <strong>Payment Status:</strong> {selectedBooking.payment}
            </p>
            <p>
              <strong>Description:</strong> {selectedBooking.car?.description}
            </p>
            <p>
              <strong>Location:</strong> {selectedBooking.car?.location}
            </p>
            <Button
              className="bg-[#FEA633] text-white font-bold px-4 py-2 rounded"
              onClick={() => setIsDetailsModalOpen(false)}
            >
              Close
            </Button>
          </div>
        </Modal>
      )}
    </main>
  );
};

export default UserOverview;
