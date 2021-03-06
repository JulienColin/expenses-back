BEGIN;
CREATE TABLE IF NOT EXISTS person (
  id SERIAL NOT NULL,
  firstName VARCHAR(100) NOT NULL,
  lastName VARCHAR(100),
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS type
(
  id SERIAL NOT NULL,
  label VARCHAR(50) NOT NULL UNIQUE,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS category(
  id SERIAL NOT NULL,
  label VARCHAR(50) NOT NULL,
  type SERIAL NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (type) REFERENCES type(id)
);

CREATE TABLE IF NOT EXISTS expense
(
  id SERIAL NOT NULL,
  date DATE NOT NULL,
  amount DECIMAL NOT NULL,
  spender SERIAL,
  category SERIAL,
  PRIMARY KEY (id),
  FOREIGN KEY (spender) REFERENCES person(id),
  FOREIGN KEY (category) REFERENCES category(id)
);
COMMIT;
