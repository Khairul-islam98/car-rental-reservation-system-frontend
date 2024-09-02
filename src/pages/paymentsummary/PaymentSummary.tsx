import React from "react";

interface PaymentSummaryProps {
  totalCost: number;
  serviceCharge: number;
  vat: number;
  onConfirmPayment: () => void;
  onCancel: () => void;
}

const PaymentSummary: React.FC<PaymentSummaryProps> = ({
  totalCost,
  serviceCharge,
  vat,
  onConfirmPayment,
  onCancel,
}) => {
  const totalAmount = totalCost + serviceCharge + vat;

  return (
    <div className="bg-white p-6 rounded shadow-md w-full max-w-sm mx-auto">
      <h2 className="text-xl font-semibold mb-4">Payment Summary</h2>
      <div className="mb-2">
        <p>Total Cost: ${totalCost.toFixed(2)}</p>
        <p>Service Charge: ${serviceCharge.toFixed(2)}</p>
        <p>VAT: ${vat.toFixed(2)}</p>
        <hr className="my-2" />
        <p className="font-bold">Total Amount: ${totalAmount.toFixed(2)}</p>
      </div>
      <div className="flex justify-between mt-4">
        <button
          onClick={onCancel}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        >
          Cancel
        </button>
        <button
          onClick={onConfirmPayment}
          className="px-4 py-2 bg-[#FEA633] text-white rounded hover:bg-[#dc8c29]"
        >
          Confirm Payment
        </button>
      </div>
    </div>
  );
};

export default PaymentSummary;
