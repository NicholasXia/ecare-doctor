angular.module('medicine.controllers', [])
    .controller('doctorHomeCtrl', ['$scope', '$window', 'getCarouselList', 'currentUser', "$ionicPopup", "bindinfo", "mineInfo", function ($scope, $window, getCarouselList, currentUser, $ionicPopup, bindinfo, mineInfo) {
        getCarouselList.query({type: 1, category: 1}, function (data) {
            $scope.data = data

            console.log(data)
            $scope.doctorno = currentUser.getDoctorCode()
        })

        getCarouselList.query({type: 1, category: 2}, function (data) {
            $scope.medicallist = data
            console.log(data)
        })

        $scope.doctorCode = currentUser.getDoctorCode()
        $scope.goToActivity = function (activity) {
            $window.location.href = activity
        }
        $scope.isLogin = currentUser.hasAuthToken()

        var accesstoken = currentUser.getAuthToken()

        mineInfo.query({accessToken: accesstoken}, function (data) {
            var msg = {
                id: data.id,
            }
            bindinfo.query(msg, function (count) {
                $scope.count = count
                console.log(count)
            })
        })

        $scope.goLogin = function () {
            if (!$scope.isLogin) {
                $ionicPopup.alert({
                    title: '错误提示',
                    template: '您还未登陆'
                });
                $window.location.href = '#/sign_in'
            } else {
                $window.location.href = '#/analysis'
            }
        }

        $scope.goXinxueg = function () {
            if (!$scope.isLogin) {
                $ionicPopup.alert({
                    title: '错误提示',
                    template: '您还未登陆'
                });
                $window.location.href = '#/sign_in'
            } else {
                $window.location.href = '#/xinxueg'
            }
        }
    }])

//医生注册
    .controller('doctorSignUpCtrl', ['$scope', '$ionicPopup', 'getVerificationCode', 'createUser', '$timeout', '$window', 'currentUser', function ($scope, $ionicPopup, getVerificationCode, createUser, $timeout, $window, currentUser) {
        //用户注册模块
        var reg = /^0?1[3|4|5|7|8][0-9]\d{8}$/
        $scope.account = {phoneNum: '', verCode: '', password: ''}
        console.log('00000000')
        console.log($scope)
        //
        $scope.getCode = function () {
            getVerificationCode.query({mobile: $scope.account.phoneNum}, function (data) {
                console.log(data)
                if (data.error || $scope.account.phoneNum.length == 0 || $scope.account.phoneNum.length < 11 || !reg.test($scope.account.phoneNum)) {
                    $ionicPopup.alert({
                        title: '错误提示',
                        template: '手机号输入有误，请重新输入'
                    });
                } else {
                    $ionicPopup.alert({
                        title: '成功提示',
                        template: '验证码已经发送，请稍后'
                    });
                }
            }, function () {
                $ionicPopup.alert({
                    title: '错误提示',
                    template: '未知错误，请稍后重试'
                });
            })
        }


        $scope.signUp = function () {
            var user = {
                registerType: 1,
                mobile: $scope.account.phoneNum,
                password: $scope.account.password,
                verifycode: $scope.account.verCode
            }
            if ($scope.account.verCode.length !== 4 || $scope.account.password.length == 0) {
                $ionicPopup.alert({
                    title: '错误提示',
                    template: '请输入个人正确的信息'
                })
                return
            }
            createUser.save({}, user, function (userdata) {
                var popup = $ionicPopup.alert({
                    title: '注册成功',
                    template: '进入登陆页'
                })
                $timeout(function () {
                    popup.close()
                    $window.location.href = '#/sign_in'
                }, 3000)
            })
        }
    }])
