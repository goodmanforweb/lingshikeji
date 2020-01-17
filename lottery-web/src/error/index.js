//第一列是 服务端原始错误  第二列  是中文／如果是对象 需要用httpcode 进一步确认，第三列 是英文
const config = {
    '0': ["ERROR_SUCCEED", "执行成功", ''],
    '-1': ["INTERNAL_ERROR", "内部错误", 'error occur in the server'],
    '-2': ["SKU_STOCKS_INSUFFICENT", "库存不足", 'insufficient inventory'],
    '-3': ["RESOURCE_NOT_FOUND", "查询数据不存在", 'query data does not exist'],
    '-4': ["DATA_DESTRACTION", "内部错误(暂时)", 'server encounters error temporarily'],
    '-5': ["PARAMETER_ERROR", "参数错误", 'parameter error'],
    '-6': ["INSUFFICENT_BALANCE", "余额不足", 'Sorry, your are in state of insufficient balance'],
    '-7': ["ORDER_HAS_FINISHED", "订单已完成", 'order has been finished already'],
    '-8': ["USERNAME_OR_PASSWORD_ERROR", "账号或密码错误", 'account or password error'],
    '-9': ["INVALID_VERIFY_CODE", "验证码不合法或过期", 'the authentication code is illegal or expired.'],
    '-10': ["INVALID_TOKEN_OR_EXPIRED{any:'token过期或非法', 502:'token不存在' ,401:'token不合法'}", '登录态过期', 'login status expired'],
    '-11': ["RECORD_EXISTS", "数据已存在", 'the data already exists'],
    '-12': ["SIGN_ERROR", "签名错误", 'signature error'],
    '-13': ["PHONE_EXISTS", "电话号码已注册", 'the telephone number has been registered.'],
    '-14': ["NAME_EXISTS", "用户名已注册", 'the username has been registered'],
    '-15': ["ABOVE_MAXIMUM", "超出最大值", 'exceeding maximum'],

    '-16': ["REQUEST_ID_ERROR", "requestid错误", 'requestid is wrong'],
    '-17': ["GEETEST_NO_PASS", "极验验证不通过", 'Validation not passed'],
    '-18': ["LESS_DEPOSIT", "低于最小额度", 'not allow to below the minimum limit'],
    '-19': ["NOT_MATCH", "不匹配(用户ID等)", 'Mismatch user id'],

    dft: ['', '发生错误', 'error accurs']
};


function errorInfoHandle(error) {
    //首先检测httpcode,然后判断code
    let lang = localStorage.getItem('lang') || 'zh';
    let lg = lang == 'zh' ? 1 : 2;
    if (error.status == 401 || error.status == 502) {
        return config['-10'][lg];
    } else {
        if (error.data.code) {
            return config[error.data.code + ''][lg];
        } else if (error.data.msg) {
            return error.data.msg
        } else {
            return config.dft[lg];
        }

    }

}

export default errorInfoHandle