<?php

require URLCOMPOSER . 'phpmailer/PHPMailerAutoload.php';

class Correos_controller extends Controller {

    public function __construct() {
        parent::__construct();
    }

    public function EnviarCorreo($correo, $nombre = '', $asunto, $cuerpo) {

        $mail = new PHPMailer;
//$mail->SMTPDebug = 3;                               // Enable verbose debug output
        $mail->isSMTP(); // Set mailer to use SMTP
        $mail->Host = 'mail.socialmedic.com.pe'; // Specify main and backup SMTP servers
        $mail->SMTPAuth = true; // Enable SMTP authentication
        $mail->Username = 'pop3server@socialmedic.com.pe'; // SMTP username
        $mail->Password = '123server123@'; // SMTP password
        $mail->SMTPSecure = 'ssl'; // Enable TLS encryption, `ssl` also accepted
        $mail->Port = 465; // TCP port to connect to
        $mail->setFrom('pop3server@socialmedic.com.pe', 'Consultas - Policlínico Social Medic');
        $mail->addAddress($correo, $nombre); // Add a recipient        
//$mail->addAddress('marcorodriguez2013@outlook.com', 'Marco Rodriguez'); // Add a recipient 
//$mail->AddEmbeddedImage(URL . 'recursos/img/' . NOMBRE_LOGO, 1001);
//$mail->AddEmbeddedImage(URLIMG . NOMBRE_LOGO_, 1002);
//$mail->AddReplyTo('replyto@email.com', 'Reply to name');
        //$mail->addCC('apalomino@socialmedic.com.pe', 'Jose Antonio Palomino');
//$mail->addBCC('bcc@example.com');
//$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
//$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
// Set email format to HTML
        $mail->Subject = $asunto;
        $mail->MsgHTML($cuerpo);
        $mail->CharSet = 'UTF-8';
        if (!$mail->send()) {
            return 'Mailer Error: ' . $mail->ErrorInfo;
        } else {
            return 'El mensaje ha sido enviado';
        }
    }

    public function EmailDatosEmpresa($datos, $correo = 'marcorodriguez2013@outlook.com', $nombre = 'Marco Antonio', $apellido = 'Rodriguez Salinas') {

        $nombre_completo = $nombre . '' . $apellido;
        $asunto = "Datos Administrador";
        $cuerpo = '<!DOCTYPE html
    PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>

<head>
    <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
    <style>
        .ExternalClass {
            width: 100%;
        }

        @media screen and (-webkit-min-device-pixel-ratio:0) {
            #table1 {
                border-top-left-radius: 6px;
                border-top-right-radius: 6px;
                border-bottom-right-radius: 6px;
                border-bottom-left-radius: 6px;
                -webkit-box-shadow: rgba(0, 0, 0, 0.74902) 0px 0px 6px 0px;
                box-shadow: rgba(0, 0, 0, 0.0980392) 0px 0px 6px 0px;
            }

            p {
                padding: 0 25px;
            }

            @media (max-width: 576px) {

                #table1,
                #table2,
                    {
                    width: 95%;
                    font-size: 0.9rem;
                }
            }

            @media (min-width: 576px) {

                #table1,
                #table2 {
                    width: 95%;
                    font-size: 0.9rem;
                }
            }

            @media (min-width: 768px) {

                #table1,
                #table2 {
                    width: 600px;
                    font-size: 1rem;
                }
            }

            @media (min-width: 992px) {

                #table1,
                #table2 {
                    width: 600px;
                    font-size: 1rem;
                }
            }

            @media (min-width: 1200px) {

                #table1,
                #table2 {
                    width: 600px;
                    font-size: 1rem;
                }
            }
        }
    </style>
</head>

<body id="body_c" style="background-color: rgb(242, 244, 249)">
    <style>
        .ExternalClass {
            width: 100%;
        }

        @media screen and (-webkit-min-device-pixel-ratio:0) {
            #table1 {
                border-top-left-radius: 6px;
                border-top-right-radius: 6px;
                border-bottom-right-radius: 6px;
                border-bottom-left-radius: 6px;
                -webkit-box-shadow: rgba(0, 0, 0, 0.74902) 0px 0px 6px 0px;
                box-shadow: rgba(0, 0, 0, 0.0980392) 0px 0px 6px 0px;
            }

            p {
                padding: 0 25px;
            }

            @media (max-width: 576px) {

                #table1,
                #table2 {
                    width: 95%;
                    font-size: 0.9rem;
                }
            }

            @media (min-width: 576px) {

                #table1,
                #table2 {
                    width: 95%;
                    font-size: 0.9rem;
                }
            }

            @media (min-width: 768px) {

                #table1,
                #table2 {
                    width: 600px;
                    font-size: 1rem;
                }
            }

            @media (min-width: 992px) {

                #table1,
                #table2 {
                    width: 600px;
                    font-size: 1rem;
                }
            }

            @media (min-width: 1200px) {

                #table1,
                    {
                    width: 600px;
                    font-size: 1rem;
                }
            }
        }
    </style>
    <table id="table1" align="center" cellpadding="5" cellspacing="0" border="0"
        style="background-color: #fff; color:#929393;" width="600px">
        <tr>
            <td align="center" valign="middle">
                <img style="width:100%;height:auto;max-width:269px;"
                    src="https://codemaka.000webhostapp.com/recursos/img/logo.png">
            </td>
        </tr>
        <tr>
            <td align="center" valign="middle">
                <hr style="border:1px solid #3E5F8C">
            </td>
        </tr>
    </table>
    <table id="table2" align="center" cellpadding="5" cellspacing="5" border="0"
        style="background-color: #fff; color:#383838;" width="600px">
        <tr>
            <td width="20%" style="color:white;background-color:#3E5F8C ; font-weight: bold;">
                Fecha y Hora :
            </td>
            <td width="80%">
                ' . fecha_hora . '
            </td>
        </tr>
        <tr>
            <td width="20%" style="color:white;background-color:#3E5F8C ; font-weight: bold;">
                Nombre :
            </td>
            <td width="80%" style="text-transform: capitalize;">
                ' . $datos['nombre'] . '
            </td>
        </tr>
        <tr>
            <td width="20%" style="color:white;background-color:#3E5F8C ; font-weight: bold;">
                Correo :
            </td>
            <td width="80%">
               ' . $datos['correo'] . '
            </td>
        </tr>
        <tr>
            <td width="20%" style="color:white;background-color:#3E5F8C ; font-weight: bold;">
                Celular :
            </td>
            <td width="80%">
               ' . $datos['celular'] . '
            </td>
        </tr>
        <tr>
            <td width="20%" style="color:white;background-color:#3E5F8C ; font-weight: bold;">
                Consulta :
            </td>
            <td width="80%">
                ' . $datos['consulta'] . '
            </td>
        </tr>
    </table>
</body>
</html>';

        Correos_controller::EnviarCorreo($correo, $nombre_completo, $asunto, $cuerpo);
    }

    public function ejemplo() {
        $data = array(
            'nombre' => '',
            'correo' => '',
            'celular' => '',
            'consulta' => ''
        );
        print_r($data);
    }

}
