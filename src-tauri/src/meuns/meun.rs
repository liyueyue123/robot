use tauri::{AboutMetadata, CustomMenuItem, Manager, Menu, MenuItem, Submenu, WindowMenuEvent};

use crate::{config, utils};

const ABOUT: &str = "about";
const CHECK_UPDATE: &str = "check_update";
const NAME: &str = "AI办公助手";

pub fn init_system_menu() -> Menu {
    let app_menu = Submenu::new(
        NAME,
        Menu::with_items([
            #[cfg(target_os = "macos")]
            MenuItem::About(NAME.into(), AboutMetadata::default()).into(),
            #[cfg(not(target_os = "macos"))]
            CustomMenuItem::new("about", "关于").into(),
            CustomMenuItem::new("check_update", "检查更新").into(),
        ]),
    );

    let edit_menu = Submenu::new(
        "Edit",
        Menu::new()
            .add_native_item(MenuItem::Undo)
            .add_native_item(MenuItem::Redo)
            .add_native_item(MenuItem::Separator)
            .add_native_item(MenuItem::Cut)
            .add_native_item(MenuItem::Copy)
            .add_native_item(MenuItem::Paste)
            .add_native_item(MenuItem::SelectAll),
    );

    Menu::new().add_submenu(app_menu).add_submenu(edit_menu)
}

pub fn menu_event(event: WindowMenuEvent<tauri::Wry>) {
    let win = Some(event.window()).unwrap();
    let app = win.app_handle();
    let menu_id = event.menu_item_id();

    match menu_id {
        // App
        ABOUT => {
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
        CHECK_UPDATE => {
            utils::updater::run_check_update(app, false, Some(true));
        }
        _ => (),
    }
}
