//第一列是 服务端原始错误  第二列  是中文／如果是对象 需要用httpcode 进一步确认，第三列 是英文
const config = {
    'ERROR_SUCCEED':["执行成功",'succeed'],
    "INTERNAL_ERROR":["内部错误", 'error occur in the server'],
    "SKU_STOCKS_INSUFFICENT":["库存不足", 'insufficient inventory'],
    "RESOURCE_NOT_FOUND":["查询数据不存在", 'query data does not exist'],
    "DATA_DESTRACTION":["内部错误(暂时)", 'server encounters error temporarily'],
    "PARAMETER_ERROR":["参数错误", 'parameter error'],
    "INSUFFICENT_BALANCE":["余额不足", 'Sorry, your are in state of insufficient balance'],
    "ORDER_HAS_FINISHED":["订单已完成", 'order has been finished already'],
    "USERNAME_OR_PASSWORD_ERROR":["账号或密码错误", 'account or password error'],
    "INVALID_VERIFY_CODE":["验证码不合法或过期", 'the authentication code is illegal or expired.'],
    "INVALID_TOKEN_OR_EXPIRED":['登录态过期', 'login status expired'],
    "RECORD_EXISTS":["数据已存在", 'the data already exists'],
    "SIGN_ERROR":["签名错误", 'signature error'],
    "PHONE_EXISTS":["电话号码已注册", 'the telephone number has been registered.'],
    "NAME_EXISTS":["用户名已注册", 'the username has been registered'],
    "ABOVE_MAXIMUM":["超出最大值", 'exceeding maximum'],
    "REQUEST_ID_ERROR":["requestid错误", 'requestid is wrong'],
    "GEETEST_NO_PASS":["极验验证不通过", 'Validation not passed'],
    "LESS_DEPOSIT":["低于最小额度", 'not allow to below the minimum limit'],
    "NOT_MATCH":["不匹配(用户ID等)", 'Mismatch user id'],
    "APPLY_CODE_FAIL":["申请验证码失败", 'failure to apply verification code and get once angain in 10 minutes'],
    "INVITE_CODE_NOT_MATCH": ["邀请码错误", 'invitation code error'],
    "ILLEGAL_OPERATION": ["非法操作", 'illegal operation'],
    "APPLY_SUCCESS": ["(提现)申请成功", 'The application is successfull'],
    "REJECT_OPERATION":["还有未通过审核(提现)申请", 'Prohibition operation'],
    "ENERGY_INSUFFICENT":["能量不足?", 'energy insufficent'],
    "TOO_FAST":["操作太快", 'too fast'],
    'dft': ['发生错误', 'error accurs'],
    'UNKNOWN':['发生错误', 'error accurs'],
};


function errorInfoHandle(error) {
    //首先检测httpcode,然后判断code
    let lang = localStorage.getItem('lang') || 'zh';
    const lg = lang == 'zh' ? 0 : 1;
    if(error.response.data.message) {
        //drop 
        //default|||RECORD_EXISTS
        const msg = error.response.data.message.replace('default|||','');
        return config[msg] ? config[msg][lg] : config.dft[lg];
    }
    else {
        return config.dft[lg];
    }

}

export default window.errorInfo = errorInfoHandle;





