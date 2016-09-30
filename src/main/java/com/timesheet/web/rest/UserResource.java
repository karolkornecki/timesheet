package com.timesheet.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.timesheet.domain.User;
import com.timesheet.repository.AuthorityRepository;
import com.timesheet.repository.UserRepository;
import com.timesheet.security.AuthoritiesConstants;
import com.timesheet.service.MailService;
import com.timesheet.service.UserService;
import com.timesheet.web.rest.dto.ManagedUserDTO;
import com.timesheet.web.rest.util.HeaderUtil;
import com.timesheet.web.rest.util.PaginationUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * REST controller for managing users.
 */
@RestController
@RequestMapping("/api")
public class UserResource {

    private final Logger LOG = LoggerFactory.getLogger(UserResource.class);

    @Inject
    private UserRepository userRepository;

    @Inject
    private MailService mailService;

    @Inject
    private AuthorityRepository authorityRepository;

    @Inject
    private UserService userService;

    /**
     * POST  /users -> Creates a new user.
     * <p>
     * Creates a new user if the login and email are not already used, and sends an
     * mail with an activation link.
     * The user needs to be activated on creation.
     * </p>
     */
    @RequestMapping(value = "/users",
            method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    @Secured(AuthoritiesConstants.ADMIN)
    public ResponseEntity<?> createUser(@RequestBody ManagedUserDTO managedUserDTO, HttpServletRequest request) throws URISyntaxException {
        LOG.debug("REST request to save User : {}", managedUserDTO);
        if (userRepository.findOneByLogin(managedUserDTO.getLogin()).isPresent()) {
            return ResponseEntity.badRequest()
                    .headers(HeaderUtil.createFailureAlert("user-management", "userexists", "Login already in use"))
                    .body(null);
        } else if (userRepository.findOneByEmail(managedUserDTO.getEmail()).isPresent()) {
            return ResponseEntity.badRequest()
                    .headers(HeaderUtil.createFailureAlert("user-management", "emailexists", "Email already in use"))
                    .body(null);
        } else {
            User newUser = userService.createUser(managedUserDTO);
            String baseUrl = request.getScheme() + // "http"
                    "://" +                                // "://"
                    request.getServerName() +              // "myhost"
                    ":" +                                  // ":"
                    request.getServerPort() +              // "80"
                    request.getContextPath();              // "/myContextPath" or "" if deployed in root context
            mailService.sendCreationEmail(newUser, baseUrl);
            return ResponseEntity.created(new URI("/api/users/" + newUser.getLogin()))
                    .headers(HeaderUtil.createAlert("user-management.created", newUser.getLogin()))
                    .body(newUser);
        }
    }

    /**
     * PUT  /users -> Updates an existing User.
     */
    @RequestMapping(value = "/users",
            method = RequestMethod.PUT,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    @Transactional
    @Secured(AuthoritiesConstants.ADMIN)
    public ResponseEntity<ManagedUserDTO> updateUser(@RequestBody ManagedUserDTO managedUserDTO) throws URISyntaxException {
        LOG.debug("REST request to update User : {}", managedUserDTO);
        Optional<User> existingUser = userRepository.findOneByEmail(managedUserDTO.getEmail());
        if (existingUser.isPresent() && (!existingUser.get().getId().equals(managedUserDTO.getId()))) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("user-management", "emailexists", "E-mail already in use")).body(null);
        }
        existingUser = userRepository.findOneByLogin(managedUserDTO.getLogin());
        if (existingUser.isPresent() && (!existingUser.get().getId().equals(managedUserDTO.getId()))) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("user-management", "userexists", "Login already in use")).body(null);
        }
        return userRepository
                .findOneById(managedUserDTO.getId())
                .map(user -> {
                    user.setLogin(managedUserDTO.getLogin());
                    user.setFirstName(managedUserDTO.getFirstName());
                    user.setLastName(managedUserDTO.getLastName());
                    user.setEmail(managedUserDTO.getEmail());
                    user.setActivated(managedUserDTO.isActivated());
                    user.setLangKey(managedUserDTO.getLangKey());
                    user.setPosition(managedUserDTO.getPosition());
                    user.setHourlyRate(managedUserDTO.getHourlyRate());
                    user.clearAuthorities();
                    managedUserDTO.getAuthorities().stream()
                            .forEach(authority -> user.addAuthority(authorityRepository.findOne(authority)));
                    return ResponseEntity.ok()
                            .headers(HeaderUtil.createAlert("user-management.updated", managedUserDTO.getLogin()))
                            .body(new ManagedUserDTO(userRepository
                                    .findOne(managedUserDTO.getId())));
                })
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR));

    }

    /**
     * GET  /users -> get all users.
     */
    @RequestMapping(value = "/users",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    @Transactional(readOnly = true)
    public ResponseEntity<List<ManagedUserDTO>> getAllUsers(Pageable pageable)
            throws URISyntaxException {
        Page<User> page = userRepository.findAll(pageable);
        List<ManagedUserDTO> managedUserDTOs = page.getContent().stream()
                .map(user -> new ManagedUserDTO(user))
                .collect(Collectors.toList());
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/users");
        return new ResponseEntity<>(managedUserDTOs, headers, HttpStatus.OK);
    }

    /**
     * GET  /users/:login -> get the "login" user.
     */
    @RequestMapping(value = "/users/{login:[_'.@a-z0-9-]+}",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<ManagedUserDTO> getUser(@PathVariable String login) {
        LOG.debug("REST request to get User : {}", login);
        return userService.getUserWithAuthoritiesByLogin(login)
                .map(ManagedUserDTO::new)
                .map(managedUserDTO -> new ResponseEntity<>(managedUserDTO, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * DELETE  USER :login -> delete the "login" User.
     */
    @RequestMapping(value = "/users/{login}",
            method = RequestMethod.DELETE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    @Secured(AuthoritiesConstants.ADMIN)
    public ResponseEntity<Void> deleteUser(@PathVariable String login) {
        LOG.debug("REST request to delete User: {}", login);
        userService.deleteUserInformation(login);
        return ResponseEntity.ok().headers(HeaderUtil.createAlert("user-management.deleted", login)).build();
    }
}
