angular.module('medicine', ['ionic', 'medicine.controllers', 'medicine.services', 'medicine.directive', 'medicine.filters', 'angular-carousel', 'ionic-datepicker', 'LocalStorageModule'])
    .constant('ionicLoadingConfig', {
        template: "<ion-spinner icon='ripple' class='spinner-energized'></ion-spinner>", /*正在加载中...*/
        hideOnStateChange: true
    })
    //.constant('SERVER', 'http://123.56.184.184:8080/hospital')
    .constant('SERVER', 'http://192.168.20.173:8080/hospital')
    .config(function ($ionicConfigProvider) {
        $ionicConfigProvider.tabs.position('bottom')
        $ionicConfigProvider.navBar.alignTitle('center')
        $ionicConfigProvider.views.maxCache(0);
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
                        controller: 'doctorHomeCtrl'
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
                        templateUrl: "templates/mine.html",
                        controller: 'doctorEndMineCtrl'
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
                        templateUrl: "templates/msgrecord_tab.html",
                        controller:'msgRecordCtrl'
                    }
                }
            })
            //我的患者
            .state('patienttabs.patientlist', {
                url: "/patientlist",
                views: {
                    'patientlist-tab': {
                        templateUrl: "templates/patientlist_tab.html",
                        controller: 'patientListCtrl'
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
                controller: 'doctorSignInCtrl'
            })
            // 注册
            .state('sign_up', {
                url: "/sign_up",
                templateUrl: "templates/sign_up.html",
                controller: 'doctorSignUpCtrl'
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
                templateUrl: "templates/mycollection.html",
                controller:'myCollectionListCtrl'
            })
            //意见反馈
            .state('feedback', {
                url: "/feedback",
                templateUrl: "templates/feedback.html",
                controller:'feedBackCtrl'
            })
            //个人资料
            .state('mine_info', {
                url: "/mine_info",
                templateUrl: "templates/mine_info.html",
                controller: 'mineInfoCtrl'
            })
            //病例精析
            .state('analysis', {
                url: "/analysis",
                templateUrl: "templates/analysis.html",
                controller: 'analysisCtrl'
            })
            //病例精析详情
            .state('analysis_detail', {
                url: "/analysis_detail/:id",
                templateUrl: "templates/analysis_detail.html",
                controller: 'analysisDetailCtrl'

            })

            //医疗动态
            .state('medical', {
                url: "/medical",
                templateUrl: "templates/medical.html",
                controller: 'medicalCtrl'
            })
            //医疗动态详情
            .state('medical_detail', {
                url: "/medical_detail/:id",
                templateUrl: "templates/medical_detail.html",
                controller: "medicalDetailCtrl"
            })
            //心血管圈
            .state('xinxueg', {
                url: "/xinxueg",
                templateUrl: "templates/xinxueg.html",
                controller: 'xinxuegCtrl'
            })
            //发表心血管圈消息
            .state('xinxueg_release', {
                url: "/xinxueg_release",
                templateUrl: "templates/xinxueg_release.html",
                controller:'xinxuegRemarkCtrl'
            })
            //心血管圈详情
            .state('xinxueg_detail', {
                url: "/xinxueg_detail/:id",
                templateUrl: "templates/xinxueg_detail.html",
                controller: 'xinxuegDetailCtrl'
            })
            //轻松一刻
            .state('relaxed', {
                url: "/relaxed",
                templateUrl: "templates/relaxed.html",
                controller: "relaxedCtrl"
            })
            //轻松一刻详情
            .state('relaxed_detail', {
                url: "/relaxed_detail/:id",
                templateUrl: "templates/relaxed_detail.html",
                controller: "relaxedDetailCtrl"
            })
            //我的二维码
            .state('myqrcode', {
                url: "/myqrcode",
                templateUrl: "templates/myqrcode.html"
            })
            //new患者验证
            .state('patient_check', {
                url: "/patient_check",
                templateUrl: "templates/patient_check.html",
                controller: "patientCheckCtrl"
            })
            //已绑定患者详情
            .state('patient_detail', {
                url: "/patient_detail/:id",
                templateUrl: "templates/patient_detail.html",
                controller:'patientDetailCtrl'
            })
            //添加患者
            .state('patient_add', {
                url: "/patient_add",
                templateUrl: "templates/patient_add.html",
                controller:'patientAddCtrl'
            })

            //我的公告
            .state('gonggao', {
                url: "/gonggao/:id",
                templateUrl: "templates/gonggao.html",
                controller:'gongGaoListCtrl'
            })
            //发布公告
            .state('gonggao_release', {
                url: "/gonggao_release",
                templateUrl: "templates/gonggao_release.html",
                controller:'gongGaoReleaseCtrl'
            })

            //关于我们
            .state('about', {
                url: '/about',
                templateUrl: 'templates/about.html'
            })
            //积分规则
            .state('point_rule', {
                url: '/point_rule',
                templateUrl: 'templates/point_rule.html'
            })
            //二期内容
            .state('two', {
                url: "/two",
                templateUrl: "templates/two.html"
            })
            .state('changeicon', {
                url: "/changeicon",
                templateUrl: "templates/changeicon.html",
                controller: 'myIconChangeCtrl'
            })

            .state('doctorverify', {
                url: "/doctorverify",
                templateUrl: "templates/doctorverify.html",
                controller: 'doctorVerifyCtrl'
            })
            .state('changename', {
                url: "/changename",
                templateUrl: "templates/changename.html",
                controller: 'changeCtrl'
            })
            .state('changesex', {
                url: "/changesex",
                templateUrl: "templates/changesex.html",
                controller: 'changeCtrl'
            })
            .state('changebirth', {
                url: "/changebirth",
                templateUrl: "templates/changebirth.html",
                controller: 'changeCtrl'
            })
            .state('changeyy', {
                url: "/changeyy",
                templateUrl: "templates/changeyy.html",
                controller: 'changeCtrl'
            })
            .state('changezc', {
                url: "/changezc",
                templateUrl: "templates/changezc.html",
                controller: 'changeCtrl'
            })
            .state('changeks', {
                url: "/changeks",
                templateUrl: "templates/changeks.html",
                controller: 'changeCtrl'
            })
        $urlRouterProvider.otherwise("/tab/home");
    })
