import nodemailer from 'nodemailer';


const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: 'sedeekkandil@gmail.com', 
    pass: 'mawdwbozwowfclaa', 
  },
});


const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString(); 
};


export const sendOTPEmail = async (email, otp) => {
  const mailOptions = {
    from: '"search job 👻" <sedeekkandil@gmail.com>', 
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP code is ${otp}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('OTP email sent successfully');
  } catch (error) {
    console.error('Error sending OTP email:', error);
    throw new Error('Error sending OTP email');
  }
};

export { generateOTP };