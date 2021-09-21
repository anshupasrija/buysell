-- Connect DB at buysell directory
-- \c midterm
-- \i db/schema/01_users.sql
DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  location VARCHAR(255),
  phone VARCHAR(10)
);
