import emailjs from '@emailjs/browser';
import { supabase, isSupabaseConfigured } from '../supabaseClient';

export const isEmailJSConfigured = Boolean(
  process.env.REACT_APP_EMAILJS_SERVICE_ID &&
  process.env.REACT_APP_EMAILJS_TEMPLATE_ID &&
  process.env.REACT_APP_EMAILJS_PUBLIC_KEY
);

/**
 * Service to dispatch real retailer credentials email
 */
export const sendRetailerCredentialsEmail = async ({
  storeName,
  department,
  email,
  phone,
  password,
  loginUrl,
  adminEmail = 'furqannasir561@gmail.com'
}) => {
  const portalUrl = loginUrl || `${window.location.origin}/retailer/login`;

  const emailSubject = `Welcome to SingleCart - Official Retailer Storefront Credentials (${storeName})`;
  const emailBody = `
Dear Store Manager,

Congratulations! Your official storefront for "${storeName}" has been successfully provisioned on SingleCart Digital Mall by the mall administrator (${adminEmail}).

Here are your official login credentials:
--------------------------------------------------
Store / Brand Name: ${storeName}
Mall Department:    ${department}
Manager Email:      ${email}
Mobile Number:      ${phone}
Access Password:    ${password}
Login Portal:       ${portalUrl}
Admin Contact:      ${adminEmail}
--------------------------------------------------

LOGIN INSTRUCTIONS:
You can sign in to your vendor terminal using EITHER:
- Your Registered Email (${email}), OR
- Your Mobile Phone Number (${phone})
along with your access password set above.

Once signed in, you can manage real-time customer orders, update your product catalog, and customize your store banner inside your vendor dashboard.

Best regards,
SingleCart Digital Mall Administration
Administrator Email: ${adminEmail}
`.trim();

  let emailjsSent = false;
  let supabaseSent = false;

  // 1. Try Supabase Auth SignUp / User Registration if available
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password: password,
        options: {
          data: {
            shop_name: storeName,
            phone: phone,
            role: 'retailer',
            provisioned_by: adminEmail
          }
        }
      });
      if (!error && data?.user) {
        supabaseSent = true;
      }
    } catch (err) {
      console.warn('Supabase Auth invite attempt:', err);
    }
  }

  // 2. Try EmailJS for silent background dispatch
  const emailjsServiceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
  const emailjsTemplateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
  const emailjsPublicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

  if (emailjsServiceId && emailjsTemplateId && emailjsPublicKey) {
    try {
      const res = await emailjs.send(
        emailjsServiceId,
        emailjsTemplateId,
        {
          to_email: email.trim(),
          to_name: storeName,
          from_name: `SingleCart Admin (${adminEmail})`,
          reply_to: adminEmail,
          store_name: storeName,
          department: department,
          phone: phone,
          password: password,
          login_url: portalUrl,
          subject: emailSubject,
          message: emailBody
        },
        emailjsPublicKey
      );
      if (res && (res.status === 200 || res.text === 'OK')) {
        emailjsSent = true;
      }
    } catch (err) {
      console.warn('EmailJS background delivery attempt:', err);
    }
  }

  // 3. Generate direct Gmail Web Compose URL (dispatches directly from qazia7513@gmail.com)
  const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
    email.trim()
  )}&su=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

  // 4. Generate native mailto link for direct mail client dispatch
  const mailtoLink = `mailto:${encodeURIComponent(email.trim())}?subject=${encodeURIComponent(
    emailSubject
  )}&body=${encodeURIComponent(emailBody)}`;

  return {
    success: true,
    emailjsSent,
    supabaseSent,
    adminEmail,
    storeName,
    department,
    email,
    phone,
    password,
    portalUrl,
    emailSubject,
    emailBody,
    gmailComposeUrl,
    mailtoLink
  };
};
