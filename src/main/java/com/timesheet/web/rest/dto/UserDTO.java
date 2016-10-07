package com.timesheet.web.rest.dto;

import com.timesheet.domain.Authority;
import com.timesheet.domain.User;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Email;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * A DTO representing a user, with his authorities.
 */
public class UserDTO {

    public static final int PASSWORD_MIN_LENGTH = 4;
    public static final int PASSWORD_MAX_LENGTH = 50;

    @Getter
    @Setter
    private Long id;

    @Getter
    @Setter
    @Pattern(regexp = "^[a-z0-9]*$")
    @NotNull
    @Size(min = 1, max = 50)
    private String login;

    @Getter
    @Setter
    @NotNull
    @Size(min = PASSWORD_MIN_LENGTH, max = PASSWORD_MAX_LENGTH)
    private String password;

    @Getter
    @Setter
    @Size(max = 50)
    private String firstName;

    @Getter
    @Setter
    @Size(max = 50)
    private String lastName;

    @Getter
    @Setter
    @Email
    @Size(min = 5, max = 100)
    private String email;

    @Getter
    @Setter
    private boolean activated = false;

    @Getter
    @Setter
    @Size(min = 2, max = 5)
    private String langKey;

    @Getter
    @Setter
    private Set<String> authorities;

    public UserDTO() {
    }

    public UserDTO(User user) {
        this(user.getId(), user.getLogin(), null, user.getFirstName(), user.getLastName(),
                user.getEmail(), user.isActivated(), user.getLangKey(),
                user.getAuthorities().stream().map(Authority::getName)
                        .collect(Collectors.toSet()));
    }

    public UserDTO(Long id, String login, String password, String firstName, String lastName,
                   String email, boolean activated, String langKey, Set<String> authorities) {

        this.id = id;
        this.login = login;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.activated = activated;
        this.langKey = langKey;
        this.authorities = authorities;
    }


    @Override
    public String toString() {
        return "UserDTO{" +
                "login='" + login + '\'' +
                ", password='" + password + '\'' +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", email='" + email + '\'' +
                ", activated=" + activated +
                ", langKey='" + langKey + '\'' +
                ", authorities=" + authorities +
                "}";
    }

    public static UserDTO mapNamesAndLogin(User user) {
        UserDTO userDTO = new UserDTO();
        userDTO.setFirstName(user.getFirstName());
        userDTO.setLastName(user.getLastName());
        userDTO.setLogin(user.getLogin());
        return userDTO;
    }
}
