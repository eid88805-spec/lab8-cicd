CREATE TABLE IF NOT EXISTS tasks (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  status VARCHAR(50) NOT NULL
);

INSERT INTO tasks (id, name, status) VALUES
  (1, 'Homework',  'done'),
  (2, 'Grocery',   'pending'),
  (3, 'Laundry',   'pending'),
  (4, 'Cooking',   'done'),
  (5, 'Exercise',  'pending'),
  (6, 'Reading',   'done')
ON CONFLICT (id) DO NOTHING;
