// Deno Web API Test Suite for 67lang WebIDL Integration
// Run with: deno run --allow-all web_api_tests.js

console.log("=== Starting Deno Web API Test Suite ===");

// Test 1: Base64 Encoding/Decoding
console.log("\n--- Testing atob/btoa ---");
const testStrings = ["Hello World", "Test 123", "Special chars: !@#$%"];
for (const str of testStrings) {
    const encoded = btoa(str);
    const decoded = atob(encoded);
    console.log(`Original: "${str}" -> Encoded: "${encoded}" -> Decoded: "${decoded}"`);
}

// Test 2: TextEncoder/TextDecoder
console.log("\n--- Testing TextEncoder/TextDecoder ---");
const encoder = new TextEncoder();
const decoder = new TextDecoder();
const textTests = ["ASCII text", "Unicode: 🦕 Deno", "Numbers: 42"];
for (const text of textTests) {
    const bytes = encoder.encode(text);
    const restored = decoder.decode(bytes);
    console.log(`Text: "${text}" -> Bytes: [${bytes.slice(0, 10).join(',')}...] -> Restored: "${restored}"`);
}

// Test 3: URL and URLSearchParams
console.log("\n--- Testing URL/URLSearchParams ---");
const urls = [
    "https://example.com/path?name=value",
    "http://localhost:8080/api/v1?id=123&type=user",
    "https://test.dev/search?q=deno&lang=en"
];
for (const urlStr of urls) {
    const url = new URL(urlStr);
    console.log(`URL: ${url.href}`);
    console.log(`  Protocol: ${url.protocol}, Host: ${url.hostname}, Path: ${url.pathname}`);
    console.log(`  Search params: ${Array.from(url.searchParams.entries()).map(([k, v]) => `${k}=${v}`).join(', ')}`);
}

// Test 4: Blob and File
console.log("\n--- Testing Blob/File ---");
const blobTests = [
    ["Hello Blob", "text/plain"],
    ["JSON data: {\"key\": \"value\"}", "application/json"],
    ["Binary: \x00\x01\x02\x03", "application/octet-stream"]
];

for (let i = 0; i < blobTests.length; i++) {
    const [content, type] = blobTests[i];
    const blob = new Blob([content], { type });
    const file = new File([content], `test${i}.txt`, { type });
    
    console.log(`Blob ${i}: size=${blob.size}, type="${blob.type}"`);
    console.log(`File ${i}: name="${file.name}", size=${file.size}, type="${file.type}"`);
    
    // Read blob content (async operation)
    const text = await blob.text();
    console.log(`  Content: "${text.slice(0, 20)}${text.length > 20 ? '...' : ''}"`);
}

// Test 5: FormData
console.log("\n--- Testing FormData ---");
const formData = new FormData();
const formTests = [
    ["username", "testuser"],
    ["email", "test@example.com"],
    ["age", "25"]
];

for (const [key, value] of formTests) {
    formData.append(key, value);
}

formData.append("file", new File(["file content"], "test.txt"));
console.log("FormData entries:");
for (const [key, value] of formData.entries()) {
    if (value instanceof File) {
        console.log(`  ${key}: File(name="${value.name}", size=${value.size})`);
    } else {
        console.log(`  ${key}: "${value}"`);
    }
}

// Test 6: Crypto API
console.log("\n--- Testing Crypto API ---");
// Random UUID generation
for (let i = 0; i < 3; i++) {
    const uuid = crypto.randomUUID();
    console.log(`Random UUID ${i + 1}: ${uuid}`);
}

// Random bytes
const randomSizes = [8, 16, 32];
for (const size of randomSizes) {
    const bytes = crypto.getRandomValues(new Uint8Array(size));
    console.log(`Random ${size} bytes: [${Array.from(bytes.slice(0, 8)).join(', ')}${size > 8 ? '...' : ''}]`);
}

// Hashing (async)
const hashInputs = ["Hello World", "Test data", "Another string"];
for (const input of hashInputs) {
    const data = encoder.encode(input);
    const hash = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hash));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    console.log(`SHA-256("${input}") = ${hashHex.slice(0, 16)}...`);
}

// Test 7: Performance timing
console.log("\n--- Testing Performance API ---");
const start1 = performance.now();
// Simulate some work
let sum = 0;
for (let i = 0; i < 1000000; i++) {
    sum += i;
}
const end1 = performance.now();
console.log(`Simple loop took ${(end1 - start1).toFixed(2)}ms, result: ${sum}`);

