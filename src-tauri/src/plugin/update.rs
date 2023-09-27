use std::collections::HashMap;

use crate::{utils::updater, APP_UPDATE};

use tauri::{command, AppHandle, Manager};

#[command]
pub fn run_check_update(app: AppHandle, silent: bool, has_msg: Option<bool>) {
    updater::run_check_update(app, silent, has_msg);
}

#[command]
pub fn check_update_dialog(title: String, msg: String, event: &str, app_handle: tauri::AppHandle) {
    let mut msg_map = HashMap::new();
    msg_map.insert("title", title);
    msg_map.insert("msg", msg);
    let json_string = serde_json::to_string(&msg_map).expect("Failed to serialize HashMap to JSON");
    app_handle
        .emit_all(event, json_string)
        .expect("Failed to emit_all")
}

#[command]
pub async fn download_and_install() {
    let update = APP_UPDATE.get().unwrap();
    update
        .clone()
        .download_and_install()
        .await
        .expect("Failed to download and install");
}

#[command]
pub async fn app_restart(app: AppHandle) {
    app.restart()
}
