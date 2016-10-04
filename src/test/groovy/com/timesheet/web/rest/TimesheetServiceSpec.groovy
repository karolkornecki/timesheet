package com.timesheet.web.rest

import com.timesheet.domain.AvailableProject
import com.timesheet.domain.Project
import com.timesheet.domain.Reservation
import com.timesheet.domain.WeekDay
import com.timesheet.repository.WeekDayRepository
import com.timesheet.service.TimesheetService
import com.timesheet.web.rest.dto.WeekReservationSummaryDTO
import com.timesheet.web.rest.errors.CustomParameterizedException
import spock.lang.Specification

import java.time.LocalDate

/**
 * Unit tests for {@link com.timesheet.service.TimesheetService}
 *
 * @author Karol Kornecki
 */
class TimesheetServiceSpec extends Specification {

    def "Should compute correct start/end dates of week based on offset"(String login, int offset, LocalDate date, LocalDate startDate, LocalDate endDate) {

        given:
        TimesheetService timesheetService = new TimesheetService()
        timesheetService.weekDayRepository = Mock(WeekDayRepository)
        timesheetService.weekDayRepository.findUserWeekdays(_ as String, _ as LocalDate, _ as LocalDate) >> []

        when:
        timesheetService.getUserWeekdays(login, offset, date)

        then:
        1 * timesheetService.weekDayRepository.findUserWeekdays(login, startDate, endDate)

        where:
        login   | offset | date                      | startDate                 | endDate
        "admin" | 1      | LocalDate.of(2016, 2, 20) | LocalDate.of(2016, 2, 22) | LocalDate.of(2016, 2, 28)
        "admin" | 0      | LocalDate.of(2016, 2, 20) | LocalDate.of(2016, 2, 15) | LocalDate.of(2016, 2, 21)
        "admin" | -1     | LocalDate.of(2016, 2, 20) | LocalDate.of(2016, 2, 8)  | LocalDate.of(2016, 2, 14)
    }

    def "Should throw an exception when date passed as parameter is null"() {
        given:
        TimesheetService timesheetService = new TimesheetService()

        when:
        timesheetService.getUserWeekdays("admin", 0, null)

        then:
        thrown IllegalArgumentException
    }

    def "Should throw an custom exception when login passed as parameter is null"() {
        given:
        TimesheetService timesheetService = new TimesheetService()

        when:
        timesheetService.getUserWeekdays(null, 0, LocalDate.now())

        then:
        thrown CustomParameterizedException
    }

    def "Should throw an custom exception when offset passed as parameter is null"() {
        given:
        TimesheetService timesheetService = new TimesheetService()

        when:
        timesheetService.getUserWeekdays("admin", null, LocalDate.now())

        then:
        thrown CustomParameterizedException
    }

    def "Should create week reservation summary grouped by project id sorted by sum of hours desc"() {

        given:
        TimesheetService timesheetService = new TimesheetService()

        //projects definitions
        Project project_0 = Mock(Project)
        project_0.id >> 1L

        Project project_1 = Mock(Project)
        project_1.id >> 2L

        //available projects
        AvailableProject availableProject_0 = Mock(AvailableProject)
        availableProject_0.hours >> 8
        availableProject_0.project >> project_0

        AvailableProject availableProject_1 = Mock(AvailableProject)
        availableProject_1.hours >> 4
        availableProject_1.project >> project_1

        //reservation no: #1 for day #1
        Reservation reservation_0 = Mock(Reservation)
        reservation_0.availableProjects >> [availableProject_0, availableProject_1]          // project id:1 hours 8 | id:2 hours 4

        //day #1
        WeekDay weekDay_0 = Mock(WeekDay)
        weekDay_0.reservations >> [reservation_0]

        //reservation no: #2 for day #2
        Reservation reservation_1 = Mock(Reservation)
        reservation_1.availableProjects >> [availableProject_0]  // same project id:1 hours 8

        //day #2
        WeekDay weekDay_1 = Mock(WeekDay)
        weekDay_1.reservations >> [reservation_1]

        when:
        List<WeekReservationSummaryDTO> summaryList = timesheetService.createWeekSummary([weekDay_0, weekDay_1]) // project id: 1 -> 16 hours (8+8), project id:2 -> 4 hours

        then:
        summaryList.size() == 2
        summaryList[0].hours == 16
        summaryList[0].project.id == 1L
        summaryList[1].hours == 4
        summaryList[1].project.id == 2L
    }

    def "Should create week date range description label based on day passed as parameter"(LocalDate day, String label) {

        given:
        def OFFSET = 0;
        TimesheetService timesheetService = new TimesheetService()

        when:
        String result = timesheetService.createWeekLabel(OFFSET, day)

        then:
        result == label

        where:
        day                        | label
        LocalDate.of(2016, 5, 11)  | "09.05.2016-15.05.2016"
        LocalDate.of(2016, 5, 31)  | "30.05.2016-05.06.2016"
        LocalDate.of(2016, 12, 28) | "26.12.2016-01.01.2017"
    }
}
