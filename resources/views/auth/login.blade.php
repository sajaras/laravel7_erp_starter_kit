<!DOCTYPE html>
<html lang="en">

<head>
    <?php
    $assetpath = '/theme/assets/';
    $rapidev_erp_jquery_v1_path = '/rapidev_erp_jquery_v1';
    ?>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, shrink-to-fit=no">
    <title>SignIn Cover | CORK - Multipurpose Bootstrap Dashboard Template </title>

    <link rel="icon" type="image/x-icon" href="{{URL::asset($assetpath .'favicon.ico')}}" />
    <link href="{{URL::asset($assetpath .'loader_dark.css')}}" rel="stylesheet" type="text/css" />
    <link href="{{URL::asset($assetpath .'loader_light.css')}}" rel="stylesheet" type="text/css" />
    <script src="{{URL::asset($assetpath .'loader.js')}}"></script>
    <!-- BEGIN GLOBAL MANDATORY STYLES -->
    <link href="{{URL::asset($assetpath .'css3d.css')}}" rel="stylesheet">
    <link href="{{URL::asset($assetpath .'structure_dark.css')}}" rel="stylesheet" type="text/css" />
    <link href="{{URL::asset($assetpath .'structure_light.css')}}" rel="stylesheet" type="text/css" />

    <link href="{{URL::asset($assetpath .'main_light.scss')}}" rel="stylesheet" type="text/css" />
    <link href="{{URL::asset($assetpath .'bootstrap.min.css')}}" rel="stylesheet" type="text/css" />
    <link href="{{URL::asset($assetpath .'plugins_dark.css')}}" rel="stylesheet" type="text/css" />
    <link href="{{URL::asset($assetpath .'plugins_light.css')}}" rel="stylesheet" type="text/css" />
   
    <link href="{{URL::asset($assetpath .'apexcharts.css')}}" rel="stylesheet" type="text/css">
    <link href="{{URL::asset($assetpath .'list-group_light.css')}}" rel="stylesheet" type="text/css">
    <link href="{{URL::asset($assetpath .'dash_2_light.css')}}" rel="stylesheet" type="text/css" />

    <link href="{{URL::asset($assetpath .'list-group_dark.css')}}" rel="stylesheet" type="text/css">
    <link href="{{URL::asset($assetpath .'dash_2_dark.css')}}" rel="stylesheet" type="text/css" />

    <link href="{{URL::asset($assetpath .'auth-cover_light.css')}}" rel="stylesheet" type="text/css" />
    <link href="{{URL::asset($assetpath .'auth-cover_dark.css')}}" rel="stylesheet" type="text/css" />

    <link href="{{URL::asset($rapidev_erp_jquery_v1_path .'/jquery-ui-1.12.1/jquery-ui.min.css')}}" rel="stylesheet" type="text/css" />
    
    

        

</head>

