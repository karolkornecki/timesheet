package com.timesheet.web.rest;

import com.google.common.collect.Lists;
import com.timesheet.TimesheetApplication;
import com.timesheet.domain.*;
import com.timesheet.repository.WeekDayRepository;
import com.timesheet.service.TimesheetService;
import com.timesheet.web.rest.dto.ProjectDTO;
import com.timesheet.web.rest.dto.ReservationDTO;
import com.timesheet.web.rest.dto.WeekDayDTO;
import com.timesheet.web.rest.dto.WeekReservationSummaryDTO;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.inject.Inject;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * Test class for the TimesheetResource REST controller.
 *
 * @author Karol Kornecki
 * @see TimesheetResource
 */
@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(classes = TimesheetApplication.class)
@WebAppConfiguration
public class TimesheetResourceIntTest {

    private static final Long SOME_DAY = 3L;
    private static final Long PROJECT_2 = 2L;
    private static final String SOME_WEEKDAY_DESCRIPTION = "Description of weekday";
    private static final Integer _8_HOURS = 8;
    private static final String SOME_RESERVATION_DESCRIPTION = "Description of reservation";
    public static final String SOME_DATE_RANGE = "09.05.2016-15.05.2016";
    public static final String SOME_PROJECT_NAME = "Project 1";
    public static final int _40_HOURS = 40;

    @Mock
    private TimesheetService mockTimesheetService;

    @Inject
    private TimesheetService timesheetService;

    @Inject
    private WeekDayRepository weekDayRepository;

    private MockMvc restTimesheetMockMvc;

