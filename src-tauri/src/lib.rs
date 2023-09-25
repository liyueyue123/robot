use once_cell::sync::OnceCell;
use state::TypeMap;
use tauri::{updater, Wry};
pub mod config;
pub mod event;
pub mod meuns;
pub mod plugin;
pub mod setup;
pub mod utils;
pub mod window;
pub static APPLICATION_CONTEXT: TypeMap![Send + Sync] = <TypeMap![Send + Sync]>::new();
// Global AppHandle
pub static APP: OnceCell<tauri::AppHandle> = OnceCell::new();
pub static APP_UPDATE: OnceCell<updater::UpdateResponse<Wry>> = OnceCell::new();

pub async fn init_context() {}
