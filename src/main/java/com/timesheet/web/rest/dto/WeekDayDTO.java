package com.timesheet.web.rest.dto;

import lombok.Data;
import com.timesheet.domain.User;
import com.timesheet.domain.WeekDay;
import com.timesheet.domain.util.ObjectUtils;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collection;
import java.util.stream.Collectors;

/**
 * A DTO representing weekday with its reservations.
 *
 * @author Karol Kornecki
 */
@Data
public class WeekDayDTO implements Serializable {

    private Long id;

    private int day;

    private int month;

    private int year;

    private String description;

    private String status;

    private String statusCode;

    private Collection<ReservationDTO> reservations = new ArrayList<>();

    private ProjectDTO defaultProject;

    private int defaultHoursNumber;

    public WeekDayDTO() {
    }

    public WeekDayDTO(WeekDay weekDay) {
        id = weekDay.getId();
        day = weekDay.getDate().getDayOfMonth();
        month = weekDay.getDate().getMonth().getValue();
        year = weekDay.getDate().getYear();
        description = weekDay.getDescription();
        status = weekDay.getStatus().name();
        statusCode = weekDay.getStatus().getCode();
        reservations.addAll(weekDay.getReservations().stream().map(ReservationDTO::new).collect(Collectors.toList()));
        applyDefaultProjectAndHours(weekDay);
        addDefaultProjectAndHoursToEachReservation();
    }

    private void addDefaultProjectAndHoursToEachReservation() {
        for (ReservationDTO reservationDTO : reservations) {
            reservationDTO.addAvailableProject(defaultProject, defaultHoursNumber);
        }
    }

    private void applyDefaultProjectAndHours(WeekDay weekDay) {
        User user = weekDay.getUser();
        if (ObjectUtils.isNull(user.getUserConfiguration())) {
            return;
        }
        if (ObjectUtils.notNull(user.getUserConfiguration().getDefaultProject())) {
            defaultProject = new ProjectDTO(user.getUserConfiguration().getDefaultProject());
        }
        if (ObjectUtils.notNull(user.getUserConfiguration().getDefaultHoursNumber())) {
            defaultHoursNumber = user.getUserConfiguration().getDefaultHoursNumber();
        }
    }
}
