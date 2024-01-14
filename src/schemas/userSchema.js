import { z } from "zod";

const userSchema = z.object({
    name: z.string({
      invalid_type_error: 'Use a valid name.',
      required_error: 'the name is required.'
    }),

    email: z.string().email({
        invalid_type_error: 'Use a valid email.',
        required_error: 'The email is required.'
      }),

    password: z.string().min(6,{
        invalid_type_error: 'The password should be at least 6 characters.',
        required_error: 'The password is required.'
      }),
    })
  
  export function validateUser(input) {
    return userSchema.safeParse(input)
  }

  export function validatePartialUser (input) {
    return userSchema.partial().safeParse(input)
  }