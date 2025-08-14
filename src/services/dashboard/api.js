import instance from "../apiConfig";
const BASE_ROUTE = "method/employee_app.employee_app.api.dashboard."; 
const WORKFLOW_BASE_ROUTE = "method/frappe.workflow.doctype.workflow.workflow.";
const EMPLOYEE_BASE_ROUTE = "method/employee_app.employee_app.api.employee.";
export const getRecentlyHiredEmployees = () =>
  instance.get(`${EMPLOYEE_BASE_ROUTE}get_recently_hired_employees`);



/***
 * get all workflow statstistcs 
 * @params doctype (Employee), workflow_state_field (workflow_state), states like ["Draft", "Pending Approval", "Approved"]
 * @returns { "message": [{ "workflow_state": "Application Received","count": 6}    ]}
 */
export const getWrokFLowStats = () =>
  instance.get(`${WORKFLOW_BASE_ROUTE}get_workflow_state_count`);
//

/***
 * GET workflow for single employee
 * @params {doc: {doctype: "Employee", name: "8mvcrhc4nj"}}
 * @returns {transitions: [{state: "Draft", next_state: "Pending Approval", next_state_label: "Pending Approval"}, {state: "Pending Approval", next_state: "Approved", next_state_label: "Approved"}]}
 */
export const getWorkFlowStatsForEmployee = () =>
  instance.get(
    `http://employee.site:8002/api/method/frappe.model.workflow.get_transitions`
  );

export const getDashboardStats = () =>
  instance.get(`${BASE_ROUTE}get_dashboard_stats`);
  