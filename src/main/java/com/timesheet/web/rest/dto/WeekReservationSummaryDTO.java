package com.timesheet.web.rest.dto;

import com.timesheet.domain.Project;
import lombok.Data;

/**
 * @author Karol Kornecki
 */
@Data
public class WeekReservationSummaryDTO implements Comparable<WeekReservationSummaryDTO> {

    private ProjectDTO project;

    private int hours;

    public WeekReservationSummaryDTO(Project project, int hours) {
        this.project = new ProjectDTO(project);
        this.hours = hours;
    }

    @Override
    public int compareTo(WeekReservationSummaryDTO o) {
        if (o == null) {
            return 1;
        }
        return o.hours - hours;
    }
}
