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
    <div class="row text-center">
        <h1>
        <?php
            echo $company[0]["tradename"];
        ?>
        </h1>
    </div>
    <div class="row text-center">
        <h3>
            Liquidación
        </h3>
    </div>
    
    <table class="table">
        <tr>
            <th>Fecha de Inicio</th>
            <td><?php echo $data[0]["dateinit"]; ?></td>
            <th>Fecha de Fin</th>
            <td><?php echo $data[0]["dateend"]; ?></td>
        </tr>
        <tr>
            <th>Observación</th>
            <td colspan="3"><?php echo $data[0]["observation"]; ?></td>
        </tr>
        <tr>
            <th>Cliente</th>
            <td colspan="3"><?php echo $data[0]["biz_referralguideliquidation"][0]["biz_referralguide"]["biz_contract"]["biz_client"]["businessname"]; ?></td>
        </tr>
    </table>
    
    <br/>

<?php

    foreach ($data[0]["biz_referralguideliquidation"] as $c) {

        echo "<table class='table table-bordered table-condensed table-striped '>";
            echo "<tr>";
                echo "<td colspan='4'></td>";
            echo "</tr>";    
            
            echo "<tr>";
                echo "<th>P. Partida</th><td>".$c["biz_referralguide"]["startingpoint"]."</td> <th>P. Llegada</th><td>".$c["biz_referralguide"]["arrivalpoint"]."</td>";
            echo "</tr>";

            echo "<tr>";
                echo "<th>ITEM</th> <th>CANT.</th> <th>PRECIO</th> <th>TOTAL</th> ";
            echo "</tr>";
            foreach ($c["biz_referralguide"]["biz_Referralguideitem"] as $i) {
                echo "<tr>";
                    echo "<td>".$i["biz_item"]["itemname"]."</td> <td>".$i["quantify"]."</td> <td>".$i["biz_item"]["price"]."</td> <td>". ($i["quantify"]*$i["biz_item"]["price"]) ."</td> ";
                echo "</tr>";
            }
        echo "</table>";
    }
?>
    <br/>
    <div class="row">
        <div class="col-xs-6">
        </div>
        <div class="col-xs-3">
        </div>
        <div class="col-xs-3 text-right">
            <table class=' table-condensed table-striped '>
                <tr>
                    <th>Subtotal</th>
                    <td><?php  echo $data[0]["subtotal"]; ?></td>
                </tr>
                <tr>
                    <th>Iva</th>
                    <td><?php  echo $data[0]["iva"]; ?></td>
                </tr>
                <tr>
                    <th>Total</th>
                    <td><?php  echo $data[0]["total"]; ?></td>
                </tr>
            </table>
        </div>
    </div>


  
</body>
</html>