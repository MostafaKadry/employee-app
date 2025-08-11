'use client';
import { useApp } from '@/context/AppContext';
import { FiBriefcase, FiUsers, FiTrendingUp } from 'react-icons/fi';
import { BsBuildingFill } from "react-icons/bs";
export default function DashboardPage() {
  const { companies, departments, employees } = useApp();

  const stats = [
    {
      name: 'Total Companies',
      value: companies.length,
      icon: BsBuildingFill,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700',
    },
    {
      name: 'Total Departments',
      value: departments.length,
      icon: FiBriefcase,
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-700',
    },
    {
      name: 'Total Employees',
      value: employees.length,
      icon: FiUsers,
      color: 'bg-purple-500',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-700',
    },
    {
      name: 'Avg Employees/Company',
      value: companies.length > 0 ? Math.round(employees.length / companies.length) : 0,
      icon: FiTrendingUp,
      color: 'bg-orange-500',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-700',
    },
  ];

  const recentEmployees = employees.slice(-5).reverse();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6 border">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome to your Employee Management System</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.name}
              className={`${stat.bgColor} rounded-lg p-6 border hover:shadow-md transition-shadow`}
            >
              <div className="flex items-center">
                <div className={`${stat.color} rounded-lg p-3 mr-4`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className={`text-2xl font-bold ${stat.textColor}`}>{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.name}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Employees */}
        <div className="bg-white rounded-lg shadow-sm p-6 border">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Employees</h2>
          <div className="space-y-3">
            {recentEmployees.length > 0 ? (
              recentEmployees.map((employee) => (
                <div key={employee.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">
                      {employee.employee_name}
                    </p>
                    <p className="text-sm text-gray-600">{employee.designation_positiontitle}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-700">{employee.company}</p>
                    <p className="text-xs text-gray-500">{employee.department}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">No employees found</p>
            )}
          </div>
        </div>

        {/* Company Overview */}
        <div className="bg-white rounded-lg shadow-sm p-6 border">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Company Overview</h2>
          <div className="space-y-3">
            {companies.length > 0 ? (
              companies.map((company) => {
                const companyEmployees = employees.filter(emp => emp.company === company.name);
                const companyDepartments = departments.filter(dept => dept.company === company.name);
                
                return (
                  <div key={company.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{company.company_name}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-700">
                        {companyEmployees.length} Employees
                      </p>
                      <p className="text-xs text-gray-500">
                        {companyDepartments.length} Departments
                      </p>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-gray-500 text-center py-4">No companies found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}