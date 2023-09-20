use once_cell::sync::OnceCell;
use state::TypeMap;
pub mod config;
pub mod meuns;
pub mod plugin;
pub mod setup;
pub mod utils;
pub mod window;
pub mod event;
pub static APPLICATION_CONTEXT: TypeMap![Send + Sync] = <TypeMap![Send + Sync]>::new();
// Global AppHandle
pub static APP: OnceCell<tauri::AppHandle> = OnceCell::new();

pub async fn init_context() {}
