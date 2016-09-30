package com.timesheet.domain;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.util.Properties;

/**
 * @author Karol Kornecki
 */
public final class StatusCode {

    private static final Logger LOG = LoggerFactory.getLogger(StatusCode.class);

    public static final String STATUS_NEW;
    public static final String STATUS_SAVED;
    public static final String STATUS_PRE_APPROVED;
    public static final String STATUS_APPROVED;
    public static final String STATUS_REJECTED;

    static {
        Properties props = new Properties();
        try {
            props.load(Thread.currentThread().getContextClassLoader().getResourceAsStream("status_code.properties"));
            STATUS_NEW = props.getProperty("STATUS_NEW");
            STATUS_SAVED = props.getProperty("STATUS_SAVED");
            STATUS_PRE_APPROVED = props.getProperty("STATUS_PRE_APPROVED");
            STATUS_APPROVED = props.getProperty("STATUS_APPROVED");
            STATUS_REJECTED = props.getProperty("STATUS_REJECTED");
        } catch (IOException e) {
            LOG.error("Unable to load properties file: status_code.properties", e);
            throw new RuntimeException(e);
        }
    }
}
