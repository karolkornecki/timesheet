package com.timesheet.repository;

import com.timesheet.TimesheetApplication;
import com.timesheet.domain.ManagedProject;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.transaction.annotation.Transactional;

import javax.inject.Inject;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;


/**
 * Integration tests of ManagedProjectRepository.
 *
 * @author Karol Kornecki
 */
@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(classes = TimesheetApplication.class)
@WebAppConfiguration
@Transactional
public class ManagedProjectRepositoryIntTests {


    @Inject
    ManagedProjectRepository managedProjectRepository;


    @Test
    public void shouldReturnTwoManagedProjectsForUserIdentifiedByLoginAdmin() {

        //given
        String USER_LOGIN = "admin";

        //when
        List<ManagedProject> managedProjects = managedProjectRepository.findUserManagedProjects(USER_LOGIN);

        //then
        assertThat(managedProjects.size()).isEqualTo(2);
        assertThat(managedProjects.get(0).getProject().getProjectName()).isEqualTo("Project_1");
        assertThat(managedProjects.get(0).getUser()).isNotNull();
        assertThat(managedProjects.get(1).getProject().getProjectName()).isEqualTo("Project_2");
        assertThat(managedProjects.get(1).getUser()).isNotNull();
    }
}
