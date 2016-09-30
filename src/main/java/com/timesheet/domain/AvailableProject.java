package com.timesheet.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;

/**
 * Represents project available for user to use in current reservation. It's created by team leader or manager
 * based on managed projects.
 *
 * @author Karol Kornecki
 */
@Entity
@Table(name = "AVAILABLE_PROJECT", schema = "TIMESHEET")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Data
public class AvailableProject {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "ID")
    private Long id;

    @OneToOne
    @JoinColumn(name = "PROJECT_ID")
    private Project project;

    @Column(name = "HOURS")
    @Max(value = 24)
    @Min(value = 0)
    private int hours;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "RESERVATION_ID")
    private Reservation reservation;
}
