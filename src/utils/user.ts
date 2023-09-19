import { loginOut } from '@/api/user';
import { UserEntity } from '@/types/user';
const CURRENT_USER_KEY = 'REMOTE-CURRENT-USER';


export function saveCurrentUser(userString: string) {
    localStorage.setItem(CURRENT_USER_KEY, userString);
}

export function currentUser(): UserEntity  {
    return JSON.parse(localStorage.getItem(CURRENT_USER_KEY) as string);
}

export function clearCurrentUser() {
    localStorage.removeItem(CURRENT_USER_KEY);
}