use tauri::command;

use crate::config;

#[command]
pub fn get_version() -> String {
    config::tauri_conf::get_tauri_conf()
        .unwrap()
        .package
        .version
        .unwrap()
}
