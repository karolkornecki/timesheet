package com.timesheet.web.rest.dto;

import lombok.Data;
import com.timesheet.domain.AvailableProject;

import java.io.Serializable;

/**
 * @author Karol Kornecki
 */
@Data
public class AvailableProjectDTO implements Serializable {

    private Long id;

    private int hours;

    private ProjectDTO project;

    public AvailableProjectDTO() {
    }

    public AvailableProjectDTO(AvailableProject availableProject) {
        id = availableProject.getId();
        hours = availableProject.getHours();
        project = new ProjectDTO(availableProject.getProject());
    }
}
