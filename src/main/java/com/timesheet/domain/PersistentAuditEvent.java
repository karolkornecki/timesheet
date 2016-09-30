package com.timesheet.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

/**
 * Persist AuditEvent managed by the Spring Boot actuator
 *
 * @see org.springframework.boot.actuate.audit.AuditEvent
 */
@Entity
@Table(name = "PERSISTENT_AUDIT_EVENT", schema = "TIMESHEET")
public class PersistentAuditEvent {

    @Getter
    @Setter
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "EVENT_ID")
    private Long id;

    @Getter
    @Setter
    @NotNull
    @Column(name = "PRINCIPAL", nullable = false)
    private String principal;

    @Getter
    @Setter
    @Column(name = "EVENT_DATE")
    private LocalDateTime auditEventDate;

    @Getter
    @Setter
    @Column(name = "EVENT_TYPE")
    private String auditEventType;

    @Getter
    @Setter
    @ElementCollection
    @MapKeyColumn(name = "NAME")
    @Column(name = "VALUE")
    @CollectionTable(name = "PERSISTENT_AUDIT_EVENT_DATA", schema = "TIMESHEET", joinColumns = @JoinColumn(name = "EVENT_ID"))
    private Map<String, String> data = new HashMap<>();

}
