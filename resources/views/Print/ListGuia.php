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
                    LISTADO DE GUIAS DE REMISION
                </h3>
            </td>
        </tr>
    </table>

    <table class="table table-bordered table-condensed">

        <tbody>

        <?php

        $nocontract = 0;

        $x = 1;
        foreach ($data as $c) {

            if ($nocontract != $c["biz_contract"]["nocontract"]){

                echo '<tr>';
                echo '<th colspan="9" style="text-align: center;">' . $c["biz_contract"]["nocontract"] . ' - ' . $c["biz_contract"]["biz_client"]['businessname']. '</th>';
                echo '</tr>';

                $nocontract = $c["biz_contract"]["nocontract"];
            }

            //------------------------------------------------------------------

            echo '<tr style="background-color: gray;">';
            echo '<th style="width: 5%;">NO</th>';
            echo '<th>NO. GUIA</th>';
            echo '<th style="width: 7%;">FECHA</th>';
            echo '<th style="width: 5%;">HORA</th>';
            echo '<th>MOTIVO</th>';
            echo '<th>P. PARTIDA</th>';
            echo '<th>P. LLEGADA</th>';
            echo '<th>TRANSPORTISTA</th>';
            echo '<th style="width: 6%;">ESTADO</th>';
            echo '</tr>';

            //------------------------------------------------------------------

            echo "<tr>";
            echo "<td>".$x."</td>";
            //echo "<td>".$c["biz_contract"]["nocontract"]."</td>";
            //echo "<td>".$c["biz_contract"]["biz_client"]["businessname"]."</td>";
            echo "<td>".$c["guidenumber"]."</td>";
            echo "<td>".$c["datetimereferral"]."</td>";
            echo "<td>".$c["sequential"]."</td>";

            echo "<td>".$c["nom_transferreason"]["transferreasonname"]."</td>";

            if ($c["nom_transferreason"]["idtypetransferreason"] == 1 || $c["nom_transferreason"]["idtypetransferreason"] == 3) {
                echo "<td>".$c["biz_warehouse"]['warehousename']."</td>";
                echo "<td>".$c["biz_project"]['projectname']."</td>";
            } else {
                echo "<td>".$c["biz_project"]['projectname']."</td>";
                echo "<td>".$c["biz_warehouse"]['warehousename']."</td>";
            }

            echo "<td>".$c["biz_carrier"]["carriername"]."</td>";
            if ($c["state"] == 1) {
                echo "<td>ACTIVO</td>";
            } else {
                echo "<td>INACTIVO</td>";
            }
            echo "</tr>";
            $x++;

            echo '<tr>';
            echo '<th>NO.</th>';
            echo '<th colspan="3">ITEM</th>';
            echo '<th>CANTIDAD</th>';
            echo '<th>PRECIO</th>';
            echo '<th colspan="3">OBSERVACION</th>';
            echo '</tr>';

            $y = 1;

            foreach ($c['biz_Referralguideitem'] as $item) {

                echo '<tr>';
                echo '<td>' . $y . '</td>';
                echo '<td colspan="3">' . $item['biz_item']['itemname'] . '</td>';
                echo '<td style="text-align: right;">' . $item['quantify'] . '</td>';
                echo '<td style="text-align: right;">$ ' . $item['biz_itemprice']['price'] . '</td>';
                echo '<td colspan="3">' . $item['observation'] . '</td>';
                echo '</tr>';

                $y++;
            }

            echo '<tr>';
            echo '<td colspan="9"><br></td>';
            echo '</tr>';

        }

        ?>

        </tbody>

    </table>
</body>
</html>