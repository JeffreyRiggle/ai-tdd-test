use std::fs::{self, OpenOptions};
use std::path::{Path};
use std::io::prelude::*;

#[derive(Debug)]
struct LogManager {
    dir: String
}

impl LogManager {
    fn new(directory: &str) -> LogManager {
        fs::create_dir_all(Path::new(directory.clone()));
        LogManager {
            dir: String::from(directory)
        }
    }

    fn readLog(&self, log: &str) -> Vec<String> {
        let logPath = format!("{}/{}", self.dir, log);
        let path = Path::new(&logPath);
        if !path.exists() {
            fs::File::create(path);
        }

        let contents = fs::read_to_string(&logPath);

        contents.unwrap().split('\n').map(str::to_string).collect()
    }
    
    fn appendLog(&self, log: &str, message: &str) {
        let logPath = format!("{}/{}", self.dir, log);
        let path = Path::new(&logPath);
        if !path.exists() {
            fs::File::create(path);
        }

        let mut file = OpenOptions::new()
            .write(true)
            .append(true)
            .open(logPath)
            .unwrap();

        file.write(format!("{}\n", message).as_bytes());
    }

}

fn main() {
    let manager = LogManager::new("./testdir");
    println!("Current logs, {:?}", manager.readLog("loga"));
    manager.appendLog("loga", "My new Message");
    manager.appendLog("loga", "Another new Message");
    println!("Updated logs, {:?}", manager.readLog("loga"));
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_empty_log() {
        let manager = LogManager::new("./unittestdir");
        assert_eq!(manager.readLog("empty"), vec![""]);
    }

    #[test]
    fn test_append_log() {
        let manager = LogManager::new("./unittestdir");
        manager.appendLog("append", "My new Message");
        assert_eq!(manager.readLog("append"), vec!["My new Message", ""]);
    }

    #[test]
    fn test_file_creation() {
        let manager = LogManager::new("./unittestdir");
        manager.appendLog("creation", "My creation message");
        assert_eq!(Path::new("./unittestdir/creation").exists(), true);
        assert_eq!(fs::read_to_string("./unittestdir/creation").unwrap(), "My creation message\n");
    }
}