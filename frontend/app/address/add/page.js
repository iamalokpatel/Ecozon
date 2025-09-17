import React, { Suspense } from "react";
import AddAddress from "@/components/AddAddress";

export default function AddAddressPage() {
  return (
    <Suspense fallback={<div>Loading address form...</div>}>
      <AddAddress />
    </Suspense>
  );
}
