angular.module('medicine.services', ['ngResource'])
  .constant('CURRENT_USER', 'currentUser')
  .constant('DOCTOR_CODE', 'doctorCode')
  .constant('SHARE_APP', '1009643115684')
  .service('share', function() {
    this.s = function() {
      //   mobShare.config( {
      //
      //   debug: true, // 开启调试，将在浏览器的控制台输出调试信息
      //
      //   appkey: '1009643115684', // appkey
      //
      //   params: {
      //       title: data.title, // 分享标题
      //
      //
      //   }
      // });
      return '';
    }
  })

/*轮播*/
.factory('getCarouselList', ['$resource', 'SERVER', function($resource, SERVER) {
  return $resource(SERVER + '/patient/article/list/:type/:illType', {}, {
    query: {
      method: 'GET',
      isArray: true
    }
  })
}])

.factory('getVerificationCode', ['$resource', 'SERVER', function($resource, SERVER) {
    return $resource(SERVER + '/u/verificationCode', {
      mobile: '@mobile'
    }, {
      query: {
        method: 'GET',
        params: {
          mobile: ''
        }
      }
    })
  }])
  .factory('createUser', ['$resource', 'SERVER', function($resource, SERVER) {
    return $resource(SERVER + '/u/register', {
      registerType: '@registerType',
      mobile: '@mobile',
      password: '@password',
      verifycode: '@verifycode'
    }, {
      save: {
        method: 'POST',
        params: {}
      }
    })
  }])
  .factory('signUp', ['$resource', 'SERVER', function($resource, SERVER) {
    return $resource(SERVER + '/u/login', {
      username: '@username',
      password: '@password',
      type: '@type'
    }, {
      save: {
        method: 'POST',
        params: {}
      }
    })
  }])
  .factory('resetPwd', ['$resource', 'SERVER', function($resource, SERVER) {
    return $resource(SERVER + '/u/pwd/reset', {
      oldPwd: "@oldPwd",
      newPwd: "@newPwd",
      accessToken: "@accessToken"
    }, {
      save: {
        method: 'POST',
        params: {}
      }
    })
  }])
  .factory('currentUser', ['localStorageService', 'CURRENT_USER', 'DOCTOR_CODE', function(localStorageService, CURRENT_USER, DOCTOR_CODE) {
    var currentUser = {
      already: false
    }
    currentUser.getAuthToken = function() {
      return localStorageService.get(CURRENT_USER)
    }
    currentUser.setAuthToken = function(authToken) {
      localStorageService.set(CURRENT_USER, authToken)
    }
    currentUser.hasAuthToken = function() {
      return localStorageService.get(CURRENT_USER)
    }
    currentUser.destroy = function() {
      localStorageService.remove(CURRENT_USER)
      localStorageService.remove('username')
      localStorageService.remove('password')
    }
    currentUser.setDoctorCode = function(doctorCode) {
      localStorageService.set(DOCTOR_CODE, doctorCode)
    }
    currentUser.getDoctorCode = function() {
      return localStorageService.get(DOCTOR_CODE)
    }
    currentUser.setUser = function(username, password) {
      localStorageService.set('username', username);
      localStorageService.set('password', password);
    }
    currentUser.getUser = function() {
      return {
        username: localStorageService.get('username'),
        password: localStorageService.get('password')
      }
    }
    currentUser.hasFinish=false;
    return currentUser;
  }])


.factory('checkLogin', ['currentUser', function(currentUser) {
    var checkLogin = {}
    checkLogin.check = function() {
      return currentUser.hasAuthToken()
    }
    return checkLogin
  }])
  .factory('bindDoctor', ['$resource', 'SERVER', function($resource, SERVER) {
    return $resource(SERVER + '/patient/patientBindDoctor', {
      doctorIdentity: "@doctorIdentity",
      accessToken: "@accessToken"
    }, {
      save: {
        method: 'POST'
      }
    })
  }])
  .factory('updateMsg', ['$resource', 'SERVER', function($resource, SERVER) {
    return $resource(SERVER + '/doctor/profile/update', {
      accessToken: "@accessToken",
      name: "@name",
      agender: "@agender",
      birthday: "@birthday",
      mobile: "@mobile",
      weight: "@weight",
      hospital: "@hospital",
      sheng: "@sheng",
      shi: "@shi",
      xian: "@xian",
      technicalTitle: "@technicalTitle",
      department: "@department",
      teachingTitle: "@teachingTitle"
    }, {
      save: {
        method: 'POST'
      }
    })
  }])

