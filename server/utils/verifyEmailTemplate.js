const verifyEmailTemplate = ({ name, code }) => {
  return `
    <h1>Hi ${name}</h1>
    <p>Thanks for signing up with us. Please enter the use the code below to verify your email address.</p>
    <div style="padding: 10px 25px; border-radius: 10px; color: #fff; background-color: #000; font-size: 20px; font-weight: bold; margin: 0 auto; text-align: center;">${code}</div>
    <p>Please do not share this code!</p><br/>

    <p>Blinkit Team</p>

    `;
};

export default verifyEmailTemplate;
