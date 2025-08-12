'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { FiPlus, FiEdit, FiTrash2, FiEye, FiSearch, FiUsers } from 'react-icons/fi';
import Swal from 'sweetalert2';
import { getAllEmployees, deleteEmployee } from '@/services/employee/api';
import LoadingSpinner from '@/components/LoadingSpinner';
import ToastArrayOfErrors from '@/lib/ToastArrayOfErrors';
import toast from 'react-hot-toast';


export default function EmployeesPage() {
  const { dispatch } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [employees, setEmployees] = useState([]);

  const filteredEmployees = employees.filter(employee =>
    `${employee.employee_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (employee) => {
    Swal.fire({
      title: 'Are you sure?',
      text: `This will delete ${employee.employee_name} and cannot be undone!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#EF4444',
      cancelButtonColor: '#6B7280',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await deleteEmployee(employee.name);
        console.log(res);
        if (res.status === 200) {
          dispatch({ type: 'SET_EMPLOYEES', payload: employees.filter((emp) => emp.name !== employee.name) });
          toast.success("Employee deleted successfully");
        }
      }
    });
  };
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setLoading(true);
        const res = await getAllEmployees();
        console.log(res);
        setEmployees(res.data.message);
        dispatch({ type: "SET_EMPLOYEES", payload: res.data.message });
      } catch (error) {
        console.error("Error fetching employees:", error);
        ToastArrayOfErrors(
          error?.response?.data?.errors,
          error?.response?.data?.message || "Failed to fetch employees"
        );
      } finally {
        setLoading(false);
      }
    };
    fetchEmployees();
  }, []);
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6 border">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Employees</h1>
            <p className="text-gray-600">Manage your organization's employees</p>
          </div>
          <Link
            href="/employees/create"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            <FiPlus className="h-4 w-4 mr-2" />
            Add Employee
          </Link>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow-sm p-6 border">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search employees..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Employees List */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        {filteredEmployees.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Employee
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Position
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Department
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Company
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredEmployees.map((employee) => (
                  <tr key={employee.name} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {employee.employee_name}
                        </div>
                        <div className="text-sm text-gray-500">{employee.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{employee.designation_positiontitle}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{employee.department}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{employee.company}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {employee.status}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <Link
                          href={`/employees/${employee.name}`}
                          className="text-blue-600 hover:text-blue-900 p-1 rounded transition-colors"
                          title="View"
                        >
                          <FiEye className="h-4 w-4" />
                        </Link>
                        <Link
                          href={`/employees/${employee.name}/edit`}
                          className="text-green-600 hover:text-green-900 p-1 rounded transition-colors"
                          title="Edit"
                        >
                          <FiEdit className="h-4 w-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(employee)}
                          className="text-red-600 hover:text-red-900 p-1 rounded transition-colors"
                          title="Delete"
                        >
                          <FiTrash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12">
            <FiUsers className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No employees found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm ? 'Try adjusting your search terms' : 'Get started by creating a new employee'}
            </p>
            {!searchTerm && (
              <div className="mt-6">
                <Link
                  href="/employees/create"
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  <FiPlus className="h-4 w-4 mr-2" />
                  Add Employee
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}