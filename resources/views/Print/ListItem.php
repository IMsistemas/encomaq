<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
<style type="text/css">
	body{
            font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
            font-size: 11px;
        }

        .container {
            padding-right: 15px;
            padding-left: 15px;
            margin-right: auto;
            margin-left: auto;
            position: absolute;
        }

        .col-xs-3, .col-xs-6,  .col-xs-12 {
            position: relative;
            min-height: 1px;
            padding-right: 5px;
            padding-left: 5px;
        }

        /*.col-xs-3, .col-xs-6, .col-xs-12 {
            float: left;
        }*/

        .col-xs-12 {
            width: 100%;
        }

        .col-xs-6 {
            float: left;
            width: 50%;
        }

        .col-xs-3 {
            float: left;
            width: 25%;
        }

        .form-control {
            /*display: block;*/
            width: 100%;
            height: 20px;
            padding: 6px 12px;
            font-size: 14px;
            line-height: 1.42857143;
            color: #555;
            background-color: #fff;
            background-image: none;
            border: 1px solid #ccc;
            border-radius: 4px;
            -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
            box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
            -webkit-transition: border-color ease-in-out .15s, -webkit-box-shadow ease-in-out .15s;
            -o-transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
            transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;

            

        }

        .table {
            border-collapse: collapse !important;
        }
        .table td,
        .table th {
            background-color: #fff !important;
        }
        .table-bordered th,
        .table-bordered td {
            border: 1px solid #ddd !important;
        }

        .table {
            width: 100%;
            max-width: 100%;
            margin-bottom: 20px;
        }
        .table > thead > tr > th,
        .table > tbody > tr > th,
        .table > tfoot > tr > th,
        .table > thead > tr > td,
        .table > tbody > tr > td,
        .table > tfoot > tr > td {
            padding: 5px;
            line-height: 1.42857143;
            vertical-align: top;
            border-top: 1px solid #ddd;
        }
        .table > thead > tr > th {
            vertical-align: bottom;
            border-bottom: 2px solid #ddd;
        }

        .table-striped > tbody > tr:nth-of-type(odd) {
            background-color: #f9f9f9;
        }
        .text-right
		{
		    text-align: right !important;
		}

		.text-center
		{
		    text-align: center !important;
		}

		.text-left
		{
		    text-align: left !important;
		}
		.bg-primary{
		    background:#2F70A8 !important;
		}
		.bg-success{
		    background:#DFF0D8 !important;
		}
		.bg-warning{
		    background:#FCF8E3 !important;
		}
</style>    
</head>
<body>
<table class="table">
        <tr>
            <td style="vertical-align: center !important; border-top: 0px !important;">
                <br>
                <img src="<?php echo $company[0]["image"]; ?>" alt="">
            </td>
            <td class="text-right" style="border-top: 0px !important;">
                <h1>
                    <?php echo $company[0]["tradename"]; ?>
                </h1>
                <h3>
                    LISTADO DE ITEMS
                </h3>
            </td>
        </tr>
    </table>
    <table class="table table-bordered table-condensed">
        <thead>
            <tr>
                <th style="width: 8%;">NO</th>
                <th style="width: 10%;">IMAGEN</th>
                <th>ITEM</th>
                <th>DESCRIPCIÓN</th>
                <th>CATEGORIA</th>
                <th>UNIDAD</th>
                <th>LISTA PRECIO</th>
                <th  style="width: 12%;">ESTADO</th>
            </tr>
            <?php
                $x = 1;
                foreach ($data as $c) {
                    echo "<tr>";
                    echo "<td>".$x."</td>";
                    echo "<td>";

                    if(isset($c["image"]) && $c["image"]!=""  && $c["image"]!=null) {
                        //echo "<img src='".asset($c["image"])."' style='width: 100%;' />";
                        //echo "";
                        echo "<img src='".public_path(). '/' . $c["image"] ."' style='width: 100px;' />";
                        // echo public_path(). $c["image"];
                    } else {
                        echo "";
                    }

                    echo "</td>";

                    echo "<td>".$c["itemname"]."</td>";
                    echo "<td>".$c["description"]."</td>";
                    echo "<td>".$c["nom_category"]["categoryitemname"]."</td>";
                    echo "<td>".$c["nom_unit"]["unittypename"]."</td>";

                    echo "<td>";
                    foreach ($c["biz_itemprice"] as $element) {

                        echo '$ ' . $element['price'] . ' | ';

                    }
                    echo "</td>";

                    if ($c["state"] == 1) {
                        echo "<td>ACTIVO</td>";
                    } else {
                        echo "<td>INACTIVO</td>";
                    }
                    echo "</tr>";
                    $x++;
                }
            ?>
        </thead>
    </table>
</body>
</html>