package edu.montana.csci.csci440.helpers;

import edu.montana.csci.csci440.model.Employee;

import java.util.List;
import java.util.Map;

public class EmployeeHelper {
    public static String makeTreeRoot(Employee employee, Map<Long, List<Employee>> employeeMap) {
        return "<ul>" + makeTree(employee, employeeMap) + "</ul>";
    }

    // TODO - currently this method just usese the employee.getReports() function, which
    //  issues a query.  Change that to use the employeeMap variable instead
    public static String makeTree(Employee employee, Map<Long, List<Employee>> employeeMap) {
        String list = "<li><a href='/employees" + employee.getEmployeeId() + "'>"
                + employee.getEmail() + "</a><ul>";
        List<Employee> reports = employee.getReports();
        for (Employee report : reports) {
            list += makeTree(report, employeeMap);
        }
        return list + "</ul></li>";
    }
}
