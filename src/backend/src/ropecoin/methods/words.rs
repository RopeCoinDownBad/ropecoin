use ic_cdk::{query, update};
use crate::misc::utils::is_not_anonymous;
use crate::logic::words::WordsLogic;


#[query]
pub fn get_words() -> Vec<String> {
    WordsLogic::get_words()
}

#[update]
pub fn add_word(word: String) -> Result<(), String> {
    is_not_anonymous()?;
    // User needs to pay in Ropecoin to add a word

    // If user has paid, add the word to the list
    WordsLogic::add_word(word)
}