interface EmailData {
  to: string;
  studentName: string;
  courseName: string;
  invoiceNumber: string;
  amount: number;
  paymentMethod: string;
  sessionDate: string;
  sessionTime: string;
  studentCredentials?: {
    email: string;
    password: string;
  };
}

export async function sendRegistrationEmail(data: EmailData) {
  try {
    // In a real application, you would integrate with an email service
    // For now, we'll log the email content
    console.log('Sending registration email:', {
      to: data.to,
      subject: `Course Registration Confirmation - ${data.invoiceNumber}`,
      html: `
        <h1>Course Registration Confirmation</h1>
        <p>Dear Parent/Guardian,</p>
        
        <p>Thank you for registering ${data.studentName} for ${data.courseName}.</p>
        
        <h2>Registration Details:</h2>
        <ul>
          <li>Invoice Number: ${data.invoiceNumber}</li>
          <li>Course: ${data.courseName}</li>
          <li>Session Date: ${data.sessionDate}</li>
          <li>Session Time: ${data.sessionTime}</li>
          <li>Amount: €${data.amount}</li>
          <li>Payment Method: ${data.paymentMethod}</li>
        </ul>
        
        ${data.studentCredentials ? `
          <h2>Student Login Credentials:</h2>
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <p><strong>Student Email:</strong> ${data.studentCredentials.email}</p>
            <p><strong>Password:</strong> ${data.studentCredentials.password}</p>
          </div>
          
          <p>Please keep these credentials safe and share them with your child. They can use these to log in at https://student.digisafe-europe.eu</p>
        ` : ''}
        
        ${data.paymentMethod === 'cash' ? `
          <h2>Payment Instructions:</h2>
          <p>Please visit our office to complete the cash payment:</p>
          <p>Address: Innovationsstraße 123, 60313 Frankfurt am Main, Germany</p>
          <p>Office Hours: Monday-Friday, 9:00-17:00</p>
          <p>Please bring this invoice number: ${data.invoiceNumber}</p>
        ` : ''}
        
        <p>If you have any questions, please contact us at support@digisafe-europe.eu</p>
      `
    });
  } catch (error) {
    console.error('Error sending registration email:', error);
    throw error;
  }
}