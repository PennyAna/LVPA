CREATE TABLE media_table (
title_id serial NOT NULL, 
title_name varchar(50) PRIMARY KEY NOT NULL, 
pub_year int, 
image_link varchar(150), 
genre_type varchar(50),
descript_info varchar(200),
media_type_tv BOOLEAN NOT NULL, 
media_type_film BOOLEAN NOT NULL, 
media_type_other BOOLEAN NOT NULL 
);

CREATE TABLE genre_table (
    genre_id serial NOT NULL, 
    genre_name varchar(50) PRIMARY KEY NOT NULL
);

CREATE TABLE login_table (
    username varchar(20) NOT NULL, 
    password varchar(20) NOT NULL 
);