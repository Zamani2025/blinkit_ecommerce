export const forgotPasswordOtpTemplate = ({ name, code }) => {
  return `
    <h1>Hi ${name}</h1>
    <p>You have requested to reset your password. Please enter the use the code below to reset your password.</p>
    <p>The code will expire in 10 minutes</p>
    <div style="padding: 10px 25px; border-radius: 10px; color: #fff; background-color: #000; font-size: 20px; font-weight: bold; margin: 0 auto; text-align: center;">${code}</div>
    <p>You can ignore this email if you did not request to reset your password</p><br/>

    <p>Blinkit Team</p>

    `;
};

export default forgotPasswordOtpTemplate;
