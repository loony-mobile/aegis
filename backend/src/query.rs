#[macro_export]
macro_rules! delete_nodes_query {
    ($table:expr, $column:expr, &$values:expr, $last:expr) => {{
        let mut query = format!("DELETE FROM {} WHERE {} IN (", $table, $column);

        for value in $values.iter() {
            query.push_str(&value.to_string());
            query.push_str(", ");
        }
        query.push_str(&format!("{})", &$last.to_string()));
        query
    }};
}

#[macro_export]
macro_rules! delete_where {
    ($table:expr, $column:expr, $value:expr) => {
        format!("DELETE FROM {} WHERE {}={}", $table, $column, $value)
    };
}

#[macro_export]
macro_rules! delete_query {
    ($table:expr, $column:expr, $values:expr) => {{
        let mut ids_str = String::from("");
        for (id, value) in $values.iter().enumerate() {
            ids_str.push_str(value.to_string());
        }
        format!("DELETE FROM {} WHERE {} IN ({})", $table, $column, ids_str)
    }};
}

#[macro_export]
macro_rules! update_query {
    ($table:expr, $set_col:expr, $set_val:expr, $where_col:expr, $where_val:expr) => {
        format!(
            "UPDATE {} set {}={} WHERE {}={}",
            $table, $set_col, $set_val, $where_col, $where_val
        )
    };
}
