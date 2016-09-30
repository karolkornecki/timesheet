package com.timesheet.repository;

import com.timesheet.domain.WeekDay;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.Collection;
import java.util.List;

/**
 * Spring Data JPA repository for the WeekDay entity.
 *
 * @author Karol Kornecki
 */
public interface WeekDayRepository extends JpaRepository<WeekDay, Long> {

    @Query("SELECT w FROM WeekDay w JOIN FETCH w.user u WHERE u.login = :login AND w.date BETWEEN :startDate AND :endDate")
    List<WeekDay> findUserWeekdays(@Param("login") String login, @Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);

    List<WeekDay> findByIdIn(Collection<Long> id);
}
