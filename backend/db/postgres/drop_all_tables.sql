DO $$ 
DECLARE
    tbl RECORD;
BEGIN
    FOR tbl IN
        SELECT tablename
        FROM pg_tables
        WHERE schemaname = 'public'
    LOOP
        EXECUTE 'DROP TABLE IF EXISTS public.' || tbl.tablename || ' CASCADE';
    END LOOP;
END $$;
