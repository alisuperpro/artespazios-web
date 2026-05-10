import type { APIRoute } from "astro"
import { sendEmail } from "../../services/email.services"
import { EMAIL_CONF } from "../../config/email.config"

export const POST: APIRoute = async ({ request }) => {
  const { name, email, service, description } = await request.json()

  const templateForMe = `
        <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>Notificación Artespazios</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
</head>
<body style="margin: 0; padding: 0; background-color: #F7F3EE; font-family: Arial, sans-serif;">
    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #F7F3EE; padding: 40px 10px;">
        <tr>
            <td align="center">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #FFFFFF; border: 1px solid #E8DCC8; border-radius: 40px; overflow: hidden; border-collapse: separate;">
                    
                    <tr>
                        <td align="center" style="padding: 30px; background-color: #C57A63;">
                            <h1 style="margin: 0; color: #FFFFFF; font-size: 18px; letter-spacing: 3px; text-transform: uppercase; font-weight: bold;">Artespazios</h1>
                            <p style="margin: 5px 0 0; color: #FFFFFF; font-size: 11px; opacity: 0.8; text-transform: uppercase; letter-spacing: 1px;">Nueva Solicitud de Diagnóstico</p>
                        </td>
                    </tr>

                    <tr>
                        <td style="padding: 40px;">
                            
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 25px; border-bottom: 1px solid #F7F3EE; padding-bottom: 15px;">
                                <tr>
                                    <td>
                                        <div style="font-size: 10px; font-weight: bold; color: #D9C7A3; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 5px;">Nombre completo</div>
                                        <div style="font-size: 16px; color: #4A4A4A;"><strong>${name}</strong></div>
                                    </td>
                                </tr>
                            </table>

                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 25px; border-bottom: 1px solid #F7F3EE; padding-bottom: 15px;">
                                <tr>
                                    <td>
                                        <div style="font-size: 10px; font-weight: bold; color: #D9C7A3; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 5px;">Email de contacto</div>
                                        <div style="font-size: 16px;"><a href="mailto:${email}" style="color: #C57A63; text-decoration: none;">${email}</a></div>
                                    </td>
                                </tr>
                            </table>

                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 25px; border-bottom: 1px solid #F7F3EE; padding-bottom: 15px;">
                                <tr>
                                    <td>
                                        <div style="font-size: 10px; font-weight: bold; color: #D9C7A3; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 5px;">Servicio de interés</div>
                                        <div style="font-size: 16px; color: #4A4A4A;">${service}</div>
                                        <div style="display: inline-block; padding: 4px 10px; background-color: #F7F3EE; color: #C57A63; border-radius: 10px; font-size: 10px; font-weight: bold; margin-top: 8px; text-transform: uppercase;">Prioridad Media</div>
                                    </td>
                                </tr>
                            </table>

                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr>
                                    <td>
                                        <div style="font-size: 10px; font-weight: bold; color: #D9C7A3; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 10px;">Consulta del usuario</div>
                                        <div style="background-color: #F7F3EE; padding: 20px; border-radius: 20px; font-size: 14px; color: #4A4A4A; line-height: 1.6; font-style: italic;">
                                            "${description}"
                                        </div>
                                    </td>
                                </tr>
                            </table>

                        </td>
                    </tr>

                    <tr>
                        <td align="center" style="padding: 20px; background-color: #F7F3EE; font-size: 10px; color: #D9C7A3; text-transform: uppercase; letter-spacing: 1px;">
                            Enviado desde el formulario web de Artespazios
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
    `

  const template = `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>Artespazios</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
</head>
<body style="margin: 0; padding: 0; background-color: #F7F3EE; font-family: Arial, sans-serif;">
    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #F7F3EE; padding: 40px 10px;">
        <tr>
            <td align="center">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #FFFFFF; border: 1px solid #E8DCC8; border-radius: 40px; overflow: hidden; border-collapse: separate;">
                    
                    <tr>
                        <td align="center" style="padding: 40px 30px; border-bottom: 1px solid #F7F3EE;">
                            <h1 style="margin: 0; color: #4A4A4A; font-size: 24px; letter-spacing: 4px; text-transform: uppercase; font-weight: 800;">ARTESPAZIOS</h1>
                            <p style="margin: 5px 0 0; color: #D9C7A3; font-size: 10px; letter-spacing: 2px; text-transform: uppercase;">Ingeniería & Bienestar</p>
                        </td>
                    </tr>

                    <tr>
                        <td style="padding: 50px 40px; text-align: center;">
                            <h2 style="color: #C57A63; font-size: 26px; margin: 0 0 20px 0; line-height: 1.2; font-weight: 700;">Has dado el primer paso hacia tu nueva claridad</h2>
                            <p style="color: #4A4A4A; font-size: 15px; line-height: 1.6; margin-bottom: 30px;">
                                Hola, <strong>${name}</strong>. He recibido tu interés en el área de <strong>${service}</strong> y pronto revisaré tu caso personalmente.
                            </p>

                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #F7F3EE; border-radius: 30px; margin-bottom: 35px;">
                                <tr>
                                    <td style="padding: 30px;">
                                        <p style="margin: 0 0 15px 0; font-size: 12px; font-weight: bold; color: #D9C7A3; text-transform: uppercase; letter-spacing: 1px;">¿Qué sigue ahora?</p>
                                        
                                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 15px;">
                                            <tr>
                                                <td width="30" valign="top">
                                                    <div style="background-color: #C57A63; color: #FFFFFF; width: 20px; height: 20px; border-radius: 50%; font-size: 11px; font-weight: bold; text-align: center; line-height: 20px;">1</div>
                                                </td>
                                                <td style="font-size: 13px; color: #4A4A4A; line-height: 20px;"><strong>Análisis técnico:</strong> Evaluaré los detalles de tu consulta.</td>
                                            </tr>
                                        </table>

                                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 15px;">
                                            <tr>
                                                <td width="30" valign="top">
                                                    <div style="background-color: #C57A63; color: #FFFFFF; width: 20px; height: 20px; border-radius: 50%; font-size: 11px; font-weight: bold; text-align: center; line-height: 20px;">2</div>
                                                </td>
                                                <td style="font-size: 13px; color: #4A4A4A; line-height: 20px;"><strong>Contacto:</strong> Te escribiré en las próximas 48 horas laborables.</td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>

                            <table border="0" cellpadding="0" cellspacing="0" style="margin: 0 auto;">
                                <tr>
                                    <td align="center" bgcolor="#C57A63" style="border-radius: 50px;">
                                        <a href="https://artespazios.com" target="_blank" style="padding: 18px 35px; color: #FFFFFF; text-decoration: none; font-weight: bold; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; display: inline-block;">Visitar sitio web</a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <tr>
                        <td align="center" style="padding: 30px; background-color: #FFFFFF; border-top: 1px solid #F7F3EE; font-size: 11px; color: #D9C7A3;">
                            <p style="margin: 0;"><strong>Rafaela Sallustio</strong><br>Consultoría en Sistemas de Orden y Bienestar</p>
                            <p style="margin: 20px 0 0 0; opacity: 0.5;">© 2026 Artespazios. Todos los derechos reservados.</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
    `

  try {
    await sendEmail({
      to: EMAIL_CONF.email,
      subject: "Nuevo registro recibido desde Artespazios.com",
      template: templateForMe,
    })

    await sendEmail({
      to: email,
      subject: "¡Hemos recibido tu solicitud en Artespazios!",
      template,
    })

    return new Response(
      JSON.stringify({
        message: "success",
      }),
      { status: 200 },
    )
  } catch (err) {
    console.log(err)
    return new Response(
      JSON.stringify({
        message: "error",
      }),
      { status: 500 },
    )
  }
}
