'use client';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { FiEdit, FiUser, FiMail, FiShield } from 'react-icons/fi';

export default function AccountPage() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6 border">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Account Settings</h1>
            <p className="text-gray-600">Manage your account information and preferences</p>
          </div>
          <Link
            href="/account/edit"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            <FiEdit className="h-4 w-4 mr-2" />
            Edit Account
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Information */}
        <div className="bg-white rounded-lg shadow-sm p-6 border">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">User Information</h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <FiUser className="h-5 w-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-700">Full Name</p>
                <p className="text-sm text-gray-900">{user?.name}</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <FiMail className="h-5 w-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-700">Email Address</p>
                <p className="text-sm text-gray-900">{user?.email}</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <FiShield className="h-5 w-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-700">Role</p>
                <p className="text-sm text-gray-900">{user?.role}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Account Stats */}
        <div className="bg-white rounded-lg shadow-sm p-6 border">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Account Statistics</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-2xl font-bold text-blue-700">Active</p>
              <p className="text-sm text-blue-600">Status</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <p className="text-2xl font-bold text-green-700">{user?.id}</p>
              <p className="text-sm text-green-600">User ID</p>
            </div>
          </div>
        </div>
      </div>

      {/* Account Actions */}
      <div className="bg-white rounded-lg shadow-sm p-6 border">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Account Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            href="/account/edit"
            className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <FiEdit className="h-5 w-5 text-gray-400" />
              <div>
                <p className="font-medium text-gray-900">Edit Profile</p>
                <p className="text-sm text-gray-600">Update your account information</p>
              </div>
            </div>
            <div className="text-gray-400">→</div>
          </Link>
          
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg bg-gray-50">
            <div className="flex items-center space-x-3">
              <FiShield className="h-5 w-5 text-gray-400" />
              <div>
                <p className="font-medium text-gray-900">Security Settings</p>
                <p className="text-sm text-gray-600">Change password and security options</p>
              </div>
            </div>
            <div className="text-gray-400">Coming Soon</div>
          </div>
        </div>
      </div>
    </div>
  );
}