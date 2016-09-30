package com.timesheet.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.web.cors.CorsConfiguration;


@ConfigurationProperties(prefix = "timesheet", ignoreUnknownFields = false)
public class TimesheetProperties {

    @Getter
    private final Async async = new Async();

    @Getter
    private final Cache cache = new Cache();

    @Getter
    private final Datasource datasource = new Datasource();

    @Getter
    private final Metrics metrics = new Metrics();

    @Getter
    private final Mail mail = new Mail();

    @Getter
    private final CorsConfiguration cors = new CorsConfiguration();

    public static class Async {

        @Setter
        @Getter
        private int corePoolSize = 2;

        @Setter
        @Getter
        private int maxPoolSize = 50;

        @Setter
        @Getter
        private int queueCapacity = 10000;
    }

    public static class Cache {

        @Setter
        @Getter
        private int timeToLiveSeconds = 3600;

        @Getter
        private final Ehcache ehcache = new Ehcache();

        public static class Ehcache {

            @Setter
            @Getter
            private String maxBytesLocalHeap = "16M";
        }
    }

    public static class Datasource {

        @Setter
        @Getter
        private boolean cachePrepStmts = true;

        @Setter
        @Getter
        private int prepStmtCacheSize = 250;

        @Setter
        @Getter
        private int prepStmtCacheSqlLimit = 2048;

        @Setter
        @Getter
        private boolean useServerPrepStmts = true;

    }

    public static class Metrics {

        @Getter
        private final Jmx jmx = new Jmx();

        @Getter
        private final Spark spark = new Spark();

        @Getter
        private final Graphite graphite = new Graphite();

        public static class Jmx {

            @Setter
            @Getter
            private boolean enabled = true;

        }

        public static class Spark {

            @Setter
            @Getter
            private boolean enabled = false;

            @Setter
            @Getter
            private String host = "localhost";

            @Setter
            @Getter
            private int port = 9999;

        }

        public static class Graphite {

            @Setter
            @Getter
            private boolean enabled = false;

            @Setter
            @Getter
            private String host = "localhost";

            @Setter
            @Getter
            private int port = 2003;

            @Setter
            @Getter
            private String prefix = "timesheet";
        }
    }

    public static class Mail {

        @Setter
        @Getter
        private String from = "1timesheet1@gmail.com";
    }
}
