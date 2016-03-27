angular.module('medicine', ['ionic', 'medicine.controllers', 'medicine.services', 'medicine.directive', 'medicine.filters', 'angular-carousel', 'ionic-datepicker', 'LocalStorageModule'])
    .constant('ionicLoadingConfig', {
        template: "<ion-spinner icon='ripple' class='spinner-energized'></ion-spinner>", /*正在加载中...*/
        hideOnStateChange: true,
    })
    //.constant('SERVER', 'http://work.e-care365.com/hospital')
    //.constant('SERVER', 'http://192.168.20.173:8080/hospital')
    .constant('SERVER', 'http://127.0.0.1:8080/hospital')
    .config(function ($ionicConfigProvider) {
        $ionicConfigProvider.tabs.position('bottom')
        $ionicConfigProvider.navBar.alignTitle('center')
        $ionicConfigProvider.views.maxCache(0);
        $ionicConfigProvider.backButton.text('Go Back').icon('ion-chevron-left');
    })

    //.config(function(localStorageServiceProvider){
    //    localStorageServiceProvider
    //        .setStorageType('sessionStorage')
    //        .setNotify(true, true)
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
                        controller: 'doctorHomeCtrl'
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



            .state('msgtab', {
                url: "/msgtab",
                templateUrl: "templates/msg.html"
            })

            .state('msgtab.msgrecord', {
                url: "/msgrecord",
                views: {
                    'msgrecord-tab': {
                        templateUrl: "templates/msgrecord_tab.html",
                        controller: 'msgRecordCtrl'
                    }
                }
            })

            .state('datatab', {
                url: "/datatab",
                templateUrl: "templates/data.html"
            })

            .state('datatab.patientdata', {
                url: "/patientdata",
                views: {
                    'patientdata-tab': {
                        templateUrl: "templates/patientdata_tab.html"
                    }
                }
            })
            .state('patienttabs', {
                url: "/pat",
                templateUrl: "templates/patient.html"
            })
            .state('patienttabs.patientlist', {
                url: "/patientlist",
                views: {
                    'patientlist-tab': {
                        templateUrl: "templates/patientlist_tab.html",
                        controller: 'patientListCtrl'
                    }
                }
            })
            .state('sign_in', {
                url: "/sign_in",
                templateUrl: "templates/sign_in.html",
                controller: 'doctorSignInCtrl'
            })
            .state('sign_up', {
                url: "/sign_up",
                templateUrl: "templates/sign_up.html",
                controller: 'doctorSignUpCtrlFlow'
            })
            .state('forgot_pwd', {
                url: "/forgot_pwd",
                templateUrl: "templates/forgot_pwd.html",
                controller: "forgotPwdCtrl"
            })

            .state('changepwd', {
                url: "/changepwd",
                templateUrl: "templates/reset_pwd.html",
                controller: "doctorEndChangePwdCtrl"
            })

            .state('setting', {
                url: "/setting",
                templateUrl: "templates/setting.html",
                controller: "doctorEndSettingCtrl"
            })
            .state('mycollection', {
                url: "/mycollection",
                templateUrl: "templates/mycollection.html",
                controller: 'myCollectionListCtrl'
            })
            .state('feedback', {
                url: "/feedback",
                templateUrl: "templates/feedback.html",
                controller: 'feedBackCtrl'
            })
            .state('mine_info', {
                url: "/mine_info",
                templateUrl: "templates/mine_info.html",
                controller: 'mineInfoCtrl'
            })
            .state('analysis', {
                url: "/analysis",
                templateUrl: "templates/analysis.html",
                controller: 'analysisCtrl'
            })
            .state('analysis_detail', {
                url: "/analysis_detail/:id",
                templateUrl: "templates/analysis_detail.html",
                controller: 'analysisDetailCtrl',
                resolve:{
                  delay: function($q) {
                  //   console.log('delay');
                  //  var deferred = $q.defer(),
                  //  load = function(){
                  //      console.log('load');
                  //      $q.getScript('http://f1.webshare.mob.com/code/mob-share.js?appkey=1009643115684',function(data, textStatus, jqxhr){
                  //        console.log(data);
                  //        deferred.resolve();
                  //      });
                  //  };
                  //  load();
                  //  return deferred.promise;
                  // $q.getScript('/a.js',function(){
                  //
                  //     return 'aa';
                  // });
                  return 'bb';
                 }
                }

            })

            .state('medical', {
                url: "/medical",
                templateUrl: "templates/medical.html",
                controller: 'medicalCtrl'
            })
            .state('medical_detail', {
                url: "/medical_detail/:id",
                templateUrl: "templates/medical_detail.html",
                controller: "medicalDetailCtrl"
            })
            .state('xinxueg', {
                url: "/xinxueg",
                templateUrl: "templates/xinxueg.html",
                controller: 'xinxuegCtrl'
            })
            .state('xinxueg_release', {
                url: "/xinxueg_release",
                templateUrl: "templates/xinxueg_release.html",
                controller: 'xinxuegRemarkCtrl'
            })
            .state('xinxueg_detail', {
                url: "/xinxueg_detail/:id",
                templateUrl: "templates/xinxueg_detail.html",
                controller: 'xinxuegDetailCtrl'
            })
            .state('relaxed', {
                url: "/relaxed",
                templateUrl: "templates/relaxed.html",
                controller: "relaxedCtrl"
            })
            .state('relaxed_detail', {
                url: "/relaxed_detail/:id",
                templateUrl: "templates/relaxed_detail.html",
                controller: "relaxedDetailCtrl"
            })
            .state('myqrcode', {
                url: "/myqrcode",
                templateUrl: "templates/myqrcode.html"
            })
            .state('patient_check', {
                url: "/patient_check",
                templateUrl: "templates/patient_check.html",
                controller: "patientCheckCtrl"
            })
            .state('patient_detail', {
                url: "/patient_detail/:id",
                templateUrl: "templates/patient_detail.html",
                controller: 'patientDetailCtrl'
            })
            .state('patient_add', {
                url: "/patient_add",
                templateUrl: "templates/patient_add.html",
                controller: 'patientAddCtrl'
            })

            .state('gonggao', {
                url: "/gonggao/:id",
                templateUrl: "templates/gonggao.html",
                controller: 'gongGaoListCtrl'
            })
            .state('gonggao_release', {
                url: "/gonggao_release",
                templateUrl: "templates/gonggao_release.html",
                controller: 'gongGaoReleaseCtrl'
            })

            .state('about', {
                url: '/about',
                templateUrl: 'templates/about.html'
            })
            .state('point_rule', {
                url: '/point_rule',
                templateUrl: 'templates/point_rule.html'
            })
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
            .state('addillhistory', {
                url: "/addillhistory/:userId",
                templateUrl: "templates/addillhistory.html",
                controller: 'addIllHistoryCtrl'
            })
            .state('addbeizhu', {
                url: "/addbeizhu/:userId",
                templateUrl: "templates/beizhu.html",
                controller: 'addBeizhuCtrl'
            })

            .state('chart', {
                url: "/chart/:userId",
                templateUrl: "templates/chart.html",
                controller: "Messages"
            })
            .state('xueshu', {
                url: "/xueshu",
                templateUrl: "templates/xueshu.html",
                controller: "xueshuCtrl"
            })
            .state('xueshu_detail',{
              url: "/xueshu_detail/:id",
              templateUrl: "templates/xueshu_detail.html",
              controller: "xueshuDetailCtrl"
            })
            .state('xueshu_baoming',{
              url: "/xueshu_baoming/:id",
              templateUrl: "templates/xueshu_baoming.html",
              controller: "xueshuBaomingCtrl"
            })
            .state('zhenhouxinde',{
              url: "/zhenhouxinde",
              templateUrl: "templates/zhenhouxinde.html",
              controller: "zhenhouxindeCtrl"
            })
            .state('zhenhouxinde_wode',{
              url: "/zhenhouxinde_wode",
              templateUrl: "templates/zhenhouxinde_wode.html",
              controller: "zhenhouxindeWodeCtrl"
            })
            .state('zhenhouxinde_fabiao',{
              url: "/zhenhouxinde_fabiao",
              templateUrl: "templates/zhenhouxinde_fabiao.html",
              controller: "zhenhouxindefabiaoCtrl"
            })
            .state('zhenhouxinde_bianji',{
              url: "/zhenhouxinde_bianji/:id",
              templateUrl: "templates/zhenhouxinde_bianji.html",
              controller: "zhenhouxindeBianjiCtrl"
            })
            .state('zhenhouxinde_details',{
              url: "/zhenhouxinde_details/:id",
              templateUrl: "templates/zhenhouxinde_details.html",
              controller: "zhenhouxindeDetailsCtrl"
            })

        $urlRouterProvider.otherwise("/tab/home");
    }).run(function($rootScope,currentUser,$ionicPopup,$window,$timeout){
      $rootScope.$on('$stateChangeSuccess',
          function(event, toState, toParams, fromState, fromParams){
            var forbit=['xueshu','zhenhouxinde'];
            for(i in forbit){
              console.log(forbit[i]);
              if(forbit[i]==toState.name){
                if(currentUser.getAuthToken()==null){
                  var popup = $ionicPopup.alert({
                      title: '错误提示',
                      template: '没有登录'
                  });
                  $timeout(function(){
                    popup.close();
                    $window.location.href="#/sign_in";
                  }, 1500);

                }
                break;
              }
            }


          if(toParams.id){
            // console.log(toState.url.replace(":id",toParams.id));
            _hmt.push(['_trackPageview', toState.url.replace(":id",toParams.id)]);
          }else{
            _hmt.push(['_trackPageview', toState.url]);
          }



          });
    });
