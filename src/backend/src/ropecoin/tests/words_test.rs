use ropecoin::constants::INITIAL_WORDS;
use test_helper::{context::Context, sender::Sender};

#[test]
fn test_get_initial_words() -> Result<(), String> {
    let context = Context::new();
    let words = context.update::<Vec<String>>(Sender::Owner, "get_words", None)?;
    println!("words: {:?}", words);
    assert_eq!(words.len(), INITIAL_WORDS.len());
    assert_eq!(words, INITIAL_WORDS);

    Ok(())
}
