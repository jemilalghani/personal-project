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



--------------------------------------
select * from pixals;
drop table if exists pixals;
insert into pixals (user_id, year, number_date, mood)
values (1, 2018, 310, 'rgb(170,43,34)');
delete from pixals where user_id=21

delete from messages where id=32
select * from messages

select m.id, m.date, m.message, p.mood, m.picture from messages m 
join pixals p on p.date = m.date
where p.user_id = 1 and m.user_id =1 order by m.id desc;
 
select * from users
delete from users where id=11;

drop table if exists messages;
create table messages (
    id serial primary key
    , user_id int REFERENCES users(id) not null
    , date text not null 
    , message text not null
    , picture text
);

insert into messages (user_id, date, message, picture) values (1, '2018-11-03', 'Hello Moto', null);
insert into messages (user_id, date, message, picture) values (1, '2018-11-04', 'testing', null);
select * from messages;
delete from messages where user_id=1 and id=

drop table if exists pixals;
create table pixals (
    id serial primary key
    , user_id int REFERENCES users(id)
    , date text not null
    , mood text not null
    , unique (date, user_id)
);

select * from pixals where user_id=1;
delete from pixals where id=17;

insert into pixals (user_id, date, mood) values (1,'2018-11-02', 'rgb(220,108,120)');
insert into pixals (user_id, date, mood) values (1,'2018-10-09', 'rgb(220,108,120)');
insert into pixals (user_id, date, mood) values (1,'2018-10-10', 'rgb(245,181,107)');
insert into pixals (user_id, date, mood) values (1,'2018-10-02', 'rgb(170,43,34)');

-- 
CREATE TABLE admin (
  id SERIAL PRIMARY KEY,
  username VARCHAR UNIQUE,
  password VARCHAR
);
