package com.timesheet.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.timesheet.repository.ManagedProjectRepository;
import com.timesheet.service.UserService;
import com.timesheet.web.rest.dto.ManagedProjectDTO;
import com.timesheet.web.rest.dto.UserDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.inject.Inject;
import java.util.List;
import java.util.stream.Collectors;

/**
 * REST controller for managing team members time reservation.
 *
 * @author Karol Kornecki
 */
@RestController
@RequestMapping("/api")
public class TeamManagementResource {

    private final Logger LOG = LoggerFactory.getLogger(TeamManagementResource.class);

    @Inject
    private UserService userService;

    @Inject
    private ManagedProjectRepository managedProjectRepository;

    /**
     * GET  /team/members -> get all team members managed by user.
     */
    @RequestMapping(value = "/team/members/{login}",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<List<UserDTO>> getTeamMembers(@PathVariable String login) {
        LOG.debug("REST request to get User : {} team members [getTeamMembers]", login);
        List<UserDTO> teamMembers = userService.findTeamMembers(login);
        return new ResponseEntity<>(teamMembers, HttpStatus.OK);
    }

    /**
     * GET  /team/projects -> get all projects available for logged in user.
     */
    @RequestMapping(value = "/team/projects/{login}",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<List<ManagedProjectDTO>> getManagedProjects(@PathVariable String login) {
        LOG.debug("REST request to get User : {} managed projects [getManagedProjects]", login);
        return new ResponseEntity<>(managedProjectRepository.findUserManagedProjects(login).stream()
                .map(ManagedProjectDTO::new)
                .collect(Collectors.toList()), HttpStatus.OK);
    }
}
