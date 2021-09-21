-- Connect DB at buysell directory
-- \c midterm
-- \i db/schema/03_trades.sql
DROP TABLE IF EXISTS trade CASCADE;

-- CREATE TABLE trade (
--   id SERIAL PRIMARY KEY NOT NULL,
--   owner_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
--   car_id INTEGER NOT NULL REFERENCES cars(id) ON DELETE CASCADE,

--   title VARCHAR(255) NOT NULL,
--   trade_type VARCHAR(10) NOT NULL,
--   sold BOOLEAN NOT NULL DEFAULT FALSE,
--   price INTEGER,
--   description TEXT,
--   start_at TIMESTAMP NOT NULL  DEFAULT now(),
--   end_at  TIMESTAMP NOT NULL ,
--   country VARCHAR(255),
--   street VARCHAR(255),
--   city VARCHAR(255),
--   province VARCHAR(255),
--   post_code VARCHAR(255),
--   tag VARCHAR(255),
--   active BOOLEAN NOT NULL DEFAULT TRUE
-- );
