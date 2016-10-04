package com.timesheet.web.rest;

import com.google.common.collect.Lists;
import com.timesheet.TimesheetApplication;
import com.timesheet.repository.ManagedProjectRepository;
import com.timesheet.service.UserService;
import com.timesheet.web.rest.dto.UserDTO;
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

import javax.inject.Inject;

import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * Test class for the TeamManagementResource REST controller.
 *
 * @author Karol Kornecki
 * @see TeamManagementResource
 */
@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(classes = TimesheetApplication.class)
@WebAppConfiguration
public class TeamManagementResourceIntTest {

    @Mock
    private UserService mockUserService;

    @Inject
    private UserService userService;

    @Inject
    private ManagedProjectRepository managedProjectRepository;

    private MockMvc restTeamManagementMockMvc;

    private MockMvc restTeamManagementMvc;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);

        TeamManagementResource teamManagementResource = new TeamManagementResource();
        ReflectionTestUtils.setField(teamManagementResource, "userService", userService);
        ReflectionTestUtils.setField(teamManagementResource, "managedProjectRepository", managedProjectRepository);

        TeamManagementResource teamManagementMockResource = new TeamManagementResource();
        ReflectionTestUtils.setField(teamManagementMockResource, "userService", mockUserService);

        this.restTeamManagementMockMvc = MockMvcBuilders.standaloneSetup(teamManagementMockResource).build();
        this.restTeamManagementMvc = MockMvcBuilders.standaloneSetup(teamManagementResource).build();
    }

    @Test
    public void testMockGetTeamMembers() throws Exception {

        //given
        String login = "admin";

        UserDTO user_0 = new UserDTO();
        user_0.setFirstName("Tom");
        user_0.setLastName("Unknown");
        user_0.setLogin("tomlogin");

        UserDTO user_1 = new UserDTO();
        user_1.setFirstName("Sofie");
        user_1.setLastName("RedHat");
        user_1.setLogin("sofielogin");
        given(mockUserService.findTeamMembers(login)).willReturn(Lists.newArrayList(user_0, user_1));

        restTeamManagementMockMvc.perform(get("/api/team/members/" + login)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].firstName").value("Tom"))
                .andExpect(jsonPath("$[0].lastName").value("Unknown"))
                .andExpect(jsonPath("$[0].login").value("tomlogin"))
                .andExpect(jsonPath("$[1].firstName").value("Sofie"))
                .andExpect(jsonPath("$[1].lastName").value("RedHat"))
                .andExpect(jsonPath("$[1].login").value("sofielogin"));

    }

    @Test
    public void testGetTeamMembers() throws Exception {

        restTeamManagementMvc.perform(get("/api/team/members/admin")
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].firstName").value("Anonymous"))
                .andExpect(jsonPath("$[0].lastName").value("AnonymousUser"))
                .andExpect(jsonPath("$[0].login").value("anonymousUser"))
                .andExpect(jsonPath("$[1].firstName").value("System"))
                .andExpect(jsonPath("$[1].lastName").value("System"))
                .andExpect(jsonPath("$[1].login").value("system"))
                .andExpect(jsonPath("$[2].firstName").value("User"))
                .andExpect(jsonPath("$[2].lastName").value("User"))
                .andExpect(jsonPath("$[2].login").value("user"));

    }

    @Test
    public void getManagedProjects() throws Exception {

        restTeamManagementMvc.perform(get("/api/team/projects/admin")
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].projectDTO.id").exists())
                .andExpect(jsonPath("$[0].projectDTO.projectName").value("Project_1"))
                .andExpect(jsonPath("$[1].projectDTO.id").exists())
                .andExpect(jsonPath("$[1].projectDTO.projectName").value("Project_2"));
    }
}
