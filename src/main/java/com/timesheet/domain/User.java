package com.timesheet.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.validator.constraints.Email;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.ZonedDateTime;
import java.util.Collections;
import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.Set;

/**
 * A user.
 */
@Entity
@Table(name = "USER", schema = "TIMESHEET")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@ToString
public class User extends AbstractAuditingEntity implements Serializable {

    @Getter
    @Setter
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "ID")
    private Long id;

    @Getter
    @Setter
    @NotNull
    @Pattern(regexp = "^[a-z0-9]*$|(anonymousUser)")
    @Size(min = 1, max = 50)
    @Column(name = "LOGIN", length = 50, unique = true, nullable = false)
    private String login;

    @Getter
    @Setter
    @JsonIgnore
    @NotNull
    @Size(min = 60, max = 60)
    @Column(name = "PASSWORD_HASH", length = 60)
    private String password;

    @Getter
    @Setter
    @Size(max = 50)
    @Column(name = "FIRST_NAME", length = 50)
    private String firstName;

    @Getter
    @Setter
    @Size(max = 50)
    @Column(name = "LAST_NAME", length = 50)
    private String lastName;

    @Getter
    @Setter
    @Email
    @Size(max = 100)
    @Column(name = "EMAIL", length = 100, unique = true)
    private String email;

    @Getter
    @Setter
    @Column(nullable = false)
    private boolean activated = false;

    @Getter
    @Setter
    @Size(min = 2, max = 5)
    @Column(name = "LANG_KEY", length = 5)
    private String langKey;

    @Getter
    @Setter
    @Size(max = 20)
    @Column(name = "ACTIVATION_KEY", length = 20)
    @JsonIgnore
    private String activationKey;

    @Getter
    @Setter
    @Size(max = 20)
    @Column(name = "RESET_KEY", length = 20)
    private String resetKey;

    @Getter
    @Setter
    @Column(name = "RESET_DATE", nullable = true)
    private ZonedDateTime resetDate = null;

    @Setter
    @Getter
    @Column(name = "POSITION")
    private String position;

    @Setter
    @Getter
    @Column(name = "HOURLY_RATE")
    private BigDecimal hourlyRate;

    @Getter
    @Setter
    @JsonIgnore
    @ManyToMany
    @JoinTable(schema = "TIMESHEET",
        name = "USER_AUTHORITY",
        joinColumns = {@JoinColumn(name = "USER_ID", referencedColumnName = "ID")},
        inverseJoinColumns = {@JoinColumn(name = "AUTHORITY_NAME", referencedColumnName = "NAME")})
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Authority> authorities = new HashSet<>();

    @Getter
    @Setter
    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, mappedBy = "user")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<PersistentToken> persistentTokens = new HashSet<>();

    @Getter
    @Setter
    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, mappedBy = "user")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<WeekDay> weekDays = new LinkedHashSet<>();

    @Getter
    @Setter
    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, mappedBy = "manager")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<User> users = new LinkedHashSet<>();

    @Getter
    @Setter
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "MANAGER_ID")
    private User manager;

    @Getter
    @Setter
    @OneToOne(mappedBy = "user")
    private UserConfiguration userConfiguration;


    public Set<Authority> getAuthorities() {
        return Collections.unmodifiableSet(authorities);
    }

    public void clearAuthorities() {
        authorities.clear();
    }

    public void addAuthority(Authority authority) {
        authorities.add(authority);
    }

    public Set<PersistentToken> getPersistentTokens() {
        return Collections.unmodifiableSet(persistentTokens);
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        User user = (User) o;

        if (!login.equals(user.login)) {
            return false;
        }

        return true;
    }

    @Override
    public int hashCode() {
        return login.hashCode();
    }

}
