package edu.montana.csci.csci440;

import edu.montana.csci.csci440.model.Album;
import edu.montana.csci.csci440.model.Artist;
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
        /* Employees
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
        /* Tracks 
        /* ========================================================================= */
        {
            /* CREATE */
            get("/tracks/new", (req, resp) -> {
                Track track = new Track();
                return Web.renderTemplate("templates/tracks/new.vm", "album", track);
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

        /* ========================================================================= */
        /* Albums
        /* ========================================================================= */
        {
            /* CREATE */
            get("/albums/new", (req, resp) -> {
                Album album = new Album();
                return Web.renderTemplate("templates/albums/new.vm", "album", album);
            });

            post("/albums/new", (req, resp) -> {
                Album album = new Album();
                Web.putValuesInto(album, "Title");
                if (album.create()) {
                    Web.message("Created A Album!");
                    return Web.redirect("/albums/" + album.getAlbumId());
                } else {
                    Web.error("Could Not Create A Album!");
                    return Web.renderTemplate("templates/albums/new.vm",
                            "album", album);
                }
            });

            /* READ */
            get("/albums", (req, resp) -> {
                List<Album> albums = Album.all(1, 10);
                return Web.renderTemplate("templates/albums/index.vm",
                        "albums", albums);
            });

            get("/albums/:id", (req, resp) -> {
                Album album = Album.find(Integer.parseInt(req.params(":id")));
                return Web.renderTemplate("templates/albums/show.vm",
                        "album", album);
            });

            /* UPDATE */
            get("/albums/:id/edit", (req, resp) -> {
                Album album = Album.find(Integer.parseInt(req.params(":id")));
                return Web.renderTemplate("templates/albums/edit.vm",
                        "album", album);
            });

            post("/albums/:id", (req, resp) -> {
                Album album = Album.find(Integer.parseInt(req.params(":id")));
                Web.putValuesInto(album, "Title");
                if (album.update()) {
                    Web.message("Updated Album!");
                    return Web.redirect("/albums/" + album.getAlbumId());
                } else {
                    Web.error("Could Not Update Employee!");
                    return Web.renderTemplate("templates/albums/edit.vm",
                            "album", album);
                }
            });

            /* DELETE */
            get("/albums/:id/delete", (req, resp) -> {
                Album album = Album.find(Integer.parseInt(req.params(":id")));
                album.delete();
                Web.message("Deleted Album " + album.getTitle());
                return Web.redirect("/albums");
            });
        }        
        
        /* ========================================================================= */
        /* Artists
        /* ========================================================================= */
        {
            /* CREATE */
            get("/artists/new", (req, resp) -> {
                Artist artist = new Artist();
                return Web.renderTemplate("templates/artists/new.vm", "artist", artist);
            });

            post("/artists/new", (req, resp) -> {
                Artist artist = new Artist();
                Web.putValuesInto(artist, "Name");
                if (artist.create()) {
                    Web.message("Created A Artist!");
                    return Web.redirect("/artists/" + artist.getArtistId());
                } else {
                    Web.error("Could Not Create A Artist!");
                    return Web.renderTemplate("templates/artists/new.vm",
                            "artist", artist);
                }
            });

            /* READ */
            get("/artists", (req, resp) -> {
                List<Artist> artists = Artist.all(1, 10);
                return Web.renderTemplate("templates/artists/index.vm",
                        "artists", artists);
            });

            get("/artists/:id", (req, resp) -> {
                Artist artist = Artist.find(Integer.parseInt(req.params(":id")));
                return Web.renderTemplate("templates/artists/show.vm",
                        "artist", artist);
            });

            /* UPDATE */
            get("/artists/:id/edit", (req, resp) -> {
                Artist artist = Artist.find(Integer.parseInt(req.params(":id")));
                return Web.renderTemplate("templates/artists/edit.vm",
                        "artist", artist);
            });

            post("/artists/:id", (req, resp) -> {
                Artist artist = Artist.find(Integer.parseInt(req.params(":id")));
                Web.putValuesInto(artist, "Name");
                if (artist.update()) {
                    Web.message("Updated Artist!");
                    return Web.redirect("/artists/" + artist.getArtistId());
                } else {
                    Web.error("Could Not Update Employee!");
                    return Web.renderTemplate("templates/artists/edit.vm",
                            "artist", artist);
                }
            });

            /* DELETE */
            get("/artists/:id/delete", (req, resp) -> {
                Artist artist = Artist.find(Integer.parseInt(req.params(":id")));
                artist.delete();
                Web.message("Deleted Artist " + artist.getName());
                return Web.redirect("/artists");
            });
        }
    }

}