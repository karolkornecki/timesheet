package com.timesheet.web.rest.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * @author Karol Kornecki
 */
public class WeekdayResponseDTO {

    @Setter
    private List<WeekDayDTO> weekDays = new ArrayList<>();

    @Setter
    private List<WeekReservationSummaryDTO> summary = new ArrayList<>();

    @Setter
    @Getter
    private String weekDateRangeLabel;

    public List<WeekDayDTO> getWeekDays() {
        return Collections.unmodifiableList(weekDays);
    }

    public List<WeekReservationSummaryDTO> getSummary() {
        return Collections.unmodifiableList(summary);
    }
}
