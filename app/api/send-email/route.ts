import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST({ request }: any) {
  try {
    const data = await request.json();
    const { name, email } = data;

    // Nodemailer configuration
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "hvslenhvslen566@gmail.com",
      subject: "Таны захиалга",
      text: `Нэр: ${name}\nИмэйл: ${email}`,
    };

    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: "Имэйл амжилттай илгээлээ" });
  } catch (error) {
    return NextResponse.json(
      { error: "Имэйл илгээхэд алдаа гарлаа" },
      { status: 500 }
    );
  }
}
