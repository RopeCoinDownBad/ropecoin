use crate::storage::storages::WORDS;
use crate::constants::INITIAL_WORDS;
use crate::types::words::BoundedString;
use ic_cdk::println;

pub struct WordsLogic;

impl WordsLogic {

    pub fn init() {
        println!("Starting initialization with {} words", INITIAL_WORDS.len());
        WORDS.with(|words| {
            let words = words.borrow_mut();
            for word in INITIAL_WORDS {
                println!("Attempting to add word: {}", word);
                match words.push(&BoundedString::<100>(word.to_string())) {
                    Ok(_) => println!("Successfully added word: {}", word),
                    Err(e) => println!("Failed to add word {}: {:?}", word, e),
                }
            }
        });
        println!("Initialization complete");
    }


    pub fn get_words() -> Vec<String> {
        WORDS.with(|words| {
            (0..words.borrow().len())
                .filter_map(|i| words.borrow().get(i))
                .map(|bounded| bounded.0)
                .collect()
        })
    }

    pub fn add_word(word: String) -> Result<(), String> {
        if word.len() > 7 {
            return Err("Word must be less than 7 characters".to_string());
        }

        if word.len() < 3 {
            return Err("Word must be at least 3 characters".to_string());
        }

        WORDS.with(|words| {
            words.borrow_mut().push(&BoundedString::<100>(word)).map_err(|e| e.to_string())
        })
    }
}
