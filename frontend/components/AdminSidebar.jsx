"use client";
import { useRouter } from "next/navigation";
import { Home, Users, ShoppingCart, PlusCircle } from "lucide-react";

const navItems = [
  { label: "Dashboard", icon: <Home size={18} />, href: "/dashboard" },
  { label: "Users", icon: <Users size={18} />, href: "/dashboard/users" },
  {
    label: "Orders",
    icon: <ShoppingCart size={18} />,
    href: "/dashboard/orders",
  },
  {
    label: "Add Product",
    icon: <PlusCircle size={18} />,
    href: "/dashboard/add",
  },
];

const AdminSidebar = () => {
  const router = useRouter();

  return (
    <aside className="h-screen w-64 bg-gray-900 p-4 sticky top-0 bg-white rounded-2xl shadow-md">
      <h1 className="text-2xl font-bold text-yellow-400 mb-6 text-center">
        Admin Panel
      </h1>
      <nav className="space-y-2">
        {navItems.map((item) => (
          <button
            key={item.label}
            onClick={() => router.push(item.href)}
            className="flex items-center gap-3 px-3 py-2 w-full text-left cursor-pointer rounded hover:bg-gray-50"
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default AdminSidebar;
