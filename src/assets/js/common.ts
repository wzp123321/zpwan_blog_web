const USER_QQ_NUM = "1421209422";

const links: { [key: string]: any }[] = [{
    title: "github",
    url: "https://github.com/wzp123321",
    svg: "icon-github",
    isBlank: true
},
{
    title: "关于",
    url: "/about",
    svg: "icon-gengduo-guanyuxitong",
    isBlank: false
},
{
    title: "友情链接",
    url: "/links",
    svg: "icon-lianjie",
    isBlank: false
},
{
    title: "留言",
    url: "/leave_message",
    svg: "icon-liuyan",
    isBlank: false
}]

// 头像数组
const avatars: string[] = [
    "http://132.232.66.140:81/D3212136A5479CF51D1F02AE86DB0A06.png",
    "http://132.232.66.140:81/DA1050F08D8C0900C532A83F84124CDF.png",
    "http://132.232.66.140:81/9ACFE155F36955B76AD7A158FAA58972.png",
    "http://132.232.66.140:81/8D0573B1B95EBF1CE04915616531DE82.png",
    "http://132.232.66.140:81/07520F7559417320348743EFCD977637.png",
    "http://132.232.66.140:81/053FB25104C74AEFDC1771CABBFA4A2A.png"
]

// 推荐文章icon
const icons: string[] = [
    "icon-12",
    "icon-13",
    "icon-14fuben",
    "icon-4",
    "icon-5",
    "icon-6",
    "icon-7",
    "icon-8",
    "icon-9"
]

// 底部
const visits: { [ksy: string]: any }[] = [
    {
        title: 'Github',
        imgUrl: "icon-github",
        url: 'https://github.com/wzp123321',
        isSvg: true
    },
    {
        title: '简书',
        imgUrl: "../assets/imgs/jianshu.png",
        url: 'https://www.jianshu.com/u/914a5045e1e4',
        isSvg: false
    },
    {
        title: "QQ",
        imgUrl: "icon-QQ",
        url: "tencent://AddContact/?fromId=45&fromSubId=1&subcmd=all&uin=" + USER_QQ_NUM + "&website=www.oicqzone.com",
        isSvg: true
    }
]

// 微博分享Appkey
const APP_KEY = "2697214670"


export { links, avatars, icons, visits, APP_KEY }