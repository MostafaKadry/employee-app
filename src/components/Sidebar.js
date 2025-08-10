'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  FiHome, 
  FiUsers, 
  FiUser, 
  FiBriefcase
} from 'react-icons/fi';
import { BsBuildingFill } from "react-icons/bs";
import { FaGear } from "react-icons/fa6";

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: FiHome },
  { name: 'Companies', href: '/companies', icon: BsBuildingFill },
  { name: 'Departments', href: '/departments', icon: FiBriefcase },
  { name: 'Employees', href: '/employees', icon: FiUsers },
  { name: 'Account', href: '/account', icon: FiUser },
];

export default function Sidebar({ isOpen, onClose }) {
  const router = useRouter();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 lg:hidden transition-colors"
          >
            <FaGear className="h-6 w-6" />
          </button>
        </div>

        <nav className="mt-8">
          <div className="px-4 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center px-4 py-3 text-sm font-medium text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-700 transition-colors group"
                  onClick={onClose}
                >
                  <Icon className="mr-3 h-5 w-5 text-gray-400 group-hover:text-blue-500" />
                  {item.name}
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </>
  );
}