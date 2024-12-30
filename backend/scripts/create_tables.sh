#!/bin/bash

# Set environment (dev or prod)
environment=${1:-dev}

# Define database names for different environments
if [ "$environment" == "prod" ]; then
  db_name="aegis"
  user_name="aegis"
else
  db_name="aegis"
  user_name="aegis"
fi

# File paths
dropfile=$PWD/db/postgres/drop_all_tables.sql
user=$PWD/db/postgres/user.sql
aegis=$PWD/db/postgres/aegis.sql

# Execute SQL files
psql -h localhost -U $user_name -d $db_name \
  -f $dropfile \
  -f $user \
  -f $aegis \
  -W
