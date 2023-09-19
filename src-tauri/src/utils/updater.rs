use anyhow::Result;
use log::info;
use tauri::{updater::UpdateResponse, AppHandle, Manager, Wry};

pub fn run_check_update(app: AppHandle<Wry>, silent: bool, has_msg: Option<bool>) {
    tauri::async_runtime::spawn(async move {
        if let Ok(update_resp) = app.updater().check().await {
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
                    let windows = app.windows();
                    let parent_window = windows.values().next();
                    tauri::api::dialog::message(
                        parent_window,
                        "AI办公助手",
                        "您的AI办公助手是最新的",
                    );
                }
            }
        }
    });
}

pub async fn silent_install(app: AppHandle<Wry>, update: UpdateResponse<Wry>) -> Result<()> {
    info!("silent_install");
    let windows = app.windows();
    let parent_window = windows.values().next();

    update.download_and_install().await?;

    // Ask user if we need to restart the application
    let should_exit = tauri::api::dialog::blocking::ask(
        parent_window,
        "重新启动应用程序",
        "应用安装成功，是否立即重新启动应用程序?",
    );
    if should_exit {
        app.restart();
    }

    Ok(())
}

pub async fn prompt_for_install(app: AppHandle<Wry>, update: UpdateResponse<Wry>) -> Result<()> {
    info!("prompt_for_install");
    let windows = app.windows();
    let parent_window = windows.values().next();
    let package_info = app.package_info().clone();

    let body = update.body().unwrap();

    let should_install = tauri::api::dialog::blocking::ask(
        parent_window,
        format!(r#"新版本的 {} 已经发布! "#, "AI办公助手"),
        format!(
            r#"{} {} 可供下載,您现在的版本是 {}.

Release Notes:
{}"#,
            "AI办公助手",
            update.latest_version(),
            package_info.version,
            body
        ),
    );

    if should_install {
        update.download_and_install().await?;

        // Ask user if we need to restart the application
        let should_exit = tauri::api::dialog::blocking::ask(
            parent_window,
            "重新启动应用程序",
            "应用安装成功，是否立即重新启动应用程序?",
        );
        if should_exit {
            app.restart();
        }
    }

    Ok(())
}
