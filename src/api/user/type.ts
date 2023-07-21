export interface ResponseData {
  code: number,
  msg: string,
}
export interface UserInfo {
  userAge?: number,
  userAvatar?: string,
  userCreateTime?: string,
  userEmail?: string,
  userId?: string,
  userIntroduct?: string,
  userName?: string,
  userPassward?: string,
  userPhone?: string,
  userSchool?: string,
  userSex?: string,
  userStatus?: number,
  userType?: string,
  userUpdateTime?: string
}
export interface UserInfoType extends ResponseData {
  data: UserInfo;
}