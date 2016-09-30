package com.timesheet.config.liquibase;

import com.timesheet.config.Constants;
import liquibase.exception.LiquibaseException;
import liquibase.integration.spring.SpringLiquibase;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.core.env.Environment;
import org.springframework.core.task.TaskExecutor;
import org.springframework.util.StopWatch;

import javax.inject.Inject;

/**
 * Run liquibase scripts asynchronously. It overrides standard synchronous liquibase.integration SpringLiquibase.
 */
public class AsyncSpringLiquibase extends SpringLiquibase {

    private final Logger log = LoggerFactory.getLogger(AsyncSpringLiquibase.class);

    @Inject
    @Qualifier("taskExecutor")
    private TaskExecutor taskExecutor;

    @Inject
    private Environment env;

    @Override
    public void afterPropertiesSet() throws LiquibaseException {
        if (env.acceptsProfiles(Constants.SPRING_PROFILE_DEVELOPMENT)) {
            initDbAsync();
        } else {
            log.debug("Starting Liquibase synchronously");
            initDb();
        }
    }

    private void initDbAsync() {
        taskExecutor.execute(() -> {
            try {
                log.warn("Starting Liquibase asynchronously, your database might not be ready at startup!");
                initDb();
            } catch (LiquibaseException e) {
                log.error("Liquibase could not start correctly, your database is NOT ready: {}", e.getMessage(), e);
            }
        });
    }

    protected void initDb() throws LiquibaseException {
        StopWatch watch = new StopWatch();
        watch.start();
        super.afterPropertiesSet();
        watch.stop();
        log.debug("Started Liquibase in {} ms", watch.getTotalTimeMillis());
    }
}
