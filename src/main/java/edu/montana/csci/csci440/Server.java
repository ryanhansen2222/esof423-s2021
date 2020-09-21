package edu.montana.csci.csci440;

import edu.montana.csci.csci440.model.Employee;
import edu.montana.csci.csci440.model.Track;
import edu.montana.csci.csci440.util.Web;

import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.List;

import static spark.Spark.*;

class Server {

    public static void main(String[] args) {

        /* ========================================================================= */
        /* Poor Mans Rails Implementation                                            */
        /* ========================================================================= */
        before((request, response) -> Web.set(request, response));
        exception(Exception.class, (e, request, response) -> {
            System.out.println("################################################################");
            System.out.println("#  ERROR ");
            System.out.println("################################################################");
            System.out.println("An error occured: " + e.getMessage());
            e.printStackTrace();

            StringWriter sw = new StringWriter();
            PrintWriter pw = new PrintWriter(sw);
            e.printStackTrace(pw);
            response.status(500);
            response.body(Web.renderTemplate("templates/error.vm",
                    "error", e,
                    "stacktrace", sw.getBuffer().toString()));
        });

        /* ========================================================================= */
        /* Root Path                                                                 */
        /* ========================================================================= */

        get("/", (req, resp) -> {
            Web.message("SQL Is Awesome");
            return Web.renderTemplate("templates/index.vm");
        });

        /* ========================================================================= */
        /* Employee                                                                  */
        /* ========================================================================= */
        {
            /* CREATE */
            get("/employees/new", (req, resp) -> {
                Employee employee = new Employee();
                return Web.renderTemplate("templates/employees/new.vm", "employee", employee);
            });

            post("/employees/new", (req, resp) -> {
                Employee emp = new Employee();
                Web.putValuesInto(emp, "FirstName", "LastName");
                if (emp.create()) {
                    Web.message("Created An Employee!");
                    return Web.redirect("/employees/" + emp.getEmployeeId());
                } else {
                    Web.error("Could Not Create An Employee!");
                    return Web.renderTemplate("templates/employees/new.vm",
                            "employee", emp);
                }
            });

            /* READ */
            get("/employees", (req, resp) -> {
                List<Employee> employees = Employee.all(1, 10);
                return Web.renderTemplate("templates/employees/index.vm",
                        "employees", employees);
            });

            get("/employees/:id", (req, resp) -> {
                Employee employee = Employee.find(Integer.parseInt(req.params(":id")));
                return Web.renderTemplate("templates/employees/show.vm",
                        "employee", employee);
            });

            /* UPDATE */
            get("/employees/:id/edit", (req, resp) -> {
                Employee employee = Employee.find(Integer.parseInt(req.params(":id")));
                return Web.renderTemplate("templates/employees/edit.vm",
                        "employee", employee);
            });

            post("/employees/:id", (req, resp) -> {
                Employee emp = Employee.find(Integer.parseInt(req.params(":id")));
                Web.putValuesInto(emp, "FirstName", "LastName");
                if (emp.update()) {
                    Web.message("Updated Employee!");
                    return Web.redirect("/employees/" + emp.getEmployeeId());
                } else {
                    Web.error("Could Not Update Employee!");
                    return Web.renderTemplate("templates/employees/edit.vm",
                            "employee", emp);
                }
            });

            /* DELETE */
            get("/employees/:id/delete", (req, resp) -> {
                Employee employee = Employee.find(Integer.parseInt(req.params(":id")));
                employee.delete();
                Web.message("Deleted Employee " + employee.getEmail());
                return Web.redirect("/employees");
            });
        }

        /* ========================================================================= */
        /* Tracks                                                                  */
        /* ========================================================================= */
        {
            /* CREATE */
            get("/tracks/new", (req, resp) -> {
                Track track = new Track();
                return Web.renderTemplate("templates/tracks/new.vm", "employee", track);
            });

            post("/tracks/new", (req, resp) -> {
                Track track = new Track();
                Web.putValuesInto(track, "Name", "Milliseconds", "Bytes", "UnitPrice");
                if (track.create()) {
                    Web.message("Created A Track!");
                    return Web.redirect("/tracks/" + track.getTrackId());
                } else {
                    Web.error("Could Not Create A Track!");
                    return Web.renderTemplate("templates/tracks/new.vm",
                            "track", track);
                }
            });

            /* READ */
            get("/tracks", (req, resp) -> {
                List<Track> tracks = Track.all(1, 10);
                return Web.renderTemplate("templates/tracks/index.vm",
                        "tracks", tracks);
            });

            get("/tracks/:id", (req, resp) -> {
                Track track = Track.find(Integer.parseInt(req.params(":id")));
                return Web.renderTemplate("templates/tracks/show.vm",
                        "track", track);
            });

            /* UPDATE */
            get("/tracks/:id/edit", (req, resp) -> {
                Track track = Track.find(Integer.parseInt(req.params(":id")));
                return Web.renderTemplate("templates/tracks/edit.vm",
                        "track", track);
            });

            post("/tracks/:id", (req, resp) -> {
                Track track = Track.find(Integer.parseInt(req.params(":id")));
                Web.putValuesInto(track, "Name", "Milliseconds", "Bytes", "UnitPrice");
                if (track.update()) {
                    Web.message("Updated Track!");
                    return Web.redirect("/tracks/" + track.getTrackId());
                } else {
                    Web.error("Could Not Update Employee!");
                    return Web.renderTemplate("templates/tracks/edit.vm",
                            "track", track);
                }
            });

            /* DELETE */
            get("/tracks/:id/delete", (req, resp) -> {
                Track track = Track.find(Integer.parseInt(req.params(":id")));
                track.delete();
                Web.message("Deleted Track " + track.getName());
                return Web.redirect("/tracks");
            });
        }


    }

}