.factory('updateIcon', ['$resource', 'SERVER', function($resource, SERVER) {
    return $resource(SERVER + '/doctor/profile/update', {
      imageBase64s: "@imageBase64s",
      accessToken: "@accessToken",
    }, {
      save: {
        method: 'POST'
      }
    })
  }])
  .factory('threeKiller', ['$resource', 'SERVER', function($resource, SERVER) {
    return $resource(SERVER + '/patient/ill/articles', {}, {
      get: {
        method: 'GET'
      }
    })
  }])
  .factory('addFeedback', ['$resource', 'SERVER', function($resource, SERVER) {
    return $resource(SERVER + '/back/feedback/add', {
      content: '@content',
      accessToken: '@accessToken',
      contact: '@contact'
    }, {
      save: {
        method: 'POST'
      }
    })
  }])
  .factory('publishdiscover', ['$resource', 'SERVER', function($resource, SERVER) {
    return $resource(SERVER + '/patient/discovery/add', {
      imageBase64s: '@imageBase64s',
      content: '@content',
      accessToken: '@accessToken'
    }, {
      save: {
        method: 'POST'
      }
    })
  }])
  .factory('healthLecture', ['$resource', 'SERVER', function($resource, SERVER) {
    return $resource(SERVER + '/patient/saveHeart/lecture', {}, {
      query: {
        method: 'GET'
      }
    })
  }])


.factory('patientProfile', ['$resource', 'SERVER', function($resource, SERVER) {
    return $resource(SERVER + '/doctor/profile', {}, {
      query: {
        method: 'GET'
      }
    })
  }])
  .factory('mineInfo', ['$resource', 'SERVER', function($resource, SERVER) {
    return $resource(SERVER + '/doctor/profile', {}, {
      query: {
        method: 'GET'
      }
    })
  }])

.factory('analysisList', ['$resource', 'SERVER', function($resource, SERVER) {
    return $resource(SERVER + '/doctor/caseAnalysis/list', {}, {
      query: {
        method: 'GET',
        isArray: true
      }
    })
  }])
  .factory('analysisDetail', ['$resource', 'SERVER', function($resource, SERVER) {
    return $resource(SERVER + '/doctor/caseAnalysis/detail/:id', {}, {
      query: {
        method: 'GET',
      }
    })
  }])
  .factory('analysisRemark', ['$resource', 'SERVER', function($resource, SERVER) {
    return $resource(SERVER + '/doctor/caseAnalysis/remark', {
      accessToken: "@accessToken",
      caseId: "@caseId",
      content: "@content",
    }, {
      save: {
        method: 'POST',
        params: {}
      }
    })
  }])

//收藏
  .factory('collection', ['$resource', 'SERVER', function($resource, SERVER) {
    return $resource(SERVER + '/doctor/caseAnalysis/collection', {
      accessToken: "@accessToken",
      caseId: "@caseId",
    }, {
      save: {
        method: 'POST',
        params: {}
      }
    })
  }])
  //收藏列表
  .factory('collectionList', ['$resource', 'SERVER', function($resource, SERVER) {
    return $resource(SERVER + '/doctor/caseAnalysis/collection/list', {
      accessToken: "@accessToken",
    }, {
      query: {
        method: 'GET',
        isArray: true
      }
    })
  }])

  //文章收藏
  .factory('articleCollect', ['$resource', 'SERVER', function($resource, SERVER) {
    return $resource(SERVER + '/patient/article/collect', {
      accessToken: '@accessToken',
      articleId: '@articleId'
    }, {
      save: {
        method: 'POST'
      }
    })
  }])
  .factory('articleCollectList', ['$resource', 'SERVER', function($resource, SERVER) {
    return $resource(SERVER + '/patient/article/collect/list', {
      accessToken: '@accessToken',
    }, {
      get: {
        method: 'GET',
      }
    })
  }])
  .factory('deleteArticle', ['$resource', 'SERVER', function($resource, SERVER) {
  return $resource(SERVER + '/patient/article/collect/del', {
    accessToken: '@accessToken',
    articleId: '@articleId'
  }, {
    save: {
      method: 'POST'
    }
  })
}])


