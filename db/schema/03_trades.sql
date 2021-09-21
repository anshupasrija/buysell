-- Connect DB at buysell directory
-- \c midterm
-- \i db/schema/03_trades.sql
DROP TABLE IF EXISTS trades CASCADE;

CREATE TABLE trades (
  id SERIAL PRIMARY KEY NOT NULL,
--  owner_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
--  car_id INTEGER NOT NULL REFERENCES cars(id) ON DELETE CASCADE,

--  title VARCHAR(255) NOT NULL,
--  trade_type VARCHAR(10) NOT NULL,
  sold BOOLEAN NOT NULL DEFAULT FALSE,
  sold_user_id INTEGER,

  brand VARCHAR(128) NOT NULL,
  model VARCHAR(255) NOT NULL,
  year SMALLINT NOT NULL,
  color VARCHAR(20),
  transmission VARCHAR(20),
  fuel VARCHAR(20),
  mileage INTEGER,
  thumbnail_photo_url VARCHAR(255),
  image VARCHAR(255),

  price INTEGER,
  description TEXT,
  start_at TIMESTAMP NOT NULL  DEFAULT now(), --start_at may not now().
  end_at  TIMESTAMP,
  insert_date TIMESTAMP NOT NULL  DEFAULT now(),
  -- country VARCHAR(255),
  -- street VARCHAR(255),
  -- city VARCHAR(255),
  -- province VARCHAR(255),
  -- post_code VARCHAR(255),
  -- tag VARCHAR(255),
  active BOOLEAN NOT NULL DEFAULT TRUE
);