//医生登陆
    .controller('doctorSignInCtrl', ['$scope', 'signUp', '$window', '$ionicPopup', '$timeout', 'currentUser', function ($scope, signUp, $window, $ionicPopup, $timeout, currentUser) {
        $scope.signInMsg = {'username': '', 'password': ''}
        $scope.signIn = function () {
            signUp.save({}, $scope.signInMsg, function (data) {
                currentUser.setAuthToken(data.accessToken)
                currentUser.setDoctorCode(data.user.doctorNo)
                if (data.error) {
                    $ionicPopup.alert({
                        title: '错误提示',
                        template: data.error
                    })
                    ;
                    return
                } else {
                    var popup = $ionicPopup.alert({
                        title: '登陆成功',
                        template: '3秒后自动进入主页'
                    })
                    $timeout(function () {
                        popup.close()
                        $window.location.href = '#/'
                    }, 3000)
                }
            })
        }
    }])
    .controller('doctorEndSettingCtrl', ['$scope', 'currentUser', '$window', '$ionicPopup', '$timeout', function ($scope, currentUser, $window, $ionicPopup, $timeout) {
        $scope.isLogin = currentUser.hasAuthToken()
        $scope.goLogin = function () {
            $scope.isLogin = currentUser.hasAuthToken()
            if (!$scope.isLogin) {
                $window.location.href = '#/sigin_in'
            }
        }
        $scope.destroyU = function () {
            currentUser.destroy()
            var popup = $ionicPopup.alert({
                title: '您已经注销',
                template: '3秒后自动进入主页'
            })
            $timeout(function () {
                popup.close()
                $window.history.back();
            }, 3000)
        }
    }])

    .controller('doctorEndMineCtrl', ['$scope', 'mineInfo', 'currentUser', 'checkLogin', '$window', '$ionicPopup', function ($scope, mineInfo, currentUser, checkLogin, $window, $ionicPopup) {

        $scope.ischeck = !!checkLogin.check()

        var accesstoken = currentUser.getAuthToken()
        $scope.accesstoken = accesstoken
        mineInfo.query({accessToken: accesstoken}, function (data) {
            $scope.infodata = data
            console.log(data)
        })


        $scope.letugo = function () {
            if (accesstoken) {
                $window.location.href = '#/mine_info'
            } else {
                $window.location.href = '#/sign_in'
            }
        }
        $scope.myCollection = function () {
            if (accesstoken) {
                $window.location.href = '#/mycollection'
            } else {
                $window.location.href = '#/sign_in'
            }
        }
        $scope.myQrCode = function () {
            if (accesstoken) {
                $window.location.href = '#/myqrcode'
            } else {
                $window.location.href = '#/sign_in'
            }
        }
        $scope.gofeedBack = function () {
            if (accesstoken) {
                $window.location.href = '#/feedback'
            } else {
                $window.location.href = '#/sign_in'
            }
        }

    }])
    .controller('changeCtrl', ['$scope', 'updateMsg', 'currentUser', '$ionicPopup', '$window', '$timeout', 'patientProfile', function ($scope, updateMsg, currentUser, $ionicPopup, $window, $timeout, patientProfile) {
        $scope.patientData = {
            birthday: '',
            weight: '',
            name: '',
            agender: ''
        }

        var monthList = ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"];
        var datePickerCallback = function (val) {
            if (typeof(val) === 'undefined') {
                console.log('No date selected');
            } else {
                $scope.patientData.birthday = val.getFullYear() + '-' + (val.getMonth() + 1) + '-' + val.getDate()
            }
        };
        $scope.datepickerObject = {
            titleLabel: '请选择生日',
            todayLabel: '今日',
            closeLabel: '取消',
            setLabel: '选取',
            setButtonType: 'button-assertive',
            todayButtonType: 'button-assertive',
            closeButtonType: 'button-assertive',
            inputDate: new Date(),
            mondayFirst: true,
            monthList: monthList,
            templateType: 'popup',
            showTodayButton: 'false',
            modalHeaderColor: 'bar-positive',
            modalFooterColor: 'bar-positive',
            callback: function (val) {
                datePickerCallback(val);
                return
            },
            dateFormat: 'yyyy-MM-dd',
            closeOnSelect: false,
        };

        $scope.saveMsg = function () {
            var saveMsg = {
                accessToken: currentUser.getAuthToken(),
                name: $scope.patientData.name,
                birthday: $scope.patientData.birthday,
                agender: $scope.patientData.agender
            }
            console.log(saveMsg)
            updateMsg.save(saveMsg, function (data) {
                if (data.status == 'suc') {
                    var popup = $ionicPopup.alert({
                        title: '您的信息修改成功',
                        template: '3秒后自动返回'
                    })
                    $timeout(function () {
                        popup.close()
                        $window.history.back();
                    }, 3000)
                }
                //else {
                //    $window.location.href = '#/'
                //}
            })
        }
    }])

    .controller('mineInfoCtrl', ['$scope', '$window', 'mineInfo', 'currentUser', function ($scope, $window, mineInfo, currentUser) {
        var accesstoken = currentUser.getAuthToken()
        mineInfo.query({accessToken: accesstoken}, function (data) {
            $scope.infodata = data
            console.log(data)
        })

    }])
    .controller('analysisCtrl', ['$scope', '$window', 'analysisList', 'currentUser', function ($scope, $window, analysisList, currentUser) {
        var accesstoken = currentUser.getAuthToken()
        analysisList.query({accessToken: accesstoken}, function (data) {
            $scope.analysislist = data
            console.log(data)
        })

    }])
    .controller('analysisDetailCtrl', ['$scope', '$window', '$stateParams', '$ionicPopup', 'analysisDetail', 'analysisRemark', 'currentUser', 'collection', '$timeout', function ($scope, $window, $stateParams, $ionicPopup, analysisDetail, analysisRemark, currentUser, collection, $timeout) {
        var accesstoken = currentUser.getAuthToken()
        analysisDetail.query({id: $stateParams.id, accessToken: accesstoken}, function (data) {
            $scope.analysisdetail = data
            console.log(data)
        })
        //评论
        $scope.detailMsg = {'acomment': ''}
        $scope.aComment = function () {
            var msg = {
                accessToken: accesstoken,
                caseId: $stateParams.id,
                content: $scope.detailMsg.acomment
            }
            analysisRemark.save({}, msg, function (detail) {
                if (detail.status == 'suc') {
                    $window.location.reload()
                }
                else {
                    $window.location.href = '#/'
                }
            })
        }

        //收藏

        $scope.addCollection = function () {

            var colMsg = {
                accessToken: accesstoken,
                caseId: $stateParams.id
            }

            collection.save({}, colMsg, function (col) {

                if (col.status == 'suc') {
                    var popup = $ionicPopup.alert({


                        title: '收藏成功',
                        template: '3秒后跳转'
                    })
                    $timeout(function () {
                        popup.close()
                        $window.location.href = '#/mycollection'
                    }, 3000)
                } else if (col.error_code == '12000') {
                    $ionicPopup.alert({
                        title: '收藏失败',
                        template: '请不要重复收藏'
                    })
                }
            })
        }
    }])
    //消息记录
    .controller('msgRecordCtrl', ['$scope', 'gonggaolist', 'currentUser', 'mineInfo', function ($scope, gonggaolist, currentUser, mineInfo) {
        var accesstoken = currentUser.getAuthToken()
        mineInfo.query({accessToken: accesstoken}, function (data) {
            var msg = {
                id: data.id,
                accessToken: accesstoken
            }
            gonggaolist.query(msg, function (info) {

                $scope.gonggao = info
                console.log(info)
            })

        })
    }])

    .controller('gongGaoListCtrl', ['$scope', 'gonggaolist', 'mineInfo', 'currentUser', function ($scope, gonggaolist, mineInfo, currentUser) {
        var accesstoken = currentUser.getAuthToken()
        mineInfo.query({accessToken: accesstoken}, function (data) {
            console.log(data)
            var msg = {
                id: data.id,
                accessToken: accesstoken
            }
            gonggaolist.query(msg, function (info) {
                $scope.gonggao = info
                console.log(info)
            })

        })

    }])

    .controller('gongGaoReleaseCtrl', ['$scope', '$window', '$stateParams', '$ionicPopup', 'gonggaoRelease', 'currentUser', '$timeout', function ($scope, $window, $stateParams, $ionicPopup, gonggaoRelease, currentUser, $timeout) {
        var accesstoken = currentUser.getAuthToken()
        $scope.gongGao = {'info': ''}
        $scope.onRelease = function () {
            var msg = {
                content: $scope.gongGao.info,
                accessToken: accesstoken
            }
            gonggaoRelease.save({}, msg, function (rel) {
                if (rel.status = 'suc') {
                    var popup = $ionicPopup.alert({
                        title: '发表成功',
                        template: '3秒后返回'
                    })
                    $timeout(function () {
                        popup.close()
                        $window.history.back();
                    }, 3000)
                } else {
                    var popup = $ionicPopup.alert({
                        title: '未知错误'
                    })
                }
            })
        }
    }])


    //轻松一刻
    .controller('relaxedCtrl', ['$scope', 'getCarouselList', function ($scope, getCarouselList) {
        getCarouselList.query({type: 1, category: 3}, function (data) {
            $scope.data = data
        })

    }])

    .controller('relaxedDetailCtrl', ['$scope', 'Detail', '$stateParams', function ($scope, Detail, $stateParams) {
        Detail.query({id: $stateParams.id}, function (data) {
            $scope.relaxed = data
        })
    }])

    .controller('medicalCtrl', ['$scope', 'getCarouselList', function ($scope, getCarouselList) {
        getCarouselList.query({type: 1, category: 2}, function (data) {
            $scope.data = data
        })
    }])

    .controller('medicalDetailCtrl', ['$scope', 'Detail', 'currentUser', '$window', '$stateParams', 'Remark', '$ionicPopup', function ($scope, Detail, currentUser, $window, $stateParams, Remark, $ionicPopup) {
        Detail.query({id: $stateParams.id}, function (data) {
            $scope.medicaldetail = data
            //console.log(data)
        })

        var accesstoken = currentUser.getAuthToken()
        $scope.markinfo = {'remak': ''}
        $scope.remark = function () {

            var msg = {
                accessToken: accesstoken,
                articleId: $stateParams.id,
                remark: $scope.markinfo.remak
            }
            Remark.save({}, msg, function (data) {
                if (data.status == 'suc') {
                    $window.location.reload()
                } else {
                    $ionicPopup.alert({
                        title: '错误提示',
                        template: '您还未登陆不能进行评论'
                    });
                    $window.location.href = '#/sign_in'
                }
            })

        }


    }])
    .controller('xinxuegCtrl', ['$scope', '$window', '$ionicPopup', 'currentUser', 'xinxueg', function ($scope, $window, $ionicPopup, currentUser, xinxueg) {
        xinxueg.query({}, function (data) {
            $scope.xinlist = data
            console.log(data)
        })
        $scope.isLogin = currentUser.hasAuthToken()
        $scope.goPublish = function () {
            if (!$scope.isLogin) {
                $ionicPopup.alert({
                    title: '错误提示',
                    template: '您还未登陆'
                });
                $window.location.href = '#/sign_in'
            } else {
                $window.location.href = '#/xinxueg_release'
            }
        }
    }])

    .controller('xinxuegDetailCtrl', ['$scope', 'xinxuegDetail', '$stateParams', 'currentUser', '$window', '$ionicPopup','xinxuegMyRemark', function ($scope, xinxuegDetail, $stateParams, currentUser, $window, $ionicPopup,xinxuegMyRemark) {
        var accesstoken = currentUser.getAuthToken()
        if (accesstoken) {
            xinxuegDetail.query({id: $stateParams.id, accessToken: accesstoken}, function (data) {
                $scope.xinxuegdetail = data
                console.log(data)
            })
        } else {
            $ionicPopup.alert({
                title: '错误提示',
                template: '您还未登陆'
            });
            $window.location.href = '#/sign_in'
        }

        $scope.xinDmg = {'comment': ''}

        $scope.xinComment = function () {
            console.log('aaaaa');
            var comment = {
                heartCircleId: $stateParams.id,
                remark: $scope.xinDmg.comment,
                accessToken: accesstoken
            }
            xinxuegMyRemark.save({}, comment, function (data) {
                console.log(data)
                if (data.status == 'suc') {
                    $window.location.reload()
                }
            })

        }

    }])
    .controller('patientCheckCtrl', ['$scope', 'patientCheckBindList', 'currentUser', 'acceptOrNot', function ($scope, patientCheckBindList, currentUser, acceptOrNot) {
        patientCheckBindList.query({accessToken: currentUser.getAuthToken()}, function (data) {
            $scope.data = data
            console.log(data)
        })
        $scope.accept = function () {
            var msg = {
                id: $scope.data[0].id,
                acceptOrNot: 1,
                accessToken: currentUser.getAuthToken()
            }
            acceptOrNot.save({}, msg, function (data) {
                console.log(data)
            })
        }
        $scope.noaccept = function () {
            //$scope.data.splice($scope.data.indexOf($scope.data), 1);
        }
    }])
    //患者列表
    .controller('patientListCtrl', ['$scope', 'patientBindList', 'patientCheckBindList', 'currentUser','mineInfo','bindinfo', function ($scope, patientBindList, patientCheckBindList, currentUser,mineInfo,bindinfo) {
        var accesstoken = currentUser.getAuthToken()
        patientCheckBindList.query({accessToken: accesstoken}, function (data) {
            $scope.datacheck = data
            var num = 0
            for (var i = 0; i < data.length; i++) {
                if (data[i].checked == 0) {
                    num++
                }
            }
            $scope.nochecknum = num
            console.log($scope.nochecknum)
        })

        patientBindList.query({accessToken: accesstoken}, function (data) {
            $scope.data = data
            console.log($scope.data)
        })
        mineInfo.query({accessToken:accesstoken}, function (rihuo) {
            var msg = {
                id: rihuo.id,
            }
            bindinfo.query(msg, function (count) {
                $scope.count = count
                console.log(count)
            })
        })
    }])


    //我的收藏列表
    .controller('myCollectionListCtrl', ['$scope', 'collectionList', 'currentUser', function ($scope, collectionList, currentUser) {
        var accesstoken = currentUser.getAuthToken()
        collectionList.query({accessToken: accesstoken}, function (data) {
            $scope.data = data
            console.log(data)
        })
    }])
    //添加反馈
    .controller('feedBackCtrl', ['$scope', 'feedBack', 'currentUser', '$ionicPopup', '$window', '$timeout', function ($scope, feedBack, currentUser, $ionicPopup, $window, $timeout) {
        var accesstoken = currentUser.getAuthToken()

        $scope.fbInfo = {'content': '', 'contact': ''}
        $scope.release = function () {
            var info = {
                content: $scope.fbInfo.content,
                accessToken: accesstoken,
                contact: $scope.fbInfo.contact
            }
            feedBack.save({}, info, function (data) {
                if (data.status = 'suc') {
                    var popup = $ionicPopup.alert({
                        title: '评论成功',
                        template: '感谢您的大力支持,3秒后跳转'
                    })
                    $timeout(function () {
                        popup.close()
                        $window.location.href = '#/tab/mine'
                    }, 3000)
                } else {
                    var popup = $ionicPopup.alert({
                        title: '未知错误'
                    })
                }
            })
        }
    }])

