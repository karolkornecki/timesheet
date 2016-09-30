package com.timesheet.web.rest.dto;

import lombok.Data;
import com.timesheet.domain.Reservation;
import com.timesheet.domain.util.ObjectUtils;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * A DTO representing single reservation.
 *
 * @author Karol Kornecki
 */
@Data
public class ReservationDTO implements Serializable {

    private Long id;

    private Integer hours;

    private ProjectDTO project;

    private String description;

    private List<AvailableProjectDTO> availableProjects = new ArrayList<>();

    public ReservationDTO() {
    }

    public ReservationDTO(Reservation reservation) {
        id = reservation.getId();
        hours = reservation.getHours();
        description = reservation.getDescription();
        if (ObjectUtils.notNull(reservation.getProject())) {
            project = new ProjectDTO(reservation.getProject());
        }
        availableProjects.addAll(reservation.getAvailableProjects().stream().map(AvailableProjectDTO::new).collect(Collectors.toList()));
    }

    public void addAvailableProject(ProjectDTO defaultProject, int defaultHoursNumber) {
        if (isNotExisting(defaultProject)) {
            AvailableProjectDTO availableProjectDTO = new AvailableProjectDTO();
            availableProjectDTO.setProject(defaultProject);
            availableProjectDTO.setHours(defaultHoursNumber);
            availableProjects.add(availableProjectDTO);
        }
    }

    private boolean isNotExisting(ProjectDTO defaultProject) {
        for (AvailableProjectDTO availableProjectDTO : availableProjects) {
            if (ObjectUtils.notNull(availableProjectDTO.getProject())
                && ObjectUtils.equals(availableProjectDTO.getProject().getId(), defaultProject.getId())) {
                return false;
            }
        }
        return true;
    }
}
