package com.timesheet.domain;

import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

/**
 * Persistent tokens are used by Spring Security to automatically log in users.
 *
 * @see com.timesheet.security.CustomPersistentRememberMeServices
 */
@Entity
@Table(name = "PERSISTENT_TOKEN", schema = "TIMESHEET")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@ToString
public class PersistentToken implements Serializable {

    private static final DateTimeFormatter DATE_TIME_FORMATTER = DateTimeFormatter.ofPattern("d MMMM yyyy");

    private static final int MAX_USER_AGENT_LEN = 255;

    @Getter
    @Setter
    @Id
    @Column(name = "SERIES")
    private String series;

    @Getter
    @Setter
    @JsonIgnore
    @NotNull
    @Column(name = "TOKEN_VALUE", nullable = false)
    private String tokenValue;

    @Getter
    @Setter
    @JsonIgnore
    @Column(name = "TOKEN_DATE")
    private LocalDate tokenDate;

    @Getter
    @Setter
    //an IPV6 address max length is 39 characters
    @Size(min = 0, max = 39)
    @Column(name = "IP_ADDRESS", length = 39)
    private String ipAddress;

    @Getter
    @Column(name = "USER_AGENT")
    private String userAgent;

    @Getter
    @Setter
    @JsonIgnore
    @ManyToOne
    private User user;

    @JsonGetter
    public String getFormattedTokenDate() {
        return DATE_TIME_FORMATTER.format(this.tokenDate);
    }

    public void setUserAgent(String userAgent) {
        if (userAgent.length() >= MAX_USER_AGENT_LEN) {
            this.userAgent = userAgent.substring(0, MAX_USER_AGENT_LEN - 1);
        } else {
            this.userAgent = userAgent;
        }
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        PersistentToken that = (PersistentToken) o;

        if (!series.equals(that.series)) {
            return false;
        }

        return true;
    }

    @Override
    public int hashCode() {
        return series.hashCode();
    }
}
