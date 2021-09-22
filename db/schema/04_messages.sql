DROP TABLE IF EXISTS messages CASCADE;

CREATE TABLE messages (
  id SERIAL PRIMARY KEY NOT NULL,
  group_id INTEGER NOT NULL,
  seq INTEGER,
  trades_id INTEGER NOT NULL,
  from_users_id INTEGER NOT NULL,
  to_users_id INTEGER NOT NULL,
  message VARCHAR(255)
  insert_date TIMESTAMP NOT NULL DEFAULT now(),
  user_read BOOLEAN NOT NULL DEFAULT FALSE,
  FOREIGN KEY (trades_id) REFERENCES trades(id)
  -- FOREIGN KEY (users_id) REFERENCES users(id)
)
