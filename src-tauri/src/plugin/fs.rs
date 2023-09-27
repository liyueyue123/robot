use std::path::PathBuf;

use log::{error, info};
use tauri::{api::path, command};

#[command]
pub async fn read_extra_url() -> String {
    let path: PathBuf = path::home_dir().expect("文件打开失败");
    let file_path = path.as_path().join("robot_conf/router.json");
    info!("router.json path:{}", file_path.display());
    match std::fs::read_to_string(file_path) {
        Ok(contents) => contents,
        Err(err) => {
            error!("router.json 文件不存在. err msg{}", err);
            String::new()
        }
    }
}
