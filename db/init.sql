create table users (
id serial primary key, 
auth0_id text not null,
email text not null,
name text not null,
picture text not null,
display_name text
);

drop table if exists messages;
create table messages (
    id serial primary key
    , user_id int REFERENCES users(id) not null
    , date date not null 
    , message text not null
    , picture text
);

insert into messages (user_id, date, message, picture) values (1, '2018-11-03', 'Hello Moto', null);
insert into messages (user_id, date, message, picture) values (1, '2018-11-04', 'testing', null);
select * from messages

drop table if exists pixals;
create table pixals (
    id serial primary key
    , user_id int REFERENCES users(id)
    , date date not null
    , mood text not null
    , unique (date, user_id)
);

select * from pixals

insert into pixals (user_id, date, mood) values (1,'2018-11-03', 'rgb(220,108,120)');
insert into pixals (user_id, date, mood) values (1,'2018-11-04', 'rgb(220,108,120)');
insert into pixals (user_id, date, mood) values (1,'2018-11-05', 'rgb(245,181,107)');
insert into pixals (user_id, date, mood) values (1,'2018-11-06', 'rgb(170,43,34)');