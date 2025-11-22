import React, { useEffect, useState } from "react";
import AdminLayout from "../layout/AdminLayout";
import { getOrders } from "../services/orderApi";
import OrderTable from "../components/OrderTable";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    const data = await getOrders();
    setOrders(data);
  };

  return (
    <AdminLayout title="Orders">
      <OrderTable orders={orders} />
    </AdminLayout>
  );
};

export default Orders;
