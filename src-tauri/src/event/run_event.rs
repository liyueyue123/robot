use tauri::{AppHandle, Manager};

pub fn handle_event(app: &AppHandle, event: tauri::RunEvent) {
    match event {
        tauri::RunEvent::Updater(updater_event) => {
            match updater_event {
                tauri::UpdaterEvent::UpdateAvailable {
                    body,
                    date,
                    version,
                } => {
                    println!("update available {} {:?} {}", body, date, version);
                }
                // Emitted when the download is about to be started.
                tauri::UpdaterEvent::Pending => {
                    println!("update is pending!");
                }
                tauri::UpdaterEvent::DownloadProgress {
                    chunk_length,
                    content_length,
                } => {
                    println!("downloaded {} of {:?}", chunk_length, content_length);
                }
                // Emitted when the download has finished and the update is about to be installed.
                tauri::UpdaterEvent::Downloaded => {
                    println!("update has been downloaded!");
                }
                // Emitted when the update was installed. You can then ask to restart the app.
                tauri::UpdaterEvent::Updated => {
                    println!("app has been updated");
                }
                // Emitted when the app already has the latest version installed and an update is not needed.
                tauri::UpdaterEvent::AlreadyUpToDate => {
                    println!("app is already up to date");
                }
                // Emitted when there is an error with the updater. We suggest to listen to this event even if the default dialog is enabled.
                tauri::UpdaterEvent::Error(error) => {
                    println!("failed to update: {}", error);
                }
            }
        }

        tauri::RunEvent::WindowEvent {
            label,
            event: win_event,
            ..
        } => match win_event {
            tauri::WindowEvent::CloseRequested { api, .. } => {
                log::info!("CloseRequested:{}", label.as_str());
                if label.as_str() != "main" {
                    return;
                }
                let win = app.get_window("main").unwrap();
                win.hide().unwrap();
                api.prevent_close();
            }
            _ => {}
        },
        _ => {}
    }
}
