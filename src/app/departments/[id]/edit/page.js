"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { FiArrowLeft } from "react-icons/fi";
import Link from "next/link";
import Select from "react-select";
import {
  getDepartmentById,
  updateDepartment,
} from "@/services/departments/api";
import { getAllCompanies } from "@/services/company/api";
import LoadingSpinner from "@/components/LoadingSpinner";
import ToastArrayOfErrors from "@/lib/ToastArrayOfErrors";
export default function EditDepartmentPage() {
  const params = useParams();
  const router = useRouter();
  const [companies, setCompanies] = useState([]);
  const [department, setDepartment] = useState(null);
  const [loading, setLoading] = useState(false);

  const companyOptions = companies.map((company) => ({
    value: company.name,
    label: company.name,
  }));

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    setValue,
    reset,
  } = useForm({
    defaultValues: {
      department_name: "",
      company: null,
    },
  });

  useEffect(() => {
    const fetchDepartment = async () => {
      try {
        setLoading(true);
        const response = await getDepartmentById(params.id);
        console.log(response);
        const { status, data } = response;
        if (status === 200) {
          setDepartment(data.data.department);
          reset({
            department_name: data.data.department.department_name,
          });
        }
      } catch (error) {
        console.error("Error fetching department:", error);
        ToastArrayOfErrors(
          error?.response?.data?.errors,
          error?.response?.data?.message || "Failed to fetch department"
        );
      } finally {
        setLoading(false);
      }
    };
    fetchDepartment();
  }, [params.id]);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        setLoading(true);
        const response = await getAllCompanies();
        if (department) {
          const defaultCompany = companyOptions.find(
            (option) => option.value === department.company
          );
          setValue("company", defaultCompany);
        }
        console.log(response);
        if (response.status === 200) {
          setCompanies(response.data.message);
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
  }, [department]);

  if (!department) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Department Not Found
          </h1>
          <p className="text-gray-600 mb-4">
            The requested department could not be found.
          </p>
          <Link
            href="/departments"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            <FiArrowLeft className="h-4 w-4 mr-2" />
            Back to Departments
          </Link>
        </div>
      </div>
    );
  }

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await updateDepartment({
        ...data,
        name: department.name,
        company: data.company.value,
      });
      console.log(response);
      if (response.status === 200) {
        router.push(`/departments/${department.name}`);
      }
    } catch (error) {
      console.error("Error updating department:", error);
      ToastArrayOfErrors(
        error?.response?.data?.errors,
        error?.response?.data?.message || "Failed to update department"
      );
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return <LoadingSpinner />;
  }
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6 border">
        <div className="flex items-center space-x-4">
          <Link
            href={`/departments/${department.name}`}
            className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
          >
            <FiArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Edit {department.department_name}
            </h1>
            <p className="text-gray-600">Update department information</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-lg shadow-sm p-6 border">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="department_name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Department Name *
              </label>
              <input
                {...register("department_name", {
                  required: "Department name is required",
                })}
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter department name"
              />
              {errors.department_name && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.department_name.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company *
              </label>
              <Controller
                name="company"
                control={control}
                rules={{ required: "Company is required" }}
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
                        borderColor: state.isFocused ? "#3B82F6" : "#D1D5DB",
                        boxShadow: state.isFocused
                          ? "0 0 0 2px rgba(59, 130, 246, 0.5)"
                          : "none",
                        "&:hover": {
                          borderColor: state.isFocused ? "#3B82F6" : "#9CA3AF",
                        },
                      }),
                    }}
                  />
                )}
              />
              {errors.company && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.company.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <Link
              href={`/departments/${department.name}`}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? "Updating..." : "Update Department"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
