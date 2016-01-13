angular.module('medicine', ['ionic'])

    .config(function ($ionicConfigProvider) {
        $ionicConfigProvider.tabs.position('bottom')
        $ionicConfigProvider.navBar.alignTitle('center')
        $ionicConfigProvider.backButton.text('Go Back').icon('ion-chevron-left');
    })

    .config(function ($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('tabs', {
                url: "/tab",
                abstract: true,
                templateUrl: "templates/tabs.html"
            })
            .state('tabs.home', {
                url: "/home",
                views: {
                    'home-tab': {
                        templateUrl: "templates/home.html",
                    }
                }
            })
            //我的患者
            .state('tabs.patient', {
                url: "/patient",
                views: {
                    'discover-tab': {
                        templateUrl: "templates/patient.html"
                    }
                }
            })
            .state('tabs.mine', {
                url: "/mine",
                views: {
                    'mine-tab': {
                        templateUrl: "templates/mine.html"
                    }
                }
            })
            /*
            .state('patienttabs', {
                url: "/patient",
                abstract: true,
                templateUrl: "templates/patient.html"
            })
            .state('patienttabs.', {
                url: "/msgrecode",
                views: {
                    'msgrecode-tab': {
                    }
                }
            })
            //我的患者
            .state('patienttabs.patientlist', {
                url: "/patientlist",
                views: {
                    'patientlist-tab': {
                        templateUrl: "templates/patient_list.html"
                    }
                }
            })
            .state('patienttabs.datapatient', {
                url: "/datapatient",
                views: {
                    'datapatient-tab': {
                        templateUrl: "templates/data_patient.html"
                    }
                }
            })
            */

            // 登陆
            .state('login', {
                url: "/login",
                templateUrl: "templates/login.html"
            })
            // 注册
            .state('register', {
                url: "/register",
                templateUrl: "templates/register.html"
            })
            //忘记密码
            .state('forgot_pwd', {
                url: "/forgot_pwd",
                templateUrl: "templates/forgot_pwd.html"
            })
            //重置密码
            .state('reset_pwd', {
                url: "/reset_pwd",
                templateUrl: "templates/reset_pwd.html"
            })
            //设置
            .state('setting', {
                url: "/setting",
                templateUrl: "templates/setting.html"
            })
            // my collection
            .state('mycollection', {
                url: "/mycollection",
                templateUrl: "templates/mycollection.html"
            })
            //意见反馈
            .state('feedback', {
                url: "/feedback",
                templateUrl: "templates/feedback.html"
            })
            //个人资料
            .state('mine_info', {
                url: "/mine_info",
                templateUrl: "templates/mine_info.html"
            })
            //病例精析
            .state('analysis', {
                url: "/analysis",
                templateUrl: "templates/analysis.html"
            })
            //病例精析详情
            .state('dt_analysis', {
                url: "/dt_analysis",
                templateUrl: "templates/dt_analysis.html"
            })

            //医疗动态
            .state('medical', {
                url: "/medical",
                templateUrl: "templates/medical.html"
            })
            //医疗动态详情
            .state('dt_medical', {
                url: "/dt_medical",
                templateUrl: "templates/dt_medical.html"
            })
            //心血管圈
            .state('heartring', {
                url: "/heartring",
                templateUrl: "templates/heartring.html"
            })
            //发表心血管圈消息
            .state('at_heartring', {
                url: "/at_heartring",
                templateUrl: "templates/at_heartring.html"
            })
            //心血管圈详情
            .state('dt_heartring', {
                url: "/dt_heartring",
                templateUrl: "templates/dt_heartring.html"
            })
            //轻松一刻
            .state('relaxed', {
                url: "/relaxed",
                templateUrl: "templates/relaxed.html"
            })
            //轻松一刻详情
            .state('dt_relaxed', {
                url: "/dt_relaxed",
                templateUrl: "templates/dt_relaxed.html"
            })
            //我的二维码
            .state('myqrcode', {
                url: "/myqrcode",
                templateUrl: "templates/myqrcode.html"
            })

            //患者列表
            .state('patient_list', {
                url: "/patient_list",
                templateUrl: "templates/patient_list.html"
            })
            //new患者验证
            .state('new_patient', {
                url: "/new_patient",
                templateUrl: "templates/new_patient.html"
            })
            //已绑定患者详情
            .state('dt_patient', {
                url: "/dt_patient",
                templateUrl: "templates/dt_patient.html"
            })
            //添加患者
            .state('add_patient', {
                url: "/add_patient",
                templateUrl: "templates/add_patient.html"
            })
            //患者数据
            .state('data_patient', {
                url: "/data_patient",
                templateUrl: "templates/data_patient.html"
            })
            //我的公告
            .state('classifieds', {
                url: "/classifieds",
                templateUrl: "templates/classifieds.html"
            })
            //发布公告
            .state('at_classifieds', {
                url: "/at_classifieds",
                templateUrl: "templates/at_classifieds.html"
            })
            //二期内容
            .state('two', {
                url: "/two",
                templateUrl: "templates/two.html"
            })
        $urlRouterProvider.otherwise("/tab/home");
    })