.factory('Detail', ['$resource', 'SERVER', function($resource, SERVER) {
  return $resource(SERVER + '/patient/article/detail/:id', {}, {
    query: {
      method: 'GET'
    }
  })
}])

.factory('Remark', ['$resource', 'SERVER', function($resource, SERVER) {
    return $resource(SERVER + '/patient/article/remark', {
      accessToken: "@accessToken",
      articleId: '@articleId',
      remark: '@remark'
    }, {
      save: {
        method: 'POST'
      }
    })
  }])
  .factory('xinxueg', ['$resource', 'SERVER', function($resource, SERVER) {
    return $resource(SERVER + '/doctor/heartcircle/list', {}, {
      query: {
        method: 'GET',
        isArray: true
      }
    })
  }])
  .factory('xinxuegDetail', ['$resource', 'SERVER', function($resource, SERVER) {
    return $resource(SERVER + '/doctor/heartcircle/detail/:id', {}, {
      query: {
        method: 'GET'
      }
    })
  }])
  .factory('xinxuegRemark', ['$resource', 'SERVER', function($resource, SERVER) {
    return $resource(SERVER + '/doctor/heartcircle/remark', {
      heartCircleId: '@heartCircleId',
      remark: '@remark',
      accessToken: "@accessToken"
    }, {
      save: {
        method: 'POST'
      }
    })
  }])


.factory('gonggaoRelease', ['$resource', 'SERVER', function($resource, SERVER) {
    return $resource(SERVER + '/doctor/announcement/add', {
      content: '@content',
      accessToken: "@accessToken"
    }, {
      save: {
        method: 'POST'
      }
    })
  }])
  .factory('gonggaolist', ['$resource', 'SERVER', function($resource, SERVER) {
    return $resource(SERVER + '/doctor/announcement/list/:id', {}, {
      query: {
        method: 'GET',
        isArray: true
      }
    })
  }])
  .factory('gonggaoDel', ['$http','$resource', 'SERVER', function($http,$resource, SERVER) {
    return $resource(SERVER + '/doctor/announcement/delete/:id', {
      id: "@id",
      accessToken: "@accessToken"
    }, {
      save: {
        method: 'POST'
      }
    })
    // var fa={
    //
    // }
    // fa.delete=function(params,cb){
    //   $http({
    //     method: 'POST',
    //     params: params,
    //     url: SERVER + '/doctor/academicSupport/takepart'
    //   }).then(function success(res) {
    //     return cb(null, res.data);
    //   }, function error() {
    //     return cb(res.status, null); //ERROR
    //   });
    // }
  }])
  .factory('patientCheckBindList', ['$resource', 'SERVER', function($resource, SERVER) {
    return $resource(SERVER + '/doctor/bind/list', {}, {
      query: {
        method: 'GET',
        isArray: true
      }
    })
  }])

.factory('patientBindList', ['$resource', 'SERVER', function($resource, SERVER) {
    return $resource(SERVER + '/doctor/mypatients', {}, {
      query: {
        method: 'GET',
        isArray: true
      }
    })
  }])
  .factory('acceptOrNot', ['$resource', 'SERVER', function($resource, SERVER) {
    return $resource(SERVER + '/doctor/bind/acceptOrNot', {
      id: "@id",
      acceptOrNot: "@acceptOrNot",
      accessToken: "@accessToken"
    }, {
      save: {
        method: 'POST'
      }
    })
  }])
  //首页活跃用户数
  .factory('bindinfo', ['$resource', 'SERVER', function($resource, SERVER) {
    return $resource(SERVER + '/doctor/bindinfo/:id', {}, {
      query: {
        method: 'GET',
      }
    })
  }])
  .factory('feedBack', ['$resource', 'SERVER', function($resource, SERVER) {
    return $resource(SERVER + '/back/feedback/add', {
      content: "@content",
      accessToken: "@accessToken",
      contact: "@contact",

    }, {
      save: {
        method: 'POST'
      }
    })
  }])

