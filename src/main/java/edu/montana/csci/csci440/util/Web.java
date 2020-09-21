package edu.montana.csci.csci440.util;

import spark.ModelAndView;
import spark.Request;
import spark.Response;
import spark.Session;
import spark.template.velocity.VelocityTemplateEngine;

import java.lang.reflect.Method;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Objects;

public class Web {

    static ThreadLocal<Request> _request = new ThreadLocal<>();
    static ThreadLocal<Response> _response = new ThreadLocal<>();
    static ThreadLocal<Exception> _exception = new ThreadLocal<>();

    public static void set(Request request, Response response) {
        _request.set(request);
        _response.set(response);
    }

    public static Request getRequest(){
        return _request.get();
    }
    public static Response getResponse(){ return _response.get(); }

    public static String renderTemplate(String index, Object... args) {
        HashMap<Object, Object> map = new HashMap<>();
        for (int i = 0; i < args.length; i++) {
            Object arg = args[i];
            if (++i < args.length) {
                map.put(arg, args[i]);
            }
        }
        map.put("message", getMessage());
        map.put("error", getError());
        return new VelocityTemplateEngine().render(new ModelAndView(map, index));
    }

    public static void putValuesInto(Object obj, String... properties) {
        Request req = getRequest();
        try {
            Class<?> clazz = obj.getClass();
            for (String property : properties) {
                Method method = findMethod(clazz, "set" + property);
                if (method.getParameterTypes()[0] == Integer.class || method.getParameterTypes()[0] == Integer.TYPE) {
                    int i = Integer.parseInt(req.queryParams(property));
                    method.invoke(obj, i);
                }
                if (method.getParameterTypes()[0] == Date.class) {
                    SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
                    Date date = formatter.parse(req.queryParams(property));
                    method.invoke(obj, date);
                }
                if (method.getParameterTypes()[0] == String.class) {
                    method.invoke(obj, req.queryParams(property));
                }
            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    private static Method findMethod(Class<?> clazz, String s) {
        Method[] methods = clazz.getMethods();
        for (Method method : methods) {
            if (method.getName().equals(s)) {
                return method;
            }
        }
        throw new IllegalStateException("Unanable to find a method named " + s);
    }

    public static void message(String s) {
        getRequest().session().attribute(":message", s);
    }

    public static String getMessage() {
        Session session = getRequest().session();
        String message = session.attribute(":message");
        session.removeAttribute(":message");
        return message;
    }

    public static void error(String s) {
        getRequest().session().attribute(":error", s);
    }

    public static String getError() {
        Session session = getRequest().session();
        String message = session.attribute(":error");
        session.removeAttribute(":message");
        return message;
    }

    public static Object redirect(String location) {
        getResponse().redirect(location);
        return "";
    }

    public static void setException(Exception e) {
        _exception.set(e);
    }

    public static Exception getException() {
        return _exception.get();
    }
}
