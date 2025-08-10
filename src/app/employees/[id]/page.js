'use client';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { FiArrowLeft, FiEdit, FiMail, FiPhone, FiCalendar, FiBriefcase } from 'react-icons/fi';

export default function ViewEmployeePage() {
  const params = useParams();
  const { employees } = useApp();
  const employee = employees.find(e => e.id === parseInt(params.id));

  if (!employee) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Employee Not Found</h1>
          <p className="text-gray-600 mb-4">The requested employee could not be found.</p>
          <Link
            href="/employees"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            <FiArrowLeft className="h-4 w-4 mr-2" />
            Back to Employees
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6 border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link
              href="/employees"
              className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            >
              <FiArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {employee.firstName} {employee.lastName}
              </h1>
              <p className="text-gray-600">Employee Details</p>
            </div>
          </div>
          <Link
            href={`/employees/${employee.id}/edit`}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            <FiEdit className="h-4 w-4 mr-2" />
            Edit Employee
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personal Information */}
        <div className="bg-white rounded-lg shadow-sm p-6 border">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <FiMail className="h-5 w-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-700">Email</p>
                <p className="text-sm text-gray-900">{employee.email}</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <FiPhone className="h-5 w-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-700">Phone</p>
                <p className="text-sm text-gray-900">{employee.phone}</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <FiCalendar className="h-5 w-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-700">Hire Date</p>
                <p className="text-sm text-gray-900">
                  {new Date(employee.hireDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Work Information */}
        <div className="bg-white rounded-lg shadow-sm p-6 border">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Work Information</h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <FiBriefcase className="h-5 w-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-700">Position</p>
                <p className="text-sm text-gray-900">{employee.position}</p>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700 mb-1">Department</p>
              <p className="text-sm text-gray-900">{employee.departmentName}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700 mb-1">Company</p>
              <p className="text-sm text-gray-900">{employee.companyName}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Employee Stats */}
      <div className="bg-white rounded-lg shadow-sm p-6 border">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Employee Stats</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-sm font-medium text-blue-700">Days Employed</p>
            <p className="text-2xl font-bold text-blue-700">
              {Math.floor((new Date() - new Date(employee.hireDate)) / (1000 * 60 * 60 * 24))}
            </p>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <p className="text-sm font-medium text-green-700">Status</p>
            <p className="text-2xl font-bold text-green-700">Active</p>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <p className="text-sm font-medium text-purple-700">Employee ID</p>
            <p className="text-2xl font-bold text-purple-700">EMP-{employee.id.toString().padStart(3, '0')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}