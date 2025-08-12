'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useApp } from '@/context/AppContext';
import { FiArrowLeft } from 'react-icons/fi';
import Link from 'next/link';
import {getCompanyById, updateCompany} from '@/services/company/api';
import LoadingSpinner from '@/components/LoadingSpinner';
import toast from 'react-hot-toast';
export default function EditCompanyPage() {
  const params = useParams();
  const router = useRouter();
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm({
    defaultValues: company || {}
  });

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        setLoading(true);
        const response = await getCompanyById(params.id);
        console.log(response.data.message.name);
        setCompany(response.data.message);
        reset(response.data.message);
      } catch (error) {
        console.error('Error fetching company:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCompany();
  
  }, [params.id, reset]);

  if (loading) {
    return <LoadingSpinner />;
  }

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

  const onSubmit = async (data) => {
    console.log(data);
    try {
      setLoading(true);
      const res = await updateCompany({name: data.name, company_name: data.company_name});
      setCompany(res.data.message);
      reset(res.data.message);
      console.log(res);
      toast.success('Company updated successfully');
      // router.push(`/companies/${company.name}`);
    } catch (error) {
      console.error('Error updating company:', error);
      if (error?.response?.data?.errors instanceof Array && error?.response?.data?.errors.length > 0) {
        error?.response?.data?.errors.forEach((error) => {
          toast.error(error.message || 'Failed to update company');
        });
      }else{
        toast.error(error?.response?.data?._error_message||error?.response?.data?.message ||'Failed to update company');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6 border">
        <div className="flex items-center space-x-4">
          <Link
            href={`/companies/${company.name}`}
            className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
          >
            <FiArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Edit {company.name}</h1>
            <p className="text-gray-600">Update company information</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-lg shadow-sm p-6 border">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="company_name" className="block text-sm font-medium text-gray-700 mb-1">
                Company Name *
              </label>
              <input
                {...register('company_name', { required: 'Company name is required' })}
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter company name"
                
              />
              {errors.company_name && (
                <p className="mt-1 text-sm text-red-600">{errors.company_name.message}</p>
              )}
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <Link
              href={`/companies/${company.name}`}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isSubmitting || loading}
              className="px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting || loading ? 'Updating...' : 'Update Company'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}