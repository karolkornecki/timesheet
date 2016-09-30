package com.timesheet.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.timesheet.domain.WeekDay;
import com.timesheet.service.TimesheetService;
import com.timesheet.web.rest.dto.WeekDayDTO;
import com.timesheet.web.rest.dto.WeekdayResponseDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import javax.validation.Valid;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

/**
 * REST controller for managing user time reservation.
 *
 * @author Karol Kornecki
 */
@RestController
@RequestMapping("/api")
public class TimesheetResource {

    private final Logger LOG = LoggerFactory.getLogger(AccountResource.class);

    @Inject
    private TimesheetService timesheetService;

    /**
     * It gets days of current week when offset is set to 0.
     * <p>
     * GET  /timesheet/weekdays -> weekdays of user for week.
     */
    @RequestMapping(value = "/timesheet/weekdays/{login}",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<WeekdayResponseDTO> getCurrentWeekDays(@PathVariable String login, @RequestParam("offset") Integer offset) {
        LOG.debug("[getCurrentWeekDays] invoked with params login={} offset={}", login, offset);
        WeekdayResponseDTO responseDTO = new WeekdayResponseDTO();
        LocalDate now = LocalDate.now();
        List<WeekDay> weekdays = timesheetService.getUserWeekdays(login, offset, now);
        LOG.debug("[getCurrentWeekDays] found size={}", weekdays.size());
        responseDTO.setWeekDays(weekdays.stream().map(WeekDayDTO::new).collect(Collectors.toList()));
        responseDTO.setSummary(timesheetService.createWeekSummary(weekdays));
        responseDTO.setWeekDateRangeLabel(timesheetService.createWeekLabel(offset, now));
        return new ResponseEntity<>(responseDTO, HttpStatus.OK);
    }

    /**
     * It saves employee's weekdays reservations.
     * <p>
     * POST /timesheet/weekdays/save -> update user weekdays and change status to 'SAVED'.
     */
    @RequestMapping(value = "/timesheet/weekdays/save",
            method = RequestMethod.POST,
            produces = MediaType.TEXT_PLAIN_VALUE)
    @Timed
    public ResponseEntity<?> save(@Valid @RequestBody List<WeekDayDTO> weekdays) {
        try {
            timesheetService.saveWeekdays(weekdays);
            return new ResponseEntity<>(HttpStatus.CREATED);
        } catch (Exception ex) {
            LOG.error("REST [save] error.", ex);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * It changes state of weekdays passed as parameter making them editable.
     * <p>
     * POST /timesheet/weekdays/edit -> change status of current weekdays to 'EDIT'
     */
    @RequestMapping(value = "/timesheet/weekdays/edit",
            method = RequestMethod.POST,
            produces = MediaType.TEXT_PLAIN_VALUE)
    @Timed
    public ResponseEntity<?> edit(@Valid @RequestBody List<WeekDayDTO> weekdays) {
        try {
            timesheetService.editWeekdays(weekdays);
            return new ResponseEntity<>(HttpStatus.CREATED);
        } catch (Exception ex) {
            LOG.error("REST [edit] error.", ex);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * It changes state of weekdays passed as parameter. Weekdays cannot be edited again after this operation.
     * <p>
     * POST /timesheet/weekdays/submit -> change status of current weekdays to 'PRE_APPROVED'
     */
    @RequestMapping(value = "/timesheet/weekdays/submit",
            method = RequestMethod.POST,
            produces = MediaType.TEXT_PLAIN_VALUE)
    @Timed
    public ResponseEntity<?> submit(@Valid @RequestBody List<WeekDayDTO> weekdays) {
        try {
            timesheetService.submitWeekdays(weekdays);
            return new ResponseEntity<>(HttpStatus.CREATED);
        } catch (Exception ex) {
            LOG.error("REST [submit] error.", ex);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
