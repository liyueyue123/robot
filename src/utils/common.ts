import { clearToken } from "./cookie";
import { clearCurrentUser } from "./user";

export const HUMAN_ICON = `/icon/human.png`;
export const LOGO_ICON = `/icon/logo.svg`;

/**
 * 异常退出登录
 */
export const logout = async () => {
    clearToken();
    clearCurrentUser();
    if (window.location.pathname !== '/login') {
        // todo 首页
        window.location.replace(
            `/login?lastRoute=${encodeURIComponent(location.pathname + location.search)}`
        );
    }
    window.location.reload();
};