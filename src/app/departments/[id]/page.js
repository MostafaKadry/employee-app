"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { FiArrowLeft, FiEdit, FiUsers } from "react-icons/fi";
import { FaBuilding } from "react-icons/fa";
import { getDepartmentById } from "@/services/departments/api";
import { getAllEmployees } from "@/services/employee/api";
import LoadingSpinner from "@/components/LoadingSpinner";
import ToastArrayOfErrors from "@/lib/ToastArrayOfErrors";

export default function ViewDepartmentPage() {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const { dispatch } = useApp();
  const [department, setDepartment] = useState(null);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchDepartment = async () => {
      setLoading(true);
      try {
        const res = await getDepartmentById(params.id);
        console.log(res);
        if (res.status === 200) {
          setDepartment(res.data.data);
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
    const fetchEmployees = async () => {
      setLoading(true);
      try {
        const res = await getAllEmployees();
        console.log(res);
        if (res.status === 200) {
          setEmployees(res.data.data);
        }
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
  }, [params.id]);

  if (loading) {
    return <LoadingSpinner />;
  }

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

  const departmentEmployees = employees.filter(
    (e) => e.department === department.name
  );
  console.log(employees);
  console.log(departmentEmployees);
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6 border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link
              href="/departments"
              className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            >
              <FiArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {department.department_name}
              </h1>
              <p className="text-gray-600">Department Details</p>
            </div>
          </div>
          <Link
            href={`/departments/${department.name}/edit`}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            <FiEdit className="h-4 w-4 mr-2" />
            Edit Department
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Department Information */}
        <div className="bg-white rounded-lg shadow-sm p-6 border">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Department Information
          </h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <FaBuilding className="h-5 w-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-700">Company</p>
                <p className="text-sm text-gray-900">{department.company}</p>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700 mb-1">
                Number of Employees
              </p>
              <p className="text-sm text-gray-900">
                {department.number_of_employees || "No employees"}
              </p>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="bg-white rounded-lg shadow-sm p-6 border">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Statistics
          </h2>
          <div className="bg-blue-50 rounded-lg p-6">
            <div className="flex items-center">
              <div className="bg-blue-500 rounded-lg p-3 mr-4">
                <FiUsers className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-700">
                  {department.number_of_employees}
                </p>
                <p className="text-sm text-blue-600">Employees</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Employees */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Department Employees
          </h2>
        </div>
        <div className="p-6">
          {departmentEmployees.length > 0 ? (
            <div className="space-y-3">
              {departmentEmployees.map((employee) => (
                <div
                  key={employee.name}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-gray-900">
                      {employee.employee_name} 
                    </p>
                    <p className="text-sm text-gray-600">{employee.designation_positiontitle}</p>
                    <p className="text-sm text-gray-600">{employee.company}</p>
                    <p className="text-sm text-gray-500">{employee.mobile_number}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-700">
                      Hire Date
                    </p>
                    <p className="text-sm text-gray-600">
                      {(employee.days_employed)}
                    </p>
                    <Link
                      href={`/employees/${employee.name}`}
                      className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <FiUsers className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                No employees found
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                This department doesn't have any employees yet.
              </p>
              <div className="mt-6">
                <Link
                  href="/employees/create"
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                >
                  Add Employee
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
