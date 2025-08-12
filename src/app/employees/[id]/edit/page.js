"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { useApp } from "@/context/AppContext";
import { FiArrowLeft } from "react-icons/fi";
import Link from "next/link";
import Select from "react-select";
import LoadingSpinner from "@/components/LoadingSpinner";
import ToastArrayOfErrors from "@/lib/ToastArrayOfErrors";
import { getEmployeeById, updateEmployee } from "@/services/employee/api";
import { getAllCompanies } from "@/services/company/api";
import { getAllDepartments } from "@/services/departments/api";
import toast from "react-hot-toast";
export default function EditEmployeePage() {
  const params = useParams();
  const router = useRouter();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [allDepartments, setAllDepartments] = useState([]);
  const [departmentOptions, setDepartmentOptions] = useState([]);

  const companyOptions = companies?.map((company) => ({
    value: company.name,
    label: company.name,
  }));

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm({
    defaultValues: {},
  });

  const selectedCompany = watch("company");

  const onSubmit = async (data) => {
    console.log({
      ...data,
      name: employee.name,
      company: data.company.value,
      department: data.department.value,
    });
    try {
      setLoading(true);
      const { status, hired_on, days_employed, ...allowedData } = data;

      const res = await updateEmployee({
        ...allowedData,
        name: employee.name,
        company: data.company.value,
        department: data.department.value,
      });

      console.log(res);
      if (res.status === 200) {
        toast.success("Employee updated successfully");
        router.push(`/employees/${employee.name}`);
      }
    } catch (error) {
      console.error("Error updating employee:", error);
      ToastArrayOfErrors(
        error?.response?.data?.errors,
        error.response?.data.exception ||
          error?.response?.data?.message || "Failed to update employee"
      );
    } finally {
      setLoading(false);
    }

  };
  useEffect(() => {
    const fetchCompaniesAndDepartments = async () => {
      setLoading(true);
      try {
        const [companiesRes, departmentsRes] = await Promise.all([
          getAllCompanies(),
          getAllDepartments(),
        ]);
        if (companiesRes.status === 200) {
          setCompanies(companiesRes.data.message);
        }
        if (departmentsRes.status === 200) {
          setAllDepartments(departmentsRes.data.message);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        ToastArrayOfErrors(
          error?.response?.data?.errors,
          error.response?.data.exception ||
            error?.response?.data?.message || "Failed to fetch companies and departments"
        );
      } finally {
        setLoading(false);
      }
    };
    fetchCompaniesAndDepartments();
  }, []);

  useEffect(() => {
    const fetchEmployee = async () => {
      setLoading(true);
      try {
        const res = await getEmployeeById(params.id);
        if (res.status === 200) {
          const employeeData = res.data.message;
          setEmployee(employeeData);
          const defaultValues = {
            address: employeeData.address,
            email_address: employeeData.email_address,
            employee_name: employeeData.employee_name,
            mobile_number: employeeData.mobile_number,
            designation_positiontitle: employeeData.designation_positiontitle,
            company: {
              value: employeeData.company,
              label: employeeData.company,
            },
            department: {
              value: employeeData.department,
              label: employeeData.department,
            },
          };
          
         
          reset(defaultValues);
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
    
  }, [params.id, reset]);


  useEffect(() => {
    if (selectedCompany) {
      const filteredDepartments = allDepartments
        .filter((dept) => dept.company === selectedCompany.value)
        .map((department) => ({
          value: department.name,
          label: department.name,
        }));
      setDepartmentOptions(filteredDepartments);
      if (selectedCompany.value !== employee?.company) {
        setValue("department", null);
      }
    } else {
      setDepartmentOptions([]);
    }
  }, [selectedCompany, setValue]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!employee) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Employee Not Found
          </h1>
          <p className="text-gray-600 mb-4">
            The requested employee could not be found.
          </p>
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
      <div className="bg-white rounded-lg shadow-sm p-6 border">
        <div className="flex items-center space-x-4">
          <Link
            href={`/employees/${employee.name}`}
            className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
          >
            <FiArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Edit {employee.employee_name} Profile
            </h1>
            <p className="text-gray-600">Update employee information</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 border">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="employee_name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Employee Name *
              </label>
              <input
                {...register("employee_name", {
                  required: "Employee name is required",
                })}
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter employee name"
              />
              {errors.employee_name && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.employee_name.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="email_address"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address *
              </label>
              <input
                {...register("email_address", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Please enter a valid email",
                  },
                })}
                type="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter email address"
              />
              {errors.email_address && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.email_address.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="mobile_number"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Phone Number *
              </label>
              <input
                {...register("mobile_number", { required: "Phone number is required" })}
                type="tel"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter phone number"
              />
              {errors.mobile_number && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.mobile_number.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="designation_positiontitle"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Position Title *
              </label>
              <input
                {...register("designation_positiontitle", { required: "Position title is required" })}
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter position title"
              />
              {errors.designation_positiontitle && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.designation_positiontitle.message}
                </p>
              )}
            </div>
              <div>
                <label 
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Address *
                </label>
                <input
                  {...register("address", { required: "Address is required" })}
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter address"
                />
                {errors.address && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.address.message}
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Department *
              </label>
              <Controller
                name="department"
                control={control}
                rules={{ required: "Department is required" }}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={departmentOptions}
                    placeholder="Select a department"
                    isDisabled={!selectedCompany}
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
              {!selectedCompany && (
                <p className="mt-1 text-sm text-gray-500">
                  Please select a company first
                </p>
              )}
              {errors.department && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.department.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <Link
              href={`/employees/${employee.name}`}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? "Updating..." : "Update Employee"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}