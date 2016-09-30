package com.timesheet.web.rest.dto;

import lombok.Data;
import com.timesheet.domain.Project;

import java.io.Serializable;

/**
 * A DTO representing Project entity.
 *
 * @author Karol Kornecki
 */
@Data
public class ProjectDTO implements Serializable {

    private Long id;

    private String projectName;

    public ProjectDTO() {
    }

    public ProjectDTO(Project project) {
        id = project.getId();
        projectName = project.getProjectName();
    }
}
