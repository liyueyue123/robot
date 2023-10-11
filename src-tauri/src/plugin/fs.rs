use anyhow::Result;
use std::path::{Path, PathBuf};

use log::{error, info};
use tauri::{api::path, command};

pub const APP_CONFIG: &str = "http://192.168.89.207/router.json";

use crate::{utils::request, APP};
macro_rules! pub_struct {
  ($name:ident {$($field:ident: $t:ty,)*}) => {
    #[derive(serde::Serialize, serde::Deserialize, Debug, Clone)]
    pub struct $name {
      $(pub $field: $t),*
    }
  }
}

pub_struct!(AppConf { app_config: String ,});

impl AppConf {
    pub fn new() -> Self {
        Self {
            app_config: APP_CONFIG.into(),
        }
    }
}

pub fn create_file<P: AsRef<Path>>(filename: P) -> Result<()> {
    let filename = filename.as_ref();
    if let Some(parent) = filename.parent() {
        if !parent.exists() {
            std::fs::create_dir_all(parent)?;
        }
    }
    std::fs::File::create(filename)?;
    Ok(())
}

#[command]
pub async fn read_extra_url() -> String {
    let app = APP.get().unwrap();
    let path: PathBuf = path::app_config_dir(&app.config()).expect("文件打开失败");
    let file_path = path.as_path().join("robot_config/router.json");
    info!("router.json path: {}", file_path.display());

    match std::fs::read_to_string(&file_path) {
        Ok(contents) => {
            if let Ok(c) = serde_json::from_str::<AppConf>(&contents) {
                if let Ok(res) = request::get_data(&c.app_config).await {
                    return res.unwrap_or_default();
                }
            }
            error!(
                "Error parsing router.json file. Content message: {}",
                contents
            );
        }
        Err(err) => {
            error!("Failed to find router.json file.  Error message: {}", err);
            create_file(&file_path).unwrap_or_else(|err| {
                error!("Failed to create file router.json: {}", err);
            });

            let json_str = serde_json::to_string_pretty(&AppConf::new()).unwrap_or_default();
            std::fs::write(&file_path, json_str).unwrap_or_else(|err| {
                error!("Failed to write file router.json: {}", err);
            });
        }
    }
    "".to_string()
}
