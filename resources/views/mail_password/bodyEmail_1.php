<!DOCTYPE html>
<html>
<head>
    <title></title>
    <meta name="viewport" content="width=device-width" />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
</head>

<style type="text/css">

    body {
        background-color: #EFEFEF;
        font-family: sans-serif;
        -webkit-font-smoothing: antialiased;
        font-size: 14px;
        line-height: 1.4;
        margin: 0;
        padding: 0;
        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
    }

    .body {

        background-color: #EFEFEF;
        width: 100%;
    }


    /* Set a max-width, and make it display as block so it will automatically stretch to that width, but will also shrink down on a phone or something */
    .container {
        display: block;
        margin: 0 auto !important;
        /* makes it centered */
        max-width: 580px;
        padding: 10px;
        width: 580px;
    }

    /* This should also be a block element, so that it will fill 100% of the .container */
    .content {
        box-sizing: border-box;
        display: block;
        margin: 0 auto;
        max-width: 580px;
        padding: 10px;
    }
    /* -------------------------------------
             HEADER, FOOTER, MAIN
         ------------------------------------- */
    .main {
        background: #EFEFEF;
        border-radius: 5px;
        width: 100%;
        margin: auto;
        text-align: center;
    }

    .wrapper {
        box-sizing: border-box;
        padding: 20px; }

    .content-block {
        padding-bottom: 10px;
        padding-top: 10px;
    }

    .footer {
        clear: both;
        margin-top: 10px;
        text-align: center;
        width: 100%;
    }

    .footer td,
    .footer p,
    .footer span,
    .footer a {
        color: #999999;
        font-size: 12px;
        text-align: center;
    }


    h1,
    h2,
    h3,
    h4 {
        color: #1769ff;
        font-family: sans-serif;
        font-weight: 400;
        line-height: 1.4;
        margin: 0;
        Margin-bottom: 30px;
    }

    h1 {
        font-size: 35px;
        font-weight: 300;
        text-align: center;
        text-transform: capitalize;
    }

    p,
    ul,
    ol {
        font-family: sans-serif;
        font-size: 14px;
        font-weight: normal;
        margin: 0;
        Margin-bottom: 15px;
    }
    p li,
    ul li,
    ol li {
        list-style-position: inside;
        margin-left: 5px;
    }

    a {
        color: #3498db;
        text-decoration: underline;
    }


    .greeting{

        color:#9d1c30 !important;

    }
    .bodys{

        /*color:#58595d;*/
    }

</style>

<body>

    <div style="text-align: center; margin-bottom: 25px;">

        <img src="http://encomaq.imnegocios.com/assets/image/LogoEncomaq-gris.png" alt="">

    </div>

    <div class="main" style="text-align: center;">

        <div style="width:80%; background:#EFEFEF; margin:0 auto; padding: 20px;">

            <?php

                $file = $_SERVER['PHP_SELF'];

                $file = str_replace('index.php', '', $file);
                $file = str_replace('/resetPassword', '', $file);

            ?>

            <div style="width:80%; background:white;margin:0 auto; ">

                <div style="padding: 0px 10px;">
                    <span style="margin-top: 50px;">
                        Para reiniciar su contraseña, haga click en el siguiente enlace
                        <br /><br /><br />
                        <a target="_blank" href="http://<?= $_SERVER['HTTP_HOST'] . $file ?>/changePassword/<?= $token ?>">Recuperar Contraseña</a>
                    </span>
                </div>


                <div style="padding: 0px 10px 10px;">
                    <h3 class="bodys"><b>En unos instantes le llegará un email con su contraseña nueva</b></h3>
                </div>

                <div style="padding: 0px 10px 10px; margin-bottom: 100px;">
                    <h3 class="bodys">Gracias <br> Apoyo tecnico de ENCOMAQ</h3>
                </div>

            </div>
            <!-- START FOOTER -->
            <div class="footer" >

                <div class="content-block" style="text-align:center">
                    <p class="greeting">Copyright &copy; 2012 - <?= date('Y'); ?> Todos los derechos reservados</p>
                </div>

            </div>
            <!-- END FOOTER -->


        </div>

    </div>


</body>
</html>