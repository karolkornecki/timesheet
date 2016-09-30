package com.timesheet.domain;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;

/**
 * @author Karol Kornecki
 */
@Entity
@Table(name = "USER_CONFIGURATION", schema = "TIMESHEET")
@org.hibernate.annotations.Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@ToString
public class UserConfiguration implements Serializable {

    @Getter
    @Setter
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "ID")
    private Long id;

    @Getter
    @Setter
    @OneToOne
    @JoinColumn(name = "DEFAULT_PROJECT_ID")
    private Project defaultProject;

    @Getter
    @Setter
    @Column(name = "DEFAULT_HOURS_NUMBER")
    private Integer defaultHoursNumber;

    @Getter
    @Setter
    @OneToOne
    @JoinColumn(name = "USER_ID")
    private User user;
}
