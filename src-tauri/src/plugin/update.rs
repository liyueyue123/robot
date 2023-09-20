use tauri::{command, AppHandle};

use crate::utils::updater;

#[command]
pub fn run_check_update(app: AppHandle, silent: bool, has_msg: Option<bool>) {
    updater::run_check_update(app, silent, has_msg);
}
