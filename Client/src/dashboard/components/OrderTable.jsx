import React from "react";

const OrderTable = ({ orders }) => {
  return (
    <table className="w-full border">
      <thead>
        <tr className="bg-gray-100">
          <th className="p-2 border">Order ID</th>
          <th className="p-2 border">Customer</th>
          <th className="p-2 border">Total</th>
          <th className="p-2 border">Status</th>
        </tr>
      </thead>

      <tbody>
        {orders.map((o) => (
          <tr key={o._id}>
            <td className="p-2 border">{o._id}</td>
            <td className="p-2 border">{o.customerName}</td>
            <td className="p-2 border">₹{o.totalAmount}</td>
            <td className="p-2 border">{o.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default OrderTable;
