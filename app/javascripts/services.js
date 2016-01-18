angular.module('medicine.services', ['ngResource'])
    .constant('CURRENT_USER', 'currentUser')
    .constant('DOCTOR_CODE', 'doctorCode')
    /*轮播*/
    .factory('getCarouselList', ['$resource', 'SERVER', function ($resource, SERVER) {
        return $resource(SERVER + '/patient/article/list/:type/:category', {}, {
            query: {
                method: 'GET',
                isArray: true
            }
        })
    }])


    /*首页新闻动态内容获取*/
    //未定义
    //.factory('getIndexMedical',['$resource','SERVER',function($resource,SERVER){
    //    //接口未找到
    //}])


    .factory('getVerificationCode', ['$resource', 'SERVER', function ($resource, SERVER) {
        return $resource(SERVER + '/u/verificationCode', {mobile: '@mobile'}, {
            query: {
                method: 'GET',
                params: {
                    mobile: ''
                }
            }
        })
    }])
    .factory('createUser', ['$resource', 'SERVER', function ($resource, SERVER) {
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
    .factory('signUp', ['$resource', 'SERVER', function ($resource, SERVER) {
        return $resource(SERVER + '/u/login', {
            username: '@username',
            password: '@password'
        }, {
            save: {
                method: 'POST',
                params: {}
            }
        })
    }])
    .factory('resetPwd', ['$resource', 'SERVER', function ($resource, SERVER) {
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
    .factory('currentUser', ['localStorageService', 'CURRENT_USER', 'DOCTOR_CODE', function (localStorageService, CURRENT_USER, DOCTOR_CODE) {
        var currentUser = {}
        currentUser.getAuthToken = function () {
            return localStorageService.get(CURRENT_USER)
        }
        currentUser.setAuthToken = function (authToken) {
            localStorageService.set(CURRENT_USER, authToken)
        }
        currentUser.hasAuthToken = function () {
            return localStorageService.get(CURRENT_USER)
        }
        currentUser.destroy = function () {
            localStorageService.remove(CURRENT_USER)
        }
        currentUser.setDoctorCode = function (doctorCode) {
            localStorageService.set(DOCTOR_CODE, doctorCode)
        }
        currentUser.getDoctorCode = function () {
            return localStorageService.get(DOCTOR_CODE)
        }
        return currentUser
    }])


    .factory('checkLogin', ['currentUser', function (currentUser) {
        var checkLogin = {}
        checkLogin.check = function () {
            return currentUser.hasAuthToken()
        }
        return checkLogin
    }])
    .factory('bindDoctor', ['$resource', 'SERVER', function ($resource, SERVER) {
        return $resource(SERVER + '/patient/patientBindDoctor', {
            doctorIdentity: "@doctorIdentity",
            accessToken: "@accessToken"
        }, {
            save: {
                method: 'POST'
            }
        })
    }])
    .factory('updateMsg', ['$resource', 'SERVER', function ($resource, SERVER) {
        return $resource(SERVER + '/patient/profile/update', {
            accessToken: "@accessToken",
            name: "@name",
            agender: "@agender",
            birthday: "@birthday",
            mobile: "@mobile",
            weight: "@weight",
            imageBase64s :"@imageBase64s"
        }, {
            save: {
                method: 'POST'
            }
        })
    }])
    .factory('threeKiller', ['$resource', 'SERVER', function ($resource, SERVER) {
        return $resource(SERVER + '/patient/ill/articles', {}, {
            get: {
                method: 'GET'
            }
        })
    }])
    .factory('addFeedback', ['$resource', 'SERVER', function ($resource, SERVER) {
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
    .factory('publishdiscover', ['$resource', 'SERVER', function ($resource, SERVER) {
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
    .factory('healthLecture', ['$resource', 'SERVER', function ($resource, SERVER) {
        return $resource(SERVER + '/patient/saveHeart/lecture', {}, {
            query: {
                method: 'GET'
            }
        })
    }])
    //头像上传
    .factory('updateMsg', ['$resource', 'SERVER', function ($resource, SERVER) {
        return $resource(SERVER + '/doctor/profile/update', {
            accessToken: "@accessToken",
            name: "@name",
            agender: "@agender",
            birthday: "@birthday",
        }, {
            save: {
                method: 'POST'
            }
        })
    }])
    //证件上传
    .factory('updateVerifyMsg', ['$resource', 'SERVER', function ($resource, SERVER) {
        return $resource(SERVER + '/doctor/verify/upload', {
            crtWithPhoto: "@crtWithPhoto",
            crtWithName: "@crtWithName",
            accessToken: "@accessToken",
        }, {
            save: {
                method: 'POST'
            }
        })
    }])

    .factory('patientProfile', ['$resource', 'SERVER', function ($resource, SERVER) {
        return $resource(SERVER + '/docotor/profile', {}, {
            query: {method: 'GET'}
        })
    }])
    .factory('mineInfo', ['$resource', 'SERVER', function ($resource, SERVER) {
        return $resource(SERVER + '/doctor/profile', {}, {
            query: {method: 'GET'}
        })
    }])

    .factory('analysisList', ['$resource', 'SERVER', function ($resource, SERVER) {
        return $resource(SERVER + '/doctor/caseAnalysis/list', {}, {
            query: {
                method: 'GET',
                isArray: true
            }
        })
    }])
    .factory('analysisDetail', ['$resource', 'SERVER', function ($resource, SERVER) {
        return $resource(SERVER + '/doctor/caseAnalysis/detail/:id', {}, {
            query: {
                method: 'GET',
            }
        })
    }])
    .factory('analysisRemark', ['$resource', 'SERVER', function ($resource, SERVER) {
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
    .factory('collection', ['$resource', 'SERVER', function ($resource, SERVER) {
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
    .factory('collectionList', ['$resource', 'SERVER', function ($resource, SERVER) {
        return $resource(SERVER + '/doctor/caseAnalysis/collection/list', {
            accessToken: "@accessToken",
        }, {
            query: {
                method: 'GET',
                isArray:true
            }
        })
    }])


    .factory('Detail', ['$resource', 'SERVER', function ($resource, SERVER) {
        return $resource(SERVER + '/patient/article/detail/:id', {}, {
            query: {
                method: 'GET'
            }
        })
    }])

    .factory('Remark', ['$resource', 'SERVER', function ($resource, SERVER) {
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
    .factory('xinxueg', ['$resource', 'SERVER', function ($resource, SERVER) {
        return $resource(SERVER + '/doctor/heartcircle/list', {}, {
            query: {
                method: 'GET',
                isArray: true
            }
        })
    }])
    .factory('xinxuegDetail', ['$resource', 'SERVER', function ($resource, SERVER) {
        return $resource(SERVER + '/doctor/heartcircle/detail/:id', {}, {
            query: {
                method: 'GET'
            }
        })
    }])
    .factory('xinxuegRemark', ['$resource', 'SERVER', function ($resource, SERVER) {
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


    .factory('gonggaoRelease', ['$resource', 'SERVER', function ($resource, SERVER) {
        return $resource(SERVER + '/doctor/announcement/add', {
            content: '@content',
            accessToken: "@accessToken"
        }, {
            save: {
                method: 'POST'
            }
        })
    }])
    .factory('gonggaolist', ['$resource', 'SERVER', function ($resource, SERVER) {
        return $resource(SERVER + '/doctor/announcement/list/:id', {}, {
            query: {
                method: 'GET',
                isArray: true
            }
        })
    }])
    .factory('patientBindList', ['$resource', 'SERVER', function ($resource, SERVER) {
        return $resource(SERVER + '/doctor/bind/list', {}, {
            query: {
                method: 'GET',
                isArray: true
            }
        })
    }])
    .factory('acceptOrNot', ['$resource', 'SERVER', function ($resource, SERVER) {
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
    .factory('bindinfo', ['$resource', 'SERVER', function ($resource, SERVER) {
        return $resource(SERVER + '/doctor/bindinfo/:id', {}, {
            query: {
                method: 'GET',
            }
        })
    }])
    .factory('feedBack', ['$resource', 'SERVER', function ($resource, SERVER) {
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

    .factory('patientDetail', ['$resource', 'SERVER', function ($resource, SERVER) {
        return $resource(SERVER + '/doctor/mypatient',{},{
            query: {
                method: 'GET'
            }
        })
    }])