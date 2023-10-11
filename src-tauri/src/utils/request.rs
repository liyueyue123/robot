use log::error;

pub async fn get_data(url: &str) -> Result<Option<String>, reqwest::Error> {
    let res = reqwest::get(url).await?;
    let is_ok = res.status() == 200;
    let body = res.text().await?;
    if is_ok {
        Ok(Some(body))
    } else {
        error!("Request failed: {}", body);
        Ok(None)
    }
}
