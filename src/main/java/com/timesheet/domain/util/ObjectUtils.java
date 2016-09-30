package com.timesheet.domain.util;

/**
 * @author Karol Kornecki
 */
public class ObjectUtils {

    public static boolean notNull(Object object) {
        return object != null;
    }

    public static boolean isNull(Object object) {
        return object == null;
    }

    public static boolean equals(Object obj1, Object obj2) {
        return org.apache.commons.lang.ObjectUtils.equals(obj1, obj2);
    }
}
