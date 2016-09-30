package com.timesheet.config;

import com.codahale.metrics.MetricRegistry;
import com.fasterxml.jackson.datatype.hibernate4.Hibernate4Module;
import com.timesheet.config.liquibase.AsyncSpringLiquibase;
import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import liquibase.integration.spring.SpringLiquibase;
import org.h2.tools.Server;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.jdbc.DataSourceProperties;
import org.springframework.boot.autoconfigure.liquibase.LiquibaseProperties;
import org.springframework.context.ApplicationContextException;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.core.env.Environment;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.inject.Inject;
import javax.sql.DataSource;
import java.sql.SQLException;
import java.util.Arrays;
import java.util.Optional;

@Configuration
@EnableJpaRepositories("com.timesheet.repository")
@EnableJpaAuditing(auditorAwareRef = "springSecurityAuditorAware")
@EnableTransactionManagement
public class DatabaseConfiguration {

    private final Logger LOG = LoggerFactory.getLogger(DatabaseConfiguration.class);

    @Inject
    private Environment env;

    @Autowired(required = false)
    private MetricRegistry metricRegistry;

    @Bean(destroyMethod = "close")
    public DataSource dataSource(DataSourceProperties dataSourceProperties, TimesheetProperties timesheetProperties) {
        LOG.debug("Configuring Datasource");
        if (dataSourceProperties.getUrl() == null) {
            LOG.error("Your database connection pool configuration is incorrect! The application" +
                            " cannot start. Please check your Spring profile, current profiles are: {}",
                    Arrays.toString(env.getActiveProfiles()));

            throw new ApplicationContextException("Database connection pool is not configured correctly");
        }
        HikariConfig config = new HikariConfig();
        config.setDataSourceClassName(dataSourceProperties.getDriverClassName());
        config.addDataSourceProperty("url", dataSourceProperties.getUrl());
        config.addDataSourceProperty("user", Optional.ofNullable(dataSourceProperties.getUsername()).orElse(""));
        config.addDataSourceProperty("password", Optional.ofNullable(dataSourceProperties.getPassword()).orElse(""));

        //MySQL optimizations, see https://github.com/brettwooldridge/HikariCP/wiki/MySQL-Configuration
        if ("com.mysql.jdbc.jdbc2.optional.MysqlDataSource".equals(dataSourceProperties.getDriverClassName())) {
            config.addDataSourceProperty("cachePrepStmts", timesheetProperties.getDatasource().isCachePrepStmts());
            config.addDataSourceProperty("prepStmtCacheSize", timesheetProperties.getDatasource().getPrepStmtCacheSize());
            config.addDataSourceProperty("prepStmtCacheSqlLimit", timesheetProperties.getDatasource().getPrepStmtCacheSqlLimit());
        }
        if (metricRegistry != null) {
            config.setMetricRegistry(metricRegistry);
        }
        return new HikariDataSource(config);
    }

    /**
     * Open the TCP port for the H2 database, so it is available remotely.
     */
    @Bean(initMethod = "start", destroyMethod = "stop")
    @Profile(Constants.SPRING_PROFILE_DEVELOPMENT)
    public Server h2TCPServer() throws SQLException {
        return Server.createTcpServer("-tcp", "-tcpAllowOthers");
    }

    @Bean
    public SpringLiquibase liquibase(DataSource dataSource,
                                     LiquibaseProperties liquibaseProperties) {
        SpringLiquibase liquibase = new AsyncSpringLiquibase();
        liquibase.setDataSource(dataSource);
        liquibase.setChangeLog("classpath:config/liquibase/master.xml");
        liquibase.setContexts(liquibaseProperties.getContexts());
        liquibase.setDefaultSchema(liquibaseProperties.getDefaultSchema());
        liquibase.setDropFirst(liquibaseProperties.isDropFirst());
        liquibase.setShouldRun(liquibaseProperties.isEnabled());
        LOG.debug("Configuring Liquibase");
        return liquibase;
    }

    @Bean
    public Hibernate4Module hibernate4Module() {
        return new Hibernate4Module();
    }
}
