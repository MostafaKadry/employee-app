'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { FiArrowLeft, FiEdit, FiMail, FiPhone, FiCalendar, FiBriefcase , FiMap} from 'react-icons/fi';
import { getEmployeeById } from '@/services/employee/api';
import LoadingSpinner from '@/components/LoadingSpinner';
import ToastArrayOfErrors from '@/lib/ToastArrayOfErrors';

export default function ViewEmployeePage() {
  const params = useParams();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEmployee = async () => {
      setLoading(true);
      try {
        const res = await getEmployeeById(params.id);
        console.log(res);
        if (res.status === 200) {
          setEmployee(res.data.message);
        }
      } catch (error) {
        console.error("Error fetching employee:", error);
        ToastArrayOfErrors(
          error?.response?.data?.errors,
          error?.response?.data?.message || "Failed to fetch employee"
        );
      } finally {
        setLoading(false);
      }
    };
    fetchEmployee();
  }, [params.id]);

  if (loading) {
    return <LoadingSpinner />;
  }

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
    <div className="space-y-4 px-2 sm:px-0 max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 border">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center space-x-3">
            <Link
              href="/employees"
              className="p-2 -ml-2 sm:ml-0 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
              aria-label="Back to employees"
            >
              <FiArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {employee.employee_name}
              </h1>
              <p className="text-gray-600">Employee Details</p>
            </div>
          </div>
          <Link
            href={`/employees/${employee.name}/edit`}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            <FiEdit className="h-4 w-4 mr-2" />
            Edit Employee
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Personal Information */}
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 border">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <FiMail className="h-5 w-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-700">Email</p>
                <p className="text-sm text-gray-900">{employee.email_address}</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <FiPhone className="h-5 w-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-700">Phone</p>
                <p className="text-sm text-gray-900">{employee.mobile_number}</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <FiCalendar className="h-5 w-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-700">Days Employed</p>
                <p className="text-sm text-gray-900">
                  {employee.days_employed}
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <FiMap className="h-5 w-5 text-gray-400 mt-0.5" />
                <p className="text-sm font-medium text-gray-700">Address</p>
                <p className="text-sm text-gray-900">{employee.address}</p>
              </div>
          </div>
        </div>

        {/* Work Information */}
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 border">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
            <FiBriefcase className="h-5 w-5 text-gray-400 mt-0.5 mx-2" />
            Work Information
          </h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div>
                <p className="text-sm font-medium text-gray-700">Position</p>
                <p className="text-sm text-gray-900">{employee.designation_positiontitle}</p>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700 mb-1">Department</p>
              <p className="text-sm text-gray-900">{employee.department}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700 mb-1">Company</p>
              <p className="text-sm text-gray-900">{employee.company}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700 mb-1">Hire Date</p>
              <p className="text-sm text-gray-900">{employee.hire_date || 'not hired yet'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Employee Stats */}
      <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 border">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Employee Stats</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          <div className="bg-blue-50 rounded-lg p-3 sm:p-4">
            <p className="text-sm font-medium text-blue-700">Days Employed</p>
            <p className="text-2xl font-bold text-blue-700">
             {employee.days_employed}
            </p>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <p className="text-sm font-medium text-green-700">Status</p>
            <p className="text-2xl font-bold text-green-700">{employee.status}</p>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <p className="text-sm font-medium text-purple-700">Employee ID</p>
            <p className="text-2xl font-bold text-purple-700">{employee.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
}