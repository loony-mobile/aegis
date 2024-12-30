pub fn insert_tags(table_name: &str, columns: &str, tags: Vec<(i32, i32, &str, i32)>) -> String {
    let mut query = format!("INSERT INTO {} {} VALUES ", table_name, columns);
    let mut values = Vec::new();

    for (book_id, user_id, name, score) in tags.iter() {
        values.push(format!("({}, {}, '{}', {})", book_id, user_id, name, score));
    }

    query.push_str(&values.join(", "));
    query
}
