// Non GPT comment had to manually add File import
use std::fs::{self, File};
use std::fs::OpenOptions;
use std::io::{self, Read, Write};
use std::path::Path;

struct LogManager {
    log_dir: String,
}

impl LogManager {
    fn new(log_dir: &str) -> Self {
        // Create the log directory if it doesn't exist
        fs::create_dir_all(log_dir).expect("Failed to create log directory");
        LogManager { log_dir: log_dir.to_string() }
    }

    fn appendLog(&self, log_name: &str, message: &str) {
        let log_path = format!("{}/{}", self.log_dir, log_name);
        let mut file = OpenOptions::new()
            .create(true)
            .append(true)
            .open(&log_path)
            .expect("Failed to open log file for appending");

        // Append the message to the log file
        writeln!(file, "{}", message).expect("Failed to write to log file");
    }

    fn readLog(&self, log_name: &str) -> Vec<String> {
        let log_path = format!("{}/{}", self.log_dir, log_name);
        if let Ok(mut file) = File::open(&log_path) {
            let mut contents = String::new();
            file.read_to_string(&mut contents)
                .expect("Failed to read log file");
            contents.lines().map(String::from).collect()
        } else {
            vec![]
        }
    }
}

fn main() {

}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_empty_log() {
        let manager = LogManager::new("./unittestdir");
        assert_eq!(manager.readLog("empty"), Vec::<String>::new()); // Gave up and changed test
    }

    #[test]
    fn test_append_log() {
        let manager = LogManager::new("./unittestdir");
        manager.appendLog("append", "My new Message");
        assert_eq!(manager.readLog("append"), vec!["My new Message"]); // Gave up and changed test
    }

    #[test]
    fn test_append_many_log() {
        let manager = LogManager::new("./unittestdir");
        manager.appendLog("appendMany", "My new Message");
        manager.appendLog("appendMany", "My Message 2");
        assert_eq!(manager.readLog("appendMany"), vec!["My new Message", "My Message 2"]); // Gave up and changed test
    }

    #[test]
    fn test_file_creation() {
        let manager = LogManager::new("./unittestdir");
        manager.appendLog("creation", "My creation message");
        assert_eq!(Path::new("./unittestdir/creation").exists(), true);
        assert_eq!(fs::read_to_string("./unittestdir/creation").unwrap(), "My creation message\n");
    }
}