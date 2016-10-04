package com.timesheet.web.rest;

import com.timesheet.TimesheetApplication;
import com.timesheet.config.audit.AuditEventConverter;
import com.timesheet.domain.PersistentAuditEvent;
import com.timesheet.repository.PersistenceAuditEventRepository;
import com.timesheet.service.AuditEventService;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.inject.Inject;
import java.time.LocalDateTime;

import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * AuditResource REST controller tests.
 */
@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(classes = TimesheetApplication.class)
@WebAppConfiguration
@Transactional
public class AuditResourceIntTest {

    private static final String SAMPLE_PRINCIPAL = "SAMPLE_PRINCIPAL";
    private static final String SAMPLE_TYPE = "SAMPLE_TYPE";
    private static final LocalDateTime SAMPLE_TIMESTAMP = LocalDateTime.parse("2015-08-04T10:11:30");

    @Inject
    private PersistenceAuditEventRepository auditEventRepository;

    @Inject
    private AuditEventConverter auditEventConverter;

    private PersistentAuditEvent auditEvent;

    private MockMvc restAuditMockMvc;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        AuditEventService auditEventService =
                new AuditEventService(auditEventRepository, auditEventConverter);
        AuditResource auditResource = new AuditResource(auditEventService);
        this.restAuditMockMvc = MockMvcBuilders.standaloneSetup(auditResource).build();
    }

    @Before
    public void initTest() {
        auditEventRepository.deleteAll();
        auditEvent = new PersistentAuditEvent();
        auditEvent.setAuditEventType(SAMPLE_TYPE);
        auditEvent.setPrincipal(SAMPLE_PRINCIPAL);
        auditEvent.setAuditEventDate(SAMPLE_TIMESTAMP);
    }


    @Test
    public void getAllAudits() throws Exception {
        auditEventRepository.save(auditEvent);

        restAuditMockMvc.perform(get("/api/audits"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8))
                .andExpect(jsonPath("$.[*].principal").value(hasItem(SAMPLE_PRINCIPAL)));
    }

    @Test
    public void getAudit() throws Exception {
        auditEventRepository.save(auditEvent);

        restAuditMockMvc.perform(get("/api/audits/{id}", auditEvent.getId()))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8))
                .andExpect(jsonPath("$.principal").value(SAMPLE_PRINCIPAL));
    }

    @Test
    public void getNonExistingAudit() throws Exception {
        restAuditMockMvc.perform(get("/api/audits/{id}", Long.MAX_VALUE))
                .andExpect(status().isNotFound());
    }

}
