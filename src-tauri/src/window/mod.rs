use crate::APP;

pub fn create_external_windows(label: &str, external_url: &str) {
    let app = APP.get().unwrap();
    tauri::WindowBuilder::new(
        app,
        label, /* the unique window label */
        tauri::WindowUrl::External(external_url.parse().unwrap()),
    )
    .min_inner_size(1000.00, 600.00)
    .title("")
    // .hidden_title(true)
    .decorations(true)
    .build()
    .expect("failed to build window");
}
