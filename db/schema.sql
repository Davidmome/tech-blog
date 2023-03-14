DROP DATABASE IF EXISTS TECH_BLOG_db;

CREATE DATABASE TECH_BLOG_db;

USE TECH_BLOG_db;

create table user
(
    id          integer not null auto_increment,
    username    varchar(50) not null,
    password    varchar(256) not null,
    primary key (id)
);

create table post
(
    id          integer not null auto_increment,
    title       varchar(256) not null,
    content     text not null,
    createdat   datetime not null default CURRENT_TIMESTAMP,
    user_id     integer not null,
    FOREIGN KEY (user_id) REFERENCES user(id),
    primary key (id)
);

create table comment
(
    id          integer not null auto_increment,
    comment     varchar(256) not null,
    createdat   datetime not null default CURRENT_TIMESTAMP,
    post_id     integer not null,
    user_id     integer not null,
    FOREIGN KEY (post_id) REFERENCES post(id),
    FOREIGN KEY (user_id) REFERENCES user(id),
    primary key (id)
);