// Performance marks and measures
performance.mark("test-start");
await new Promise(resolve => setTimeout(resolve, 10)); // Small delay
performance.mark("test-end");
performance.measure("test-duration", "test-start", "test-end");
const entries = performance.getEntriesByType("measure");
for (const entry of entries) {
    console.log(`Performance measure "${entry.name}": ${entry.duration.toFixed(2)}ms`);
}

// Test 8: Timers (without lambdas - using named functions)
console.log("\n--- Testing Timers ---");

function timerCallback1() {
    console.log("Timer callback 1 executed");
}

function timerCallback2() {
    console.log("Timer callback 2 executed");
}

// Note: In 67lang without lambdas, you'll need to define named functions for callbacks
const timer1 = setTimeout(timerCallback1, 50);
const timer2 = setTimeout(timerCallback2, 100);

// Cancel one timer to test clearTimeout
clearTimeout(timer2);
console.log("Set timer1 (50ms), set and cancelled timer2 (100ms)");

// Wait for timer to execute
await new Promise(resolve => setTimeout(resolve, 150));

// Test 9: Event and EventTarget
console.log("\n--- Testing Event/EventTarget ---");
const target = new EventTarget();

function eventHandler(event) {
    console.log(`Event received: type="${event.type}", timeStamp=${event.timeStamp}`);
}

// Note: In 67lang without lambdas, define named event handler functions
target.addEventListener("test-event", eventHandler);
target.addEventListener("custom-event", eventHandler);

const events = ["test-event", "custom-event", "another-event"];
for (const eventType of events) {
    const event = new Event(eventType);
    target.dispatchEvent(event);
}

// Custom events with data
const customEvent = new CustomEvent("data-event", {
    detail: { message: "Hello from custom event", value: 42 }
});

function customEventHandler(event) {
    console.log(`Custom event: ${JSON.stringify(event.detail)}`);
}

target.addEventListener("data-event", customEventHandler);
target.dispatchEvent(customEvent);

// Test 10: Structured Clone
console.log("\n--- Testing structuredClone ---");
const cloneTests = [
    { name: "John", age: 30, hobbies: ["reading", "coding"] },
    { x: 1, y: { z: [1, 2, 3] }, date: new Date() },
    new Map([["key1", "value1"], ["key2", "value2"]])
];

for (let i = 0; i < cloneTests.length; i++) {
    const original = cloneTests[i];
    const cloned = structuredClone(original);
    console.log(`Clone test ${i + 1}:`);
    console.log(`  Original: ${JSON.stringify(original, null, 0).slice(0, 50)}...`);
    console.log(`  Cloned: ${JSON.stringify(cloned, null, 0).slice(0, 50)}...`);
    console.log(`  Same reference: ${original === cloned}`);
}

// Test 11: Console features
console.log("\n--- Testing Console Features ---");
console.log("Standard log message");
console.info("Info message");
console.warn("Warning message");
console.error("Error message");

// Console timing
console.time("console-timer");
await new Promise(resolve => setTimeout(resolve, 20));
console.timeEnd("console-timer");

// Test 12: ReadableStream basic usage
console.log("\n--- Testing ReadableStream ---");

// Create a simple readable stream
const stream = new ReadableStream({
    start(controller) {
        const data = ["chunk1", "chunk2", "chunk3"];
        for (const chunk of data) {
            controller.enqueue(encoder.encode(chunk));
        }
        controller.close();
    }
});

const reader = stream.getReader();
let streamResult = "";
try {
    while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        streamResult += decoder.decode(value);
    }
} finally {
    reader.releaseLock();
}
console.log(`Stream result: "${streamResult}"`);

// Test 13: TransformStream
console.log("\n--- Testing TransformStream ---");
const upperCaseTransform = new TransformStream({
    transform(chunk, controller) {
        const text = decoder.decode(chunk);
        controller.enqueue(encoder.encode(text.toUpperCase()));
    }
});

const inputStream = new ReadableStream({
    start(controller) {
        controller.enqueue(encoder.encode("hello "));
        controller.enqueue(encoder.encode("world "));
        controller.enqueue(encoder.encode("from "));
        controller.enqueue(encoder.encode("transform"));
        controller.close();
    }
});

const transformedStream = inputStream.pipeThrough(upperCaseTransform);
const transformReader = transformedStream.getReader();
let transformResult = "";
try {
    while (true) {
        const { done, value } = await transformReader.read();
        if (done) break;
        transformResult += decoder.decode(value);
    }
} finally {
    transformReader.releaseLock();
}
console.log(`Transform result: "${transformResult}"`);

