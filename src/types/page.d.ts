/* 左侧导航栏 */
export type PageRouterEntity = {
    label: string
    icon: string
    activeIcon: string
    link: string,
    activeLink: string[],
    ItemList?: PageItemEntity[]
}
/* 页面内容 */
export type PageItemEntity = {
    id: number
    icon: string 
    name: string
    windowKey: string
    target?: string
    avatarName: string
    desc: string
    url: string
}