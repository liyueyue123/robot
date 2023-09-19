use tauri::{AboutMetadata, CustomMenuItem, Manager, Menu, MenuItem, Submenu, WindowMenuEvent};

use crate::{config, utils};

pub fn init_system_menu() -> Menu {
    let name = "AI办公助手";

    let app_menu = Submenu::new(
        name,
        Menu::with_items([
            #[cfg(target_os = "macos")]
            MenuItem::About(name.into(), AboutMetadata::default()).into(),
            #[cfg(not(target_os = "macos"))]
            CustomMenuItem::new("about", "关于").into(),
            CustomMenuItem::new("check_update", "检查更新").into(),
        ]),
    );

    Menu::new().add_submenu(app_menu)
}

pub fn menu_event(event: WindowMenuEvent<tauri::Wry>) {
    let win = Some(event.window()).unwrap();
    let app = win.app_handle();
    let menu_id = event.menu_item_id();

    match menu_id {
        // App
        "about" => {
            let tauri_conf = config::tauri_conf::get_tauri_conf().unwrap();

            let windows = app.windows();
            let parent_window = windows.values().next();

            tauri::api::dialog::message(
                parent_window,
                "Version",
                format!(
                    r#"AI办公助手当前版本 {} "#,
                    tauri_conf.package.version.unwrap()
                ),
            );
        }
        "check_update" => {
            utils::updater::run_check_update(app, false, Some(true));
        }
        _ => (),
    }
}
