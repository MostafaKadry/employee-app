"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useApp } from "@/context/AppContext";
import { FiArrowLeft } from "react-icons/fi";
import Link from "next/link";
import toast from "react-hot-toast";
import { createCompany } from "@/services/company/api";
import LoadingSpinner from "@/components/LoadingSpinner";
export default function CreateCompanyPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await createCompany(data);
      console.log(res);
      toast.success("Company created successfully");
      router.push("/companies");
    } catch (error) {
      console.error("Error creating company:", error);
      if (error?.response?.data?.errors instanceof Array && error?.response?.data?.errors.length > 0) {
        error?.response?.data?.errors.forEach((error) => {
          toast.error(error.message || "Failed to create company");
        });
      } else {
        toast.error(error?.response?.data?._error_message || error?.response?.data?.message || "Failed to create company");
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6 border">
        <div className="flex items-center space-x-4">
          <Link
            href="/companies"
            className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
          >
            <FiArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Create Company</h1>
            <p className="text-gray-600">
              Add a new company to your organization
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-lg shadow-sm p-6 border">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="company_name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Company Name *
              </label>
              <input
                {...register("company_name", { required: "Company name is required" })}
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter company name"
              />
              {errors.company_name && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.company_name.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <Link
              href="/companies"
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? "Creating..." : "Create Company"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
