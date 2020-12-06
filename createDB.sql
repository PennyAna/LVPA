CREATE TABLE films (
title_id serial, 
title_name varchar(50) PRIMARY KEY NOT NULL, 
pub_year int, 
image_link varchar(150), 
genre_type varchar(50)
);

CREATE TABLE tv_shows (
title_id serial, 
title_name varchar(50) PRIMARY KEY NOT NULL, 
pub_year int, 
image_link varchar(150), 
genre_type varchar(50)
);

CREATE TABLE other_media (
title_id serial, 
title_name varchar(50) PRIMARY KEY NOT NULL, 
pub_year int, 
image_link varchar(150), 
genre_type varchar(50)
);

CREATE TABLE genre_table (
    genre_id serial, 
    genre_name varchar(50) PRIMARY KEY NOT NULL
);