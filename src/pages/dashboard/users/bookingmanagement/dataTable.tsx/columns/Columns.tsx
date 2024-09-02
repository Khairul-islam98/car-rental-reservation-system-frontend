/* eslint-disable @typescript-eslint/no-explicit-any */
import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";
import EditBookingModal from "./editbookingmodel/EditBookingModal";
import CancelBooking from "./cancelbooking/CancelBooking";

export const columns: ColumnDef< any>[] = [
    
    {
      header: "ID",
      cell: ({ row }) => <p className="text-14-medium">{row.index + 1}</p>,
    },
    {
        accessorKey: "car",
        header: "Car Details",
        cell: ({ row }) => {
        <p className="text-14-regular min-w-[100px]">
            {row.original.car?.name}
          </p>
    
          return (
            <div className="flex items-center gap-3">
              <img
                src={row.original.car?.image}
                alt={row.original.car?.name}
                width={100}
                height={100}
                className="size-8"
              />
              <p className=" whitespace-nowrap">{row.original.car?.name}</p>
            </div>
          );
        },
      },
  
    {
        accessorKey: "isBooked",
        header: "Booked Info",
        cell: ({ row }) => (
          <div className="min-w-[115px]">
            <Badge  style={
                      row.original.isBooked === "confirmed"
                        ? { backgroundColor: "#86efac", color: "#fff"}
                        : { backgroundColor: "#fb7185", color: "#fff"}
                    }
                    variant={"outline"}>{row.original.isBooked}</Badge>
          </div>
        ),
      },
      {
        accessorKey: "totalCost",
        header: "Total Cost",
        cell: ({ row }) => {
          const { totalCost, isBooked } = row.original;
      
          // Check if the booking is unconfirmed
          if (isBooked === "confirmed") {
            return <p className="text-14-medium">{totalCost}</p>;
          }
      
          // Display total cost or fallback message
          return (
            <p className="text-14-medium">
              
            </p>
          );
        },
      },
      {
        accessorKey: "payment",
        header: "Payment Status", 
        cell: ({ row }) => (
            <div className="min-w-[115px]">
            <Badge  style={
                      row.original.payment === "pending"
                        ? { backgroundColor: 'green', color: "#fff"}
                        : { backgroundColor: "blue", color: "#fff"}
                    }
                    variant={"outline"}>{row.original.payment}</Badge>
          </div>
        ),
      },

      {
        accessorKey: "startTime",
        header: "Start Time",
        cell: ({ row }) => (
          <p className="text-14-medium">{row.original.startTime}</p>
        ),
      },
      {
        accessorKey: "endTime",
        header: "End Time",
        cell: ({ row }) => {
          const { endTime, isBooked } = row.original;
      
          // Check if the booking is unconfirmed
          if (isBooked === "confirmed" ) {
            return <p className="text-14-medium">{endTime}</p>
          }
      
          // Display total cost or fallback message
          return (
            <p className="text-14-medium"></p>
          );
        },
      },
      
   
  
    {
      id: "actions",
      header: () => <div className="pl-4">Actions</div>,
      cell: ({ row }) => (
          <div className="flex gap-1">
          <EditBookingModal
            booking={row.original}
          >
          </EditBookingModal>
          <CancelBooking
            
            id={row.original._id}
            booking={row.original}
          >
           
          </CancelBooking>
        </div>
      ),
    },
  ];