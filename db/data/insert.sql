DO $$
  DECLARE leisure_type_id INTEGER ;
    DECLARE fixed_type_id INTEGER ;
    DECLARE necessities_type_id INTEGER ;
  BEGIN
    INSERT INTO person (firstname, lastname) VALUES ('Julien', 'Colin');
    INSERT INTO person (firstname, lastname) VALUES ('Yunhye', 'Jang');

    INSERT INTO type (label) VALUES ('leisure');
    INSERT INTO type (label) VALUES ('fixed');
    INSERT INTO type (label) VALUES ('necessities');

    leisure_type_id := (SELECT id from type t where t.label = 'leisure');
    fixed_type_id := (SELECT id from type t where t.label = 'fixed');
    necessities_type_id := (SELECT id from type t where t.label = 'necessities');

    INSERT INTO category (label, type) VALUES ('bar', leisure_type_id);
    INSERT INTO category (label, type) VALUES ('restaurant', leisure_type_id);
    INSERT INTO category (label, type) VALUES ('show', leisure_type_id);
    INSERT INTO category (label, type) VALUES ('cultural item', leisure_type_id);
    INSERT INTO category (label, type) VALUES ('clothe', leisure_type_id);
    INSERT INTO category (label, type) VALUES ('other', leisure_type_id);

    INSERT INTO category (label, type) VALUES ('rent', fixed_type_id);
    INSERT INTO category (label, type) VALUES ('internet', fixed_type_id);
    INSERT INTO category (label, type) VALUES ('phone bill', fixed_type_id);
    INSERT INTO category (label, type) VALUES ('transports', fixed_type_id);
    INSERT INTO category (label, type) VALUES ('other', fixed_type_id);

    INSERT INTO category (label, type) VALUES ('grocery', necessities_type_id);
    INSERT INTO category (label, type) VALUES ('pharmacy', necessities_type_id);
    INSERT INTO category (label, type) VALUES ('restaurant', necessities_type_id);
    INSERT INTO category (label, type) VALUES ('clothe', necessities_type_id);
    INSERT INTO category (label, type) VALUES ('other', necessities_type_id);

  END $$ ;
