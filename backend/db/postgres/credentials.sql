CREATE TABLE credentials (
    uid serial PRIMARY KEY,
    user_id INT NOT NULL,
    name TEXT NOT NULL,
    username TEXT,
    password TEXT,
    url TEXT,
    metadata TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE NULL
);