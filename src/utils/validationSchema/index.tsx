import { z } from "zod";

export const loginFormSchema = z.object({
    email: z.string().email().min(1, {message: 'Enter Valid Email'}),
    password: z.string().min(1, {message: 'Enter Password'})
})