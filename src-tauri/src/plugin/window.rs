use tauri::{command, Manager};

//用于启动时 loading加载等待 主窗口加载完成 关闭 loading窗口
#[command]
pub async fn close_splashscreen(window: tauri::Window) {
    if let Some(splashscreen) = window.get_window("splashscreen") {
        //关闭loading窗口
        splashscreen.close().unwrap();
    }
    //显示主窗口
    window.get_window("main").unwrap().show().unwrap();
}
