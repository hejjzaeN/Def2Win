export enum AccessLevel {
    OWNER = 1,
    ADMIN = 2,
    MODER = 3,
    MEMBER = 4,
    BANNED = 5
};

export enum UserRight {
    LOGIN,
    BAN
}

export enum GoalPriority {
    LOW = 1,
    MIDDLE = 2,
    HIGH = 3
};

export enum GoalStatus {
    PLANNED = 1,
    IN_PROGRESS = 2,
    FAILED = 3,
    COMPLETED = 4
};

export enum GoalCategory {
    UNDEFINED = 0,
    ALL = 1,
    COMMON_DEVELOPMENT = 2,
    HEALTH = 3,
    FINANCE = 4,
    SOCIAL = 5,
    CAREER = 6,
    DISCIPLINE = 7,
    HOBBY = 8
}

// TO DO : FILL IN
export enum GoalTrackType {
    SINGLE,
    DAYS,
    TIMES
}