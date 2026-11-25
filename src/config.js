/**
 * Site & Enquiry Form Configuration
 *
 * All contact / enquiry form submissions from the website
 * are permanently delivered to this destination email.
 */

// Active destination email for enquiry form submissions
export const ENQUIRY_DESTINATION_EMAIL = 'ari.anaajriceindustry@gmail.com'

/**
 * Returns anchor props so clicking the email opens the native mail/Gmail app on
 * mobile devices and opens Gmail web compose directly in a new tab on desktop PCs.
 */
export function getEmailLinkProps(email = ENQUIRY_DESTINATION_EMAIL) {
  const isMobile =
    typeof navigator !== 'undefined' &&
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

  if (isMobile) {
    return { href: `mailto:${email}` }
  }

  return {
    href: `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}`,
    target: '_blank',
    rel: 'noopener noreferrer',
  }
}
