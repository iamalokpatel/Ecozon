import AdminSidebar from "@/components/AdminSidebar";

export default function AdminLayout({ children }) {
  return (
    <div className="flex h-screen">
      <div className="w-64">
        <AdminSidebar />
      </div>
      <div className=" layout flex-1 overflow-y-auto p-4">{children}</div>
    </div>
  );
}
