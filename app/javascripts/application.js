angular.module('medicine', ['ionic', 'medicine.controllers', 'medicine.services',  'medicine.filters', 'angular-carousel', 'ionic-datepicker', 'LocalStorageModule'])
    .constant('ionicLoadingConfig', {
        template: "<ion-spinner icon='ripple' class='spinner-energized'></ion-spinner>",/*正在加载中...*/
        hideOnStateChange: true
    })
    .constant('SERVER', 'http://112.126.83.112:8080/hospital')
    .config(function ($ionicConfigProvider) {
        $ionicConfigProvider.tabs.position('bottom')
        $ionicConfigProvider.navBar.alignTitle('center')
        $ionicConfigProvider.views.maxCache(0);
        $ionicConfigProvider.backButton.text('Go Back').icon('ion-chevron-left');
    })

    //.config(function ($ionicConfigProvider) {
    //    $ionicConfigProvider.tabs.position('bottom')
    //    $ionicConfigProvider.navBar.alignTitle('center')
    //    $ionicConfigProvider.backButton.text('Go Back').icon('ion-chevron-left');
    //})

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
                        controller:'doctorHomeCtrl'
                    }
                }
            })
            //我的患者
            .state('tabs.patient', {
                url: "/patient",
                views: {
                    'patient-tab': {
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

            .state('patienttabs', {
                url: "/pat",
                templateUrl: "templates/patient.html"
            })
            //消息记录
            .state('patienttabs.msgrecord', {
                url: "/msgrecord",
                views: {
                    'msgrecord-tab': {
                         templateUrl: "templates/msgrecord_tab.html"
                    }
                }
            })
            //我的患者
            .state('patienttabs.patientlist', {
                url: "/patientlist",
                views: {
                    'patientlist-tab': {
                        templateUrl: "templates/patientlist_tab.html"
                    }
                }
            })
            //患者数据
            .state('patienttabs.patientdata', {
                url: "/patientdata",
                views: {
                    'patientdata-tab': {
                        templateUrl: "templates/patientdata_tab.html"
                    }
                }
            })




            // 登陆
            .state('sign_in', {
                url: "/sign_in",
                templateUrl: "templates/sign_in.html",
                controller:'doctorSignInCtrl'
            })
            // 注册
            .state('sign_up', {
                url: "/sign_up",
                templateUrl: "templates/sign_up.html",
                controller:'doctorSignUpCtrl'
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
                templateUrl: "templates/setting.html",
                controller: "doctorEndSettingCtrl"
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
            .state('analysis_detail', {
                url: "/analysis_detail",
                templateUrl: "templates/analysis_detail.html"
            })

            //医疗动态
            .state('medical', {
                url: "/medical/:id",
                templateUrl: "templates/medical.html"
            })
            //医疗动态详情
            .state('medical_detail', {
                url: "/medical_detail/:id",
                templateUrl: "templates/medical_detail.html",
                controller: "doctorEndMedicineDetailCtrl"
            })
            //心血管圈
            .state('xinxueg', {
                url: "/xinxueg",
                templateUrl: "templates/xinxueg.html"
            })
            //发表心血管圈消息
            .state('xinxueg_release', {
                url: "/xinxueg_release",
                templateUrl: "templates/xinxueg_release.html"
            })
            //心血管圈详情
            .state('xinxueg_detail', {
                url: "/xinxueg_detail",
                templateUrl: "templates/xinxueg_detail.html"
            })
            //轻松一刻
            .state('relaxed', {
                url: "/relaxed",
                templateUrl: "templates/relaxed.html"
            })
            //轻松一刻详情
            .state('relaxed_detail', {
                url: "/relaxed_detail",
                templateUrl: "templates/relaxed_detail.html"
            })
            //我的二维码
            .state('myqrcode', {
                url: "/myqrcode",
                templateUrl: "templates/myqrcode.html"
            })
            //new患者验证
            .state('patient_check', {
                url: "/patient_check",
                templateUrl: "templates/patient_check.html"
            })
            //已绑定患者详情
            .state('patient_detail', {
                url: "/patient_detail",
                templateUrl: "templates/patient_detail.html"
            })
            //添加患者
            .state('patient_add', {
                url: "/patient_add",
                templateUrl: "templates/patient_add.html"
            })

            //我的公告
            .state('gonggao', {
                url: "/gonggao",
                templateUrl: "templates/gonggao.html"
            })
            //发布公告
            .state('gonggao_release', {
                url: "/gonggao_release",
                templateUrl: "templates/gonggao_release.html"
            })

            //关于我们
            .state('about',{
                url:'/about',
                templateUrl:'templates/about.html'
            })
            //积分规则
            .state('point_rule',{
                url:'/point_rule',
                templateUrl:'templates/point_rule.html'
            })
            //二期内容
            .state('two', {
                url: "/two",
                templateUrl: "templates/two.html"
            })
        $urlRouterProvider.otherwise("/tab/home");
    })
