// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use app::{
    event::run_event::handle_updater_event,
    init_context,
    meuns::{
        meun::{init_system_menu, menu_event},
        tray::{init_system_tray, system_tray_menu_event},
    },
    plugin::{config, update, window},
    setup,
};
use tauri::{generate_context, AppHandle, Builder};
use tauri_plugin_log::LogTarget;

#[tokio::main]
async fn main() {
    init_context().await;

    let event_handler = |app_handle: &'_ AppHandle, event| handle_updater_event(app_handle, event);

    Builder::default()
        .plugin(
            tauri_plugin_log::Builder::default()
                .targets([LogTarget::LogDir, LogTarget::Stdout, LogTarget::Webview])
                .build(),
        )
        .invoke_handler(tauri::generate_handler![
            update::run_check_update,
            update::check_update_dialog,
            update::app_restart,
            update::download_and_install,
            config::get_version,
            window::close_splashscreen,
            window::create_external_windows,
        ])
        .menu(init_system_menu())
        .system_tray(init_system_tray())
        .setup(setup::init)
        .on_menu_event(menu_event)
        .on_system_tray_event(system_tray_menu_event)
        .build(generate_context!("../src-tauri/tauri.conf.json"))
        .expect("创建程序出错")
        .run(event_handler);
}