//我的患者详情
    .controller('patientDetailCtrl', ['$scope','$ionicPopup','$window','$timeout','delMyPatient', 'patientDetail', 'currentUser', '$stateParams', function ($scope,$ionicPopup,$window,$timeout, delMyPatient,patientDetail, currentUser, $stateParams) {
        var accesstoken = currentUser.getAuthToken()
        var params = {
            id: $stateParams.id,
            accessToken: accesstoken,
            patientId: $stateParams.id
        }
        patientDetail.query(params, function (data) {
            $scope.data = data
            console.log(data)
        })
        $scope.delPatient = function(userid){
            delMyPatient.save({accessToken:accesstoken,patientId:userid},function(data){
                if (data.status = 'suc') {
                    var popup = $ionicPopup.alert({
                        title: '解绑成功',
                        template: '你们已经不是好友啦'
                    })
                    $timeout(function () {
                        popup.close()
                        $window.history.back()
                    }, 3000)
                } else {
                    var popup = $ionicPopup.alert({
                        title: '未知错误'
                    })
                }
            })
        }
    }])

    //更改头像
.controller('myIconChangeCtrl', ['$scope', 'updateIcon', 'currentUser','$ionicPopup','$window','$timeout', function ($scope, updateIcon, currentUser,$ionicPopup,$window,$timeout) {

        $scope.xinxuegimage = {
            imageBase64s: '',
        };
        $scope.xinxuegRelease = function (publishphoto) {
            $scope.xinxuegimage.imageBase64s = publishphoto[0].dataURL
            var msg = {
                imageBase64s: $scope.xinxuegimage.imageBase64s,
                accessToken: currentUser.getAuthToken()
            }
            updateIcon.save(msg, function (data) {
                console.log(data)
                if(data.status == 'suc'){
                    var popup = $ionicPopup.alert({
                        title: '头像更换成功',
                        template: '3秒钟后返回'
                    })
                    $timeout(function () {
                        popup.close()
                        $window.history.back();
                    }, 3000)
                }else{
                    var popup = $ionicPopup.alert({
                        title: '错误',
                        template: '请不要上传过大或无效的头像'
                    })
                }
            })
        }
    }])
    //医生认证
    .controller('doctorVerifyCtrl', ['$scope', 'updateVerifyMsg', 'currentUser', function ($scope, updateVerifyMsg, currentUser) {

    }])

    //绑定我的患者
    .controller('patientAddCtrl', ['$window', '$scope', 'patientadd', 'currentUser', '$ionicPopup', '$stateParams', function ($window, $scope, patientadd, currentUser, $ionicPopup, $stateParams) {
        var accesstoken = currentUser.getAuthToken()
        $scope.invite = {'mobile': '',}
        $scope.Invite = function () {
            var params = {
                accessToken: accesstoken,
                mobile: $scope.invite.mobile

            }
            patientadd.save(params, function (data) {
                $scope.data = data
                if (data.status == 'suc') {
                    $window.history.back()
                } else {
                    $ionicPopup.alert({
                        title: '提示',
                        template: data.error
                    });
                    $window.history.back()
                }
                console.log(data)
            })
        }
    }])

 //   心血管圈发表
 .controller('xinxuegRemarkCtrl', ['$scope','$window','$ionicPopup', 'xinxuegRemark', 'currentUser', function ($scope,$window,$ionicPopup, xinxuegRemark, currentUser) {
        $scope.xinxueg = {
            content:''
        }

        $scope.xinxuegimage = {
            imageBase64s: '',
        };
        $scope.xinxuegRelease = function (publishphoto) {
            $scope.xinxuegimage.imageBase64s = publishphoto[0].dataURL
            var msg = {
                content:$scope.xinxueg.content,
                imageBase64s: $scope.xinxuegimage.imageBase64s,
                //imageBase64s1: $scope.xinxuegimage.imageBase64s,
                accessToken: currentUser.getAuthToken()
            }
            console.log(msg)
            xinxuegRemark.save(msg, function (data) {
                 if (data.status == 'suc') {
                    $window.history.back()
                } else {
                    $ionicPopup.alert({
                        title: '提示',
                        template: data.error
                    });
                    $window.history.back()
                }
                console.log(data)
            })
        }
    }])
