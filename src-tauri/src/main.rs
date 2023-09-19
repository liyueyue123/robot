// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use app::{
    init_context,
    meuns::{
        meun::{init_system_menu, menu_event},
        tray::{init_system_tray, system_tray_menu_event},
    },
    APP,
};
use log::info;
use tauri::{generate_context, Builder};
use tauri_plugin_log::LogTarget;

#[tokio::main]
async fn main() {
    init_context().await;

    Builder::default()
        .plugin(
            tauri_plugin_log::Builder::default()
                .targets([LogTarget::LogDir, LogTarget::Stdout, LogTarget::Webview])
                .build(),
        )
        .menu(init_system_menu())
        .system_tray(init_system_tray())
        .setup(|app| {
            info!("============== Start App ==============");
            // Global AppHandle
            APP.get_or_init(|| app.handle());
            Ok(())
        })
        .on_menu_event(menu_event)
        .on_system_tray_event(system_tray_menu_event)
        .run(generate_context!())
        .expect("创建程序出错");
}
