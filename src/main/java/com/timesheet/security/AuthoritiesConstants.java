package com.timesheet.security;

/**
 * Constants for Spring Security authorities.
 */
public final class AuthoritiesConstants {

    public static final String ADMIN = "ROLE_ADMIN";

    public static final String MANGER = "ROLE_MANAGER";

    public static final String TEAM_LEADER = "ROLE_TEAM_LEADER";

    /**
     * User with this role can see employees' salary.
     */
    public static final String SALARY = "ROLE_SALARY";

    public static final String USER = "ROLE_USER";

    public static final String ANONYMOUS = "ROLE_ANONYMOUS";

    private AuthoritiesConstants() {
    }
}
