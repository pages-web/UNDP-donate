import { z } from "zod";

export const emailZod = z
  .string()
  .regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, {
    message: "Таны имэйл буруу байна",
  })
  .min(1, { message: "Имэйл ээ заавал оруулна уу" });

export const passwordZod = z
  .string()
  .min(1, { message: "Нууц үгээ оруулна уу" })
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
    "Нууц үг нь дор хаяж нэг жижиг үсэг, нэг том үсэг оруулсан 8 тэмдэгтээс бүрдэх ёстой."
  );
