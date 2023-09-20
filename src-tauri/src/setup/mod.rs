use log::info;
use tauri::App;

use crate::APP;

pub fn init(app: &mut App) -> Result<(), Box<dyn std::error::Error>> {
    info!("============== Start App ==============");
    // Global AppHandle
    APP.get_or_init(|| app.handle());

    Ok(())
}
