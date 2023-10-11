use log::info;
use tauri::{
    AppHandle, CustomMenuItem, Manager, SystemTray, SystemTrayEvent, SystemTrayMenu,
    SystemTrayMenuItem,
};

const QUIT: &str = "quit";
const HIDE: &str = "hide";
const SHOW: &str = "show";

// const CHECK_UPDATE: &str = "check_update";
const RESTART: &str = "restart";
const VIEW_LOG: &str = "view_log";

pub fn init_system_tray() -> SystemTray {
    // let check_update = CustomMenuItem::new(CHECK_UPDATE.to_string(), "检查更新");
    let restart = CustomMenuItem::new(RESTART.to_string(), "重启应用");
    let q = CustomMenuItem::new(QUIT.to_string(), "退出");
    let hide = CustomMenuItem::new(HIDE.to_string(), "隐藏");
    let show = CustomMenuItem::new(SHOW.to_string(), "显示");

    let view_log = CustomMenuItem::new(VIEW_LOG.to_string(), "查看日志");

    let tray_menu = SystemTrayMenu::new()
        .add_item(view_log)
        .add_native_item(SystemTrayMenuItem::Separator)
        // .add_item(check_update)
        // .add_native_item(SystemTrayMenuItem::Separator)
        .add_item(show)
        .add_item(hide)
        .add_native_item(SystemTrayMenuItem::Separator)
        .add_item(restart)
        .add_item(q);

    SystemTray::new().with_menu(tray_menu)
}

//托盘事件处理
pub fn system_tray_menu_event(app: &AppHandle, event: SystemTrayEvent) {
    match event {
        //左键点击事件
        SystemTrayEvent::LeftClick { .. } => {}
        //菜单事件
        SystemTrayEvent::MenuItemClick { id, .. } => match id.as_str() {
            QUIT => on_quit_click(app),
            HIDE => on_hide_click(app),
            RESTART => on_restart_click(app),
            VIEW_LOG => on_view_log_click(app),
            SHOW => on_show_click(app),
            _ => {}
        },
        //右键事件
        SystemTrayEvent::RightClick { .. } => {}
        //双击事件
        SystemTrayEvent::DoubleClick { .. } => {}
        _ => {}
    }
}

fn on_view_log_click(app: &AppHandle) {
    use tauri::api::path::app_log_dir;
    let log_path = app_log_dir(&app.config()).unwrap();
    // log_path 可以替换成自定义的日志地址
    tauri::api::shell::open(&app.shell_scope(), log_path.to_str().unwrap(), None).unwrap();
}

fn on_restart_click(app: &AppHandle) {
    app.restart();
}

fn on_show_click(app: &AppHandle) {
    let window = app.get_window("main").unwrap();

    if !window.is_visible().unwrap() {
        window.show().unwrap();
        window.set_focus().unwrap();
    }
}

fn on_hide_click(app: &AppHandle) {
    let window = app.get_window("main").unwrap();
    window.hide().unwrap();
}

fn on_quit_click(app: &AppHandle) {
    info!("============== Quit App ==============");
    app.exit(0);
}
