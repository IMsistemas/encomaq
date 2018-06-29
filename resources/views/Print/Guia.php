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
            Guía De Remisión
        </h3>
    </div>
    
    <table class="table">
        <tr>
            <th>Contrato</th>
            <td><?php echo $data[0]["biz_contract"]["nocontract"]; ?></td>
            <th>Cliente</th>
            <td><?php echo $data[0]["biz_contract"]["biz_client"]["businessname"]; ?></td>
        </tr>
        <tr>
            <th>Fecha</th>
            <td><?php echo $data[0]["datetimereferral"]; ?></td>
            <th>Hora</th>
            <td><?php echo $data[0]["sequential"]; ?></td>
        </tr>
        <tr>
            <th>Motivo Traslado</th>
            <td colspan="3"><?php echo $data[0]["nom_transferreason"]["transferreasonname"]; ?></td>
        </tr>
        <tr>
            <th>Punto de partida</th>
            <td><?php echo $data[0]["startingpoint"]; ?></td>

            <th>Punto de llegada</th>
            <td><?php echo $data[0]["arrivalpoint"]; ?></td>

        </tr>
        <tr>
            <th>Transportista</th>
            <td colspan="3"><?php echo $data[0]["biz_carrier"]["carriername"]; ?></td>
        </tr>

        <tr>
            <th>C.I.</th>
            <td><?php echo $data[0]["biz_carrier"]["identify"]; ?></td>

            <th>Placa Nro.</th>
            <td><?php echo $data[0]["biz_carrier"]["licenseplate"]; ?></td>

        </tr>
    </table>
    
    <br/>

    <table class="table table-bordered table-condensed table-striped">
        <thead>
            <tr>
                <th>No</th>
                <th>DESCRIPCIÓN</th>
                <th>CANT.</th>
                <th>OBSERVACIONES</th>
            </tr>
        </thead>
        <tbody>
             <?php
             $x=1;
              /*
                foreach ($data[0]["biz__referralguideitem"] as $c) {
                  echo "<tr>";
                  echo "<td>".$x."</td>";
                  echo "<td>".$c["biz_item"]["itemname"]."</td>";
                  echo "<td>".$c["quantify"]."</td>";
                  echo "<td>".$c["observation"]."</td>";
                  echo "</tr>";
                  $x++;
                }*/
             ?>
        </tbody>
    </table>


  
</body>
</html>