.factory('patientDetail', ['$resource', 'SERVER', function($resource, SERVER) {
  return $resource(SERVER + '/doctor/mypatient/:id', {
    patientId: "@patientId",
    accessToken: "@accessToken"
  }, {
    query: {
      method: 'GET'
    }
  })
}])

.factory('delMyPatient', ['$resource', 'SERVER', function($resource, SERVER) {
  return $resource(SERVER + '/doctor/doctorunBindPatient', {
    patientId: "@patientId",
    accessToken: "@accessToken"
  }, {
    save: {
      method: 'POST'
    }
  })
}])

.factory('patientadd', ['$resource', 'SERVER', function($resource, SERVER) {
    return $resource(SERVER + '/doctor/doctorBindPatient', {
      accessToken: "@accessToken",
      mobile: "@mobile",

    }, {
      save: {
        method: 'POST'
      }
    })
  }])
  //   心血管圈发表
  .factory('xinxuegRemark', ['$resource', 'SERVER', function($resource, SERVER) {
    return $resource(SERVER + '/doctor/heartcircle/add', {
      content: '@content',
      imageBase64s: "@imageBase64s",
      accessToken: "@accessToken"

    }, {
      save: {
        method: 'POST'
      }
    })
  }])
  //上传证件
  .factory('doctorVerifyUpload', ['$resource', 'SERVER', function($resource, SERVER) {

    return $resource(SERVER + '/doctor/verify/upload', {
      crtWithPhoto: "@crtWithPhoto",
      crtWithName: "@crtWithName",
      accessToken: "@accessToken"
    }, {
      save: {
        method: 'POST',
        params: {}
      }
    })
  }])

.factory('xinxuegMyRemark', ['$resource', 'SERVER', function($resource, SERVER) {
  return $resource(SERVER + '/doctor/heartcircle/remark', {
    heartCircleId: '@heartCircleId',
    remark: '@remark',
    accessToken: "@accessToken"

  }, {
    save: {
      method: 'POST',
    }
  })
}])

.factory('forgotpwd', ['$resource', 'SERVER', function($resource, SERVER) {
    return $resource(SERVER + '/u/pwd/forget/verifycode', {
      mobile: "@mobile",
    }, {
      query: {
        method: 'GET'
      }
    })
  }])
  .factory('forgotReturn', ['$resource', 'SERVER', function($resource, SERVER) {
    return $resource(SERVER + '/u/pwd/forget', {
      mobile: '@mobile',
      verifycode: '@verifycode',
      newPwd: '@newPwd',
      confirmPwd: "@confirmPwd"

    }, {
      save: {
        method: 'POST',
      }
    })
  }])

.factory('dayIncrease', ['$resource', 'SERVER', function($resource, SERVER) {
    return $resource(SERVER + '/doctor/score/dayincrease', {
      accessToken: "@accessToken",
    }, {
      save: {
        method: 'POST'
      }
    })
  }])
  .factory('addillHistory', ['$resource', 'SERVER', function($resource, SERVER) {
    return $resource(SERVER + '/doctor/mypatient/updateIllProfile', {
      accessToken: "@accessToken",
      userId: "@userId",
      illProfile: '@illProfile'
    }, {
      save: {
        method: 'POST'
      }
    })
  }])
  .factory('addbeizhu', ['$resource', 'SERVER', function($resource, SERVER) {
    return $resource(SERVER + '/doctor/mypatient/updateRemark', {
      accessToken: "@accessToken",
      userId: "@userId",
      remark: '@remark'
    }, {
      save: {
        method: 'POST'
      }
    })
  }])

