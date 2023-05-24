var FormControl = (function () {
  var formInstance = null;
  var $formInstance = null;

  function setInstance(instance, $form) {
    formInstance = instance;
    $formInstance = $form;
  }

  function setDefaultAction() {
    formInstance = null;
    $formInstance = null;
  }

  function finishedValidate() {
    if (formInstance) {
      formInstance.finishedValidateAction($formInstance);
    }
  }
  return {
    setInstance: setInstance,
    setDefaultAction: setDefaultAction,
    finishedValidate: finishedValidate,
  };
})();
var encrypt = new JSEncrypt();
encrypt.setPublicKey(`-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDlOJu6TyygqxfWT7eLtGDwajtN
FOb9I5XRb6khyfD1Yt3YiCgQWMNW649887VGJiGr/L5i2osbl8C9+WJTeucF+S76
xFxdU6jE0NQ+Z+zEdhUTooNRaY5nZiu5PgDB0ED/ZKBUSLKL7eibMxZtMlUDHjm4
gwQco1KRMDSmXSMkDwIDAQAB
-----END PUBLIC KEY-----`);

var Validate = function () {
  this.sip = '';
  this.hostname = '';
  this.basePath = '';
  this.message = {
    required: '不能为空',
    ipv4: 'IP地址无效',
    name: '只允许输入数字、小写字母以及中划线和下划线',
    positiveInteger: '只允许输入大于0的整数',
    unrequiRepositiveInteger: '只允许输入大于0的整数',
    num: '只允许输入整数',
    ennum: '只允许输入英文和数字',
    numEn: '开头不为字母，其余可为英文和数字的组合，不允许存在空格',
    en: '只允许输入英文',
    mysqlId: 'MySQL实例ID应从[0-9][a-z]中任意取6位字符',
    len: '要求输入{0}位之内的值',
    mysqlLen: '输入的字符数不得超过20位',
    idLen: '组件ID长度限制为64',
    id: '只允许输入数字、小写字母以及中划线(-)、下划线(_)及冒号(:)',
    range: '{0}的值应该在{1}和{2}之间',
    port: '端口号的范围应该从0到65535的数值',
    path: '文件路径不应包含特殊字符和非ASCII字符, 应为绝对路径, 不以"/"结尾',
    password:
      '长度为12-32位，必须包含（大小写英文字母或特殊字符@#$%^*+-=_()）和数字',
    email: 'Email格式错误',
    mysql_indent:
      'MySQL标识符错误, 只能包含大小写英文字母/数字/特殊字符($_), 不能全为数字, 长度不大于64',
    multi_mysql_ident:
      'MySQL标识符错误, 只能包含大小写英文字母/数字/特殊字符($_), 不能全为数字, 长度不大于64',
    uproxy_instance: '该{0}组内尚未安装{0}实例，请先安装{0}实例'.format(
      proxyName
    ),
    hex: '应为16进制数, 以0x开头',
    sips: '{0}格式应为IP, 例如"172.17.0.2", 多个{0}以","分隔'.format(
      sipCustomName
    ),
    ipv6: '格式应为 XXXX:XXXX:XXXX:XXXX:XXXX:XXXX:XXXX:XXXX，它是128位的，用":"分成8段，每个X是一个16进制数（16 = 2^4）',
    ipv6s: '存在重复的IPv6或没有与已选择的sip一一对应',
    serverID: '值域应为32位有符号正整数',
    unDuplication: '已存在相同的{0}值',
    unEqual: '不能和{0}值相同',
    only: '该标识名已被使用，请选择重新选择',
    mysqlName: 'MySQL安装压缩包名应以格式 “mysq-a.b.c-” 开始',
    scp: '当类型为SCP时, 填写默认内容为"{host}:{path}"',
    tipEqual: '不是指定的{0}',
    tipKeyDuplicate: '已存在同名的{0}',
    summary: '只允许输入以字为首的数字、字母、下划线及百分号(%)',
    escapeSingleQuote: '{0}不允许出现单引号',
    dayPrice: '只能输入数字，支持小数点后两位',
    userId: '新增的用户ID已存在',
    disk: '磁盘容量必须大于等于10G',
    diskNum: '只允许输入整数',
    mobile: '须输入符合格式的11位手机号',
    maxConnect: '请输入256-2000的整数',
    notRoot: '不能添加root用户',
    maxServiceNum: '最大服务数限制在1-100000之间',
    maxIopsNum: 'iops读写限制值限制在0-10000之间',
    databaseUserName:
      '格式错误, 只能包含大小写英文字母/数字/特殊字符(!@#$%^&*+-=_)',
    serviceName: '格式错误, 只能包含中文大小写英文字母/数字/特殊字符(@*$-=_)',
    serviceUserName: '只能包含大小写英文字母/数字',
    userName: '格式错误, 只能包含中文/大小写英文字母/数字/特殊字符(@*$-=)',
    mongodbDisk: '磁盘容量必须大于等于10G',
    ram: '内存最小为2GB',
    mysqlRam: '内存最小1G',
    cpu: 'cpu最小为1核',
    characterLen: '长度不得超过16',
    nfsFileName:
      'nfs文件名长度应在2到25个字符之间，文件名不能包含[]=#!@$&*%^()+{}|;:./?~`空格',
    metaData: '格式错误，只能包含大小写字母/数字/及字符（-_./）',
    iops: 'iops读写限制应该在0-999999之间',
    k8sCpu: 'k8s主机Cpu最小为1核',
    k8sDisk: 'k8s主机磁盘应该在10-2000之间',
    k8sMemory: 'k8s主机内存应该在1-200之间',
    onlyEnLetter: '只允许输入大小写英文字母',
    roleName: '只允许输入中文/大小写英文/数字，长度不超过10',
    classDisk: '不得超过2000GB',
    database: '数据库不能包含非法字符“-”',
    unrequire: '只允许输入整数',
    requiredNum: '选择数量为{0}',
    requiredMinNum: '选择数量至少为{0}',
    requiredLeastNum: '至少保留{0}个',
    requiredRoot: 'root为必选',
    redisMS: '所选架构的节点数必须为整数且最小为2最大为4',
    isHtml: '不允许输入html标签或类html标签',
    namespace:
      '命名空间名称只能包含小写字母、数字、特殊字符-，只能以小写字母数字开头结尾',
    requestLimitCpu: '只允许输入大于等于0的浮点型数字',
    requestLimitMemory: '只允许输入大于等于0的整数',
    limitNum1: '只允许输入1',
    limitNum2: '只允许输入大于等于1且小于等于{0}的整数',
    userPassword:
      '密码必须同时包含由8位至32位数字、大小写字母、特殊字符!@#$%^&_-~.组成',
  };
  this.defaults = {
    ssh_port: 22,
    max_connection: 1000,
    max_service_num: 200,
    src_mysql_charset: 'utf8',
    dst_mysql_charset: 'utf8',
    mongodb_run_user: 'actiontech-mongodb',
    iops: 0,
  };
  this.$tableBody = null;
  this.tableData = {};
  this.data = {};
  this.filledData = {};
  this.onlyData = {};
};
Validate.prototype.setSys = function (sys) {
  this.sip = sys['sip'];
  this.hostname = sys['hostname'];
  this.basePath = sys['base-path'];
  this.defaults['server_ip'] = this.sip;
  this.defaults['uproxy_path'] = this.basePath + '/uproxy';
  this.defaults['ushard_path'] = this.basePath + '/ushard';
};
Validate.prototype.setBasePath = function (basePath) {
  this.basePath = basePath;
};
Validate.prototype.getBasePath = function () {
  return this.basePath;
};
Validate.prototype.setDefaults = function (key, value) {
  this.defaults[key] = value;
};
Validate.prototype.setTbody = function ($tableBody) {
  this.$tableBody = $tableBody;
};
Validate.prototype.setData = function (name, value) {
  this.data[name] = value;
};
Validate.prototype.setTableData = function (tableData) {
  this.tableData = tableData;
};
Validate.prototype.setFilledData = function (key, value) {
  this.filledData[key] = value;
};
Validate.prototype.fillPrefix = function ($item) {
  var $hidden = $item.next();
  $hidden.val($item.prev().html() + $item.val());
};
Validate.prototype.setDefaultAction = function ($input) {
  var __this = this,
    $item,
    name,
    nodeName;
  $input.each(function () {
    $item = $(this).parent();
    __this.resetNodeAction($item);
    name = $(this).attr('name');
    if (name == 'grants') {
      name = 'ustats_grants';
    }
    if (name && name in __this.defaults) {
      $(this).val(__this.defaults[name]);
    } else if ($(this).hasClass('prefix-item')) {
      $(this).val(__this.hostname);
      __this.fillPrefix($(this));
    } else {
      nodeName = $(this)[0].nodeName.toLowerCase();
      if (nodeName != 'select' || !$(this).hasClass('unreset')) {
        if ($(this).val()) {
          $(this).select();
        }
      }
    }
  });
};
Validate.prototype.resetNodeAction = function ($item) {
  var $parent = $item.parent(),
    $error;
  $item.removeClass('focus');
  if ($item.hasClass('error')) {
    if ($parent.prop('nodeName').toLowerCase() == 'dd') {
      $parent = $parent.parent();
    }
    $item.removeClass('error');
    $error = $parent.find('.input-error');
    $error.remove();
  }
  $('.tabErrTip').html('');
};
Validate.prototype.setRequiredIcon = function ($node, validate) {
  if (validate && !$.isPlainObject(validate)) {
    validate = JSON.parse(validate);
  }
  if (validate && 'required' in validate) {
    var $label,
      labelText = '';
    $label = $node.parent().parent().find('.item-title label');
    if ($label.length > 0) {
      labelText = $label
        .html()
        .replace(/<span class="reqIcon">\*<\/span>/g, '');
      labelText = '<span class="reqIcon">*</span>' + labelText;
      $label.html(labelText);
    }
  }
};
Validate.prototype.resetValidate = function ($input) {
  var $item = null,
    $parent,
    $error;
  if (
    $input.prop('nodeName').toLowerCase() == 'div' ||
    $input.hasClass('column_item')
  ) {
    $item = $input;
  } else {
    $item = $input.parent();
  }
  if (!$input.prop('readonly')) {
    $item.addClass('focus');
  }
  $parent = $item.parent();
  if ($item.hasClass('error')) {
    if ($item.hasClass('password_item')) {
      $parent = $parent.parent();
    }
    if ($parent.prop('nodeName').toLowerCase() == 'dd') {
      $parent = $parent.parent();
    }
    $item.removeClass('error');
    $error = $parent.find('.input-error');
    $error.remove();
    return true;
  }
  return false;
};
Validate.prototype.validateAction = function ($input, validate) {
  if ($input.attr('data-un-validate') == 'true') {
    return;
  }
  var $item = $input.parent(),
    message = false,
    $error,
    name,
    validateMsg,
    validateData,
    type,
    isValided;
  if ($item.hasClass('hasPrefix')) {
    this.fillPrefix($input);
  }
  if (
    validate &&
    $input.data('hidden') != 'hidden' &&
    !$input.prop('disabled') &&
    (!$input.prop('readonly') ||
      ($input.prop('readonly') && $item.hasClass('password_item'))) &&
    $input.parent().parent().css('display') != 'none'
  ) {
    if (typeof validate == 'string') {
      validate = JSON.parse(validate);
    }
    $item.removeClass('focus');
    $error = $item.parent().find('.input-error');
    if (!$item.hasClass('column_item') && !$item.hasClass('column_3')) {
      $error.remove();
    }
    $('.tabErrTip').html('');
    for (type in validate) {
      validateMsg = this.message[type];
      validateData = validate[type];
      name = $input.attr('placeholder') ? $input.attr('placeholder') : '';
      switch (type) {
        case 'range':
          validateMsg = validateMsg.format(
            name,
            validate[type][0],
            validate[type][1]
          );
          break;
        case 'len':
          validateMsg = validateMsg.format(validate[type]);
          break;
        case 'required':
        case 'num':
          validateMsg = name + validateMsg;
          validateData = validateMsg;
          break;
        case 'unEqual':
          validateMsg = validateMsg.format($input.data('equal'));
          break;
        case 'unDuplication':
        case 'tipEqual':
        case 'tipKeyDuplicate':
        case 'escapeSingleQuote':
          validateMsg = validateMsg.format(name);
          break;
        case 'databaseUserName':
        case 'serviceName':
          validateMsg = name + validateMsg;
          break;
        case 'requiredNum':
          validateMsg = validateMsg.format(validate[type]);
          break;
        case 'requiredMinNum':
          validateMsg = validateMsg.format(validate[type]);
          break;
        case 'requiredLeastNum':
          validateMsg = validateMsg.format(validate[type]);
          break;
        case 'limitNum':
          if (validate[type] == '1') {
            validateMsg = this.message[`${type}1`];
          } else {
            validateMsg = this.message[`${type}2`];
            validateMsg = validateMsg.format(validate[type]);
          }
          break;
        case 'requiredRoot':
      }
      isValided = this[type + 'Validate']($input, validate[type]);
      if (isValided == 'wait') {
        message = '正在验证，请稍候……';
        break;
      }
      if (!isValided) {
        message = validateMsg;
        break;
      }
    }
    if (message) {
      this.handleErrorAction($item, message);
    }
    return message;
  }
};
Validate.prototype.handleErrorAction = function ($item, message) {
  $item.addClass('error');
  var $parent = $item.parent();
  if ($parent.prop('nodeName').toLowerCase() == 'dd') {
    $parent = $parent.parent();
  }
  if (
    $item.prop('nodeName').toLowerCase() == 'div' &&
    $item.hasClass('column_item')
  ) {
    $parent = $item;
  }
  var $inputError = $parent.find('.input-error');
  if ($inputError.length === 0) {
    // 校验不通过，出现提示
    $parent.append('<dd class="input-error">{0}</dd>'.format(message));
  } else {
    $inputError.html(message).show();
  }
};
Validate.prototype.startValidate = function ($item) {
  this.handleErrorAction($item, '正在验证，请稍候……');
};
Validate.prototype.requiredValidate = function ($input, data) {
  var value = $input.val();
  if (value) {
    value = value.replace(/\s*/g, '');
  }
  if (Number(value) == 1) {
    //因为1总是true，所以 1!=data总是不成立，故而如果有数值1，就是非空
    return true;
  }
  return value && value.length > 0 && value != data ? true : false;
};
Validate.prototype.lenValidate = function ($input, length) {
  var val = $input.val();
  return val.length <= length ? true : false;
};
Validate.prototype.idLenValidate = function ($input, length) {
  return this.lenValidate($input, length);
};
Validate.prototype.mysqlIdValidate = function ($input) {
  return !!$input.val().match(/^[a-z0-9]{6}$/);
};
Validate.prototype.numberValidate = function ($input) {
  var val = $input.val();
  if (parseInt(val) == val && val >= 0) {
    return true;
  } else {
    return false;
  }
};
Validate.prototype.nameValidate = function ($input) {
  var value = $input.val();
  //为了避免大写字母o和数字0，及其它易混淆的情况，故只可输入数字、小写字母和中划线下划线
  return !!value.match(/^[a-z0-9\-\_\.]+$/);
};
Validate.prototype.mysqlLenValidate = function ($input) {
  return this.lenValidate($input, 20);
};
Validate.prototype.summaryValidate = function ($input) {
  var value = $input.val();
  return !!value.match(/[a-zA-Z][a-zA-Z0-9_%]*/);
};
Validate.prototype.idValidate = function ($input) {
  var value = $input.val();
  return !!value.match(/^[a-z0-9\-\_\:]+$/);
};
Validate.prototype.positiveIntegerValidate = function ($input) {
  var value = $input.val();
  return /^[1-9]\d*$/.test(value);
};
Validate.prototype.ennumValidate = function ($input) {
  var value = $input.val();
  return !!value.match(/^[A-Za-z0-9\-\_]+$/);
};
Validate.prototype.numEnValidate = function ($input) {
  var value = $input.val(),
    first;
  if (!!value.match(/\s/)) {
    return false;
  } else {
    first = value.substring(0, 1);
    if (first.match(/[0-9]/)) {
      return false;
    }
  }
  return true;
};
Validate.prototype.enValidate = function ($input) {
  var value = $input.val();
  return !!value.match(/^[A-Za-z]+$/);
};
Validate.prototype.passwordValidate = function ($input) {
  var value = $input.val(),
    flag = true,
    __this = this,
    $parent = $input.parent();
  if (value) {
    ajaxQuery.get(
      '/v3/db_service/get_db_password_regex',
      function (res) {
        _.each(res.fend_mysql_password_regex, function (item, index) {
          if (!!item.is_not) {
            flag =
              flag &&
              !value.match(new RegExp(item.expression.replace(/\//g, '')));
          } else {
            flag =
              flag &&
              !!value.match(new RegExp(item.expression.replace(/\//g, '')));
          }
        });
        if (flag) {
          validate.resetNodeAction($parent);
          FormControl.finishedValidate();
          $input.attr('type', 'password');
        } else {
          __this.handleErrorAction($parent, res.fend_tips);
        }
      },
      function (error) {
        __this.handleErrorAction($parent.parent(), $t.renderDesc(error));
      }
    );
    return 'wait';
  }
  return true;
};
Validate.prototype.rangeValidate = function ($input, data) {
  var value = $input.val(),
    start = data[0],
    end = data[1];
  return value >= start && value <= end ? true : false;
};
Validate.prototype.portValidate = function ($input) {
  var value = $input.val();
  return value >= 0 && value <= 65535;
};
Validate.prototype.pathValidate = function ($input) {
  var value = $input.val();
  if (value.replace(/\s*/g, '').length === 0) {
    return true;
  } else {
    return (
      !value.match(
        /([^\\]|^)[\#\^\;\&\"\'\`\!\*\?\$\@\{\}\(\)\[\]\<\>\,\|\=\+\%\~\^ "]/
      ) &&
      value.match(/^[\x00-\xFF]*$/) &&
      value.match(/^\/.*$/) &&
      value.match(/[^\/]$/) &&
      !value.match(/\/{2,}/)
    );
  }
};
Validate.prototype.emailValidate = function ($input) {
  var value = $input.val(),
    valid = true,
    re =
      /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
  valid = re.test(value);
  return value == '' || valid;
};

Validate.prototype.mysql_identValidate = function ($input) {
  var value = $input.val();
  return value.match(/^[0-9a-zA-Z\$\_]{0,64}$/) && !value.match(/^\d+$/);
};
Validate.prototype.multi_mysql_identValidate = function ($input) {
  var value = $input.val(),
    valid = true;
  _.each((value || '').split(','), function (val) {
    valid =
      valid && val.match(/^[0-9a-zA-Z\$\_]{0,64}$/) && !val.match(/^\d+$/);
  });
  return valid;
};
Validate.prototype.uproxy_instanceValidate = function ($input) {
  var __this = this,
    groupId = $input.val(),
    $item = $input.parent();
  this.startValidate($item);
  ajaxQuery.get(
    '/support/instance_in_uproxy?group_id=' + groupId,
    function (data) {
      data = JSON.parse(data);
      if (data['instance'] === 0) {
        __this.handleErrorAction($item, __this.message['uproxy_instance']);
      } else {
        validate.resetNodeAction($item);
        FormControl.finishedValidate();
      }
    },
    function (error) {
      __this.handleErrorAction($item, $t.renderDesc(error));
    }
  );
  return 'wait';
};
Validate.prototype.hexValidate = function ($input) {
  var value = $input.val();
  if ('' === value) {
    return true;
  }
  return value.match(/^0x[0-9a-zA-F]+$/);
};
Validate.prototype.validateIpv4 = function (value) {
  var split = value.split('.');
  if (split.length != 4) return false;

  for (var i = 0; i < split.length; i++) {
    var s = split[i];
    if (s.length === 0 || isNaN(s) || s < 0 || s > 255) return false;
  }
  return true;
};
Validate.prototype.ipv4Validate = function ($input) {
  var value = $input.val();
  return this.validateIpv4(value);
};
Validate.prototype.sipsValidate = function ($input) {
  var value = $input.val();
  if ('' === value) {
    return true;
  }
  var split = value.split(',');
  for (var i = 0; i < split.length; i++) {
    if (split[i].indexOf('-') > -1) {
      var split2 = split[i].split('-');
      if (2 == split2.length) {
        if (!this.validateIpv4(split2[0]) || !this.validateIpv4(split2[1]))
          return false;
      } else {
        return false;
      }
    } else if (split[i].indexOf('-') > -1) {
      var split2 = split[i].split('/');
      if (1 == split2.length || 2 == split2.length) {
        if (!this.validateIpv4(split2[0])) return false;
      } else {
        return false;
      }
    } else {
      return this.validateIpv4(split[i]);
    }
  }
  return true;
};
Validate.prototype.ipv6Validate = function ($input) {
  var value = $input.val();
  const regexpIPV6 =
    /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/;
  return value == '' ? true : regexpIPV6.test(value);
};
Validate.prototype.ipv6sValidate = function ($input) {
  var value = $input.val(),
    ipv6Arr = [];
  // 验证是否有重复IP
  function isRepeat(a) {
    return /(\x0f[^\x0f]+)\x0f[\s\S]*\1/.test(
      '\x0f' + a.join('\x0f\x0f') + '\x0f'
    );
  }
  if (value) {
    ipv6Arr = value.split(',');
    if (ipv6Arr.length != Number($input.attr('validate-length'))) {
      return false;
    } else {
      return !isRepeat(ipv6Arr);
    }
  } else {
    return true;
  }
};
Validate.prototype.serverIDValidate = function ($input) {
  var value = $input.val(),
    num = Math.pow(2, 31);
  if (!!value.match(/^\d+$/) && value > 0 && value < num) {
    return true;
  }
  return false;
};
Validate.prototype.unDuplicationValidate = function ($input, type) {
  var name = $input.attr('name'),
    value = $input.val();
  if (type) {
    var data =
      type == 'summary' ? this.tableData : this.data['databaseInstance'];
    type = type == 'summary' ? 'Summary' : type;
    for (var i = 0, l = data.length; i < l; i++) {
      if (data[i][type] == value) {
        return false;
      }
    }
  } else {
    _.each(this.tableData, function (data) {
      if (data[name] == value) {
        return false;
      }
    });
  }
  return true;
};
Validate.prototype.unEqualValidate = function ($input, id) {
  var value = $input.val(),
    equal = $(id).val();
  return value != equal;
};
Validate.prototype.onlyValidate = function ($input) {
  var name = $input.attr('name'),
    data = $input.val();
  if (name in this.onlyData) {
    delete this.onlyData[name];
  }
  for (var n in this.onlyData) {
    if (data == this.onlyData[n]) {
      return false;
    }
  }
  this.onlyData[name] = data;
  return true;
};
Validate.prototype.mysqlNameValidate = function ($input) {
  var name = $input.val();
  if (name.indexOf('mysql') !== 0) {
    return false;
  }
  var index = name.indexOf('-');
  if (index == -1) {
    return false;
  } else {
    name = name.substring(index + 1);
    index = name.indexOf('-');
    if (index == -1) {
      return false;
    } else {
      name = name.substring(0, index);
      name = name.split('.');
      if (name.length != 3) {
        return false;
      }
    }
  }
  return true;
};
Validate.prototype.serializeValidate = function ($input) {
  var value = $input.val(),
    item = 0,
    flag = true,
    data = [],
    num,
    i;
  if (value.replace(/\s*/g, '').length > 0) {
    value = value.replace(/\s*/g, '').replace(/，/g, ',');
    $input.val(value);
    value = value.split(',');
    for (i = 0; i < value.length; i++) {
      num = parseInt(value[i]);
      flag = num == value[i] && value[i] >= 0 ? true : false;
      data.push(num);
      if (i > 0 && num <= item) {
        flag = false;
      }
      item = num;
      if (!flag) {
        return false;
      }
    }
  }
  if (flag) {
    $input.val(data.join(','));
  }
  return flag;
};
Validate.prototype.isPreparedInstallMysqlValidate = function ($input) {
  var __this = this,
    serverId = $input.val(),
    $item = $input.parent();
  if (serverId) {
    this.startValidate($item);
    ajaxQuery.get(
      '/support/isPreparedInstallMysql?server_id={0}'.format(serverId),
      function () {
        validate.resetNodeAction($item);
        FormControl.finishedValidate();
      },
      function (error) {
        __this.handleErrorAction($item, $t.renderDesc(error));
      }
    );
  }
  return 'wait';
};
Validate.prototype.isPreparedUrmanAgentValidate = function ($input) {
  var __this = this,
    serverId = $input.val(),
    $item = $input.parent();
  if (serverId) {
    this.startValidate($item);
    ajaxQuery.get(
      '/support/isInstalled?server_id={0}&component=urman-agent'.format(
        serverId
      ),
      function () {
        validate.resetNodeAction($item);
        FormControl.finishedValidate();
      },
      function (error) {
        __this.handleErrorAction($item, $t.renderDesc(error));
      }
    );
  }
  return 'wait';
};
Validate.prototype.rootPasswordValidate = function ($input) {
  var __this = this,
    password = $input.val(),
    $item = $input.parent(),
    groupId = $input.parents('form').find('#mysql_group_id').val(),
    mysqlUserName = $input.parents('form').find('#root_user_name').val();
  if (password) {
    this.startValidate($item);
    ajaxQuery.post(
      '/v3/database/check_root_password',
      {
        mysql_group_id: groupId,
        mysql_user_name: mysqlUserName,
        mysql_user_password: encodeURI(encrypt.encrypt(password)).replace(
          /\+/g,
          '%2B'
        ),
      },
      function () {
        validate.resetNodeAction($item);
        FormControl.finishedValidate();
      },
      function (error) {
        __this.handleErrorAction($item, $t.renderDesc(error));
      }
    );
  }
  return 'wait';
};
Validate.prototype.checkDBUserRepeatValidate = function ($input) {
  var __this = this,
    dbUserName = $input.val(),
    $item = $input.parent(),
    applyIsUseProxy = $input.parents('form').find('#is_use_proxy').val(),
    createUserDisabledUseProxy = $input
      .parents('form')
      .find('#create_user_is_use_proxy')
      .val(),
    judge =
      $input.data('action') == 'apply'
        ? Number(applyIsUseProxy) && dbUserName
        : createUserDisabledUseProxy == 'false' && dbUserName;
  if (judge) {
    this.startValidate($item);
    ajaxQuery.post(
      '/v3/database/check_db_user',
      {
        db_user_name: dbUserName,
      },
      function () {
        validate.resetNodeAction($item);
        FormControl.finishedValidate();
      },
      function (error) {
        __this.handleErrorAction($item, $t.renderDesc(error));
      }
    );
    return 'wait';
  }
};
Validate.prototype.tipKeyDuplicateValidate = function ($input) {
  var key = $input.val(),
    $rows;
  $rows = this.$tableBody.find('tr[data-root="{0}"]'.format(key));
  return $rows.length > 0 ? false : true;
};
Validate.prototype.escapeSingleQuoteValidate = function ($input) {
  var value = $input.val();
  return !value.match(/\'/);
};
Validate.prototype.scpValidate = function ($input) {
  var value = $input.val(),
    type = $input.data('type');
  return (
    type != 'file' ||
    !!value.match(
      /^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9]):(\/[A-Za-z0-9|\/]+)$/
    )
  );
};
Validate.prototype.tipEqualValidate = function ($input) {
  var input = $input.val(),
    $options = $input.prev().find('option'),
    i = 0,
    l = $options.length,
    item = 0;
  for (; i < l; i++) {
    if (input != $options.eq(i).val()) {
      item++;
    }
  }
  return item == l ? false : true;
};
Validate.prototype.dayPriceValidate = function ($input) {
  var val = $input.val();
  return /^\d*(\.\d{1,2})?$/.test(val);
};
Validate.prototype.userIdValidate = function ($input) {
  var __this = this,
    $item = $input.parent(),
    userId = $input.val(),
    isValidate = true;
  ajaxQuery.post(
    '/v3/user/check_id',
    {
      user_id: userId,
    },
    function (res) {
      if (res.is_exist) {
        isValidate = false;
      }
      if (!isValidate) {
        __this.handleErrorAction($item, __this.message['userId']);
      } else {
        validate.resetNodeAction($item);
        FormControl.finishedValidate();
      }
    }
  );
  return 'wait';
};
Validate.prototype.numValidate = function ($input) {
  var val = $input.val();
  return /^\d+$/.test(val);
};
Validate.prototype.diskValidate = function ($input) {
  var val = $input.val();
  if (val && Number(val) != 0) {
    return Number(val) >= 10;
  } else {
    return true;
  }
};
Validate.prototype.diskNumValidate = function ($input) {
  var val = $input.val();
  if (val && Number(val) != 10) {
    return /^\d+$/.test(val);
  } else {
    return true;
  }
};
Validate.prototype.mongodbDiskValidate = function ($input) {
  var val = $input.val();
  return Number(val) >= 10;
};
Validate.prototype.ramValidate = function ($input) {
  var val = $input.val();
  return Number(val) >= 2;
};
Validate.prototype.mysqlRamValidate = function ($input) {
  var val = $input.val();
  return Number(val) >= 1;
};
Validate.prototype.cpuValidate = function ($input) {
  var val = $input.val();
  return Number(val) >= 1;
};
// ****手机号验证
Validate.prototype.mobileValidate = function ($input) {
  var val = $input.val();
  return _.size(val) === 0 || /^\d{11}$/.test(val);
};
// ****申请mysql服务最大连接数验证
Validate.prototype.maxConnectValidate = function ($input) {
  var val = $input.val();
  return Number(val) >= 256 && Number(val) <= 2000;
};
// ****申请MongoDB服务数据库用户不能为root
Validate.prototype.notRootValidate = function ($input) {
  var val = $input.val();
  return val !== 'root';
};
// ****流量入口中间件最大服务书限制在1-100000之间
Validate.prototype.maxServiceNumValidate = function ($input) {
  var val = $input.val();
  return Number(val) >= 1 && Number(val) <= 100000;
};
// ****模板设置iops值范围限制在1-10000之间
Validate.prototype.maxIopsNumValidate = function ($input) {
  var val = $input.val();
  return Number(val) >= 0 && Number(val) <= 10000;
};
Validate.prototype.serviceNameValidate = function ($input) {
  var val = $input.val(),
    reg = /^[A-Za-z0-9@\*\$\-=\_\u4e00-\u9fa5]*$/;
  return reg.test(val);
};
Validate.prototype.databaseUserNameValidate = function ($input) {
  var val = $input.val(),
    reg = /^[A-Za-z0-9!@#\$%\^&\*\+\-=_]*$/;
  return reg.test(val);
};
Validate.prototype.serviceUserNameValidate = function ($input) {
  var val = $input.val(),
    reg = /^[A-Za-z0-9]*$/;
  return reg.test(val);
};
Validate.prototype.userNameValidate = function ($input) {
  var val = $input.val(),
    reg = /^[\u4e00-\u9fa5A-Za-z0-9@\*\$\-=]*$/;
  return reg.test(val);
};
Validate.prototype.characterLenValidate = function ($input) {
  return this.lenValidate($input, 16);
};
Validate.prototype.nfsFileNameValidate = function ($input) {
  var name = $input.val(),
    size = _.size(name),
    reg = /\[\]\=\#\!\@\$\&\*\%\^\(\)\+\{\}\|\;\:.\/\?\~\`\s/;
  return size >= 2 && size <= 25 && !reg.test(name);
};
Validate.prototype.metaDataValidate = function ($input) {
  var value = $input.val(),
    reg = /^[a-zA-Z0-9\-\_\.\/]*$/;
  return reg.test(value);
};
Validate.prototype.iopsValidate = function ($input) {
  var value = $input.val();
  return value >= 0 && value <= 999999;
};
Validate.prototype.k8sCpuValidate = function ($input) {
  var val = $input.val();
  return Number(val) >= 1;
};
Validate.prototype.k8sDiskValidate = function ($input) {
  var val = Number($input.val());
  return val >= 10 && val <= 2000;
};
Validate.prototype.k8sMemoryValidate = function ($input) {
  var val = Number($input.val());
  return val >= 1 && val <= 200;
};
Validate.prototype.onlyEnLetterValidate = function ($input) {
  var value = $input.val(),
    reg = /^[A-Za-z]+$/;
  return reg.test(value);
};
Validate.prototype.roleNameValidate = function ($input) {
  var value = $input.val(),
    reg = /^[\u4e00-\u9fa5A-Za-z0-9]*$/;
  return reg.test(value);
};
Validate.prototype.classDiskValidate = function ($input) {
  var val = $input.val();
  return Number(val) <= 2000;
};
Validate.prototype.databaseValidate = function ($input) {
  return $input.val().indexOf('-') == -1;
};
Validate.prototype.unrequireValidate = function ($input) {
  var val = $input.val();
  if (val == '') {
    return true;
  } else {
    return this.numValidate($input);
  }
};

Validate.prototype.unrequiRepositiveIntegerValidate = function ($input) {
  var val = $input.val();
  if (val == '') {
    return true;
  } else {
    return this.positiveIntegerValidate($input);
  }
};
Validate.prototype.requiredNumValidate = function ($input, num) {
  var value = $input.val().split(',');
  return _.size(value) == num ? true : false;
};
Validate.prototype.requiredMinNumValidate = function ($input, num) {
  var value = $input.val().split(',');
  return _.size(value) >= num ? true : false;
};
Validate.prototype.requiredLeastNumValidate = function ($input, num) {
  // 该验证针对redis架构降级验证从实例数量，其它地方如若使用注意页面的结构
  var allOption = $input.parent().find('select option'),
    value = $input.val() ? $input.val().split(',') : [];
  return _.size(allOption) - _.size(value) >= num ? true : false;
};
Validate.prototype.requiredRootValidate = function ($input) {
  var val = $input.val().split(','),
    status = false;
  _.each(val, function (item) {
    if (item == 'root') {
      status = true;
    }
  });
  return status;
};
Validate.prototype.redisMSValidate = function ($input) {
  var val = $input.val();
  return /^\d+$/.test(val) && Number(val) >= 2 && Number(val) <= 4;
};
Validate.prototype.isHtmlValidate = function ($input) {
  var val = $input.val(),
    reg = /<[^>]+>/g;
  return !reg.test(val) && val.indexOf('<') == -1 && val.indexOf('>') == -1;
};
Validate.prototype.namespaceValidate = function ($input) {
  var value = $input.val(),
    reg = /^[a-z0-9]([-a-z0-9]*[a-z0-9])?$/;
  return reg.test(value);
};
Validate.prototype.requestLimitCpuValidate = function ($input) {
  var value = $input.val();
  if (value == '') {
    return true;
  } else {
    return Number(value) >= 0 && /^\d+(?=\.{0,1}\d+$|$)/.test(value);
  }
};
Validate.prototype.requestLimitMemoryValidate = function ($input) {
  var value = $input.val();
  if (value == '') {
    return true;
  } else {
    return Number(value) >= 0 && /^\d+$/.test(value);
  }
};
Validate.prototype.limitNumValidate = function ($input, data) {
  var value = $input.val(),
    min = 1,
    max = data;
  return /^\d+$/.test(value) && Number(value) >= min && Number(value) <= max;
};
Validate.prototype.userPasswordValidate = function ($input) {
  var value = $input.val();
  if (value == '') {
    return true;
  }
  return /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#\$%\^&\-_~\.]).{8,32}$/.test(
    value
  );
};

var validate = new Validate();
// 搜索框限制输入html
$(
  '.screen input,.backend-search input,#update-related-user-modal .filter_user input'
)
  .parent()
  .append(
    '<p style="color:red;display:none;">禁止输入html标签或类html标签！</p>'
  );
$('.screen input').bind('blur', function () {
  if (validate.isHtmlValidate($(this))) {
    $(this).parent().removeClass('htmlErr');
    $(this).parent().find('p').hide();
  } else {
    $(this).parent().addClass('htmlErr');
    $(this).parent().find('p').show();
  }
});
$(
  '.screen input,.backend-search input,#update-related-user-modal .filter_user input,#update-own-user-modal .filter_user input,.mysql_services_wrap .search_services input'
).bind('keyup', function (e) {
  if (e.which == 13) {
    if (validate.isHtmlValidate($(this))) {
      $(this).parent().removeClass('htmlErr');
      $(this).parent().find('p').hide();
    } else {
      $(this).parent().addClass('htmlErr');
      $(this).parent().find('p').show();
    }
  }
});
$(
  '#update-related-user-modal .filter_user button,#update-own-user-modal .filter_user button'
).click(function () {
  if (validate.isHtmlValidate($(this).parent().find('input'))) {
    $(this).parent().removeClass('htmlErr');
    $(this).parent().find('p').hide();
  } else {
    $(this).parent().addClass('htmlErr');
    $(this).parent().find('p').show();
  }
});

var Password = function ($form) {
  this.$item = $form.find('.password_item');
  this.$input = this.$item.find('input');
  this.displayState = {
    password: ' glyphicon-eye-open',
    text: ' glyphicon-eye-close',
  };
  this.prefixCls = ['glyphicon', 'eye-icon'];
  this.init(this);
};
Password.prototype.init = function (__this) {
  this.$item.each(function () {
    __this.renderPassword($(this));
  });
  this.$item.find('.eye-icon').click(function () {
    __this.changeDisplayState($(this).prev());
  });
  this.$input
    .bind('focus', function () {
      __this.focusAction();
    })
    .bind('blur', function () {
      __this.blurAction($(this));
    });
};
Password.prototype.renderPassword = function ($item) {
  var $password = $item.find('[type="password"]');
  $password.before('<input type="password" style="display:none;" />');
  $password.after('<i class="glyphicon eye-icon"></i>');
};
Password.prototype.setRequiredIcon = function () {
  this.$input.each(function () {
    validate.setRequiredIcon($(this), $(this).data('data-validate'));
  });
};
Password.prototype.setDefaultAction = function ($input) {
  if (!$input) {
    $input = this.$input;
  }
  var __this = this;
  $input.each(function () {
    $(this).val('').attr('type', 'text');
    if ($(this).hasClass('randPwd')) {
      $(this).val($t.getRandPwd(16)).attr('type', 'password');
    }
    __this.changeDisplayState($(this));
  });
};
Password.prototype.focusAction = function ($input) {
  if ($input) {
    var type;
    $input.each(function () {
      type = $(this).attr('type');
      type == 'password'
        ? $(this).attr('type', 'password')
        : $(this).attr('type', 'text');
    });
    var hasError = validate.resetValidate($input);
    if (hasError) {
      this.setDefaultAction($input);
    }
  }
};
Password.prototype.blurAction = function ($input) {
  var message = validate.validateAction($input, $input.attr('data-validate'));
  if (message) {
    $input.attr('type', 'password');
    this.changeDisplayState($input);
  }
};
Password.prototype.validateAction = function () {
  return false;
};
Password.prototype.changeDisplayState = function ($input) {
  var $eyeIcon = $input.parent().find('.eye-icon'),
    status = $eyeIcon.attr('data-disabled'),
    preType = $input.attr('type'),
    curType,
    eyeIconName;
  if (!status || status == 'false') {
    for (var type in this.displayState) {
      if (type != preType) {
        curType = type;
        break;
      }
    }
    eyeIconName = this.prefixCls.join(' ') + this.displayState[curType];
    $input.attr('type', curType);
    $input.attr('rsa', 'true');
    $eyeIcon.attr('class', eyeIconName);
  }
};

var Select = function () {};
Select.prototype.initSelect = function (params) {
  var __this = this,
    url;
  this.setCustomSelectAction();
  if (!params || params == 'blank') {
    this.$select.each(function () {
      (function ($select) {
        url = $select.attr('data-url');
        __this.url = url;
        ajaxQuery.get(url, function (data) {
          switch (url) {
            case '/support/server_group':
            case '/support/mysql_group':
            case '/v3/support/urds_servers':
              data.sort($t.sortBy('zone_name'));
              break;
          }
          __this.fillOptionData(data, params);
          __this.setDefaultAction();
        });
      })($(this));
    });
  }
  this.$select
    .focus(function () {
      __this.focusAction();
    })
    .blur(function () {
      __this.blurAction();
    })
    .change(function () {
      __this.changeAction($(this));
    });
};
Select.prototype.setCustomSelectAction = function () {
  //todo 所有的select组件都重新定制下UI，以和主题相配
};
Select.prototype.setRequiredIcon = function () {
  validate.setRequiredIcon(this.$select, this.$select.data('select-validate'));
};
Select.prototype.setDefaultAction = function () {};
Select.prototype.resetSelectAction = function () {};
Select.prototype.focusAction = function () {};
Select.prototype.blurAction = function () {};
Select.prototype.fillOptionData = function (datas) {};
Select.prototype.changeAction = function ($select) {};
Select.prototype.validateAction = function () {
  this.blurAction();
};

var CommonSelect = function ($form, $select, params, afterFinished) {
  this.$form = $form;
  this.$select = $select;
  this.datas = {};
  this.instance = null;
  this.updateOptionAction = null;
  this.optionArg = null;
  this.afterFinished = afterFinished;
  this.__proto__.initSelect.call(this, params);
  if (params) {
    this.url = this.$select.data('url');
    this.params = params;
  }
};
CommonSelect.prototype = new Select();
CommonSelect.prototype.finishedAction = function () {
  if (this.afterFinished) {
    this.afterFinished();
  }
};
CommonSelect.prototype.setDefaultAction = function () {
  validate.setDefaultAction(this.$select);
  var $options = this.$select.find('option');
  if ($options.length == 1) {
    if (this.datas[0] && this.datas[0].Name) {
      this.$select.val(this.datas[0].Name);
    }
  } else {
    this.$select.val('');
  }
};
CommonSelect.prototype.focusAction = function () {
  var hasError = validate.resetValidate(this.$select);
  if (hasError) {
    this.setDefaultAction(this.$select);
  }
};
CommonSelect.prototype.blurAction = function () {
  validate.validateAction(
    this.$select,
    this.$select.attr('data-select-validate')
  );
};
CommonSelect.prototype.fillOptionData = function (datas, params) {
  var option;
  switch (this.url) {
    case '/support/database_group':
      option = this.fillDatabaseGroup(datas['data']);
      break;
    default:
      option = this.fillComponent(datas);
      break;
  }
  if (params == 'blank') {
    option += '<option></option>';
  }
  this.$select.html(option);
  var $options = this.$select.find('option');
  if ($options.length > 1) {
    this.$select.val('');
  }
  if (this.instance) {
    this.updateOptionAction.apply(this.instance, this.optionArg);
  }
  this.$select.trigger('change');
  this.finishedAction();
};
CommonSelect.prototype.setUpdateOptionAction = function (
  action,
  instance,
  optionArg
) {
  this.updateOptionAction = action;
  this.instance = instance;
  this.optionArg = optionArg;
};
CommonSelect.prototype.fillDatabaseGroup = function (datas) {
  this.datas = [];
  var data,
    name,
    option = '';
  for (var i = 0, l = datas.length; i < l; i++) {
    data = datas[i];
    name = data['group_id'];
    this.datas[i] = {};
    this.datas[i]['Name'] = name;
    option += '<option value="{0}">{0}</option>'.format(name);
  }
  return option;
};
CommonSelect.prototype.queryParams = function (queryParams, callback) {
  var __this = this,
    params = [],
    url = this.url + '?';
  _.each(queryParams, function (item, index) {
    params.push(__this.params[index] + '=' + item);
  });
  url += params.join('&');
  ajaxQuery.get(url, function (data) {
    __this.fillOptionData(data);
    __this.setDefaultAction();
    callback();
  });
};
CommonSelect.prototype.fillComponent = function (datas) {
  var i = 0,
    l = datas.length,
    option = '',
    component = this.url,
    itemName,
    item,
    index,
    name,
    escape;
  if (component == '/v3/support/mysql_services') {
    datas = datas.sort(function (v1, v2) {
      v1 = v1['db_service_name'].toLowerCase();
      v2 = v2['db_service_name'].toLowerCase();
      return v1 > v2 ? 1 : -1;
    });
  }
  this.datas = datas;
  if (component) {
    if ($.isPlainObject(datas)) {
      if (component == '/support/init_data') {
        this.datas = [];
        option += '<option value=""></option>';
      }
      if (component == '/support/origin_data') {
        this.data = [];
        $('#reset-database-instance-modal .form-item')
          .last()
          .append(
            '<dd class="error" style="color:#d9534f;text-align:right">*{0}</dd>'.format(
              datas['Err']
            )
          );
      }
    } else {
      index = component.lastIndexOf('=');
      component = component.substring(index + 1);
      if (component == '/v3/support/zones') {
        option += '<option value=""></option>';
      }
      switch (component) {
        case 'uproxy':
          escape = 'uproxy-glibc';
          break;
      }
      for (; i < l; i++) {
        switch (component) {
          case 'sla/list':
            name = datas[i]['name'];
            break;
          default:
            name = datas[i]['Name'];
            break;
        }
        switch (component) {
          case '/support/init_data':
          case '/support/origin_data':
            option += '<option value="{0}">{1}</option>'.format(
              datas[i]['name'],
              datas[i]['desc']
            );
            break;
          case '/support/master_instance':
            itemName = datas[i]['mysql_id'];
            item = itemName + datas[i]['mysql_alias'];
            var isMaster = datas[i]['is_master'],
              status = !!isMaster ? '(数据库主实例)' : '';
            option += '<option value="{0}">{1}</option>'.format(
              itemName,
              item + status
            );
            break;
          case '/v3/support/mysql_instances':
            option += '<option value="{0}">{0}(服务名：{1})</option>'.format(
              datas[i]['mysql_instance_id'],
              datas[i]['db_service_name']
            );
            break;
          case '/v3/support/mysql_services':
            option += '<option value="{0}">{0}({1})</option>'.format(
              datas[i]['db_service_id'],
              datas[i]['db_service_name']
            );
            break;
          case '/v3/support/umc_servers':
            option += '<option value="{0}">{0}({1})</option>'.format(
              datas[i]['server_id'],
              datas[i]['address']
            );
            break;
          case '/v3/support/urds_sips':
            option += '<option value="{0}">{0}</option>'.format(
              datas[i]['sip_id']
            );
            break;
          case '/v3/support/unused_sips':
            option += '<option value="{0}">{0}</option>'.format(
              datas[i]['sip_id']
            );
            break;
          case '/v3/zone/list':
            if (datas[i].is_online) {
              option += '<option value="{0}">{0}({1})</option>'.format(
                datas[i]['zone_id'],
                datas[i]['zone_name']
              );
            }
            break;
          case '/v3/support/umc_uproxys':
          case '/v3/support/urds_uproxys':
            option += '<option value="{0}">{0}</option>'.format(
              datas[i]['uproxy_group_id']
            );
            break;
          case '/v3/support/zones':
            option += '<option value="{0}">{0}({1})</option>'.format(
              datas[i]['zone_id'],
              datas[i]['zone_name']
            );
            break;
          case '/v3/user/list':
            option += '<option value="{0}">{0}</option>'.format(
              datas[i]['user_id']
            );
            break;
          case '/v3/support/roles':
            if (datas[i].role !== 'root' && datas[i].role !== 'super') {
              option += '<option value="{0}">{0}</option>'.format(
                datas[i]['role']
              );
            }
            break;
          case '/v3/user/list_groups':
            if (datas[i]['user_group_id'] !== 'root') {
              option += '<option value="{0}">{0}</option>'.format(
                datas[i]['user_group_id']
              );
            }
            break;
          case '/v3/user/filter_users':
            option += '<option value="{0}">{0}</option>'.format(
              datas[i]['user_id']
            );
            break;
          default:
            if (name.indexOf(escape) == -1) {
              option += '<option value="{0}">{0}</option>'.format(name);
            }
            break;
        }
      }
      if (component == 'uproxy-glibc') {
        option = '<option></option>' + option;
      }
    }
  }
  return option;
};

var SlaTypeSelect = function ($form, $select) {
  this.$form = $form;
  this.$select = $select;
  this.__proto__.initSelect.call(this);
};
SlaTypeSelect.prototype = new Select();
SlaTypeSelect.prototype.setDefaultAction = function () {
  this.setSlaType('rpo');
};
SlaTypeSelect.prototype.fillOptionData = function () {
  this.$select.html(
    '<option value="rpo">rpo</option><option value="rto">rto</option>'
  );
};
SlaTypeSelect.prototype.setSlaType = function (type) {
  this.$select.val(type);
  this.$form.find('.sla').hide();
  this.$form.find('.' + type).show();
};

var Form = function (postData) {
  this.$form = $('form');
  this.$wrapper = $('.wrapper');
  this.$dialogItem = $('.dialogItem');
  this.$dialogWrapper = $('.dialogWrapper');
  this.$tips = this.$form.find('[tips]');
  this.password = new Password(this.$form);
  this.select = {};
  this.slider = {};
  this.tab = {};
  this.cronUnit = {};
  this._component = null;
  this.$validate = null;
  this.$filled = null;
  this.$bind = null;
  this.bindData = {};
  this.$cancel = null;
  this.$save = null;
  this.$prev = null;
  this.postData = postData ? postData : null;
  this.tableData = {};
  this._rowData = {};
  this.publishData = {};
  this.instance = null;
  this.instanceForm = null;
  this.instanceDefaultAction = null;
  this.action = null;
  this.init(this);
};
Form.prototype.updatePostData = function (updatePostData) {
  this.postData = updatePostData;
};
Form.prototype.setInstanceForm = function (instanceForm) {
  this.__proto__.instanceForm = instanceForm;
};
Form.prototype.setAction = function (action) {
  this.__proto__.action = action;
};
Form.prototype.init = function (__this) {
  if (this.postData) {
    var key, item, $updateModal, $addModal, $label, $parent, $input, id, type;
    for (key in this.postData) {
      item = this.postData[key];
      if ('render-update' in item) {
        item = item['render-update'];
        $addModal = $('#{0} form'.format(item['modal']));
        $updateModal = $('#{0} form'.format(key));
        $updateModal.html($addModal.html());
        $updateModal.find('label').each(function () {
          $label = $(this);
          id = $label.attr('for');
          if (id) {
            $input = $label.parent().parent().find('#{0}'.format(id));
            $input.attr('name', id);
            id = 'update_' + id;
            $label.attr('for', id);
            $input.attr('id', id);
            if ($input.attr('data-url')) {
              __this.select[id] = new CommonSelect(__this.$form, $input);
            }
          } else {
            $parent = $label.parent().parent();
            $input = $parent.find('.item-input');
            if ($input.hasClass('sliderItem')) {
              var cls = $input.attr('class').split(/\s+/),
                len = cls.length,
                name = cls[len - 1];
              name = 'update_' + name;
              cls[len - 1] = name;
              cls = cls.join(' ');
              $input.attr('class', cls);
              __this.slider[name] = new SliderItem($input);
            }
            if ($parent.data('cron')) {
              $parent.attr('data-cron', 'update_' + $parent.data('cron'));
            }
          }
        });
        var $node, name, id;
        _.each(item['readonly'], function (name) {
          $input = $updateModal.find('[name="{0}"]'.format(name));
          $label = $input.parent().parent().find('label');
          $label.html(function (index, content) {
            return '<span class="reqIcon">*</span>' + content;
          });
          $input.removeAttr('data-validate').prop('readonly', true);
          type = $input.prop('nodeName');
          if (type) {
            type = type.toLowerCase();
            if (type == 'select') {
              $node =
                '<input type="text" class="item-input" name="{0}" id="{1}" readonly />'.format(
                  $input.attr('name'),
                  $input.attr('id')
                );
              $input.parent().html($node);
            }
          }
        });
      }
    }
  }
  this.$form.find('.item-input:not(select)').each(function () {
    try {
      var validateAttrs = JSON.parse($(this).attr('data-validate'));
      validateAttrs['isHtml'] = true;
      $(this).attr('data-validate', JSON.stringify(validateAttrs));
    } catch (e) {
      $(this).attr('data-validate', '{"isHtml":true}');
    }
  });
  this.$validate = this.$form.find('[data-validate]');
  this.$filled = this.$form.find('[data-filled]');
  this.$bind = this.$form.find('[data-bind]');
  this.$cancel = this.$form.find('.cancel');
  this.$dialogCancel = this.$form.find('.dialogCancel');
  this.$save = this.$form.find('.save');
  this.$prev = this.$form.find('.btn.prev');
  this.setDefaultAction();
  this.$form.bind('keydown', function (e) {
    var nodeName = e.target.nodeName.toLowerCase();
    if (e.which == 13 && nodeName != 'textarea') {
      e.preventDefault();
    }
  });
  this.$filled.blur(function () {
    validate.setFilledData($(this).attr('name'), $(this).val());
  });
  this.$tips
    .bind('mouseover', function () {
      tipTools.setTip($(this).attr('tips'), $(this));
    })
    .bind('mouseout', function () {
      tipTools.hide();
    });
  this.$validate.each(function () {
    validate.setRequiredIcon($(this), $(this).data('validate'));
  });
  this.password.setRequiredIcon();

  this.initTipAction();
  this.$validate
    .bind('focus', function () {
      __this.focusAction($(this));
    })
    .bind('blur', function () {
      if ($(this).parent().hasClass('password_item')) {
        return;
      }
      __this.blurAction($(this));
    });
  this.$cancel.click(function (e) {
    e.preventDefault();
    __this.setDefaultAction();
    __this.resetSelectAction();
    __this.closeAction();
  });
  this.$dialogCancel.click(function (e) {
    e.preventDefault();
    __this.cancelDialogAction();
  });
  this.$save.click(function (e) {
    e.preventDefault();
    __this.postFormAction($(this));
  });
  this.$prev.click(function (e) {
    e.preventDefault();
    FormControl.setDefaultAction();
  });
};
Form.prototype.setDefaultAction = function ($input) {
  FormControl.setDefaultAction();
  this.$form.find('.tabErrTip').html('');
  var $itemInput = this.$form.find('.item-input'),
    itemName;
  _.each($itemInput, function (item) {
    if (!$(item).prop('readonly') && $(item).prop('type') != 'hidden') {
      itemName = $(item).prop('nodeName').toLowerCase();
      switch (itemName) {
        case 'input':
          $(item).val('');
          break;
        case 'select':
          $(item).val($(item).find('option').eq(0).val());
          break;
      }
    }
  });
  if (!$input) {
    $input = this.$validate;
  }
  validate.setDefaultAction($input);
  var __this = this,
    name,
    item;
  this.$bind.each(function () {
    name = $(this).attr('data-bind');
    $(this).val(__this.bindData[name]);
  });
  this.password.setDefaultAction();
  for (item in this.select) {
    this['select'][item].setDefaultAction();
  }
  for (item in this.slider) {
    this['slider'][item].setDefaultAction();
  }
  for (item in this.tab) {
    this['tab'][item].setDefaultAction();
  }
  for (item in this.cronUnit) {
    this['cronUnit'][item].setDefaultAction();
  }
  if (this._component) {
    this._component.setDefaultAction();
  }
  if (this.instance && this.instanceDefaultAction) {
    this.instanceDefaultAction.call(this.instance);
  }
  if (this.action) {
    this.action.resetAction();
  }
};
Form.prototype.setInstanceDefaultAction = function (instance, defaultAction) {
  this.__proto__.instance = instance;
  this.__proto__.instanceDefaultAction = defaultAction;
};
Form.prototype.initTipAction = function () {
  var $tiptools = $('#tiptools'),
    $target,
    $dialog,
    $item;
  this.$form
    .on('mouseover', '.fa.tip', function () {
      $item = $(this);
      $dialog = $item.parent();
      while (!$dialog.hasClass('dialog')) {
        $dialog = $dialog.parent();
      }
      $tiptools.css('z-index', 22);
      tipTools.setTip($item.data('tip'), $item);
    })
    .on('mouseout', '.fa.tip', function (e) {
      $target = $(e.relatedTarget);
      if ($target.attr('id') != 'tiptools') {
        $tiptools.attr('style', '');
        $tiptools.hide();
      }
    });
  $tiptools.hover(
    function () {},
    function () {
      $tiptools.attr('style', '');
      $tiptools.hide();
    }
  );
};
Form.prototype.resetSelectAction = function () {
  for (var item in this.select) {
    this['select'][item].resetSelectAction();
  }
  if (this._component) {
    this._component.resetAction();
  }
};
Form.prototype.setTableData = function (tableData) {
  this.tableData = tableData;
  validate.setTableData(tableData);
};
Form.prototype.setRowData = function (rowData) {
  this._rowData = rowData;
  this.__proto__._rowData = rowData;
};
Form.prototype.setPublishData = function (publishData) {
  this.publishData = publishData;
};
Form.prototype.setSelect = function (selectData) {
  for (var item in selectData) {
    this['select'][item] = selectData[item];
    this['select'][item].setRequiredIcon();
  }
};
Form.prototype.setSliderItem = function (sliderItem) {
  for (var item in sliderItem) {
    this['slider'][item] = sliderItem[item];
  }
};
Form.prototype.setTab = function (tab) {
  for (var item in tab) {
    this['tab'][item] = tab[item];
  }
};
Form.prototype.setCronUnit = function (cronUnit) {
  for (var item in cronUnit) {
    this['cronUnit'][item] = cronUnit[item];
  }
};
Form.prototype.setComponent = function (component) {
  this.__proto__._component = component;
};
Form.prototype.setGroupData = function (groupData) {
  this['select']['groupSelect'].setGroupData(groupData);
};
Form.prototype.bindDataAction = function (rowData) {
  var __this = this,
    name,
    data;
  this.$bind.each(function () {
    name = $(this).attr('data-bind');
    data = rowData[name];
    __this.bindData[name] = data;
    $(this).val(data);
  });
};
Form.prototype.focusAction = function ($input) {
  var hasError = validate.resetValidate($input);
  if (hasError) {
    validate.setDefaultAction($input);
  }
};
Form.prototype.blurAction = function ($input) {
  validate.validateAction($input, $input.attr('data-validate'));
};
Form.prototype.validateAction = function ($form, instance) {
  var item;
  $form.find('[data-validate]').each(function () {
    validate.validateAction($(this), $(this).attr('data-validate'));
  });
  $form.find('[data-tip-validate]').each(function () {
    validate.validateAction($(this).next(), $(this).attr('data-tip-validate'));
  });
  this.password ? this.password.validateAction() : '';
  for (item in this.select) {
    this['select'][item].validateAction();
  }
  if (instance && instance.select) {
    for (item in instance.select) {
      instance['select'][item].validateAction();
    }
  }
  for (item in this.cronUnit) {
    this['cronUnit'][item].validateAction();
  }
};
Form.prototype.prepareData = function (prepareData, filfun) {
  this.prepareRowData(prepareData, filfun, this._rowData);
};
Form.prototype.preparePublishRowData = function (prepareData, filfun) {
  this.prepareRowData(prepareData, filfun, this.publishData);
};
Form.prototype.prepareRowData = function (prepareData, filfun, source) {
  var __this = this,
    rowData = source,
    $modal = prepareData['$modal'],
    preArg = prepareData['preArg'],
    port = rowData['port'],
    $node,
    $parent,
    cronUnit,
    $cron,
    $day,
    day;
  if ('standard' in rowData) {
    $('#reset_mysql_install_standard').val(
      $t.renderStandard(rowData['standard'])
    );
  }
  _.each(preArg, function (item) {
    $node = $modal.find('[name="{0}"]'.format(item));
    var preData = rowData[item];
    if (preData) {
      $node.val(preData);
    } else {
      $node.val(validate['defaults'][item]);
    }
    $parent = $node.parent();
    if (item == 'backup_path') {
      validate.defaults['backup_path'] = '/opt/mysql/backup/{0}'.format(port);
      $node.val(validate.defaults['backup_path']);
    }
    if ($node.parent().parent().hasClass('cron')) {
      if (preData) {
        $node.prop('disabled', false);
      }
    }
    if (item.indexOf('_cron') > -1) {
      cronUnit = __this.cronUnit[item];
      preData = preData ? preData.split(/\s/) : '';
      $cron = $node.parent().prev();
      if (preData[1]) {
        $cron.find('.min span').text(preData[1] + '分');
      }
      if (preData[2]) {
        $cron.find('.hour span').text(preData[2] + '时');
      }
      $day = $cron.find('.date span');
      day = preData[3];
      if (day) {
        if (day == '1/1') {
          $day.text('[星期]');
        } else {
          if (day != '?') {
            $day.text('[日期:' + day + ']');
          } else {
            $day.text('[星期:' + preData[5] + ']');
          }
        }
      }
      cronUnit.updateCronTab({
        second: preData[0],
        min: preData[1],
        hour: preData[2],
        day: preData[3],
        month: preData[4],
        week: preData[5],
      });
    }
    if (item == 'maintain_duration_time') {
      var time = $t.renderDHM(parseInt(preData));
      $modal.find('[name="maintain_duration_day"]').val(time.day);
      $modal.find('[name="maintain_duration_hour"]').val(time.hour);
      $modal.find('[name="maintain_duration_min"]').val(time.min);
    }
  });
  if (filfun) {
    filfun();
  }
};
Form.prototype.preparePublishData = function (prepareData, filfun) {
  var __this = this,
    $modal = prepareData['$modal'],
    preArg = prepareData['preArg'],
    port = this.publishData['port'],
    $node,
    preData;
  _.each(preArg, function (item) {
    $node = $modal.find('[name="{0}"]'.format(item));
    switch (item) {
      case 'backup_path':
        validate.defaults['backup_path'] = '/opt/mysql/backup/{0}'.format(port);
        preData = validate.defaults[item];
        break;
      case 'mycnf_path':
        validate.defaults['mycnf_path'] = '/opt/mysql/etc/{0}/my.cnf'.format(
          port
        );
        preData = validate.defaults[item];
        break;
      default:
        preData = __this.publishData[item];
        break;
    }
    $node.val(preData);
  });
  if (filfun) {
    filfun();
  }
};
Form.prototype.prepareForm = function (data, filfun) {
  var __this = this,
    url = data['url'],
    config = data['config'],
    name,
    val,
    $input;
  ajaxQuery.get(
    url,
    function (data) {
      for (name in config) {
        $input = __this.$form.find('input[name="{0}"]'.format(name));
        val = data[config[name]];
        $input.val(val).attr('origin-val', val);
      }
      filfun();
    },
    function (error) {
      tipbox.alert('错误：' + $t.renderDesc(error));
    }
  );
};
Form.prototype.cancelDialogAction = function () {
  this.$dialogItem.hide();
  this.$dialogWrapper.hide();
};
Form.prototype.closeAction = function (e, $node) {
  var $dialog = this.$form.parent().parent();
  _.each($dialog, function (item) {
    //关闭表单时，会将页面上的所有的表单隐藏。在某些情况下（例如系统配置页面的架构配置等表单）表单是需要一直显示的，增加static类名予以区分。
    if (!$(item).hasClass('static')) {
      $(item).hide();
    }
  });
  this.$wrapper.hide();
};
Form.prototype.getFormContent = function ($form) {
  var formContent = {},
    pathData = {},
    $input = $form.find('.formItem'),
    $block = $form.find('.itemBlock'),
    $label,
    $item,
    validate,
    forItem,
    $item,
    label,
    input,
    blockTitle,
    blockValue,
    __this = this;
  var $prefix, prefix, $hidden, sliderItemData, sliderText;
  $input.each(function () {
    //表单中的某些项不显示在表单中，但是操作清单中进行显示，可根据static类名进行判断是否在操作清单中显示
    if ($(this).css('display') == 'none' && !$(this).hasClass('static')) {
      return;
    }
    $label = $(this).find('.item-title label');
    if ($label.hasClass('unlist')) {
      return;
    }
    $item = $(this).find('.item-input').eq(0);
    if ($item.parent().hasClass('listItem')) {
      $item = $(this).find('.item-input').eq(1);
    }
    label = $label.text().replace(/\*/g, '');
    if ($item.parent().hasClass('multipleItem')) {
      $item = $(this).find('[name]');
      formContent[label] = $item.val();
    }
    if ($label.attr('for') == 'mycnf_path') {
      formContent[label] = $('#mycnf_config').val();
      return;
    }
    if ($(this).find('.sliderItem').length > 0) {
      sliderItemData = $(this).find('[type="hidden"]').val();
      sliderText = sliderItemData;
      // switch操作按钮在操作清单展示的文字为标签内的问题，为sliderItem添加listText的class属性
      if ($(this).find('.sliderItem.listText').length > 0) {
        sliderText = $(this)
          .find('.sliderItem.listText')
          .find(`[data-state="${sliderItemData}"]`)
          .text();
      }
      formContent[label] = sliderText;
    }
    if ($label.data('prefix')) {
      label = $label.data('prefix') + label;
    }
    input = $item.val() ? $item.val().replace(/\n/g, '<br/>') : undefined;
    if (
      $item.hasClass('unlist') ||
      $item.data('list') == 'unlist' ||
      $item.prop('disabled')
    ) {
      return;
    }
    if ($item.parent().hasClass('unlist')) {
      return;
    }
    forItem = $label.attr('for');
    if ($item.parent().hasClass('hasPrefix')) {
      $hidden = $(this).find('[type="hidden"]');
      $prefix = $item.prev();
      prefix = $prefix.text();
      $hidden.val(prefix + $item.val());
      input = $hidden.val();
    }
    if ($item.hasClass('column')) {
      var $interval = $item.next(),
        $append = $interval.next();
      if ($append.hasClass('dropItem')) {
        $append = $append.find('[name]');
      }
      input = $item.val() + $interval.text() + $append.val();
    }
    validate = $item.attr('data-validate');
    if (validate) {
      validate = JSON.parse(validate);
    }
    if (validate && 'path' in validate) {
      pathData[label] = input;
    }
    if (input && $item.prop('type') != 'password') {
      if ($(this).hasClass('dateUnit')) {
        formContent[label] = $(this).find('.dateInput').val();
      } else {
        if (!$item.hasClass('notList')) {
          formContent[label] = input;
        }
      }
    }
    if ($item.attr('data-transform')) {
      var transformString = '',
        data = JSON.parse($item.attr('data-transform'));
      _.each(data, function (server) {
        transformString += '{0}({1})<br />'.format(
          server['server_id'],
          server['server_ip']
        );
      });
      formContent[label] = transformString;
    }
    if ($item.attr('data-transform-user')) {
      var transformString = '',
        data = JSON.parse($item.attr('data-transform-user'));
      _.each(data, function (users) {
        transformString += '{0}<br />'.format(users['user_id']);
      });
      formContent[label] = transformString;
    }
    if ($item.attr('id') === 'batch-enable') {
      var enable = input === '1' ? '上架' : '下架';
      formContent[label] = enable;
    }
    if ($item.hasClass('update_public') || $item.hasClass('add_public')) {
      var isPublic = Number($item.attr('data-state')) ? '公用' : '私用';
      formContent[label] = isPublic;
    }
    var transportNameKV = {
      file: '本地存储',
      scp: '本地+远程存储（SCP）',
      s3: '流式存储（S3）',
      nbu: '流式存储（NBU）',
    };
    if ($item.attr('id') === 'rule_storage_type') {
      formContent[label] = transportNameKV[$item.val()];
    }
    if ($item.hasClass('list')) {
      formContent[label] = $item.find('input:checked').val();
    }
    if ($label.attr('for') == 'mycnf_path') {
      formContent[label] = $('#mycnf_config').val();
    }
    if ($label.hasClass('serviceLabel')) {
      if ($(this).css('display') == 'none') {
        delete formContent[label];
        return;
      }
      var serviceStr = '';
      $(this)
        .find('.form-item .column_item')
        .each(function () {
          if (!$(this).find('.item-input').val()) {
            return;
          }
          serviceStr +=
            $(this).find('.item-input').attr('placeholder') +
            ':' +
            $(this).find('.item-input').val() +
            $(this).find('.append').text().replace('[', '').replace(']', '') +
            '  ';
        });
      formContent[label] = serviceStr;
    }
    // 类似mysql修改关联用户 不是很方便展示提交信息的时候 选择不显示 在对应该项的 dl标签上加上extra类名即可
    if ($(this).hasClass('extra')) {
      var submit = JSON.parse(
          $(this).find('input[name="users"]').attr('postJson')
        ),
        $submit = '';
      _.each(submit, function (item, index) {
        $submit += '{1}<p>组：{0}</p>'.format(
          item.group_id,
          index == 0 ? '' : '<hr style="background-color:#ccc;"></hr>'
        );
        if (item.users && item.roles) {
          _.each(item.roles.split(','), function (role) {
            $submit += '<p>全选角色：{0}</p>'.format($t.renderUserRole(role));
          });
          _.each(item.users, function (user) {
            $submit += '<p><span>用户：</span>{0}<span>-{1}</span></p>'.format(
              $t.renderUserRole(user.role),
              user.user_id
            );
          });
        } else {
          if (item.roles) {
            // 角色全选
            _.each(item.roles.split(','), function (role) {
              $submit += '<p>全选角色：{0}</p>'.format($t.renderUserRole(role));
            });
          } else {
            // 部分用户选中
            _.each(item.users, function (user) {
              $submit +=
                '<p><span>用户：</span>{0}<span>-{1}</span></p>'.format(
                  $t.renderUserRole(user.role),
                  user.user_id
                );
            });
          }
        }
      });
      formContent[label] = $submit;
    }
  });
  $block.each(function () {
    if ($(this).css('display') == 'none') {
      return;
    }
    blockTitle = $(this).find('.item-title').text().replace(/\*/, '');
    blockValue = $(this).find('dd.select').text();
    formContent[blockTitle] = blockValue;
  });
  return pathCheck.setCheckData(pathData, formContent);
};
Form.prototype.displayTabErrorAction = function ($form) {
  var $tab = $form.find('.tab'),
    hasTab = $tab.length > 0 ? true : false;
  if (hasTab) {
    var $inputError = $form.find('.input-error'),
      errName = {},
      names = [],
      errTip;
    $inputError.each(function () {
      var name = $(this).parent().parent().data('tab');
      if (!(name in errName)) {
        errName[name] = {};
        names.push(name);
      }
    });
    errTip = '*{0} 项有输入错误，请检查输入项！'.format(names.join('、'));
    $form.find('.tabErrTip').html(errTip);
  }
};
Form.prototype.preparePostAction = function ($modal, $form, isPrevent) {
  var modalId = $modal.attr('id'),
    title = $modal.find('.dl-title').text(),
    postData = this.postData[modalId],
    prepare = postData['prepare'],
    caller = postData['caller'],
    __this = this;
  postData['title'] = title;
  if (prepare) {
    if (caller) {
      prepare.call(caller, function () {
        __this.postForm($form, postData, isPrevent);
      });
    } else {
      this[prepare](function () {
        __this.postForm($form, postData, isPrevent);
      });
    }
  } else {
    this.postForm($form, postData, isPrevent);
  }
};
Form.prototype.prepareInputAction = function ($modal) {};
Form.prototype.postFormAction = function ($node) {
  var $form = $node.parent().parent(),
    $modal = $form.parent().parent(),
    $error = $form.find('.input-error');
  if (_.size($error) > 0) {
    return;
  }
  if ($form.hasClass('step-item')) {
    $form = $form.parent();
    $modal = $modal.parent();
  }
  FormControl.setInstance(this, $form);
  this.prepareInputAction($modal);
  this.validateAction($form);
  this.finishedValidateAction($form);
};
Form.prototype.finishedValidateAction = function ($form) {
  if (_.size($form.find('input:focus'))) {
    return;
  }
  var $modal = $form.parent().parent();
  if ($form.find('.error').length === 0) {
    $form.find('.step-index').removeClass('err');
    if (!$form.find('.save').hasClass('preventSave')) {
      this.preparePostAction($modal, $form);
    } else {
      this.preparePostAction($modal, $form, true);
    }
  } else {
    this.displayTabErrorAction($form);
  }
};
Form.prototype.postForm = function ($form, postData, isPrevent) {
  var $items = $form.find('input.item-input, textarea.item-input');
  $items.each(function () {
    if ($(this).attr('type') === 'file') {
      return;
    }
    $(this).val(function (index, content) {
      if (typeof content == 'string' && $(this).attr('type') !== 'file') {
        return he.encode(content);
      }
    });
  });
  var formContent = this.getFormContent($form),
    $items = $form.find('.item-input'),
    postedData = {},
    finfun = null,
    type,
    name,
    key,
    value;
  $items.each(function () {
    if ($(this).hasClass('nopost')) {
      return;
    }
    var $input = $(this),
      $node = $input.parent();
    type = $input.data('type');
    if ($node.hasClass('hasPrefix')) {
      $input = $node.find('.prefix-input');
    }
    name = $input.attr('name');
    if ($input.attr('id') && $input.attr('id') == 'add_roles') {
      value = $input.attr('value');
    } else {
      value = $input.val();
    }
    if (name && value) {
      switch (type) {
        case 'bool':
          postedData[name] = Boolean(parseInt(value));
          break;
        case 'int':
          postedData[name] = parseInt(value);
          break;
        case 'array':
          postedData[name] = value.split(',');
          break;
        case 'json':
          postedData[name] = $input.data('json');
          break;
        default:
          if (typeof value == 'string') {
            value = he.decode(value);
          }
          postedData[name] = value;
          break;
      }
    }
    if ($input.attr('rsa') == 'true') {
      var inputId = $input.attr('id');
      if (
        name == 'db_admin_password' &&
        inputId &&
        inputId == 'redis_password'
      ) {
        postedData[name] = encodeURI(encrypt.encrypt(value || '')).replace(
          /\+/g,
          '%2B'
        );
      } else if (value) {
        postedData[name] = encodeURI(encrypt.encrypt(value)).replace(
          /\+/g,
          '%2B'
        );
      }
    }
  });

  if ('finfun' in postData) {
    finfun = postData['finfun'];
  }

  var data = postData['data'],
    addFormData = postData['formData'];
  name = postData['name'];
  for (key in addFormData) {
    postData[key] = this._rowData[key];
  }
  postedData = $t.renderPostedData(postedData);
  for (key in data) {
    if (key.indexOf('$') > -1) {
      value = data[key];
      key = key.substring(1);
      postedData[key] = this._rowData[value];
    } else {
      postedData[key] = data[key];
    }
  }
  tipbox.sendFormData(formContent, postedData, postData, finfun, isPrevent);
  var $items = $form.find('input.item-input, textarea.item-input');
  $items.each(function () {
    if ($(this).attr('type') === 'file') {
      $(this).val('');
      return;
    }
    $(this).val(function (index, content) {
      if (typeof content == 'string') {
        return he.decode(content);
      }
    });
  });
};
Form.prototype.queryData = function (
  $node,
  message,
  url,
  sucHandler,
  errHandler
) {
  var $item = $node.parent();
  validate.handleErrorAction($item, message);
  $node.html('');
  ajaxQuery.get(
    url,
    function (data) {
      validate.resetNodeAction($item);
      sucHandler(data);
    },
    function (error) {
      if (errHandler) {
        errHandler(error);
      } else {
        validate.handleErrorAction($item, $t.renderDesc(error));
      }
    }
  );
};
