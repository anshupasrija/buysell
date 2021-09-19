-- Connect DB at buysell directory
-- \c midterm
-- \i db/schema/02_cars.sql
DROP TABLE IF EXISTS cars CASCADE;

CREATE TABLE cars (
  id SERIAL PRIMARY KEY NOT NULL,
  owner_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,

  title VARCHAR(255) NOT NULL,
  brand VARCHAR(128) NOT NULL,
  model VARCHAR(255) NOT NULL,
  year SMALLINT NOT NULL,
  color VARCHAR(20),
  transmission VARCHAR(20),
  fuel VARCHAR(20),
  mileage INTEGER,
  thumbnail_photo_url VARCHAR(255),
  image VARCHAR(255),
  active BOOLEAN NOT NULL DEFAULT TRUE
);

comment on column cars.color is 'Considering NOT NULL option';
comment on column cars.transmission is 'Considering NOT NULL option';
comment on column cars.fuel is 'Considering NOT NULL option';
comment on column cars.mileage is 'Considering NOT NULL option';

comment on column cars.image is 'Considering URL type or image_id of image table';
