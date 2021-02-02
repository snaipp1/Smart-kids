const keys = require('../keys')

module.exports = function(email) {
  return {
    to: email,
    from: keys.EMAIL_FROM,
    subject: 'Аккаунт создан',
    html: `
    <html xmlns="http://www.w3.org/1999/xhtml"><head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Аккаунт создан</title>
    <style type="text/css">
       /* Client-specific Styles */
       #outlook a {padding:0;} /* Force Outlook to provide a "view in browser" menu link. */
       body{width:100% !important; -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; margin:0; padding:0;}
       /* Prevent Webkit and Windows Mobile platforms from changing default font sizes, while not breaking desktop design. */
       .ExternalClass {width:100%;} /* Force Hotmail to display emails at full width */
       .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div {line-height: 100%;} /* Force Hotmail to display normal line spacing.  More on that: http://www.emailonacid.com/forum/viewthread/43/ */
       #backgroundTable {margin:0; padding:0; width:100% !important; line-height: 100% !important;}
       img {outline:none; text-decoration:none;border:none; -ms-interpolation-mode: bicubic;}
       a img {border:none;}
       .image_fix {display:block;}
       p {margin: 0px 0px !important;}
       
       table td {border-collapse: collapse;}
       table { border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt; }
       /*a {color: #e95353;text-decoration: none;text-decoration:none!important;}*/
       /*STYLES*/
       table[class=full] { width: 100%; clear: both; }
       
       /*################################################*/
       /*IPAD STYLES*/
       /*################################################*/
       @media only screen and (max-width: 640px) {
       a[href^="tel"], a[href^="sms"] {
       text-decoration: none;
       color: #ffffff; /* or whatever your want */
       pointer-events: none;
       cursor: default;
       }
       .mobile_link a[href^="tel"], .mobile_link a[href^="sms"] {
       text-decoration: default;
       color: #ffffff !important;
       pointer-events: auto;
       cursor: default;
       }
       table[class=devicewidth] {width: 440px!important;text-align:center!important;}
       table[class=devicewidthinner] {width: 420px!important;text-align:center!important;}
       table[class="sthide"]{display: none!important;}
       img[class="bigimage"]{width: 420px!important;height:219px!important;}
       img[class="col2img"]{width: 420px!important;height:258px!important;}
       img[class="image-banner"]{width: 440px!important;height:106px!important;}
       td[class="menu"]{text-align:center !important; padding: 0 0 10px 0 !important;}
       td[class="logo"]{padding:10px 0 5px 0!important;margin: 0 auto !important;}
       img[class="logo"]{padding:0!important;margin: 0 auto !important;}

       }
       /*##############################################*/
       /*IPHONE STYLES*/
       /*##############################################*/
       @media only screen and (max-width: 480px) {
       a[href^="tel"], a[href^="sms"] {
       text-decoration: none;
       color: #ffffff; /* or whatever your want */
       pointer-events: none;
       cursor: default;
       }
       .mobile_link a[href^="tel"], .mobile_link a[href^="sms"] {
       text-decoration: default;
       color: #ffffff !important; 
       pointer-events: auto;
       cursor: default;
       }
       table[class=devicewidth] {width: 280px!important;text-align:center!important;}
       table[class=devicewidthinner] {width: 260px!important;text-align:center!important;}
       table[class="sthide"]{display: none!important;}
       img[class="bigimage"]{width: 260px!important;height:136px!important;}
       img[class="col2img"]{width: 260px!important;height:160px!important;}
       img[class="image-banner"]{width: 280px!important;height:68px!important;}
       
       }
    </style>

    
 </head>
<body>
<div class="block">
 <!-- Start of preheader -->
 <table width="100%" bgcolor="#f6f4f5" cellpadding="0" cellspacing="0" border="0" id="backgroundTable" st-sortable="preheader">
    <tbody>
       <tr>
          <td width="100%">
             <table width="580" cellpadding="0" cellspacing="0" border="0" align="center" class="devicewidth">
                <tbody>
                   <!-- Spacing -->
                   <tr>
                      <td width="100%" height="5"></td>
                   </tr>
                   <!-- Spacing -->
                   <tr>
                      <td align="right" valign="middle" style="font-family: Helvetica, arial, sans-serif; font-size: 10px;color: #999999" st-content="preheader">
                         If you cannot read this email, please  <a class="hlite" href="#" style="text-decoration: none; color: #0db9ea">click here</a> 
                      </td>
                   </tr>
                   <!-- Spacing -->
                   <tr>
                      <td width="100%" height="5"></td>
                   </tr>
                   <!-- Spacing -->
                </tbody>
             </table>
          </td>
       </tr>
    </tbody>
 </table>
 <!-- End of preheader -->
</div>
<div class="block">
 <!-- start of header -->
 <table width="100%" bgcolor="#f6f4f5" cellpadding="0" cellspacing="0" border="0" id="backgroundTable" st-sortable="header">
    <tbody>
       <tr>
          <td>
             <table width="580" bgcolor="#0db9ea" cellpadding="0" cellspacing="0" border="0" align="center" class="devicewidth" hlitebg="edit" shadow="edit">
                <tbody>
                   <tr>
                      <td>
                         <!-- logo -->
                         <table width="280" cellpadding="0" cellspacing="0" border="0" align="left" class="devicewidth">
                            <tbody>
                               <tr>
                                  <td valign="middle" width="270" style="padding: 10px 0 10px 20px;" class="logo">
                                     <div class="imgpop">
                                        <a href="#" style="color:#ffff; text-decoration:none;">SMART KIDS</a>
                                     </div>
                                  </td>
                               </tr>
                            </tbody>
                         </table>
                         <!-- End of logo -->
                      </td>
                   </tr>
                </tbody>
             </table>
          </td>
       </tr>
    </tbody>
 </table>
 <!-- end of header -->
</div><div class="block">
 <!-- image + text -->
 <table width="100%" bgcolor="#f6f4f5" cellpadding="0" cellspacing="0" border="0" id="backgroundTable" st-sortable="bigimage">
    <tbody>
       <tr>
          <td>
             <table bgcolor="#ffffff" width="580" align="center" cellspacing="0" cellpadding="0" border="0" class="devicewidth" modulebg="edit">
                <tbody>
                   <tr>
                      <td width="100%" height="20"></td>
                   </tr>
                   <tr>
                      <td>
                         <table width="540" align="center" cellspacing="0" cellpadding="0" border="0" class="devicewidthinner">
                            <tbody>
                               <tr>
                                  <!-- start of image -->
                                  <td align="center">
                                     <a target="_blank" href="#"><img width="540" border="0" height="282" alt="" style="display:block;height:282px; width:auto; border:none; outline:none; text-decoration:none;" src="https://www.gamersdecide.com/sites/default/files/smilingkids.jpg" class="bigimage"></a>
                                  </td>
                               </tr>
                               <!-- end of image -->
                               <!-- Spacing -->
                               <tr>
                                  <td width="100%" height="20"></td>
                               </tr>
                               <!-- Spacing -->
                               <!-- title -->
                               <tr>
                                  <td style="font-family: Helvetica, arial, sans-serif; font-size: 18px; color: #333333; text-align:left;line-height: 20px;" st-title="rightimage-title">
                                     ДОБРО ПОЖАЛОВАТЬ В SMART KIDS!
                                  </td>
                               </tr>
                               <!-- end of title -->
                               <!-- Spacing -->
                               <tr>
                                  <td width="100%" height="20"></td>
                               </tr>
                               <!-- Spacing -->
                               <!-- content -->
                               <tr>
                                  <td style="font-family: Helvetica, arial, sans-serif; font-size: 13px; color: #95a5a6; text-align:left;line-height: 24px;" st-content="rightimage-paragraph">
                                     Вы успешно создали аккаунт в приложении для развитя SMART KIDS. В ходе регистрации, Вами был указан email - ${email}. Данный email позволит восстановить доступ в случае возникновения проблем. 
                                  </td>
                               </tr>
                               <!-- end of content -->
                               <!-- Spacing -->
                               <tr>
                                  <td width="100%" height="10"></td>
                               </tr>
                               <!-- button -->
                               <tr>
                                  <td>
                                     <table height="30" align="left" valign="middle" border="0" cellpadding="0" cellspacing="0" class="tablet-button" st-button="edit">
                                                                <tbody>
                                                                   <tr>
                                                                      <td width="auto" align="center" valign="middle" height="30" style=" background-color:#0db9ea; border-top-left-radius:4px; border-bottom-left-radius:4px;border-top-right-radius:4px; border-bottom-right-radius:4px; background-clip: padding-box;font-size:13px; font-family:Helvetica, arial, sans-serif; text-align:center;  color:#ffffff; font-weight: 300; padding-left:18px; padding-right:18px;">
                                                                      
                                                                         <span style="color: #ffffff; font-weight: 300;">
                                                                            <a style="color: #ffffff; text-align:center;text-decoration: none;" href="${keys.BASE_URL}">Вернуться в Smart kids</a>
                                                                         </span>
                                                                      </td>
                                                                   </tr>
                                                                </tbody>
                                                             </table>
                                  </td>
                               </tr>
                               <!-- /button -->
                               <!-- Spacing -->
                               <tr>
                                  <td width="100%" height="20"></td>
                               </tr>
                               <!-- Spacing -->
                            </tbody>
                         </table>
                      </td>
                   </tr>
                </tbody>
             </table>
          </td>
       </tr>
    </tbody>
 </table>
</div>

<div class="block">
 <!-- Full + text -->
 <table width="100%" bgcolor="#f6f4f5" cellpadding="0" cellspacing="0" border="0" id="backgroundTable" st-sortable="fullimage">
    <tbody>
       <tr>
          <td>
             <table bgcolor="#ffffff" width="580" align="center" cellspacing="0" cellpadding="0" border="0" class="devicewidth" modulebg="edit">
                <tbody>
                   <tr>
                      <td width="100%" height="20"></td>
                   </tr>
                   <tr>
                      <td>
                         <table width="540" align="center" cellspacing="0" cellpadding="0" border="0" class="devicewidthinner">
                            <tbody>
                               <!-- title -->
                               <tr>
                                  <td style="font-family: Helvetica, arial, sans-serif; font-size: 18px; color: #333333; text-align:left;line-height: 20px;" st-title="rightimage-title">
                                     SMART KIDS - финальный проект JS / Front-end RS School
                                  </td>
                               </tr>
                               <!-- end of title -->
                               <!-- Spacing -->
                               <tr>
                                  <td width="100%" height="10"></td>
                               </tr>
                               <!-- Spacing -->
                               <!-- content -->
                               <tr>
                                  <td style="font-family: Helvetica, arial, sans-serif; font-size: 13px; color: #666666; text-align:left;line-height: 24px;" st-content="rightimage-paragraph">
                  <p>RS School - это бесплатные курсы, проводимые сообществом разработчиков The Rolling Scopes с 2013 года.</p>
                  <p>В RS School может учиться каждый, независимо от возраста, профессиональной занятости и места жительства.</p>
                  <p>В обучении участвуют разработчики из различных компаний и стран. На наших курсах мы совмещаем онлайн и оффлайн обучение.</p>
                  <p>Для комфортного обучения студентам помогают 250+ менторов. Менторы школы - наши “железные” люди - обучают студентов в свое свободное время и бесплатно!</p>
                                  </td>
                               </tr>
                               <!-- end of content -->
                               <!-- Spacing -->
                               <tr>
                                  <td width="100%" height="10"></td>
                               </tr>
                               <!-- button -->
                               <tr>
                                  <td>
                                     <table height="30" align="left" valign="middle" border="0" cellpadding="0" cellspacing="0" class="tablet-button" st-button="edit">
                                                                <tbody>
                                                                   <tr>
                                                                      <td width="auto" align="center" valign="middle" height="30" style=" background-color:#0db9ea; border-top-left-radius:4px; border-bottom-left-radius:4px;border-top-right-radius:4px; border-bottom-right-radius:4px; background-clip: padding-box;font-size:13px; font-family:Helvetica, arial, sans-serif; text-align:center;  color:#ffffff; font-weight: 300; padding-left:18px; padding-right:18px;">
                                                                      
                                                                         <span style="color: #ffffff; font-weight: 300;">
                                                                            <a style="color: #ffffff; text-align:center;text-decoration: none;" href="https://rs.school/">RS School</a>
                                                                         </span>
                                                                      </td>
                                                                   </tr>
                                                                </tbody>
                                                             </table>
                                  </td>
                               </tr>
                               <!-- /button -->
                               <!-- Spacing -->
                               <tr>
                                  <td width="100%" height="20"></td>
                               </tr>
                               <!-- Spacing -->
                            </tbody>
                         </table>
                      </td>
                   </tr>
                </tbody>
             </table>
          </td>
       </tr>
    </tbody>
 </table>
</div>
<div class="block">
 <!-- Start of preheader -->
 <table width="100%" bgcolor="#f6f4f5" cellpadding="0" cellspacing="0" border="0" id="backgroundTable" st-sortable="postfooter">
    <tbody>
       <tr>
          <td width="100%">
             <table width="580" cellpadding="0" cellspacing="0" border="0" align="center" class="devicewidth">
                <tbody>
                   <!-- Spacing -->
                   <tr>
                      <td width="100%" height="5"></td>
                   </tr>
                   <!-- Spacing -->
                   <tr>
                      <td align="center" valign="middle" style="font-family: Helvetica, arial, sans-serif; font-size: 10px;color: #999999" st-content="preheader">
                         If you don't want to receive updates. please  <a class="hlite" href="#" style="text-decoration: none; color: #0db9ea">unsubscribe</a> 
                      </td>
                   </tr>
                   <!-- Spacing -->
                   <tr>
                      <td width="100%" height="5"></td>
                   </tr>
                   <!-- Spacing -->
                </tbody>
             </table>
          </td>
       </tr>
    </tbody>
 </table>
 <!-- End of preheader -->
</div>

</body></html>
    `
  }
}