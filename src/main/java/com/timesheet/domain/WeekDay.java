package com.timesheet.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.springframework.util.Assert;
import com.timesheet.domain.util.ObjectUtils;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Iterator;
import java.util.LinkedHashSet;
import java.util.Optional;
import java.util.Set;


/**
 * Represents working day.
 *
 * @author Karol Kornecki
 */
@Entity
@Table(name = "WEEKDAY", schema = "TIMESHEET")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@ToString
public class WeekDay implements Serializable {

    @Getter
    @Setter
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "ID")
    private Long id;

    @Getter
    @Setter
    @Column(name = "DATE", nullable = false)
    private LocalDate date;

    @Getter
    @Setter
    @Column(name = "DESCRIPTION", length = 2000)
    private String description;

    @Getter
    @Setter
    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, mappedBy = "weekday", fetch = FetchType.EAGER)
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @Fetch(FetchMode.SUBSELECT)
    private Set<Reservation> reservations = new LinkedHashSet<>();

    @Getter
    @Setter
    @JsonIgnore
    @ManyToOne
    private User user;

    @Getter
    @NotNull
    @Column(name = "STATUS", length = 50)
    @Enumerated(value = EnumType.STRING)
    private Status status;

    public Optional<Reservation> getReservation(Long id) {
        for (Reservation reservation : reservations) {
            if (ObjectUtils.equals(id, reservation.getId())) {
                return Optional.of(reservation);
            }
        }
        return Optional.empty();
    }

    public void addReservation(Reservation reservation) {
        reservations.add(reservation);
        reservation.setWeekday(this);
    }

    public void changeStatus() {
        status = status.next();
    }

    public void reject() {
        Assert.isTrue(status == Status.APPROVED || status == Status.PRE_APPROVED, "Weekday only in status APPROVED or PRE_APPROVED can be rejected.");
        status = Status.REJECTED;
    }

    public void edit() {
        Assert.isTrue(status == Status.SAVED, "Weekday only in status SAVED can be edited. Current status is " + status);
        status = Status.NEW;
    }

    public void removeReservationById(Long id) {
        Iterator<Reservation> iterator = reservations.iterator();
        while (iterator.hasNext()) {
            Reservation reservation = iterator.next();
            if (ObjectUtils.equals(id, reservation.getId())) {
                iterator.remove();
            }
        }
    }
}
