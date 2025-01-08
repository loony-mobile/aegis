extern crate rand;
use rand::{distributions::Alphanumeric, Rng};

fn main() {
    let random_string: String = rand::thread_rng()
        .sample_iter(&Alphanumeric)
        .take(16) // Length of the string
        .map(char::from)
        .collect();

    println!("Random String: {}", random_string);
}
