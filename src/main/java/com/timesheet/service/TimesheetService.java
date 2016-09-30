package com.timesheet.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Assert;
import org.springframework.util.CollectionUtils;
import org.springframework.util.StringUtils;
import com.timesheet.domain.AvailableProject;
import com.timesheet.domain.Project;
import com.timesheet.domain.Reservation;
import com.timesheet.domain.WeekDay;
import com.timesheet.domain.util.Date;
import com.timesheet.domain.util.ObjectUtils;
import com.timesheet.repository.ProjectRepository;
import com.timesheet.repository.WeekDayRepository;
import com.timesheet.web.rest.dto.ReservationDTO;
import com.timesheet.web.rest.dto.WeekDayDTO;
import com.timesheet.web.rest.dto.WeekReservationSummaryDTO;
import com.timesheet.web.rest.errors.CustomParameterizedException;

import javax.inject.Inject;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * @author Karol Kornecki
 */
@Service
@Transactional
public class TimesheetService {

    private final Logger LOG = LoggerFactory.getLogger(TimesheetService.class);

    @Inject
    private ProjectRepository projectRepository;

    @Inject
    private WeekDayRepository weekDayRepository;

    public List<WeekDay> getUserWeekdays(String login, Integer offset, LocalDate date) {
        Assert.notNull(date, "Date cannot be null.");
        if (StringUtils.isEmpty(login) || ObjectUtils.isNull(offset)) {
            throw new CustomParameterizedException("Parameters for TimesheetService.getUserWeekdays cannot be empty userId={}, offset={}",
                    login, offset == null ? null : offset.toString());
        }
        LOG.debug("Get weekdays for user [{}], offset={}", login, offset);
        LOG.debug("Searching for startDate={} and endDate={}", Date.getFirstDayOfWeek(offset, date).format(DateTimeFormatter.BASIC_ISO_DATE),
                Date.getLastDayOfWeek(offset, date).format(DateTimeFormatter.BASIC_ISO_DATE));
        return weekDayRepository.findUserWeekdays(login, Date.getFirstDayOfWeek(offset, date), Date.getLastDayOfWeek(offset, date));
    }

    public List<WeekReservationSummaryDTO> createWeekSummary(List<WeekDay> weekdays) {
        return weekdays.stream()
                .flatMap(w -> w.getReservations().stream())
                .flatMap(r -> r.getAvailableProjects().stream())
                .collect(Collectors.groupingBy(AvailableProject::getProject, Collectors.summingInt(AvailableProject::getHours)))
                .entrySet().stream().map(e -> new WeekReservationSummaryDTO(e.getKey(), e.getValue())).sorted().collect(Collectors.toList());
    }

    public void saveWeekdays(Collection<WeekDayDTO> weekdays) {
        if (CollectionUtils.isEmpty(weekdays)) {
            return;
        }
        for (WeekDayDTO weekDayDTO : weekdays) {
            WeekDay weekDay = weekDayRepository.findOne(weekDayDTO.getId());
            weekDay.setDescription(weekDayDTO.getDescription());
            removeReservation(weekDay, weekDayDTO.getReservations());
            updateExistingReservation(weekDayDTO, weekDay);
            addNewReservations(weekDay, weekDayDTO.getReservations());
            weekDay.changeStatus();
        }
    }

    public String createWeekLabel(Integer offset, LocalDate date) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd.MM.yyyy");
        StringBuilder builder = new StringBuilder();
        return builder.append(Date.getFirstDayOfWeek(offset, date).format(formatter)).append("-").append(Date.getLastDayOfWeek(offset, date).format(formatter)).toString();
    }

    private void addNewReservations(WeekDay weekDay, Collection<ReservationDTO> reservations) {
        reservations.stream().filter(r -> r.getId() == null).forEach(r -> weekDay.addReservation(createReservation(r)));
    }

    private Reservation createReservation(ReservationDTO reservationDTO) {
        Reservation reservation = new Reservation();
        reservation.setDescription(reservationDTO.getDescription());
        reservation.setHours(reservationDTO.getHours());
        if (ObjectUtils.notNull(reservationDTO.getProject()) && ObjectUtils.notNull(reservationDTO.getProject().getId())) {
            Project project = projectRepository.findOne(reservationDTO.getProject().getId());
            reservation.setProject(project);
        }
        return reservation;
    }

    private void updateExistingReservation(WeekDayDTO weekDayDTO, WeekDay weekDay) {
        for (ReservationDTO reservationDTO : weekDayDTO.getReservations()) {
            Optional<Reservation> reservation = weekDay.getReservation(reservationDTO.getId());
            if (reservation.isPresent()) {
                reservation.get().setDescription(reservationDTO.getDescription());
                reservation.get().setHours(reservationDTO.getHours());
                if (ObjectUtils.notNull(reservationDTO.getProject())) {
                    Project project = projectRepository.getOne(reservationDTO.getProject().getId());
                    reservation.get().setProject(project);
                }
            }
        }
    }

    private void removeReservation(WeekDay weekDay, Collection<ReservationDTO> reservations) {
        Set<Long> reservationsId = weekDay.getReservations().stream().map(Reservation::getId).collect(Collectors.toSet());
        reservationsId.removeAll(reservations.stream().filter(r -> r.getId() != null).map(ReservationDTO::getId).collect(Collectors.toSet()));
        reservationsId.forEach(weekDay::removeReservationById);
    }

    public void editWeekdays(List<WeekDayDTO> weekdays) {
        if (CollectionUtils.isEmpty(weekdays)) {
            return;
        }
        weekDayRepository.findByIdIn(weekdays.stream()
                .map(WeekDayDTO::getId)
                .collect(Collectors.toList()))
                .forEach(WeekDay::edit);
    }

    public void submitWeekdays(List<WeekDayDTO> weekdays) {
        if (CollectionUtils.isEmpty(weekdays)) {
            return;
        }
        weekDayRepository.findByIdIn(weekdays.stream()
                .map(WeekDayDTO::getId)
                .collect(Collectors.toList()))
                .forEach(WeekDay::changeStatus);
    }
}
