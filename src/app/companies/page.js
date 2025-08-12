'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { FiPlus, FiEdit2, FiTrash2, FiEye, FiSearch } from 'react-icons/fi';
import { getAllCompanies, deleteCompany } from '@/services/company/api';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import LoadingSpinner from '@/components/LoadingSpinner';
import { FaBuilding } from "react-icons/fa";
export default function CompaniesPage() {
  const { companies, dispatch } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  console.log(companies);
  const filteredCompanies = companies?.filter(company =>
    company?.name?.toLowerCase().includes(searchTerm.toLowerCase())  );

  const handleDelete = async (company) => {
    Swal.fire({
      title: 'Are you sure?',
      text: `This will delete ${company.name} and cannot be undone!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#EF4444',
      cancelButtonColor: '#6B7280',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await deleteCompany(company.name);
        console.log(res);
        if (res.status === 200) {
          dispatch({ type: 'SET_COMPANIES', payload: res.data.message });
          console.log(companies);
        }
      }
    });
  };

  useEffect(() => {
    const fetchCompanies = async () => {
      setLoading(true);
      try {
        const res = await getAllCompanies();
        console.log(res);
        if (res.status === 200) {
          dispatch({ type: 'SET_COMPANIES', payload: res.data.message });
          console.log(companies);
        }
      } catch (error) {
        console.error('Error fetching companies:', error);
        toast.error(error?.response?.data?._error_message||error?.response?.data?.message ||'Failed to fetch companies');
      } finally {
        setLoading(false);
      }
    };
    fetchCompanies();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6 border">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Companies</h1>
            <p className="text-gray-600">Manage your organization's companies</p>
          </div>
          <Link
            href="/companies/create"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            <FiPlus className="h-4 w-4 mr-2" />
            Add Company
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
            placeholder="Search companies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Companies List */}
      {loading ? (
        <LoadingSpinner size="lg" />
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        {filteredCompanies.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Company
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Employees
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Departments
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {filteredCompanies.map((company) => (
                  <tr key={company.name} className="hover:bg-gray-50/80 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-md bg-blue-50 flex items-center justify-center mr-3">
                          <FaBuilding className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-gray-900">{company.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center mr-2">
                          <span className="text-xs font-medium text-green-600">{company.number_of_employees}</span>
                        </div>
                        <span className="text-sm text-gray-600">employees</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center mr-2">
                          <span className="text-xs font-medium text-purple-600">{company.number_of_departments}</span>
                        </div>
                        <span className="text-sm text-gray-600">departments</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-3">
                        <Link
                          href={`/companies/${company.name}`}
                          className="text-blue-500 hover:text-blue-700 p-2 rounded-full hover:bg-blue-50 transition-colors"
                          title="View"
                        >
                          <FiEye className="h-4 w-4" />
                        </Link>
                        <Link
                          href={`/companies/${company.name}/edit`}
                          className="text-green-500 hover:text-green-700 p-2 rounded-full hover:bg-green-50 transition-colors"
                          title="Edit"
                        >
                          <FiEdit2 className="h-4 w-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(company)}
                          className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition-colors"
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
          <div className="text-center py-16">
            <div className="mx-auto h-16 w-16 rounded-full bg-gray-50 flex items-center justify-center">
              <FaBuilding className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900">No companies found</h3>
            <p className="mt-2 text-sm text-gray-500 max-w-md mx-auto">
              {searchTerm ? 'Try adjusting your search terms' : 'Get started by creating your first company'}
            </p>
            {!searchTerm && (
              <div className="mt-6">
                <Link
                  href="/companies/create"
                  className="inline-flex items-center px-4 py-2.5 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  <FiPlus className="h-4 w-4 mr-2" />
                  Add Company
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
      )}
    </div>
  );
}