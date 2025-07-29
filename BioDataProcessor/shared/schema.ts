import { z } from "zod";

// Request schema for BFHL API
export const bfhlRequestSchema = z.object({
  data: z.array(z.string()).min(0, "Data array is required")
});

// Response schema for BFHL API - Sequence as per requirements
export const bfhlResponseSchema = z.object({
  is_success: z.boolean(),           // 1. Status
  user_id: z.string(),              // 2. User ID
  email: z.string(),                // 3. Email ID  
  roll_number: z.string(),          // 4. College Roll Number
  even_numbers: z.array(z.string()), // 5. Array for even numbers
  odd_numbers: z.array(z.string()),  // 6. Array for odd numbers
  alphabets: z.array(z.string()),    // 7. Array for alphabets, converted to uppercase
  special_characters: z.array(z.string()), // 8. Array for special characters
  sum: z.string(),                   // 9. Sum of numbers
  concat_string: z.string()          // 10. Concatenation of alphabets in reverse with alternating caps
});

// Error response schema
export const errorResponseSchema = z.object({
  is_success: z.literal(false),
  error: z.string()
});

export type BfhlRequest = z.infer<typeof bfhlRequestSchema>;
export type BfhlResponse = z.infer<typeof bfhlResponseSchema>;
export type ErrorResponse = z.infer<typeof errorResponseSchema>;
