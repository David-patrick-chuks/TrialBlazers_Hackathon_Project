const watermark = 'https://res.cloudinary.com/dbzzkaa97/image/upload/v1754353355/watermark_fdbzah.png';
const logo = 'https://res.cloudinary.com/dwzomhflw/image/upload/v1761053102/Logo_u0oe0f.jpg';
const linkedIn = 'https://res.cloudinary.com/dbzzkaa97/image/upload/v1754433533/linkedIn_ggxxm4.png';
const instagram = 'https://res.cloudinary.com/dbzzkaa97/image/upload/v1754433533/instagram_p8byzw.png';
const facebook = 'https://res.cloudinary.com/dbzzkaa97/image/upload/v1754433532/facebook_rjeokq.png';

exports.paymentSuccessHtml = (firstName, amount, currency, transactionId, description) => {
    return `
    <!DOCTYPE html>
    <html>
     <head>
        <meta http-equiv="Content-Type" content="text/html" charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Payment Success - ErrandHive</title>
        <link rel="stylesheet" href="./index.css">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet">
          <style>
            *{
            margin: 0;
            padding: 0;
          }
          </style>
      </head>
      <body style="margin: 0; padding: 0; background-color: transparent;">
        <center style="width: 100%;">
          <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background-color: transparent; font-family: Poppins, sans-serif;">
            <tr>
              <td style="margin: 0px">
                <img src="${logo}" width="140">
              </td> 
            </tr>
            <tr>
              <td style="height: 400px">
                <h1 style="font-size: 35px; font-weight: bold; margin: 0 0 10px; color: #28a745;">Payment Successful!</h1>
                <h2 style="font-size: 20px; margin: 0 0 10px;">Hi ${firstName},</h2>
                <p style="font-size: 17px; margin: 0 0 20px;">Great news! Your payment has been processed successfully.</p>
                
                <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin: 20px 0;">
                  <h3 style="font-size: 18px; margin: 0 0 15px; color: #333;">Payment Details:</h3>
                  <p style="font-size: 16px; margin: 5px 0;"><strong>Amount:</strong> ${currency} ${amount}</p>
                  <p style="font-size: 16px; margin: 5px 0;"><strong>Description:</strong> ${description || 'Payment transaction'}</p>
                  <p style="font-size: 16px; margin: 5px 0;"><strong>Transaction ID:</strong> ${transactionId}</p>
                  <p style="font-size: 16px; margin: 5px 0;"><strong>Status:</strong> <span style="color: #28a745; font-weight: bold;">Completed</span></p>
                </div>
                
                <p style="font-size: 17px; margin: 20px 0px 10px 0px;">Your runner will be notified and can now proceed with your errand.</p>
                <p style="font-size: 17px;">Thank you for choosing ErrandHive!</p>
              </td>
            </tr>
            <tr>
              <td style="height: 250px; background: url(${watermark}) center / cover no-repeat;">
                  <table width="80%" cellpadding="0" cellspacing="0"
                style="color: #ffffff; margin: 0 auto;">
                <tr>
                  <td align="center">
                    <h3 style="margin: 0; font-size: 25px;">ErrandHive</h3>
                    <p style="margin: 8px 0 20px; font-size: 12px;">
                      ErrandHive. Making everyday deliveries faster, easier, and<br>right when you need them.
                    </p>
                    <table cellpadding="5" cellspacing="0" style="margin: 10px 0; text-align: center;">
                      <tr>
                        <td style="font-size: 12px;">Follow us:</td>
                        <td><a href=""><img src="${linkedIn}" alt="LinkedIn" width="20" style="vertical-align: middle; margin-left: 10px;"></a></td>
                        <td><a href="https://web.facebook.com/profile.php?id=61578288375402"><img src="${facebook}" alt="Facebook" width="20" style="vertical-align: middle; margin-left: 5px;"></a></td>
                        <td><a href=""><img src="${instagram}" alt="Instagram" width="20" style="vertical-align: middle; margin-left: 5px;"></a></td>
                      </tr>
                    </table>
                    <p style="margin: 10px 0 0; font-size: 12px;">
                      Contact us: &nbsp; +234 810 4914 850 &nbsp;
                      <a href="mailto:errandhiveofficial@gmail.com" style="color: #ffffff; text-decoration: underline;">
                        errandhiveofficial@gmail.com
                      </a>
                    </p>
                  </td>
                </tr>
              </table>
              </td>
            </tr>
            <tr>
              <td style="height: 5px; background-color: #f304d3ff;"></td>
            </tr>
          </table>
        </center>
      </body>
    </html>
    `
};