// Test 14: MessageChannel
console.log("\n--- Testing MessageChannel ---");
const channel = new MessageChannel();
const { port1, port2 } = channel;

function port1Handler(event) {
    console.log(`Port1 received: "${event.data}"`);
    port1.postMessage("Response from port1");
    port1.close();
}

function port2Handler(event) {
    console.log(`Port2 received: "${event.data}"`);
    port2.close();
}

port1.onmessage = port1Handler;
port2.onmessage = port2Handler;

port2.postMessage("Hello from port2");
// Small delay to let message propagate
await new Promise(resolve => setTimeout(resolve, 10));

// Test 15: Simple fetch test (if network is available)
console.log("\n--- Testing Fetch API ---");
try {
    // Create a simple data URL to test fetch without external dependencies
    const dataUrl = "data:text/plain;base64," + btoa("Hello from data URL");
    const response = await fetch(dataUrl);
    const text = await response.text();
    console.log(`Fetch test - Status: ${response.status}, Content: "${text}"`);
    console.log(`Response headers: Content-Type = "${response.headers.get('content-type')}"`);
} catch (error) {
    console.log(`Fetch test failed: ${error.message}`);
}

// Test 16: Headers API
console.log("\n--- Testing Headers API ---");
const headers = new Headers();
const headerTests = [
    ["Content-Type", "application/json"],
    ["Authorization", "Bearer token123"],
    ["X-Custom-Header", "custom-value"]
];

for (const [name, value] of headerTests) {
    headers.set(name, value);
}

console.log("Headers entries:");
for (const [name, value] of headers.entries()) {
    console.log(`  ${name}: ${value}`);
}

// Test 17: Request/Response objects
console.log("\n--- Testing Request/Response ---");
const testRequest = new Request("https://example.com/api", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ test: "data" })
});

console.log(`Request: ${testRequest.method} ${testRequest.url}`);
console.log(`Request headers: ${testRequest.headers.get("Content-Type")}`);

const testResponse = new Response("Response body content", {
    status: 200,
    statusText: "OK",
    headers: { "Content-Type": "text/plain" }
});

console.log(`Response: ${testResponse.status} ${testResponse.statusText}`);
const responseBody = await testResponse.text();
console.log(`Response body: "${responseBody}"`);

// Test 18: URLPattern
console.log("\n--- Testing URLPattern ---");
const patterns = [
    { pattern: "/users/:id", url: "https://example.com/users/123" },
    { pattern: "/api/:version/posts", url: "https://example.com/api/v1/posts" },
    { pattern: "/files/*", url: "https://example.com/files/documents/test.pdf" }
];

for (const { pattern, url } of patterns) {
    try {
        const urlPattern = new URLPattern({ pathname: pattern });
        const match = urlPattern.exec(url);
        if (match) {
            console.log(`Pattern "${pattern}" matches "${url}"`);
            console.log(`  Groups: ${JSON.stringify(match.pathname.groups)}`);
        } else {
            console.log(`Pattern "${pattern}" does not match "${url}"`);
        }
    } catch (error) {
        console.log(`URLPattern test failed: ${error.message}`);
    }
}

console.log("\n=== All Web API Tests Completed ===");

// Summary of what was tested
const testedAPIs = [
    "atob/btoa", "TextEncoder/TextDecoder", "URL/URLSearchParams", 
    "Blob/File", "FormData", "Crypto API", "Performance", "Timers",
    "Event/EventTarget", "structuredClone", "Console", "ReadableStream",
    "TransformStream", "MessageChannel", "Fetch", "Headers", 
    "Request/Response", "URLPattern"
];

console.log(`\nTested APIs (${testedAPIs.length}): ${testedAPIs.join(", ")}`);

// Note about omitted APIs that require lambdas or are unstable:
console.log("\n--- APIs Omitted ---");
console.log("• WebSocket (requires event handlers/lambdas)");
console.log("• Worker (requires separate worker files and lambdas)"); 
console.log("• localStorage/sessionStorage (requires file system access)");
console.log("• alert/confirm/prompt (require user interaction)");
console.log("• WebSocketStream (unstable)");
console.log("• BroadcastChannel (unstable)");
console.log("• WebGPU (unstable)");
console.log("• CompressionStream (not in stable Deno 1.18)");