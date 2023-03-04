create database multiplex_reservation;

use multiplex_reservation;

create table movie (
	movie_id int primary key,
	movie_name varchar(32),
	movie_img varchar(255),
	release_date DATE,
	running_time int,
	genre varchar(255),
	country varchar(10),
	director varchar(32),
	number_of_spectators int,
	age_restriction int,
	ratio double,
	reservation_rates double
) ENGINE=INNODB;


create table cinema(
	cinema_id int primary key,
	cinema_name varchar(32),
	region varchar(16)	
) ENGINE=INNODB;

create table screen (
	screen_id int primary key,
	cinema_id int not null,
	screen_no int not null,
	type varchar(16),
	foreign key(cinema_id) references cinema(cinema_id)
) ENGINE=INNODB;

create table member (
	member_id int primary key,
	password varchar(32),
	username varchar(32),
	birth DATE,
	sex varchar(2),
	address varchar(255),
	phone_number varchar(10),
	email_address varchar(64)
) ENGINE=INNODB;

create table box_office (
	box_office_id int primary key,
	movie_id int not null,
	screen_id int not null,
	date DATE not null,
	start_time TIME,
	seat_state varchar(255),
	foreign key(movie_id) references movie(movie_id),
	foreign key(screen_id) references screen(screen_id)
) ENGINE=INNODB;

create table reservation(
	reservation_id int primary key,
	reservation_status varchar(10),
	persone_type varchar(10),
	seat_type varchar(10)
) ENGINE=INNODB;

create table payment(
	payment_id int primary key,
	reservation_id int,
	payment_status varchar(255),
	payment_method varchar(255),
	amount int,
	foreign key(reservation_id) references reservation(reservation_id)
) ENGINE=INNODB;

create table coupon(
	coupon_id int primary key,
	coupon_name varchar(255),
	coupon_discounts int,
	coupon_expireDate DATETIME
) ENGINE=INNODB;

load data local infile 'resource/data/movie.csv' into table movie fields terminated by ',';
load data local infile 'resource/data/cinema.csv' into table cinema fields terminated by ',';
load data local infile 'resource/data/screen.csv' into table screen fields terminated by ',';
load data local infile 'resource/data/box_office.csv' into table box_office fields terminated by ',';