exports.walletTopUpHtml = (firstName, amount, currency, balance, transactionId, description) => {
    return `
    <!DOCTYPE html>
    <html>
     <head>
        <meta http-equiv="Content-Type" content="text/html" charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Wallet Top-up - ErrandHive</title>
        <link rel="stylesheet" href="./index.css">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet">
          <style>
            *{
            margin: 0;
            padding: 0;
          }
          </style>
      </head>
      <body style="margin: 0; padding: 0; background-color: transparent;">
        <center style="width: 100%;">
          <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background-color: transparent; font-family: Poppins, sans-serif;">
            <tr>
              <td style="margin: 0px">
                <img src="${logo}" width="140">
              </td> 
            </tr>
            <tr>
              <td style="height: 400px">
                <h1 style="font-size: 35px; font-weight: bold; margin: 0 0 10px; color: #28a745;">Wallet Topped Up!</h1>
                <h2 style="font-size: 20px; margin: 0 0 10px;">Hi ${firstName},</h2>
                <p style="font-size: 17px; margin: 0 0 20px;">Great news! Your wallet has been topped up successfully.</p>
                
                <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin: 20px 0;">
                  <h3 style="font-size: 18px; margin: 0 0 15px; color: #333;">Wallet Details:</h3>
                  <p style="font-size: 16px; margin: 5px 0;"><strong>Amount Added:</strong> ${currency} ${amount}</p>
                  <p style="font-size: 16px; margin: 5px 0;"><strong>Current Balance:</strong> ${currency} ${balance}</p>
                  <p style="font-size: 16px; margin: 5px 0;"><strong>Description:</strong> ${description || 'Payment from client'}</p>
                  <p style="font-size: 16px; margin: 5px 0;"><strong>Transaction ID:</strong> ${transactionId}</p>
                  <p style="font-size: 16px; margin: 5px 0;"><strong>Status:</strong> <span style="color: #28a745; font-weight: bold;">Completed</span></p>
                </div>
                
                <p style="font-size: 17px; margin: 20px 0px 10px 0px;">You can now use your wallet balance for withdrawals and other transactions.</p>
                <p style="font-size: 17px;">Keep up the great work with ErrandHive!</p>
              </td>
            </tr>
            <tr>
              <td style="height: 250px; background: url(${watermark}) center / cover no-repeat;">
                  <table width="80%" cellpadding="0" cellspacing="0"
                style="color: #ffffff; margin: 0 auto;">
                <tr>
                  <td align="center">
                    <h3 style="margin: 0; font-size: 25px;">ErrandHive</h3>
                    <p style="margin: 8px 0 20px; font-size: 12px;">
                      ErrandHive. Making everyday deliveries faster, easier, and<br>right when you need them.
                    </p>
                    <table cellpadding="5" cellspacing="0" style="margin: 10px 0; text-align: center;">
                      <tr>
                        <td style="font-size: 12px;">Follow us:</td>
                        <td><a href=""><img src="${linkedIn}" alt="LinkedIn" width="20" style="vertical-align: middle; margin-left: 10px;"></a></td>
                        <td><a href="https://web.facebook.com/profile.php?id=61578288375402"><img src="${facebook}" alt="Facebook" width="20" style="vertical-align: middle; margin-left: 5px;"></a></td>
                        <td><a href=""><img src="${instagram}" alt="Instagram" width="20" style="vertical-align: middle; margin-left: 5px;"></a></td>
                      </tr>
                    </table>
                    <p style="margin: 10px 0 0; font-size: 12px;">
                      Contact us: &nbsp; +234 810 4914 850 &nbsp;
                      <a href="mailto:errandhiveofficial@gmail.com" style="color: #ffffff; text-decoration: underline;">
                        errandhiveofficial@gmail.com
                      </a>
                    </p>
                  </td>
                </tr>
              </table>
              </td>
            </tr>
            <tr>
              <td style="height: 5px; background-color: #f304d3ff;"></td>
            </tr>
          </table>
        </center>
      </body>
    </html>
    `
};

