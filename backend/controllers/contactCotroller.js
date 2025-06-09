import nodemailer from "nodemailer";

export const emailSender = async (req, res) => {
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS, // Use Gmail App Password
    },
  });

  const mailOptions = {
    from: email, // Show visitor's email as sender
    to: process.env.MAIL_USER, // YOUR email — where you'll receive the message
    subject: `New Contact Message from ${name}`,
    text: `You received a new message from your website contact form:

Name: ${name}
Email: ${email}
Message: ${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error sending email" });
  }
};
