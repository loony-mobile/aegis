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
credentials=$PWD/db/postgres/credentials.sql

# Execute SQL files
psql -h localhost -U $user_name -d $db_name \
  -f $dropfile \
  -f $user \
  -f $credentials \
  -W

# 43GI5@25