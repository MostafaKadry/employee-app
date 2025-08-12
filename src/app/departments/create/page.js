'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { useApp } from '@/context/AppContext';
import { FiArrowLeft } from 'react-icons/fi';
import Link from 'next/link';
import Select from 'react-select';
import { toast } from 'react-hot-toast';
import ToastArrayOfErrors from '@/lib/ToastArrayOfErrors';
import LoadingSpinner from '@/components/LoadingSpinner';
import { createDepartment } from '@/services/departments/api';
import { getAllCompanies } from '@/services/company/api';

export default function CreateDepartmentPage() {
  const router = useRouter();
  const [companies, setCompanies] = useState([]);
  const { register, handleSubmit, control, formState: { errors, isSubmitting } } = useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCompanies = async () => {
      setLoading(true);
      try {
        const res = await getAllCompanies();
        console.log(res);
        if (res.status === 200) {
          setCompanies(res.data.message);
        }
      } catch (error) {
        console.error("Error fetching companies:", error);
        ToastArrayOfErrors(
          error?.response?.data?.errors,
          error?.response?.data?.message || "Failed to fetch companies"
        );
      } finally {
        setLoading(false);
      }
    };
    fetchCompanies();
  }, []);

  const companyOptions = companies.map(company => ({
    value: company.name,
    label: company.name
  }));

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const res = await createDepartment({
        ...data,
        company: data.company.value
      });
      console.log(res);
      toast.success("Department created successfully");
      router.push("/departments");
    } catch (error) {
      console.error("Error creating department:", error);
      ToastArrayOfErrors(
        error?.response?.data?.errors,
        error?.response?.data?.message || "Failed to create department"
      );
    } finally {
      setLoading(false);
    }
  };
  if(loading){
    return <LoadingSpinner />;
  }
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6 border">
        <div className="flex items-center space-x-4">
          <Link
            href="/departments"
            className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
          >
            <FiArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Create Department</h1>
            <p className="text-gray-600">Add a new department to your organization</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-lg shadow-sm p-6 border">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="department_name" className="block text-sm font-medium text-gray-700 mb-1">
                Department Name *
              </label>
              <input
                {...register('department_name', { required: 'Department name is required' })}
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter department name"
              />
              {errors.department_name && (
                <p className="mt-1 text-sm text-red-600">{errors.department_name.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company *
              </label>
              <Controller
                name="company"
                control={control}
                rules={{ required: 'Company is required' }}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={companyOptions}
                    placeholder="Select a company"
                    className="react-select-container"
                    classNamePrefix="react-select"
                    styles={{
                      control: (base, state) => ({
                        ...base,
                        borderColor: state.isFocused ? '#3B82F6' : '#D1D5DB',
                        boxShadow: state.isFocused ? '0 0 0 2px rgba(59, 130, 246, 0.5)' : 'none',
                        '&:hover': {
                          borderColor: state.isFocused ? '#3B82F6' : '#9CA3AF',
                        },
                      }),
                    }}
                  />
                )}
              />
              {errors.company && (
                <p className="mt-1 text-sm text-red-600">{errors.company.message}</p>
              )}
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <Link
              href="/departments"
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? 'Creating...' : 'Create Department'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}