.factory('chart', ['$resource', 'SERVER', function($resource, SERVER) {
    return $resource(SERVER + '/u/chatonline', {
      accessToken: '@accessToken',
      fromUserId: '@fromUserId',
      toUserID: '@toUserID',
      toChat: '@toChat',
    }, {
      save: {
        method: 'POST'
      }
    })
  }])
  .factory('getChart', ['$resource', 'SERVER', function($resource, SERVER) {
    return $resource(SERVER + '/u/chatonline/info', {
      accessToken: "@accessToken",
      fromUserId: "@fromUserId",
      toUserID: "@toUserID",
      limit:"@limit"
    }, {
      query: {
        method: 'GET',
        isArray: true
      }
    })
  }])

.factory('getPatientAsk', ['$resource', 'SERVER', function($resource, SERVER) {
  return $resource(SERVER + '/doctor/mypatient/ask', {
    accessToken: "@accessToken",
  }, {
    query: {
      method: 'GET',
      isArray: true
    }
  })
}])

.factory('getCountAsk', ['$resource', 'SERVER', function($resource, SERVER) {
  return $resource(SERVER + '/doctor/mypatient/ask/count', {
    accessToken: "@accessToken",
  }, {
    query: {
      method: 'GET',
    }
  })
}])

.factory('districtGet', ['$resource', 'SERVER', function($resource, SERVER) {
    return $resource(SERVER + '/back/district/get', {
      accessToken: "@accessToken",
      orgId: "@orgId",
      type: "@type"
    }, {
      query: {
        method: 'GET',
        isArray: true

      }
    })
  }])
  .factory('getYy', ['$resource', 'SERVER', function($resource, SERVER) {
    return $resource(SERVER + '/back/district/hospitals', {
      accessToken: "@accessToken",
      provinceId: "@provinceId",
      cityId: "@cityId",
      countyId: "@countyId"
    }, {
      query: {
        method: 'GET',
        isArray: true

      }
    })
  }])
  .factory('collectionDel', ['$resource', 'SERVER', function($resource, SERVER) {
    return $resource(SERVER + '/doctor/caseAnalysis/collection/del', {
      accessToken: "@accessToken",
      collectId: "@collectId"
    }, {
      save: {
        method: 'POST',
      }
    })
  }])
  .factory('webUtils', ['$document', '$window', '$resource', 'SERVER', function($document, $window, $resource, SERVER) {
    function isWeiXin() {
      var ua = $window.navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true;
      } else {
        return false;
      }
    }
    var fa = {};
    fa.isWeiXin = isWeiXin;
    fa.goHistory = function() {
      if (!isWeiXin()) {
        console.log($window.history);
        $window.history.back();
      } else {
        $window.location.href = '/#/tab/home';
      }
    }
    return fa;
  }])
  .factory('xinde', ['$resource', 'SERVER', '$http', function($resource, SERVER, $http) {
    var fa = {};
    fa.add = function(formData, cb) {
      $http.post(SERVER + '/doctor/diagnose_experience/add', formData, {
        headers: {
          'Content-Type': undefined
        },
        transformRequest: angular.identity
      }).success(cb);
    }
    fa.update = function(formData, cb) {
      $http.post(SERVER + '/doctor/diagnose_experience/update', formData, {
        headers: {
          'Content-Type': undefined
        },
        transformRequest: angular.identity
      }).success(cb);
    }
    fa.addRemark = function(formData, cb) {

      $http.post(SERVER + '/doctor/diagnose_experience/remark', formData, {
        headers: {
          'Content-Type': undefined
        },
        transformRequest: angular.identity
      }).
      success(cb).
      error(cb);
      // $http({method:'POST',params:formData,url:SERVER+'/doctor/diagnose_experience/remark'}).then(function success(res){
      //   return cb(null,res.data);
      // },function error(){
      //   return cb(res.status,null);//ERROR
      // });
    }


    fa.list = function(params, cb) {
      $http({
        method: 'GET',
        params: params,
        url: SERVER + '/doctor/diagnose_experience/list'
      }).then(function success(res) {
        return cb(null, res.data);
      }, function error() {
        return cb(res.status, null); //ERROR
      });
    }
    fa.mylist = function(params, cb) {
      $http({
        method: 'GET',
        params: params,
        url: SERVER + '/doctor/diagnose_experience/mylist'
      }).then(function success(res) {
        return cb(null, res.data);
      }, function error() {
        return cb(res.status, null); //ERROR
      });
    }
    fa.get = function(params, cb) {
      $http({
        method: 'GET',
        params: params,
        url: SERVER + '/doctor/diagnose_experience/detail/' + params.id
      }).then(function success(res) {
        return cb(null, res.data);
      }, function error() {
        return cb(res.status, null); //ERROR
      });
    }
    fa.reward = function(formData, cb) {
      // $http({method:'POST',data:params,url:SERVER+'/doctor/diaexp/reward'}).then(function success(res){
      //   return cb(null,res.data);
      // },function error(){
      //   return cb(res.status,null);//ERROR
      // });
      $http.post(SERVER + '/doctor/diaexp/reward', formData, {
        headers: {
          'Content-Type': undefined
        },
        transformRequest: angular.identity
      }).success(function(data) {
        cb(data);
      })

    }
    return fa;
  }])
  .factory('jilu', ['$http', 'SERVER', function($http, SERVER) {
    var fa = {};
    fa.queryPaitent = function(params, cb) {
      $http({
        method: 'GET',
        params: params,
        url: SERVER + '/patient/jilu/queryPatient'
      }).then(function success(res) {
        return cb(null, res.data);
      }, function error() {
        return cb(res.status, null); //ERROR
      });
    }
    return fa;
  }])
  .factory('xueshu', ['$http', 'SERVER', function($http, SERVER) {
    var fa = {};
    fa.list = function(params, cb) {
      $http({
        method: 'GET',
        params: params,
        url: SERVER + '/doctor/academicSupport/list'
      }).then(function success(res) {
        return cb(null, res.data);
      }, function error() {
        return cb(res.status, null); //ERROR
      });
    }
    fa.get = function(params, cb) {
      $http({
        method: 'GET',
        params: params,
        url: SERVER + '/doctor/academicSupport/detail'
      }).then(function success(res) {
        return cb(null, res.data);
      }, function error() {
        return cb(res.status, null); //ERROR
      });
    }

    fa.take = function(params, cb) {
      $http({
        method: 'POST',
        params: params,
        url: SERVER + '/doctor/academicSupport/takepart'
      }).then(function success(res) {
        return cb(null, res.data);
      }, function error() {
        return cb(res.status, null); //ERROR
      });
    }
    return fa;

  }])
  .factory('huanxin', ['$http', 'SERVER', function($http, SERVER) {
    // console.log('huanxin init');
    var fa = {};
    var APPKEY = 'laduola#ldlceshi';
    var conn = null;
    var config = {

      /*
          The global value set for xmpp server
          ws://im-api.easemob.com/ws/
          wss://im-api.easemob.com/ws/
          http://im-api.easemob.com/http-bind/
          https://im-api.easemob.com/http-bind/
      */
      xmppURL: 'wss://im-api.easemob.com/ws/',
      /*
          The global value set for Easemob backend REST API
          http://a1.easemob.com
      */
      apiURL: 'http://a1.easemob.com',
      /*
          连接时提供appkey
      */
      appkey: "laduola#ldlceshi",
      https: true
    }

    fa.registerUser = function(options) {
      options.appKey = APPKEY;

      Easemob.im.Helper.registerUser(options);
    }
    var doReceive;
    fa.onReceive = function(cb) {
      doReceive = cb;
    }
    fa.connect = function(username, password, cb) {

      conn = new Easemob.im.Connection();
      console.log({
        user: username,
        pwd: password,
        appKey: APPKEY
      });
      conn.init({
        onOpened: function() {
          cb();
          conn.setPresence();
        },
        onTextMessage: function(message) {
          console.log(message);
          // alert("发送消息成功");
          if (doReceive) {
            doReceive(message);
          }

        }
      });
      conn.open({
        apiUrl: config.apiURL,
        user: username,
        pwd: password,
        //连接时提供appkey
        appKey: config.appkey
      });
    }
    fa.sendText = function(msg, to) {
      var options = {
        to: to,
        msg: msg,
        type: "chat"
      };
      console.log(msg)
      console.log(options)
        //发送文本消息接口
      conn.sendTextMessage(options);
    }

    fa.getConnect = function() {
      return conn;
    }
    return fa;
  }]);
