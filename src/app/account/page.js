'use client';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { FiEdit, FiUser, FiMail, FiShield, FiChevronRight } from 'react-icons/fi';

export default function AccountPage() {
  const { user } = useAuth();

  return (
    <div className="space-y-4 md:space-y-6 p-4 md:p-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 border">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-gray-900">Account Settings</h1>
            <p className="text-sm md:text-base text-gray-600">Manage your account information and preferences</p>
          </div>
          <Link
            href="/account/edit"
            className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            <FiEdit className="h-4 w-4 mr-2" />
            Edit Account
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* User Information */}
        <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 border">
          <h2 className="text-lg font-semibold text-gray-900 mb-3 md:mb-4">User Information</h2>
          <div className="space-y-3 md:space-y-4">
            <div className="flex items-start space-x-3">
              <FiUser className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-700">Full Name</p>
                <p className="text-sm text-gray-900 truncate">{user?.name || 'Not provided'}</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <FiMail className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-700">Email Address</p>
                <p className="text-sm text-gray-900 truncate">{user?.email}</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <FiShield className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-700">Role</p>
                <p className="text-sm text-gray-900 truncate">{user?.role || 'HR Manager'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Account Stats */}
        <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 border">
          <h2 className="text-lg font-semibold text-gray-900 mb-3 md:mb-4">Account Statistics</h2>
          <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 md:gap-4">
            <div className="bg-blue-50 rounded-lg p-3 md:p-4">
              <p className="text-xl md:text-2xl font-bold text-blue-700">Active</p>
              <p className="text-xs md:text-sm text-blue-600">Status</p>
            </div>
            <div className="bg-green-50 rounded-lg p-3 md:p-4">
              <p className="text-xl md:text-2xl font-bold text-green-700 truncate">{user?.name?.split(' ')[0] || 'User'}</p>
              <p className="text-xs md:text-sm text-green-600">User ID</p>
            </div>
          </div>
        </div>
      </div>

      {/* Account Actions */}
      <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 border">
        <h2 className="text-lg font-semibold text-gray-900 mb-3 md:mb-4">Account Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          <Link
            href="/account/edit"
            className="flex items-center justify-between p-3 md:p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center space-x-3 min-w-0">
              <FiEdit className="h-5 w-5 text-gray-400 flex-shrink-0" />
              <div className="min-w-0">
                <p className="font-medium text-gray-900 truncate">Edit Profile</p>
                <p className="text-xs md:text-sm text-gray-600 truncate">Update your account information</p>
              </div>
            </div>
            <FiChevronRight className="h-5 w-5 text-gray-400 flex-shrink-0" />
          </Link>
          
          <div className="flex items-center justify-between p-3 md:p-4 border border-gray-200 rounded-lg bg-gray-50">
            <div className="flex items-center space-x-3 min-w-0">
              <FiShield className="h-5 w-5 text-gray-400 flex-shrink-0" />
              <div className="min-w-0">
                <p className="font-medium text-gray-900 truncate">Security Settings</p>
                <p className="text-xs md:text-sm text-gray-600 truncate">Change password and security options</p>
              </div>
            </div>
            <span className="text-xs md:text-sm text-gray-500 px-2 py-1 rounded bg-gray-100">Coming Soon</span>
          </div>
        </div>
      </div>
    </div>
  );
}