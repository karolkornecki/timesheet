package com.timesheet.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import javax.persistence.*;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import java.io.Serializable;
import java.util.LinkedHashSet;
import java.util.Set;

/**
 * @author Karol Kornecki
 */
@Entity
@Table(name = "RESERVATION", schema = "TIMESHEET")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@ToString
public class Reservation implements Serializable {

    @Getter
    @Setter
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "ID")
    private Long id;

    @Getter
    @Setter
    @Column(name = "HOURS")
    @Max(value = 24)
    @Min(value = 0)
    private Integer hours;

    @Getter
    @Setter
    @OneToOne
    @JoinColumn(name = "PROJECT_ID")
    private Project project;

    @Getter
    @Setter
    @Column(name = "DESCRIPTION", length = 2000)
    private String description;

    @Getter
    @Setter
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "WEEKDAY_ID")
    private WeekDay weekday;

    @Getter
    @Setter
    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, mappedBy = "reservation", fetch = FetchType.EAGER)
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @Fetch(FetchMode.SUBSELECT)
    private Set<AvailableProject> availableProjects = new LinkedHashSet<>();

}
