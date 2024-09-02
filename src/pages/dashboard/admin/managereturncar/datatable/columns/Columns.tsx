/* eslint-disable @typescript-eslint/no-explicit-any */
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDateTime } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import ReturnCarModal from "./returncarmodal/ReturnCarModal";



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
    accessorKey: "pricePerHour",
    header: "Price Per Hour",
    cell: ({ row }) => (
      <p className="text-14-medium">$ {row.original.car?.pricePerHour}/h</p>
    ),
  },
  {
    accessorKey: "totalCost",
    header: "Total Cost",
    cell: ({ row }) => (
      <p className="text-14-medium">$ {row.original.totalCost}</p>
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
    cell: ({ row }) => (
        <div className="flex gap-1">
          <ReturnCarModal
          type="Confirm Return"
          booking={row.original}
          user={row.original.user?._id}
        >
          <Button className="cursor-pointer bg-[#FEA633] text-white relative overflow-hidden border shadow-2xl transition-all before:absolute before:left-0 before:right-0 before:top-0 before:h-0 before:w-full before:bg-gray-600 before:duration-500 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0 after:w-full after:bg-gray-600 after:duration-500 hover:shadow-gray-600 hover:before:h-2/4 hover:after:h-2/4 hover:text-white font-bold px-3">
         <span className=" relative z-10">Return Car</span>
          </Button>
        </ReturnCarModal>
      
      </div>
    ),
  },
];
