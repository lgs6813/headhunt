CREATE TABLE IF NOT EXISTS USER(
    uid INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(10) NOT NULL,
    phone VARCHAR(13) NOT NULL,
    type VARCHAR(10) NOT NULL,
    user_id VARCHAR(15) NOT NULL,
    password VARCHAR(100) NOT NULL,
    age INT NOT NULL,
    create_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(uid)
)DEFAULT CHARSET=utf8;
CREATE TABLE IF NOT EXISTS FREELANCER(
    fid INT NOT NULL AUTO_INCREMENT,
    uid INT NOT NULL,
    major VARCHAR(10) NOT NULL,
    period INT NOT NULL,
    external_portfolio VARCHAR(100) NOT NULL,
    PRIMARY KEY(fid),
    FOREIGN KEY(uid) REFERENCES USER(uid)
);
CREATE TABLE IF NOT EXISTS CLIENT(
    cid INT NOT NULL AUTO_INCREMENT,
    uid INT NOT NULL,
    PRIMARY KEY(cid),
    FOREIGN KEY(uid) REFERENCES USER(uid)
);
CREATE TABLE IF NOT EXISTS FREELANCER_LANGUAGE(
    fid INT NOT NULL,
    language VARCHAR(20) NOT NULL,
    level INT NOT NULL,
    PRIMARY KEY(fid, language)
);
CREATE TABLE IF NOT EXISTS PROJECT(
    pid INT NOT NULL AUTO_INCREMENT,
    cid INT NOT NULL,
    cost INT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    min_career INT NOT NULL,
    status VARCHAR(20),
    min_members INT NOT NULL,
    max_members INT NOT NULL,
    create_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(pid),
    FOREIGN KEY(cid) REFERENCES CLIENT(cid)
);
CREATE TABLE IF NOT EXISTS PROJECT_REQUEST_DOC(
    did INT NOT NULL AUTO_INCREMENT,
    pid INT NOT NULL,
    URL VARCHAR(100) NOT NULL,
    PRIMARY KEY(did),
    FOREIGN KEY(pid) REFERENCES PROJECT(pid)
);
CREATE TABLE IF NOT EXISTS PROJECT_RESULT_REPORT(
    rid INT NOT NULL AUTO_INCREMENT,
    pid INT NOT NULL,
    URL VARCHAR(100) NOT NULL,
    is_rejected BOOLEAN NOT NULL,
    create_date DATE DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(rid),
    FOREIGN KEY(pid) REFERENCES PROJECT(pid)
);
CREATE TABLE IF NOT EXISTS PROJECT_COMPLETE_REJECT_MESSAGE(
    mid INT NOT NULL AUTO_INCREMENT,
    pid INT NOT NULL,
    message VARCHAR(500) NOT NULL,
    create_date DATE DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(mid),
    FOREIGN KEY(pid) REFERENCES PROJECT(pid)
);
CREATE TABLE IF NOT EXISTS PROJECT_LANGUAGE(
    pid INT NOT NULL,
    language VARCHAR(20) NOT NULL,
    level INT NOT NULL,
    PRIMARY KEY(pid, language),
    FOREIGN KEY(pid) REFERENCES PROJECT(pid)
);
CREATE TABLE IF NOT EXISTS TEAM(
    tid INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(10) NOT NULL,
    leader INT NOT NULL,
    type VARCHAR(10) NOT NULL,
    PRIMARY KEY(tid),
    FOREIGN KEY(leader) REFERENCES FREELANCER(fid)
);
CREATE TABLE IF NOT EXISTS TEAM_MEMBER(
    tid INT NOT NULL,
    fid INT NOT NULL,
    PRIMARY KEY(tid, fid),
    FOREIGN KEY(tid) REFERENCES TEAM(tid),
    FOREIGN KEY(fid) REFERENCES FREELANCER(fid)
);
CREATE TABLE IF NOT EXISTS REQUEST(
    rid INT NOT NULL AUTO_INCREMENT,
    pid INT NOT NULL,
    tid INT NOT NULL,
    is_accepted BOOLEAN NOT NULL,
    create_date  DATE DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(rid),
    FOREIGN KEY(pid) REFERENCES PROJECT(pid),
    FOREIGN KEY(tid) REFERENCES TEAM(tid)
);
CREATE TABLE IF NOT EXISTS FREELANCER_RATE(
    pid INT NOT NULL,
    fid INT NOT NULL,
    rate INT NOT NULL,
    PRIMARY KEY(pid),
    FOREIGN KEY(pid) REFERENCES PROJECT(pid),
    FOREIGN KEY(fid) REFERENCES FREELANCER(fid)
);
CREATE TABLE IF NOT EXISTS CLIENT_RATE(
    pid INT NOT NULL,
    cid INT NOT NULL,
    rate INT NOT NULL,
    PRIMARY KEY(pid),
    FOREIGN KEY(pid) REFERENCES PROJECT(pid),
    FOREIGN KEY(cid) REFERENCES CLIENT(cid)
);