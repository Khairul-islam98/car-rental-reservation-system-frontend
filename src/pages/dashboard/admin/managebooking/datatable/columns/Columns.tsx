/* eslint-disable @typescript-eslint/no-explicit-any */
import CarModal from "@/components/CarModal";
import { Badge } from "@/components/ui/badge";
import { formatDateTime } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import CancelModal from "./CancelModal";



export const columns: ColumnDef< any>[] = [
  {
    header: "ID",
    cell: ({ row }) => <p className="text-14-medium">{row.index + 1}</p>,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <p className="text-14-medium">{row.original.user?.name}</p>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="min-w-[115px]">
        <Badge  style={
                  row.original.car?.status === "available"
                    ? { backgroundColor: "#86efac", color: "#fff"}
                    : { backgroundColor: "#fb7185", color: "#fff"}
                }
                variant={"outline"}>{row.original.car?.status}</Badge>
      </div>
    ),
  },
  {
    accessorKey: "isBooked",
    header: "Booked",
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
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => (
        <p className="text-14-regular min-w-[100px]">
        {formatDateTime(row.original.date).dateTime}
      </p>
    ),
  },
  {
    accessorKey: "car",
    header: "Car",
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
    id: "actions",
    header: () => <div className="pl-4">Actions</div>,
    cell: ({ row }) => {


      return (
        <div className="flex gap-1">
          {/* Conditionally render CarModal based on status */}
         
            <CarModal
              type="Approved"
              booking={row.original}
            >
              <Badge className="bg-yellow-500">Approve</Badge>
            </CarModal>
        

          {/* Conditionally render CancelModal based on status */}
          
            <CancelModal
              type="cancel"
              car={row.original.car?._id}
              user={row.original.user?._id}
              booking={row.original}
            >
              <Badge className="bg-red-500">Cancel</Badge>
            </CancelModal>
    
        </div>
      );
    },
  }
];
