export default function AddressCard({
  address,
  onSelect,
  onEdit,
  onDelete,
  onSetDefault,
}) {
  return (
    <div className="border p-4 rounded mb-4 bg-white">
      <p className="font-semibold">{address.fullName}</p>
      <p>
        {address.addressLine}, {address.city}, {address.state} -{" "}
        {address.pincode}
      </p>
      <p>Mobile: {address.mobile}</p>
      {address.isDefault && <p className="text-green-600 text-sm">Default</p>}
      <div className="mt-2 space-x-2">
        <button onClick={onSelect} className="text-blue-600">
          Select
        </button>
        <button onClick={onEdit} className="text-yellow-600">
          Edit
        </button>
        <button onClick={onDelete} className="text-red-600">
          Delete
        </button>
        {!address.isDefault && (
          <button onClick={onSetDefault} className="text-green-600">
            Set as Default
          </button>
        )}
      </div>
    </div>
  );
}
