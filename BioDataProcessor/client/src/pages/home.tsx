import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { BfhlResponse, ErrorResponse } from "@shared/schema";
import { Code, Play, RotateCcw, CheckCircle, XCircle, Clock, Github } from "lucide-react";

export default function Home() {
  const [inputData, setInputData] = useState('{"data": ["a", "1", "334", "4", "R", "$"]}');
  const [response, setResponse] = useState<BfhlResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [statusCode, setStatusCode] = useState<number | null>(null);
  const [responseTime, setResponseTime] = useState<number | null>(null);
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: async (data: string) => {
      const startTime = Date.now();
      try {
        const parsedData = JSON.parse(data);
        const res = await apiRequest("POST", "/api/bfhl", parsedData);
        const endTime = Date.now();
        setResponseTime(endTime - startTime);
        setStatusCode(res.status);
        return await res.json();
      } catch (err) {
        const endTime = Date.now();
        setResponseTime(endTime - startTime);
        throw err;
      }
    },
    onSuccess: (data: BfhlResponse) => {
      setResponse(data);
      setError(null);
      toast({
        title: "Success",
        description: "API request completed successfully",
      });
    },
    onError: (err: any) => {
      setResponse(null);
      setError(err.message || "An error occurred");
      setStatusCode(err.status || 500);
      toast({
        title: "Error",
        description: err.message || "Failed to process request",
        variant: "destructive",
      });
    },
  });

  const handleSendRequest = () => {
    mutation.mutate(inputData);
  };

  const handleReset = () => {
    setInputData('{"data": ["a", "1", "334", "4", "R", "$"]}');
    setResponse(null);
    setError(null);
    setStatusCode(null);
    setResponseTime(null);
  };

  const quickTests = [
    { name: "Numbers Only", data: '{"data": ["1", "2", "3", "4", "5"]}' },
    { name: "Letters Only", data: '{"data": ["a", "B", "c", "D"]}' },
    { name: "Mixed Data", data: '{"data": ["a", "1", "334", "4", "R", "$"]}' },
    { name: "Special Characters", data: '{"data": ["$", "&", "*", "-", "+"]}' },
    { name: "Empty Array", data: '{"data": []}' },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen font-sans text-slate-800">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="bg-primary text-white p-2 rounded-lg">
                <Code className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-slate-900">BFHL API - BAJAJ FINSERV</h1>
                <p className="text-sm text-slate-500">Assignment by Abhinav Rana (2211981008)</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="bg-success bg-opacity-10 text-success border-success">
                <div className="w-2 h-2 bg-success rounded-full mr-1.5"></div>
                Live
              </Badge>
              <a 
                href="https://github.com/abhinavrana17/BajajAssignment" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate-600 hover:text-slate-900 transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <nav className="sticky top-24 space-y-2">
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-slate-900 mb-3">Navigation</h3>
                  <ul className="space-y-2">
                    <li>
                      <button 
                        onClick={() => scrollToSection('overview')}
                        className="block w-full text-left px-3 py-2 text-sm text-primary bg-primary bg-opacity-10 rounded-lg font-medium"
                      >
                        Overview
                      </button>
                    </li>
                    <li>
                      <button 
                        onClick={() => scrollToSection('endpoint')}
                        className="block w-full text-left px-3 py-2 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg"
                      >
                        Endpoint Details
                      </button>
                    </li>
                    <li>
                      <button 
                        onClick={() => scrollToSection('testing')}
                        className="block w-full text-left px-3 py-2 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg"
                      >
                        API Testing
                      </button>
                    </li>
                    <li>
                      <button 
                        onClick={() => scrollToSection('examples')}
                        className="block w-full text-left px-3 py-2 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg"
                      >
                        Examples
                      </button>
                    </li>
                    <li>
                      <button 
                        onClick={() => scrollToSection('errors')}
                        className="block w-full text-left px-3 py-2 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg"
                      >
                        Error Handling
                      </button>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-slate-900 mb-3">Quick Info</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Base URL</p>
                      <p className="text-sm font-mono text-slate-900 mt-1">https://bfhl-api.vercel.app/</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Method</p>
                      <Badge variant="outline" className="bg-yellow-100 text-yellow-800 mt-1">POST</Badge>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Content-Type</p>
                      <p className="text-sm font-mono text-slate-900 mt-1">application/json</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </nav>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview Section */}
            <section id="overview">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">API Overview</h2>
                  <p className="text-slate-600 mb-6">The BFHL API processes arrays of mixed data types and returns categorized results including numbers, alphabets, special characters, and computed values. This assignment is developed for BAJAJ FINSERV by Abhinav Rana.</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="border border-slate-200 rounded-lg p-4">
                      <h3 className="font-semibold text-slate-900 mb-2">Input Processing</h3>
                      <ul className="text-sm text-slate-600 space-y-1">
                        <li>• Accepts mixed data arrays</li>
                        <li>• Categorizes numbers, alphabets, symbols</li>
                        <li>• Handles single and multi-character strings</li>
                      </ul>
                    </div>
                    <div className="border border-slate-200 rounded-lg p-4">
                      <h3 className="font-semibold text-slate-900 mb-2">Output Features</h3>
                      <ul className="text-sm text-slate-600 space-y-1">
                        <li>• Separate odd/even number arrays</li>
                        <li>• Uppercase alphabet conversion</li>
                        <li>• Sum calculation and string concatenation</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-slate-50 rounded-lg p-4">
                    <h3 className="font-semibold text-slate-900 mb-2">Response Format</h3>
                    <pre className="text-sm font-mono text-slate-700 overflow-x-auto">
{`{
  "is_success": true,
  "user_id": "abhinav_rana_17091999",
  "email": "abhinav.rana@gmail.com",
  "roll_number": "2211981008", 
  "even_numbers": ["2", "4"],
  "odd_numbers": ["1", "5"],
  "alphabets": ["A", "B"],
  "special_characters": ["$", "&"],
  "sum": "12",
  "concat_string": "BaA"
}`}
                    </pre>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Endpoint Details */}
            <section id="endpoint">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">Endpoint Details</h2>
                  
                  <div className="bg-slate-900 rounded-lg p-4 mb-6">
                    <div className="flex items-center space-x-3">
                      <Badge className="bg-yellow-500 text-yellow-900">POST</Badge>
                      <code className="text-white font-mono text-lg">/bfhl</code>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-3">Request Body</h3>
                      <div className="border border-slate-200 rounded-lg overflow-hidden">
                        <div className="bg-slate-50 px-4 py-2 border-b border-slate-200">
                          <code className="text-sm font-mono text-slate-700">application/json</code>
                        </div>
                        <div className="p-4">
                          <pre className="text-sm font-mono text-slate-700">
{`{
  "data": ["a", "1", "334", "4", "R", "$"]
}`}
                          </pre>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold text-slate-900 mb-3">Response Fields</h3>
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-slate-200">
                          <thead className="bg-slate-50">
                            <tr>
                              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Field</th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Type</th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Description</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-slate-200">
                            {[
                              { field: "is_success", type: "boolean", desc: "1. Status - Operation success indicator" },
                              { field: "user_id", type: "string", desc: "2. User ID - Formatted as abhinav_rana_17091999" },
                              { field: "email", type: "string", desc: "3. Email ID - User email address" },
                              { field: "roll_number", type: "string", desc: "4. College Roll Number - Student ID" },
                              { field: "even_numbers", type: "array[string]", desc: "5. Array of even numbers as strings" },
                              { field: "odd_numbers", type: "array[string]", desc: "6. Array of odd numbers as strings" },
                              { field: "alphabets", type: "array[string]", desc: "7. Array of alphabets converted to uppercase" },
                              { field: "special_characters", type: "array[string]", desc: "8. Array of special characters" },
                              { field: "sum", type: "string", desc: "9. Sum of all numbers as string" },
                              { field: "concat_string", type: "string", desc: "10. Alphabets in reverse with alternating caps" }
                            ].map((row, i) => (
                              <tr key={i}>
                                <td className="px-4 py-3 text-sm font-mono text-slate-900">{row.field}</td>
                                <td className="px-4 py-3 text-sm text-slate-600">{row.type}</td>
                                <td className="px-4 py-3 text-sm text-slate-600">{row.desc}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* API Testing Interface */}
            <section id="testing">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">API Testing Interface</h2>
                  <p className="text-slate-600 mb-6">Test the API endpoint with custom data arrays and see real-time responses.</p>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Request Panel */}
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-3">Request</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">Data Array (JSON)</label>
                          <Textarea
                            value={inputData}
                            onChange={(e) => setInputData(e.target.value)}
                            className="h-32 font-mono text-sm"
                            placeholder='{"data": ["a", "1", "334", "4", "R", "$"]}'
                          />
                        </div>
                        <div className="flex space-x-3">
                          <Button 
                            onClick={handleSendRequest}
                            disabled={mutation.isPending}
                            className="flex-1"
                          >
                            {mutation.isPending ? (
                              <Clock className="h-4 w-4 mr-2 animate-spin" />
                            ) : (
                              <Play className="h-4 w-4 mr-2" />
                            )}
                            Send Request
                          </Button>
                          <Button variant="outline" onClick={handleReset}>
                            <RotateCcw className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Response Panel */}
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-3">Response</h3>
                      <div className="bg-slate-900 rounded-lg p-4 h-48 overflow-y-auto">
                        {statusCode && (
                          <div className="flex items-center space-x-2 mb-3">
                            <Badge className={statusCode === 200 ? "bg-success text-white" : "bg-error text-white"}>
                              {statusCode}
                            </Badge>
                            <span className="text-slate-400 text-sm">
                              {statusCode === 200 ? "OK" : "Error"}
                            </span>
                            {responseTime && (
                              <span className="text-slate-500 text-xs ml-auto">{responseTime}ms</span>
                            )}
                          </div>
                        )}
                        <pre className="text-sm text-slate-300 font-mono">
                          {response && (
                            <code>{JSON.stringify(response, null, 2)}</code>
                          )}
                          {error && (
                            <code className="text-red-400">{JSON.stringify({ error }, null, 2)}</code>
                          )}
                          {!response && !error && (
                            <code className="text-slate-500">No response yet. Send a request to see results.</code>
                          )}
                        </pre>
                      </div>
                    </div>
                  </div>

                  {/* Quick Test Buttons */}
                  <div className="mt-6">
                    <h4 className="font-medium text-slate-900 mb-3">Quick Tests</h4>
                    <div className="flex flex-wrap gap-2">
                      {quickTests.map((test, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          onClick={() => setInputData(test.data)}
                          className="bg-slate-100 text-slate-700 hover:bg-slate-200"
                        >
                          {test.name}
                        </Button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Examples Section */}
            <section id="examples">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">Usage Examples</h2>
                  
                  <div className="space-y-8">
                    {/* Example A */}
                    <div className="border border-slate-200 rounded-lg overflow-hidden">
                      <div className="bg-slate-50 px-4 py-3 border-b border-slate-200">
                        <h3 className="font-semibold text-slate-900">Example A: Mixed Data Types</h3>
                        <p className="text-sm text-slate-600 mt-1">Processing array with numbers, letters, and special characters</p>
                      </div>
                      <div className="p-4 space-y-4">
                        <div>
                          <h4 className="text-sm font-medium text-slate-700 mb-2">Request:</h4>
                          <pre className="bg-slate-100 p-3 rounded text-sm font-mono overflow-x-auto">
{`POST /bfhl
Content-Type: application/json

{
  "data": ["a", "1", "334", "4", "R", "$"]
}`}
                          </pre>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-slate-700 mb-2">Response:</h4>
                          <pre className="bg-slate-900 text-slate-100 p-3 rounded text-sm font-mono overflow-x-auto">
{`{
  "is_success": true,
  "user_id": "john_doe_17091999",
  "email": "john@xyz.com",
  "roll_number": "ABCD123",
  "odd_numbers": ["1"],
  "even_numbers": ["334", "4"],
  "alphabets": ["A", "R"],
  "special_characters": ["$"],
  "sum": "339",
  "concat_string": "Ra"
}`}
                          </pre>
                        </div>
                      </div>
                    </div>

                    {/* Example B */}
                    <div className="border border-slate-200 rounded-lg overflow-hidden">
                      <div className="bg-slate-50 px-4 py-3 border-b border-slate-200">
                        <h3 className="font-semibold text-slate-900">Example B: Multiple Special Characters</h3>
                        <p className="text-sm text-slate-600 mt-1">Handling various symbols and multi-digit numbers</p>
                      </div>
                      <div className="p-4 space-y-4">
                        <div>
                          <h4 className="text-sm font-medium text-slate-700 mb-2">Request:</h4>
                          <pre className="bg-slate-100 p-3 rounded text-sm font-mono overflow-x-auto">
{`POST /bfhl
Content-Type: application/json

{
  "data": ["2", "a", "y", "4", "&", "-", "*", "5", "92", "b"]
}`}
                          </pre>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-slate-700 mb-2">Response:</h4>
                          <pre className="bg-slate-900 text-slate-100 p-3 rounded text-sm font-mono overflow-x-auto">
{`{
  "is_success": true,
  "user_id": "john_doe_17091999",
  "email": "john@xyz.com",
  "roll_number": "ABCD123",
  "odd_numbers": ["5"],
  "even_numbers": ["2", "4", "92"],
  "alphabets": ["A", "Y", "B"],
  "special_characters": ["&", "-", "*"],
  "sum": "103",
  "concat_string": "ByA"
}`}
                          </pre>
                        </div>
                      </div>
                    </div>

                    {/* Example C */}
                    <div className="border border-slate-200 rounded-lg overflow-hidden">
                      <div className="bg-slate-50 px-4 py-3 border-b border-slate-200">
                        <h3 className="font-semibold text-slate-900">Example C: Multi-Character Strings</h3>
                        <p className="text-sm text-slate-600 mt-1">Processing strings with multiple characters</p>
                      </div>
                      <div className="p-4 space-y-4">
                        <div>
                          <h4 className="text-sm font-medium text-slate-700 mb-2">Request:</h4>
                          <pre className="bg-slate-100 p-3 rounded text-sm font-mono overflow-x-auto">
{`POST /bfhl
Content-Type: application/json

{
  "data": ["A", "ABcD", "DOE"]
}`}
                          </pre>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-slate-700 mb-2">Response:</h4>
                          <pre className="bg-slate-900 text-slate-100 p-3 rounded text-sm font-mono overflow-x-auto">
{`{
  "is_success": true,
  "user_id": "john_doe_17091999",
  "email": "john@xyz.com",
  "roll_number": "ABCD123",
  "odd_numbers": [],
  "even_numbers": [],
  "alphabets": ["A", "ABCD", "DOE"],
  "special_characters": [],
  "sum": "0",
  "concat_string": "EoDdCbAa"
}`}
                          </pre>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Error Handling */}
            <section id="errors">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">Error Handling</h2>
                  
                  <div className="space-y-6">
                    <div className="border border-red-200 rounded-lg bg-red-50 p-4">
                      <h3 className="font-semibold text-red-900 mb-2">400 Bad Request</h3>
                      <p className="text-sm text-red-700 mb-3">Missing or invalid data field in request body</p>
                      <pre className="bg-red-900 text-red-100 p-3 rounded text-sm font-mono">
{`{
  "is_success": false,
  "error": "Missing 'data' field in request body"
}`}
                      </pre>
                    </div>

                    <div className="border border-red-200 rounded-lg bg-red-50 p-4">
                      <h3 className="font-semibold text-red-900 mb-2">422 Unprocessable Entity</h3>
                      <p className="text-sm text-red-700 mb-3">Data field is not an array</p>
                      <pre className="bg-red-900 text-red-100 p-3 rounded text-sm font-mono">
{`{
  "is_success": false,
  "error": "Data field must be an array"
}`}
                      </pre>
                    </div>

                    <div className="border border-red-200 rounded-lg bg-red-50 p-4">
                      <h3 className="font-semibold text-red-900 mb-2">500 Internal Server Error</h3>
                      <p className="text-sm text-red-700 mb-3">Unexpected server error during processing</p>
                      <pre className="bg-red-900 text-red-100 p-3 rounded text-sm font-mono">
{`{
  "is_success": false,
  "error": "Internal server error occurred"
}`}
                      </pre>
                    </div>
                  </div>

                  <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="font-semibold text-blue-900 mb-2 flex items-center">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Best Practices
                    </h3>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Always check the <code className="bg-blue-100 px-1 rounded">is_success</code> field before processing response data</li>
                      <li>• Implement proper error handling for network failures and timeouts</li>
                      <li>• Validate input data on the client side before sending requests</li>
                      <li>• Handle empty arrays gracefully in your application logic</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </section>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold text-slate-900 mb-3">BFHL API</h3>
              <p className="text-sm text-slate-600">High-performance data processing REST API built with Node.js. Process mixed data arrays with comprehensive categorization and computation features.</p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-3">Resources</h3>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><a href="#" className="hover:text-slate-900">API Documentation</a></li>
                <li><a href="#" className="hover:text-slate-900">GitHub Repository</a></li>
                <li><a href="#" className="hover:text-slate-900">Rate Limits</a></li>
                <li><a href="#" className="hover:text-slate-900">Status Page</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-3">Support</h3>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><a href="#" className="hover:text-slate-900">Contact Support</a></li>
                <li><a href="#" className="hover:text-slate-900">Report Issues</a></li>
                <li><a href="#" className="hover:text-slate-900">Feature Requests</a></li>
                <li><a href="#" className="hover:text-slate-900">Community</a></li>
              </ul>
            </div>
          </div>
          <Separator className="my-8" />
          <div className="flex justify-between items-center">
            <p className="text-sm text-slate-500">© 2024 BFHL API. All rights reserved.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-400 hover:text-slate-600">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-slate-400 hover:text-slate-600">
                <Github className="h-4 w-4" />
              </a>
              <a href="#" className="text-slate-400 hover:text-slate-600">
                <i className="fab fa-linkedin"></i>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
