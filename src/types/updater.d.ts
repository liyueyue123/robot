export enum UpdaterStatus{
    SILENT = 'SILENT',  //自动更新
    PROMPT = 'PROMPT',  //手动更新
    ALREADY_UPDATE = 'ALREADY_UPDATE',  //已是最新版本
    DOWNLOAD_PROGRESS = 'DOWNLOAD_PROGRESS', // 下载中
    DOWNLOADED = 'DOWNLOADED' //下载完成
}