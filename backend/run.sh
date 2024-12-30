#!/usr/bin/env sh

# Check if the number of arguments is exactly 2
if [ "$#" -eq 1 ]; then
    if [ "$1" = "--build-backend" ]; then
        echo "Building loony-axum-postgres..."
        cargo build --release
    fi
fi

HOME=$HOME
LOONY_API_PORT=8000
LOONY_API_HOSTNAME=localhost
TMP_UPLOADS="$HOME/.tmp_uploads"
BLOG_UPLOADS="$HOME/.blog_uploads"
BOOK_UPLOADS="$HOME/.book_uploads"
USER_UPLOADS="$HOME/.user_uploads"
LOONY_API_PG_HOSTNAME="localhost"
LOONY_API_PG_USERNAME="sankar"
LOONY_API_PG_DBNAME="sankar"
LOONY_API_PG_PASSWORD="sankar"
LOONY_API_SECRET_KEY="3d9e5b5d709dca9a9169c6b1d486b92d6e8652752b06e00e6c4b76a9e5b3b5dc"
LOONY_API_ALLOWED_ORIGINS="https://sankarboro.com,https://web.sankarboro.com,http://localhost,http://localhost:3000,http://127.0.0.1:8081,http://10.0.2.2:8081"

if [ ! -d "$TMP_UPLOADS" ]; then
    mkdir $TMP_UPLOADS
fi
if [ ! -d "$BLOG_UPLOADS" ]; then
    mkdir $BLOG_UPLOADS
fi
if [ ! -d "$BOOK_UPLOADS" ]; then
    mkdir $BOOK_UPLOADS
fi
if [ ! -d "$USER_UPLOADS" ]; then
    mkdir $USER_UPLOADS
fi

RUST_LOG=info \
LOONY_API_HOSTNAME="$LOONY_API_HOSTNAME" \
LOONY_API_PORT="$LOONY_API_PORT" \
LOONY_API_PG_HOSTNAME="$LOONY_API_HOSTNAME" \
LOONY_API_PG_USERNAME="$LOONY_API_PG_USERNAME" \
LOONY_API_PG_DBNAME="$LOONY_API_PG_DBNAME" \
LOONY_API_PG_PASSWORD="$LOONY_API_PG_PASSWORD" \
LOONY_API_ALLOWED_ORIGINS="$LOONY_API_ALLOWED_ORIGINS" \
LOONY_API_SECRET_KEY="$LOONY_API_SECRET_KEY" \
TMP_UPLOADS="$TMP_UPLOADS" \
BLOG_UPLOADS="$BLOG_UPLOADS" \
BOOK_UPLOADS="$BOOK_UPLOADS" \
USER_UPLOADS="$USER_UPLOADS" \
./target/release/loony_axum_postgres
