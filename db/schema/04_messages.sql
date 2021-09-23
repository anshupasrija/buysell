DROP TABLE IF EXISTS messages CASCADE;

CREATE TABLE messages (
  id SERIAL PRIMARY KEY NOT NULL,
<<<<<<< HEAD
  messageNum INTEGER NOT NULL,
  trade_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  FOREIGN KEY (trade_id) REFERENCES trades(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
=======
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
>>>>>>> 15022ca6b5b74b17a83c241db55759e42cdc23d8
)
