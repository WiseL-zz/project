/* 用于封装请求前缀,方便的切换生产环境与开发环境 */

const URL_ENV = {
    // 开发环境
    DEVELOPMENT:{
        BMDURL: "http://localhost:3010",
        UPLOADURL: "http://localhost:9000"
    },
    // 生产环境
    PROJECT:{
        BMDURL: "https://web.codeboy.com/bmdapi",
        UPLOADURL: "https://web.codeboy.com/bmduploadapi"
    }
}
// 暴露出其中一个环境,后续想切换其他的直接改对象就行
export default URL_ENV.DEVELOPMENT;