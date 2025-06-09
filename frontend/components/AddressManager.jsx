import { useEffect, useState } from "react";
import api from "@/utils/api";
import AddressCard from "./AddressCard";
import AddressForm from "./AddressForm";

export default function AddressManager() {
  const [addresses, setAddresses] = useState([]);
  const [editing, setEditing] = useState(null);

  const fetchAddresses = async () => {
    const res = await api.get("/address");
    setAddresses(res.data);
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const handleAddOrUpdate = async (data) => {
    if (editing) {
      await api.put(`/address/${editing._id}`, data);
    } else {
      await api.post("/address", data);
    }
    setEditing(null);
    fetchAddresses();
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Delivery Addresses</h2>
      {addresses.map((addr) => (
        <AddressCard
          key={addr._id}
          address={addr}
          onEdit={() => setEditing(addr)}
          onDelete={async () => {
            await api.delete(`/address/${addr._id}`);
            fetchAddresses();
          }}
          onSetDefault={async () => {
            await api.patch(`/address/${addr._id}/default`);
            fetchAddresses();
          }}
        />
      ))}

      <h3 className="text-lg font-medium mt-6">
        {editing ? "Edit Address" : "Add New Address"}
      </h3>
      <AddressForm initialData={editing} onSubmit={handleAddOrUpdate} />
    </div>
  );
}
