package com.timesheet.web.rest;


import com.timesheet.TimesheetApplication;
import com.timesheet.domain.Authority;
import com.timesheet.domain.User;
import com.timesheet.repository.AuthorityRepository;
import com.timesheet.repository.UserRepository;
import com.timesheet.security.AuthoritiesConstants;
import com.timesheet.service.MailService;
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
import javax.transaction.Transactional;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Matchers.anyObject;
import static org.mockito.Matchers.anyString;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the AccountResource REST controller.
 */
@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(classes = TimesheetApplication.class)
@WebAppConfiguration
public class AccountResourceIntTest {

    @Inject
    private UserRepository userRepository;

    @Inject
    private AuthorityRepository authorityRepository;

    @Inject
    private UserService userService;

    @Mock
    private UserService mockUserService;

    @Mock
    private MailService mockMailService;

    private MockMvc restUserMockMvc;

    private MockMvc restMvc;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        doNothing().when(mockMailService).sendActivationEmail((User) anyObject(), anyString());

        AccountResource accountResource = new AccountResource();
        ReflectionTestUtils.setField(accountResource, "userRepository", userRepository);
        ReflectionTestUtils.setField(accountResource, "userService", userService);
        ReflectionTestUtils.setField(accountResource, "mailService", mockMailService);

        AccountResource accountUserMockResource = new AccountResource();
        ReflectionTestUtils.setField(accountUserMockResource, "userRepository", userRepository);
        ReflectionTestUtils.setField(accountUserMockResource, "userService", mockUserService);
        ReflectionTestUtils.setField(accountUserMockResource, "mailService", mockMailService);

