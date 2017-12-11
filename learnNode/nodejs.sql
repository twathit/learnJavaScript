drop database if exists nodejs;
create database nodejs;
use nodejs;
grant all privileges on nodejs.* to 'root'@'%' identified by '151480';

create table users (
    id varchar(50) not null,
    name varchar(100) not null,
    gender bool not null,
    email varchar(100) not null,
    createdAt bigint not null,
    updatedAt bigint not null,
    version bigint not null,
    primary key (id)
) engine=innodb;

create table pets (
    id varchar(50) not null,
    ownerId varchar(50) not null,
    name varchar(100) not null,
    gender bool not null,
    birth varchar(10) not null,
    createdAt bigint not null,
    updatedAt bigint not null,
    version bigint not null,
    primary key (id)
) engine=innodb;