<body class="form">

    <!-- BEGIN LOADER -->
    <div id="load_screen">
        <div class="loader">
            <div class="loader-content">
                <div class="spinner-grow align-self-center"></div>
            </div>
        </div>
    </div>
    <!--  END LOADER -->

    <div class="auth-container d-flex">

        <div class="container mx-auto align-self-center">

            <div class="row">

                <div class="col-6 d-lg-flex d-none h-100 my-auto top-0 start-0 text-center justify-content-center flex-column">
                    <div class="auth-cover-bg-image"></div>
                    <div class="auth-overlay"></div>

                    <div class="auth-cover">

                        <div class="position-relative">

                            <img src="https://designreset.com/cork/html/src/assets/img/auth-cover.svg" alt="auth-img">

                            <h2 class="mt-5 text-white font-weight-bolder px-2">Join the community of expert developers</h2>
                            <p class="text-white px-2">It is easy to setup with great customer experience. Start your 7-day free trial</p>
                        </div>

                    </div>

                </div>

                <div class="col-xxl-4 col-xl-5 col-lg-5 col-md-8 col-12 d-flex flex-column align-self-center ms-lg-auto me-lg-0 mx-auto">
                    <div class="card">
                        <div class="card-body">
                            <form id="loginForm">


                                <div class="row">
                                    <div class="col-md-12 mb-3">

                                        <h2>Sign In</h2>
                                        <p>Enter your email and password to login</p>
                                        <p class="text-danger" id="errorMessage"> </p>

                                    </div>
                                    <div class="col-md-12">
                                        <div class="mb-3">
                                            <label class="form-label">Email</label>
                                            <input type="email" name="username" class="form-control">
                                        </div>
                                    </div>
                                    <div class="col-12">
                                        <div class="mb-4">
                                            <label class="form-label">Password</label>
                                            <input type="text" class="form-control" name="password">
                                        </div>
                                    </div>
                                    <div class="col-12">
                                        <div class="mb-3">
                                            <div class="form-check form-check-primary form-check-inline">
                                                <input class="form-check-input me-3" type="checkbox" id="form-check-default">
                                                <label class="form-check-label" for="form-check-default">
                                                    Remember me
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-12">
                                        <div class="mb-4">
                                            <button type="button" onclick="login();" class="btn btn-secondary w-100">SIGN IN</button>
                                        </div>
                                    </div>

                                    <div class="col-12 mb-4">
                                        <div class="">
                                            <div class="seperator">
                                                <hr>
                                                <div class="seperator-text"> <span>Or continue with</span></div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-sm-4 col-12">
                                        <div class="mb-4">
                                            <button class="btn  btn-social-login w-100 ">
                                                <img src="https://designreset.com/cork/html/src/assets/img/google-gmail.svg" alt="" class="img-fluid">
                                                <span class="btn-text-inner">Google</span>
                                            </button>
                                        </div>
                                    </div>

                                    <div class="col-sm-4 col-12">
                                        <div class="mb-4">
                                            <button class="btn  btn-social-login w-100">
                                                <img src="https://designreset.com/cork/html/src/assets/img/github-icon.svg" alt="" class="img-fluid">
                                                <span class="btn-text-inner">Github</span>
                                            </button>
                                        </div>
                                    </div>

                                    <div class="col-sm-4 col-12">
                                        <div class="mb-4">
                                            <button class="btn  btn-social-login w-100">
                                                <img src="https://designreset.com/cork/html/src/assets/img/twitter.svg" alt="" class="img-fluid">
                                                <span class="btn-text-inner">Twitter</span>
                                            </button>
                                        </div>
                                    </div>

                                    <div class="col-12">
                                        <div class="text-center">
                                            <p class="mb-0">Dont't have an account ? <a href="javascript:void(0);" class="text-warning">Sign Up</a></p>
                                        </div>
                                    </div>

                                </div>

                        </div>
                    </div>
                </div>

            </div>

        </div>

    </div>

    </form>


    <script src="{{URL::asset($assetpath .'bootstrap.bundle.min.js')}}"></script>
    <script src="{{URL::asset($rapidev_erp_jquery_v1_path .'/jquery-3.2.1.min.js')}}"></script>
    <script src="{{URL::asset($rapidev_erp_jquery_v1_path .'/ajaxrequests.js')}}"></script>
    <script src="{{URL::asset($rapidev_erp_jquery_v1_path .'/main.js')}}"></script>
    
    <script>




$(document).ready(function () {
   checkLogin();
});


        function login() {
            var loginForm = $("#loginForm")[0];
            var formData = new FormData(loginForm);
            var appenddata = {};
            appenddata.client_id = 1;
            appenddata.grant_type = 'password';
            appenddata.client_secret = "RaYpJzG5DOdEkgCiTjbfiyqJr2itbhp39TCpdQGa";
            appenddata.scope = '';

          
            ajax_request_form({errorhandle:"manual",formid:'#loginForm',url:'/oauth/token',appenddata:appenddata,errorcallback:function(response)
                {
                    if(response.status == 400 && response.responseJSON.error == "invalid_grant")
                    {   
                        $("#errorMessage").text(response.responseJSON.error_description);
                        
                    }
                    
            }},function(result){

                   if(result.access_token)
                   {
                    setCookie('access_token',result.access_token,result.expires_in);
                    checkLogin();

                   }
                    
            });
        }

       
    </script>

</body>

</html>