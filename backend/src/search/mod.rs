use std::sync::Arc;
use std::sync::Mutex;
use tantivy::schema::*;
use tantivy::{Index, IndexWriter};
use tempfile::TempDir;

#[derive(Clone)]
pub struct Search {
    pub title: Field,
    pub writer: Arc<Mutex<IndexWriter>>,
    pub doc: TantivyDocument,
}

pub fn init_search() -> Search {
    let index_path = TempDir::new().unwrap();
    let mut schema_builder = Schema::builder();
    schema_builder.add_text_field("title", TEXT | STORED);
    schema_builder.add_text_field("body", TEXT);
    let schema = schema_builder.build();
    let index = Index::create_in_dir(&index_path, schema.clone()).unwrap();
    let index_writer: IndexWriter = index.writer(50_000_000).unwrap();
    let title = schema.get_field("title").unwrap();
    let doc = TantivyDocument::default();

    Search {
        title,
        writer: Arc::new(Mutex::new(index_writer)),
        doc,
    }
}
