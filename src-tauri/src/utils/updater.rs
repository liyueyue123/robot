use anyhow::Result;
use log::info;
use tauri::{updater::UpdateResponse, AppHandle, Wry};

use crate::{plugin::update::check_update_dialog, APP_UPDATE};

const ALREADY_UP_TO_DATE_DIALOG_ENVET: &str = "already_up_to_date_dialog_envet";
const SILENT_INSTALL_DIALOG_ENVET: &str = "silent_install_dialog_envet";

const PROMPT_FOR_INSTALL_DIALOG_ENVET: &str = "prompt_for_install_dialog_envet";

pub fn run_check_update(app: AppHandle<Wry>, silent: bool, has_msg: Option<bool>) {
    tauri::async_runtime::spawn(async move {
        if let Ok(update_resp) = app.updater().check().await {
            APP_UPDATE.get_or_init(|| update_resp.clone());
            if update_resp.is_update_available() {
                if silent {
                    tauri::async_runtime::spawn(async move {
                        silent_install(app, update_resp).await.unwrap();
                    });
                } else {
                    tauri::async_runtime::spawn(async move {
                        prompt_for_install(app, update_resp).await.unwrap();
                    });
                }
            } else if let Some(v) = has_msg {
                if v {
                    // let windows = app.windows();
                    // let parent_window = windows.values().next();
                    // tauri::api::dialog::message(
                    //     parent_window,
                    //     "robot",
                    //     "您的robot是最新的",
                    // );
                    check_update_dialog(
                        "robot".to_string(),
                        "您的robot是最新的".to_string(),
                        ALREADY_UP_TO_DATE_DIALOG_ENVET,
                        app,
                    );
                }
            }
        }
    });
}

pub async fn silent_install(app: AppHandle<Wry>, update: UpdateResponse<Wry>) -> Result<()> {
    info!("silent_install");
    // let windows = app.windows();
    // let parent_window = windows.values().next();

    let package_info = app.package_info().clone();

    let body = update.body().unwrap();
    check_update_dialog(
        format!(r#"新版本的 {} 已经发布! "#, "robot"),
        format!(
            r#"{} {} 可供下載,您现在的版本是 {}

    Release Notes
    {}"#,
            "robot",
            update.latest_version(),
            package_info.version,
            body
        ),
        SILENT_INSTALL_DIALOG_ENVET,
        app,
    );

    Ok(())
}

pub async fn prompt_for_install(app: AppHandle<Wry>, update: UpdateResponse<Wry>) -> Result<()> {
    info!("prompt_for_install");
    // let windows = app.windows();
    // let parent_window = windows.values().next();
    let package_info = app.package_info().clone();

    let body = update.body().unwrap();
    check_update_dialog(
        format!(r#"新版本的 {} 已经发布! "#, "robot"),
        format!(
            r#"{} {} 可供下載,您现在的版本是 {}

    Release Notes
    {}"#,
            "robot",
            update.latest_version(),
            package_info.version,
            body
        ),
        PROMPT_FOR_INSTALL_DIALOG_ENVET,
        app,
    );

    Ok(())
}
