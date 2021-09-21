-- Connect DB at buysell directory
-- \c midterm
-- \i db/schema/01_users.sql
DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL

);
