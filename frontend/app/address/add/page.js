import React, { Suspense } from "react";
import AddAddress from "@/components/AddressForm";

export default function AddAddressPage() {
  return (
    <Suspense fallback={<div>Loading address form...</div>}>
      <AddAddress />
    </Suspense>
  );
}
