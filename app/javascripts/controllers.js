angular.module('medicine.controllers', [])
    .controller('doctorHomeCtrl', ['$scope', '$window', 'getCarouselList', 'currentUser', 'healthLecture', function ($scope, $window, getCarouselList, currentUser,healthLecture) {
        getCarouselList.query({type:1,category:1},function (data) {
            $scope.data = data
            console.log($scope.data)
        })
        healthLecture.query(function(data){
            $scope.healthLecture = data.heart_knowledge
        })
        $scope.goToActivity = function (activity) {
            $window.location.href = activity
        }
        $scope.isLogin = currentUser.hasAuthToken()

        $scope.goLogin = function(){
            if (!$scope.isLogin){
                $window.location.href = '#/sign_in'
            }else{
                $window.location.href = '#/analysis'
            }
        }
    }])

//医生注册
    .controller('doctorSignUpCtrl', ['$scope', '$ionicPopup', 'getVerificationCode', 'createUser', '$timeout', '$window', 'currentUser', function ($scope, $ionicPopup, getVerificationCode, createUser, $timeout, $window, currentUser) {
        //用户注册模块
        var reg = /^0?1[3|4|5|7|8][0-9]\d{8}$/
        $scope.account = {phoneNum: '', verCode: '', password: ''}
        $scope.getVerificationCode = function () {
            getVerificationCode.query({mobile: $scope.account.phoneNum}, function (data) {
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
        $scope.goLogin = function(){
            $scope.isLogin = currentUser.hasAuthToken()
            if (!$scope.isLogin){
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
                $window.location.href = '#/'
            }, 3000)
        }
    }])
    .controller('doctorEndMedicineDetailCtrl',['$scope','getCarouselList','$stateParams',function($scope, getCarouselList, $stateParams){
        getCarouselList.query({id:$stateParams.id},function(data){
            console.log(data)
        })
    }])

    .controller('doctorEndMineCtrl', ['$scope','mineInfo','currentUser','checkLogin','$window','$ionicPopup',function ($scope,mineInfo,currentUser,checkLogin,$window,$ionicPopup) {

        $scope.ischeck = !!checkLogin.check()

        var accesstoken = currentUser.getAuthToken()
        mineInfo.query({accessToken:accesstoken},function(data){
            $scope.infodata = data
            console.log(data)
        })

        $scope.letugo = function(){

            if (accesstoken){
                $window.location.href = '#/mine_info'
            }else{
                $window.location.href = '#/sign_in'
            }
        }


    }])

    //.controller('changeMsgCtrl', ['$scope', 'currentUser', '$window', '$ionicPopup', '$timeout','updateMsg', function ($scope, currentUser, $window, $ionicPopup, $timeout,changeName) {


    .controller('changeCtrl',['$scope', 'updateMsg', 'currentUser', '$ionicPopup', '$window', '$timeout', 'patientProfile', function ($scope, updateMsg, currentUser, $ionicPopup, $window, $timeout, patientProfile) {
        $scope.patientData = {
            birthday: '',
            weight: '',
            name: '',
            agender:''
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
            console.log(saveMsg);
            updateMsg.save({}, saveMsg, function (data) {
                if (data.status == 'suc') {
                    var popup = $ionicPopup.alert({
                        title: '您的信息修改成功',
                        template: '3秒后自动进入主页'
                    })
                    $timeout(function () {
                        popup.close()
                        $window.location.href = '#/mine_info'
                    }, 3000)
                }
                else {
                    $window.location.href = '#/'
                }
            })
        }
    }])

    .controller('mineInfoCtrl', ['$scope', '$window', 'mineInfo', 'currentUser', function ($scope, $window, mineInfo, currentUser) {
        var accesstoken = currentUser.getAuthToken()
        mineInfo.query({accessToken:accesstoken},function(data){
            $scope.infodata = data
            console.log(data)
        })

    }])
