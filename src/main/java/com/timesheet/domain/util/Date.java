package com.timesheet.domain.util;

import com.timesheet.domain.Constants;

import java.time.LocalDate;

/**
 * @author Karol Kornecki
 */
public class Date {

    public static LocalDate getFirstDayOfWeek(Integer offset, LocalDate date) {
        return date.minusDays(date.getDayOfWeek().getValue() - (offset * Constants.NUMBER_OF_DAYS_IN_WEEK) - 1);
    }

    public static LocalDate getLastDayOfWeek(Integer offset, LocalDate date) {
        return getFirstDayOfWeek(offset, date).plusDays(Constants.NUMBER_OF_DAYS_IN_WEEK - 1);
    }
}
