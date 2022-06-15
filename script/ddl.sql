drop database tutorial;

create database tutorial;

use tutorial;

show tables;

## post table
create table posts
(
    id        int auto_increment
        primary key,
    title     varchar(255) null,
    content   varchar(255) null,
    createdAt datetime     not null,
    updatedAt datetime     not null
);

