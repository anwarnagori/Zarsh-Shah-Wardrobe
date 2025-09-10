export default function emailTemplate(title, message, buttonText, buttonLink) {
    return `
  <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; padding: 20px; max-width: 600px; margin: auto; border: 1px solid #eee; border-radius: 8px;">
    <div style="text-align: center; padding-bottom: 20px; border-bottom: 1px solid #eee;">
      <h1 style="color: #4CAF50; margin: 0;">Zarsh Shah Wardrobe</h1>
      <p style="color: #888; font-size: 14px; margin: 0;">Fashion with Elegance</p>
    </div>

    <h2 style="color: #333;">${title}</h2>
    <p>${message}</p>

    ${buttonText && buttonLink
            ? `
      <div style="margin: 25px 0; text-align: center;">
        <a href="${buttonLink}" 
           style="background-color: #4CAF50; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
          ${buttonText}
        </a>
      </div>
      `
            : ""
        }

    <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;" />

    <p style="font-size: 13px; color: #777; text-align: center;">
      © ${new Date().getFullYear()} Zarsh Shah Wardrobe. All rights reserved.
    </p>
  </div>
  `;
}
