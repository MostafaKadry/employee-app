'use client';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { FiArrowLeft, FiEdit, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

export default function ViewCompanyPage() {
  const params = useParams();
  const { companies, departments, employees } = useApp();
  const company = companies.find(c => c.id === parseInt(params.id));

  if (!company) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Company Not Found</h1>
          <p className="text-gray-600 mb-4">The requested company could not be found.</p>
          <Link
            href="/companies"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            <FiArrowLeft className="h-4 w-4 mr-2" />
            Back to Companies
          </Link>
        </div>
      </div>
    );
  }

  const companyDepartments = departments.filter(d => d.companyId === company.id);
  const companyEmployees = employees.filter(e => e.companyId === company.id);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6 border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link
              href="/companies"
              className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            >
              <FiArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{company.name}</h1>
              <p className="text-gray-600">Company Details</p>
            </div>
          </div>
          <Link
            href={`/companies/${company.id}/edit`}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            <FiEdit className="h-4 w-4 mr-2" />
            Edit Company
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Company Information */}
        <div className="bg-white rounded-lg shadow-sm p-6 border">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Company Information</h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <FiMail className="h-5 w-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-700">Email</p>
                <p className="text-sm text-gray-900">{company.email}</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <FiPhone className="h-5 w-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-700">Phone</p>
                <p className="text-sm text-gray-900">{company.phone}</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <FiMapPin className="h-5 w-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-700">Address</p>
                <p className="text-sm text-gray-900">{company.address}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="bg-white rounded-lg shadow-sm p-6 border">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Statistics</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-2xl font-bold text-blue-700">{companyDepartments.length}</p>
              <p className="text-sm text-blue-600">Departments</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <p className="text-2xl font-bold text-green-700">{companyEmployees.length}</p>
              <p className="text-sm text-green-600">Employees</p>
            </div>
          </div>
        </div>
      </div>

      {/* Departments */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Departments</h2>
        </div>
        <div className="p-6">
          {companyDepartments.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {companyDepartments.map((department) => (
                <div key={department.id} className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900">{department.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{department.description}</p>
                  <div className="mt-2">
                    <Link
                      href={`/departments/${department.id}`}
                      className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      View Details →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">No departments found for this company</p>
          )}
        </div>
      </div>

      {/* Recent Employees */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Employees</h2>
        </div>
        <div className="p-6">
          {companyEmployees.length > 0 ? (
            <div className="space-y-3">
              {companyEmployees.slice(0, 5).map((employee) => (
                <div key={employee.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">
                      {employee.firstName} {employee.lastName}
                    </p>
                    <p className="text-sm text-gray-600">{employee.position}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-700">{employee.departmentName}</p>
                    <Link
                      href={`/employees/${employee.id}`}
                      className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
              {companyEmployees.length > 5 && (
                <div className="text-center pt-4">
                  <Link
                    href="/employees"
                    className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    View All Employees ({companyEmployees.length}) →
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">No employees found for this company</p>
          )}
        </div>
      </div>
    </div>
  );
}