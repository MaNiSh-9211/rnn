import type { Express } from "express";
import { createServer, type Server } from "http";
import { bfhlRequestSchema, type BfhlResponse, type ErrorResponse } from "@shared/schema";
import { ZodError } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // BFHL API endpoint
  app.post("/api/bfhl", (req, res) => {
    try {
      // Validate request body (comma normalization handled by middleware)
      const validatedData = bfhlRequestSchema.parse(req.body);
      const { data } = validatedData;

      // Initialize arrays and variables
      const oddNumbers: string[] = [];
      const evenNumbers: string[] = [];
      const alphabets: string[] = [];
      const specialCharacters: string[] = [];
      let sum = 0;

      // Process each item in the data array
      data.forEach((item: string) => {
        // Check if item is a number (including multi-digit)
        if (/^\d+$/.test(item)) {
          const num = parseInt(item, 10);
          sum += num;
          
          if (num % 2 === 0) {
            evenNumbers.push(item);
          } else {
            oddNumbers.push(item);
          }
        }
        // Check if item contains only alphabetic characters
        else if (/^[a-zA-Z]+$/.test(item)) {
          alphabets.push(item.toUpperCase());
        }
        // Everything else is considered special characters
        else {
          // For mixed strings, extract special characters
          const specialChars = item.replace(/[a-zA-Z0-9]/g, '');
          if (specialChars) {
            specialCharacters.push(...specialChars.split(''));
          }
          
          // If the item is purely special characters, add as is
          if (/^[^a-zA-Z0-9]+$/.test(item)) {
            specialCharacters.push(item);
          }
        }
      });

      // Remove duplicates from special characters and filter empty strings
      const uniqueSpecialChars = Array.from(new Set(specialCharacters)).filter(char => char.length > 0);

      // Create concatenated string with alternating caps in reverse order
      let concatString = "";
      if (alphabets.length > 0) {
        // Join all alphabets and reverse
        const allAlphabets = alphabets.join('');
        const reversedString = allAlphabets.split('').reverse().join('');
        
        // Apply alternating caps
        concatString = reversedString
          .split('')
          .map((char, index) => {
            return index % 2 === 0 ? char.toLowerCase() : char.toUpperCase();
          })
          .join('');
      }

      // Construct response in the exact sequence requested
      const response: BfhlResponse = {
        is_success: true,
        user_id: "abhinav_rana_17091999", // Updated to Abhinav Rana
        email: "abhinav.rana@gmail.com",
        roll_number: "2211981008", // Updated student ID
        even_numbers: evenNumbers,
        odd_numbers: oddNumbers,
        alphabets: alphabets,
        special_characters: uniqueSpecialChars,
        sum: sum.toString(),
        concat_string: concatString
      };

      res.status(200).json(response);
    } catch (error) {
      console.error("BFHL API Error:", error);
      
      let errorResponse: ErrorResponse;
      
      if (error instanceof ZodError) {
        errorResponse = {
          is_success: false,
          error: "Invalid request format. " + error.errors.map(e => e.message).join(", ")
        };
        res.status(400).json(errorResponse);
      } else {
        errorResponse = {
          is_success: false,
          error: "Internal server error occurred"
        };
        res.status(500).json(errorResponse);
      }
    }
  });

  // GET endpoint for testing
  app.get("/api/bfhl", (req, res) => {
    res.status(200).json({
      operation_code: 1
    });
  });

  const httpServer = createServer(app);
  return httpServer;
}
