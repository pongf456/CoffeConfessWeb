export interface IglobalVariables {
    roomName:string | null
    auth_token: string | null
    notifications: Inotify[]
}
export interface Inotify {
    uuid?:string
    type:EnotifyTypes
    message:string
}
export enum EnotifyTypes {
    information = "information",
    succes = "succes",
    error = "error"
}