exports.paymentFailedHtml = (firstName, amount, currency, transactionId, description) => {
    return `
    <!DOCTYPE html>
    <html>
     <head>
        <meta http-equiv="Content-Type" content="text/html" charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Payment Failed - ErrandHive</title>
        <link rel="stylesheet" href="./index.css">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet">
          <style>
            *{
            margin: 0;
            padding: 0;
          }
          </style>
      </head>
      <body style="margin: 0; padding: 0; background-color: transparent;">
        <center style="width: 100%;">
          <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background-color: transparent; font-family: Poppins, sans-serif;">
            <tr>
              <td style="margin: 0px">
                <img src="${logo}" width="140">
              </td> 
            </tr>
            <tr>
              <td style="height: 400px">
                <h1 style="font-size: 35px; font-weight: bold; margin: 0 0 10px; color: #dc3545;">Payment Failed</h1>
                <h2 style="font-size: 20px; margin: 0 0 10px;">Hi ${firstName},</h2>
                <p style="font-size: 17px; margin: 0 0 20px;">We're sorry, but your payment could not be processed at this time.</p>
                
                <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin: 20px 0;">
                  <h3 style="font-size: 18px; margin: 0 0 15px; color: #333;">Payment Details:</h3>
                  <p style="font-size: 16px; margin: 5px 0;"><strong>Amount:</strong> ${currency} ${amount}</p>
                  <p style="font-size: 16px; margin: 5px 0;"><strong>Description:</strong> ${description || 'Payment transaction'}</p>
                  <p style="font-size: 16px; margin: 5px 0;"><strong>Transaction ID:</strong> ${transactionId}</p>
                  <p style="font-size: 16px; margin: 5px 0;"><strong>Status:</strong> <span style="color: #dc3545; font-weight: bold;">Failed</span></p>
                </div>
                
                <p style="font-size: 17px; margin: 20px 0px 10px 0px;">Please try again or contact our support team if the issue persists.</p>
                <p style="font-size: 17px;">Thank you for choosing ErrandHive!</p>
              </td>
            </tr>
            <tr>
              <td style="height: 250px; background: url(${watermark}) center / cover no-repeat;">
                  <table width="80%" cellpadding="0" cellspacing="0"
                style="color: #ffffff; margin: 0 auto;">
                <tr>
                  <td align="center">
                    <h3 style="margin: 0; font-size: 25px;">ErrandHive</h3>
                    <p style="margin: 8px 0 20px; font-size: 12px;">
                      ErrandHive. Making everyday deliveries faster, easier, and<br>right when you need them.
                    </p>
                    <table cellpadding="5" cellspacing="0" style="margin: 10px 0; text-align: center;">
                      <tr>
                        <td style="font-size: 12px;">Follow us:</td>
                        <td><a href=""><img src="${linkedIn}" alt="LinkedIn" width="20" style="vertical-align: middle; margin-left: 10px;"></a></td>
                        <td><a href="https://web.facebook.com/profile.php?id=61578288375402"><img src="${facebook}" alt="Facebook" width="20" style="vertical-align: middle; margin-left: 5px;"></a></td>
                        <td><a href=""><img src="${instagram}" alt="Instagram" width="20" style="vertical-align: middle; margin-left: 5px;"></a></td>
                      </tr>
                    </table>
                    <p style="margin: 10px 0 0; font-size: 12px;">
                      Contact us: &nbsp; +234 810 4914 850 &nbsp;
                      <a href="mailto:errandhiveofficial@gmail.com" style="color: #ffffff; text-decoration: underline;">
                        errandhiveofficial@gmail.com
                      </a>
                    </p>
                  </td>
                </tr>
              </table>
              </td>
            </tr>
            <tr>
              <td style="height: 5px; background-color: #f304d3ff;"></td>
            </tr>
          </table>
        </center>
      </body>
    </html>
    `
};
