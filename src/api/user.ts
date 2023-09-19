import { GET, POST, PUT } from './request';
import { encryptByAES } from '@/utils/tools';
import { ResLogin } from './response/user';
import { UserEntity, UserUpdateParams } from '@/types/user';

export const sendAuthCode = (data: {
  username: string;
  googleToken: string;
}) => POST('/user/sendAuthCode', data);

export const getTokenLogin = () => GET<UserEntity>('/user/account/tokenLogin');
export const gitLogin = (code: string) => GET<ResLogin>('/user/account/gitLogin', { code });

export const postRegister = ({
  username,
  password,
  code,
  inviterId
}: {
  username: string;
  code: string;
  password: string;
  inviterId: string;
}) =>
  POST<ResLogin>('/user/account/register', {
    username,
    code,
    inviterId,
    password: encryptByAES(password)
  });

export const postFindPassword = ({
  username,
  code,
  password
}: {
  username: string;
  code: string;
  password: string;
}) =>
  POST<ResLogin>('/user/account/updatePasswordByCode', {
    username,
    code,
    password: encryptByAES(password)
  });

export const updatePasswordByOld = ({ oldPsw, newPsw }: { oldPsw: string; newPsw: string }) =>
  POST('/user/account/updatePasswordByOld', {
    oldPsw: encryptByAES(oldPsw),
    newPsw: encryptByAES(newPsw)
  });

export const postLogin = ({ username, password }: { username: string; password: string }) =>
  POST<ResLogin>('/user/account/loginByPassword', {
    username,
    password: encryptByAES(password)
  });

export const loginOut = () => GET('/user/account/loginout');

export const putUserInfo = (data: UserUpdateParams) => PUT('/user/account/update', data);

export const getPayCode = (amount: number) =>
  GET<{
    codeUrl: string;
    payId: string;
  }>(`/user/getPayCode?amount=${amount}`);

export const checkPayResult = (payId: string) => GET<number>(`/user/checkPayResult?payId=${payId}`);


export const getUnreadCount = () => GET<number>(`/user/inform/countUnread`);
export const readInform = (id: string) => GET(`/user/inform/read`, { id });
