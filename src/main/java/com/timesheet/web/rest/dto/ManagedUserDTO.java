package com.timesheet.web.rest.dto;

import lombok.Getter;
import lombok.Setter;
import com.timesheet.domain.User;

import java.math.BigDecimal;
import java.time.ZonedDateTime;

/**
 * A DTO extending the UserDTO, which is meant to be used in the user management UI.
 */
public class ManagedUserDTO extends UserDTO {

    @Getter
    @Setter
    private Long id;

    @Getter
    @Setter
    private ZonedDateTime createdDate;

    @Getter
    @Setter
    private String lastModifiedBy;

    @Getter
    @Setter
    private ZonedDateTime lastModifiedDate;

    @Getter
    @Setter
    private String position;

    @Getter
    @Setter
    private BigDecimal hourlyRate;

    public ManagedUserDTO() {
    }

    public ManagedUserDTO(User user) {
        super(user);
        this.id = user.getId();
        this.createdDate = user.getCreatedDate();
        this.lastModifiedBy = user.getLastModifiedBy();
        this.lastModifiedDate = user.getLastModifiedDate();
        this.position = user.getPosition();
        this.hourlyRate = user.getHourlyRate();
    }

    @Override
    public String toString() {
        return "ManagedUserDTO{" +
            "id=" + id +
            ", createdDate=" + createdDate +
            ", lastModifiedBy='" + lastModifiedBy + '\'' +
            ", lastModifiedDate=" + lastModifiedDate +
            "} " + super.toString();
    }
}
