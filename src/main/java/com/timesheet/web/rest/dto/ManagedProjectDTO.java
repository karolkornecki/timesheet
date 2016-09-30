package com.timesheet.web.rest.dto;

import lombok.Getter;
import lombok.Setter;
import com.timesheet.domain.ManagedProject;

import java.io.Serializable;

/**
 * @author Karol Kornecki
 */
public class ManagedProjectDTO implements Serializable {

    @Getter
    @Setter
    private Long id;

    @Getter
    @Setter
    private ProjectDTO projectDTO;

    public ManagedProjectDTO() {
    }

    public ManagedProjectDTO(ManagedProject managedProject) {
        this.id = managedProject.getId();
        this.projectDTO = new ProjectDTO(managedProject.getProject());
    }
}
