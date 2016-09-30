package com.timesheet.domain;

/**
 * @author Karol Kornecki
 */
public enum Status {

    NEW(StatusCode.STATUS_NEW) {
        @Override
        public Status next() {
            return SAVED;
        }
    },

    SAVED(StatusCode.STATUS_SAVED) {
        @Override
        public Status next() {
            return PRE_APPROVED;
        }
    },

    PRE_APPROVED(StatusCode.STATUS_PRE_APPROVED) {
        @Override
        public Status next() {
            return PRE_APPROVED;
        }
    },

    APPROVED(StatusCode.STATUS_APPROVED) {
        @Override
        public Status next() {
            throw new IllegalStateException(this.name() + " is termination state ! There is no next transition possible.");
        }
    },

    REJECTED(StatusCode.STATUS_REJECTED) {
        @Override
        public Status next() {
            return NEW;
        }
    };


    private String code;

    Status(String code) {
        this.code = code;
    }

    public String getCode() {
        return code;
    }

    public abstract Status next();
}