        this.restMvc = MockMvcBuilders.standaloneSetup(accountResource).build();
        this.restUserMockMvc = MockMvcBuilders.standaloneSetup(accountUserMockResource).build();
    }

    @Test
    public void testNonAuthenticatedUser() throws Exception {
        restUserMockMvc.perform(get("/api/authenticate")
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().string(""));
    }

    @Test
    public void testAuthenticatedUser() throws Exception {
        restUserMockMvc.perform(get("/api/authenticate")
                .with(request -> {
                    request.setRemoteUser("test");
                    return request;
                })
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().string("test"));
    }

    @Test
    public void testGetExistingAccount() throws Exception {
        Set<Authority> authorities = new HashSet<>();
        Authority authority = new Authority();
        authority.setName(AuthoritiesConstants.ADMIN);
        authorities.add(authority);

        User user = new User();
        user.setLogin("test");
        user.setFirstName("karol");
        user.setLastName("kornecki");
        user.setEmail("karol.kornecki@gmail.com");
        user.setAuthorities(authorities);
        when(mockUserService.getUserWithAuthorities()).thenReturn(user);

        restUserMockMvc.perform(get("/api/account")
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8))
                .andExpect(jsonPath("$.login").value("test"))
                .andExpect(jsonPath("$.firstName").value("karol"))
                .andExpect(jsonPath("$.lastName").value("kornecki"))
                .andExpect(jsonPath("$.email").value("karol.kornecki@gmail.com"))
                .andExpect(jsonPath("$.authorities").value(AuthoritiesConstants.ADMIN));
    }

    @Test
    public void testGetUnknownAccount() throws Exception {
        when(mockUserService.getUserWithAuthorities()).thenReturn(null);

        restUserMockMvc.perform(get("/api/account")
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isInternalServerError());
    }

    @Test
    @Transactional
    public void testRegisterValid() throws Exception {
        UserDTO u = new UserDTO(
                "joe",
                "password",
                "Karol",
                "Kornecki",
                "karol.kornecki@gmail.com",
                true,
                "en",
                new HashSet<>(Arrays.asList(AuthoritiesConstants.USER))
        );

        restMvc.perform(
                post("/api/register")
                        .contentType(TestUtil.APPLICATION_JSON_UTF8)
                        .content(TestUtil.convertObjectToJsonBytes(u)))
                .andExpect(status().isCreated());

        Optional<User> user = userRepository.findOneByLogin("joe");
        assertThat(user.isPresent()).isTrue();
    }

    @Test
    @Transactional
    public void testRegisterInvalidLogin() throws Exception {
        UserDTO u = new UserDTO(
                "karol!!!",          // login <-- invalid
                "password",
                "karol",
                "kornecki",
                "karol.kornecki@gmail.com",
                true,
                "en",
                new HashSet<>(Arrays.asList(AuthoritiesConstants.USER))
        );

        restUserMockMvc.perform(
                post("/api/register")
                        .contentType(TestUtil.APPLICATION_JSON_UTF8)
                        .content(TestUtil.convertObjectToJsonBytes(u)))
                .andExpect(status().isBadRequest());

        Optional<User> user = userRepository.findOneByEmail("karol.kornecki@gmail.com");
        assertThat(user.isPresent()).isFalse();
    }

    @Test
    @Transactional
    public void testRegisterInvalidEmail() throws Exception {
        UserDTO u = new UserDTO(
                "kkor",
                "password",
                "karol",
                "kornecki",
                "xxx!",          // e-mail <-- invalid
                true,
                "en",
                new HashSet<>(Arrays.asList(AuthoritiesConstants.USER))
        );

        restUserMockMvc.perform(
                post("/api/register")
                        .contentType(TestUtil.APPLICATION_JSON_UTF8)
                        .content(TestUtil.convertObjectToJsonBytes(u)))
                .andExpect(status().isBadRequest());

        Optional<User> user = userRepository.findOneByLogin("kkor");
        assertThat(user.isPresent()).isFalse();
    }

    @Test
    @Transactional
    public void testRegisterDuplicateLogin() throws Exception {
        // Good
        UserDTO u = new UserDTO(
                "ala",
                "password",
                "Ala",
                "Surname",
                "ala@test.com",
                true,
                "en",
                new HashSet<>(Arrays.asList(AuthoritiesConstants.USER))
        );

        // Duplicate login, different e-mail
        UserDTO dup = new UserDTO(u.getLogin(), u.getPassword(), u.getLogin(), u.getLastName(),
                "ula@test.com", true, u.getLangKey(), u.getAuthorities());

        // Good user
        restMvc.perform(
                post("/api/register")
                        .contentType(TestUtil.APPLICATION_JSON_UTF8)
                        .content(TestUtil.convertObjectToJsonBytes(u)))
                .andExpect(status().isCreated());

        // Duplicate login
        restMvc.perform(
                post("/api/register")
                        .contentType(TestUtil.APPLICATION_JSON_UTF8)
                        .content(TestUtil.convertObjectToJsonBytes(dup)))
                .andExpect(status().is4xxClientError());

        Optional<User> userDup = userRepository.findOneByEmail("ula@test.com");
        assertThat(userDup.isPresent()).isFalse();
    }

    @Test
    @Transactional
    public void testRegisterDuplicateEmail() throws Exception {
        // Good
        UserDTO u = new UserDTO(
                "karol",
                "password",
                "Karol",
                "Kornecki",
                "karol.kornecki@gmail.com",
                true,
                "en",
                new HashSet<>(Arrays.asList(AuthoritiesConstants.USER))
        );

        // Duplicate e-mail, different login
        UserDTO dup = new UserDTO("karol2", u.getPassword(), u.getLogin(), u.getLastName(),
                u.getEmail(), true, u.getLangKey(), u.getAuthorities());

        // Good user
        restMvc.perform(
                post("/api/register")
                        .contentType(TestUtil.APPLICATION_JSON_UTF8)
                        .content(TestUtil.convertObjectToJsonBytes(u)))
                .andExpect(status().isCreated());

        // Duplicate e-mail
        restMvc.perform(
                post("/api/register")
                        .contentType(TestUtil.APPLICATION_JSON_UTF8)
                        .content(TestUtil.convertObjectToJsonBytes(dup)))
                .andExpect(status().is4xxClientError());

        Optional<User> userDup = userRepository.findOneByLogin("karol2");
        assertThat(userDup.isPresent()).isFalse();
    }

    @Test
    @Transactional
    public void testRegisterAdminIsIgnored() throws Exception {
        UserDTO u = new UserDTO(
                "admin2",
                "password2",
                "Admin2",
                "Admin2",
                "admin2@test.com",
                true,
                "en",
                new HashSet<>(Arrays.asList(AuthoritiesConstants.ADMIN)) // <-- only admin should be able to do that
        );

        restMvc.perform(
                post("/api/register")
                        .contentType(TestUtil.APPLICATION_JSON_UTF8)
                        .content(TestUtil.convertObjectToJsonBytes(u)))
                .andExpect(status().isCreated());

        Optional<User> userDup = userRepository.findOneByLogin("admin2");
        assertThat(userDup.isPresent()).isTrue();
        assertThat(userDup.get().getAuthorities()).hasSize(1)
                .containsExactly(authorityRepository.findOne(AuthoritiesConstants.USER));
    }
}
