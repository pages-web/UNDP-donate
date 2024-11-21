import { z } from "zod";

export const nameZod = z
  .string()
  .min(2, { message: "Нэрээ бүтнээр нь оруулна уу." })
  .max(50, { message: "Нэрний урт 50 тэмдэгтээс хэтрэхгүй байх ёстой." });

export const phoneZod = z.string().regex(/^(\+976|0|976)?\d{8}$/, {
  message: "Утасны дугаар буруу байна. Зөв дугаар оруулна уу.",
});

export const emailZod = z
  .string()
  .email({ message: "Имэйл хаяг буруу байна. Зөв форматаар оруулна уу." })
  .min(1, { message: "Имэйл хаягаа заавал оруулна уу." });