    private MockMvc restTimesheetMvc;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);

        TimesheetResource timesheetMockResource = new TimesheetResource();
        ReflectionTestUtils.setField(timesheetMockResource, "timesheetService", mockTimesheetService);
        this.restTimesheetMockMvc = MockMvcBuilders.standaloneSetup(timesheetMockResource).build();

        TimesheetResource timesheetResource = new TimesheetResource();
        ReflectionTestUtils.setField(timesheetResource, "timesheetService", timesheetService);
        this.restTimesheetMvc = MockMvcBuilders.standaloneSetup(timesheetResource).build();
    }

    @Test
    public void testGetAdminWeekdays() throws Exception {

        String login = "admin";
        LocalDate NOW = LocalDate.now();

        WeekDay weekDay = new WeekDay();
        weekDay.setDate(NOW);
        weekDay.setDescription(SOME_WEEKDAY_DESCRIPTION);
        weekDay.setUser(new User());
        ReflectionTestUtils.setField(weekDay, "status", Status.NEW);

        List<WeekDay> weekDays = new ArrayList<>();
        weekDays.add(weekDay);

        Project project = new Project();
        project.setProjectName(SOME_PROJECT_NAME);
        WeekReservationSummaryDTO weekReservationSummaryDTO = new WeekReservationSummaryDTO(project, 40);
        List<WeekReservationSummaryDTO> summaryDTOs = Lists.newArrayList(weekReservationSummaryDTO);

        given(mockTimesheetService.getUserWeekdays(login, 0, NOW)).willReturn(weekDays);
        given(mockTimesheetService.createWeekSummary(weekDays)).willReturn(summaryDTOs);
        given(mockTimesheetService.createWeekLabel(0, NOW)).willReturn(SOME_DATE_RANGE);

        restTimesheetMockMvc.perform(get("/api/timesheet/weekdays/admin").param("offset", "0")
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.weekDays[0].description").value(SOME_WEEKDAY_DESCRIPTION))
                .andExpect(jsonPath("$.weekDays[0].status").value(Status.NEW.name()))
                .andExpect(jsonPath("$.weekDays[0].day").value(NOW.getDayOfMonth()))
                .andExpect(jsonPath("$.weekDays[0].month").value(NOW.getMonth().getValue()))
                .andExpect(jsonPath("$.weekDays[0].year").value(NOW.getYear()))
                .andExpect(jsonPath("$.summary[0].hours").value(_40_HOURS))
                .andExpect(jsonPath("$.summary[0].project.projectName").value(SOME_PROJECT_NAME))
                .andExpect(jsonPath("$.weekDateRangeLabel").value(SOME_DATE_RANGE));
    }

    @Test
    @Transactional
    public void testSaveWeekdays() throws Exception {

        //given
        ProjectDTO projectDTO = new ProjectDTO();
        projectDTO.setId(PROJECT_2);

        ReservationDTO reservationDTO = new ReservationDTO();
        reservationDTO.setDescription(SOME_RESERVATION_DESCRIPTION);
        reservationDTO.setHours(_8_HOURS);
        reservationDTO.setProject(projectDTO);

        WeekDayDTO weekDayDTO = new WeekDayDTO();
        weekDayDTO.setId(SOME_DAY);
        weekDayDTO.setDescription(SOME_WEEKDAY_DESCRIPTION);
        weekDayDTO.setReservations(Lists.newArrayList(reservationDTO));

        //when
        restTimesheetMvc.perform(post("/api/timesheet/weekdays/save")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(Lists.newArrayList(weekDayDTO))))
                .andExpect(status().isCreated());

        //then
        WeekDay weekDay = weekDayRepository.findOne(SOME_DAY);
        assertThat(weekDay).isNotNull();
        assertThat(weekDay.getDescription()).isEqualTo(SOME_WEEKDAY_DESCRIPTION);
        assertThat(weekDay.getReservations().size()).isEqualTo(1);
        Reservation reservation = weekDay.getReservations().iterator().next();
        assertThat(reservation.getHours()).isEqualTo(_8_HOURS);
        assertThat(reservation.getDescription()).isEqualTo(SOME_RESERVATION_DESCRIPTION);
        assertThat(reservation.getProject().getId()).isEqualTo(PROJECT_2);
        assertThat(weekDay.getStatus()).isEqualTo(Status.SAVED);
    }

    @Test
    @Transactional
    public void testSubmitBeforeSaveWeekdays() throws Exception {

        //given
        WeekDayDTO weekDayDTO = new WeekDayDTO();
        weekDayDTO.setId(SOME_DAY);

        //when submit before save
        restTimesheetMvc.perform(post("/api/timesheet/weekdays/submit")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(Lists.newArrayList(weekDayDTO))))
                .andExpect(status().isCreated());

        //then weekday status is not PRE_APPROVED
        WeekDay weekDay = weekDayRepository.findOne(SOME_DAY);
        assertThat(weekDay.getStatus()).isNotEqualTo(Status.PRE_APPROVED);
    }

    @Test
    @Transactional
    public void testSubmitAfterSaveWeekdays() throws Exception {

        //given
        WeekDayDTO weekDayDTO = new WeekDayDTO();
        weekDayDTO.setId(SOME_DAY);

        //first save
        restTimesheetMvc.perform(post("/api/timesheet/weekdays/save")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(Lists.newArrayList(weekDayDTO))))
                .andExpect(status().isCreated());
        //next submit
        restTimesheetMvc.perform(post("/api/timesheet/weekdays/submit")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(Lists.newArrayList(weekDayDTO))))
                .andExpect(status().isCreated());

        //then
        WeekDay weekDay = weekDayRepository.findOne(SOME_DAY);
        assertThat(weekDay.getStatus()).isEqualTo(Status.PRE_APPROVED);
    }

    @Test
    public void testEditWeekdayBeforeSaveIsNotAllowed() throws Exception {

        //given
        WeekDayDTO weekDayDTO = new WeekDayDTO();
        weekDayDTO.setId(SOME_DAY);

        //then
        restTimesheetMvc.perform(post("/api/timesheet/weekdays/edit")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(Lists.newArrayList(weekDayDTO))))
                .andExpect(status().is5xxServerError());
    }

    @Test
    @Transactional
    public void testEditWeekdayOnSavedWeekdayOnlyAllowed() throws Exception {

        //given
        WeekDayDTO weekDayDTO = new WeekDayDTO();
        weekDayDTO.setId(SOME_DAY);

        //then save
        restTimesheetMvc.perform(post("/api/timesheet/weekdays/save")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(Lists.newArrayList(weekDayDTO))))
                .andExpect(status().isCreated());
        // .. and then edit
        restTimesheetMvc.perform(post("/api/timesheet/weekdays/edit")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(Lists.newArrayList(weekDayDTO))))
                .andExpect(status().isCreated());

        // then status should be NEW again
        WeekDay weekDay = weekDayRepository.findOne(SOME_DAY);
        assertThat(weekDay.getStatus()).isEqualTo(Status.NEW);
    }
}
