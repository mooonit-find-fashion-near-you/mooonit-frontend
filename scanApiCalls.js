import fs from "fs";
import path from "path";

const rootDir = "./src";
const ignoreDirs = ["src/app/api", "src/data"];
const fileExtensions = [".js", ".jsx", ".ts", ".tsx"];
const results = [];

// Regex patterns to match API calls
const patterns = [
    /(apiClient|axios)\s*\.\s*(get|post|put|delete)\s*\(\s*['"`]([^'"`]+)['"`]\s*(?:,\s*([\s\S]*?))?\)/g,
    /fetch\s*\(\s*['"`]([^'"`]+)['"`]\s*(?:,\s*([\s\S]*?))?\)/g,
    /(httpService|request|api|callApi|makeRequest)\s*\(\s*['"`]([^'"`]+)['"`]\s*(?:,\s*([\s\S]*?))?\)/g,
    /['"`](\/api\/[^'"`]+)['"`]/g,
];

function scanDir(dir) {
    const files = fs.readdirSync(dir);

    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            const relativePath = path.relative(rootDir, fullPath).replace(/\\/g, "/");
            if (ignoreDirs.some((ignore) => relativePath.startsWith(ignore))) continue;

            scanDir(fullPath);
        } else if (fileExtensions.some((ext) => file.endsWith(ext))) {
            const content = fs.readFileSync(fullPath, "utf-8");

            for (const pattern of patterns) {
                let match;
                while ((match = pattern.exec(content)) !== null) {
                    let client, method, endpoint, data;

                    if (pattern === patterns[0]) {
                        client = match[1];
                        method = match[2].toUpperCase();
                        endpoint = match[3];
                        data = match[4] || "—";
                    } else if (pattern === patterns[1]) {
                        client = "fetch";
                        method = inferMethodFromContext(content, match.index);
                        endpoint = match[1];
                        data = match[2] || "—";
                    } else if (pattern === patterns[2]) {
                        client = match[1];
                        method = inferMethodFromContext(content, match.index);
                        endpoint = match[2];
                        data = match[3] || "—";
                    } else {
                        client = "—";
                        method = "GET";
                        endpoint = match[1];
                        data = "—";
                    }

                    results.push({
                        file: fullPath.replace(/\\/g, "/"),
                        client,
                        method,
                        endpoint,
                        data: truncate(cleanData(data)),
                    });
                }
            }
        }
    }
}

function inferMethodFromContext(content, index) {
    const context = content.slice(Math.max(0, index - 200), index + 200).toLowerCase();
    if (context.includes("post")) return "POST";
    if (context.includes("put")) return "PUT";
    if (context.includes("delete")) return "DELETE";
    return "GET";
}

function cleanData(data) {
    return data.replace(/[\r\n]+/g, " ").replace(/\s+/g, " ").trim();
}

function truncate(str, len = 100) {
    return str.length > len ? str.slice(0, len) + "..." : str;
}

// Run scan
scanDir(rootDir);

// Display results
console.log("\n🧾 Deep API Documentation Extracted:\n");
if (results.length > 0) {
    console.table(
        results.map((r) => ({
            File: r.file.replace(rootDir, ""),
            Client: r.client,
            Method: r.method,
            Endpoint: r.endpoint,
            Data: r.data,
        }))
    );
} else {
    console.log("⚠️ No API calls found outside /src/app/api or /src/data");
}

// Write to file (json fenced block so you can drop in docs)
const outFile2 = "API_CALLS.json";
try {
    fs.writeFileSync(outFile2, JSON.stringify(results, null, 2));
    console.log(`Saved calls to ./${outFile2}`);
} catch (err) {
    if (err instanceof Error) {
        console.error("Failed to write file:", err.message);
    } else {
        console.error("Failed to write file:", err);
    }
}

// Write to file (markdown fenced block so you can drop in docs)
const outFileMd = "API_CALLS.md";

function generateMarkdownTable(results) {
    if (!results.length) return "⚠️ No API calls found.";

    const headers = ["File", "Client", "Method", "Endpoint", "Data"];
    const lines = [];

    // Header row
    lines.push(`| ${headers.join(" | ")} |`);
    // Separator row
    lines.push(`| ${headers.map(() => "---").join(" | ")} |`);

    // Data rows
    results.forEach((r) => {
        lines.push(
            `| ${r.file.replace(rootDir, "")} | ${r.client} | ${r.method} | ${r.endpoint} | ${r.data} |`
        );
    });

    return lines.join("\n");
}

try {
    const mdContent = generateMarkdownTable(results);
    fs.writeFileSync(outFileMd, mdContent);
    console.log(`Saved Markdown table to ./${outFileMd}`);
} catch (err) {
    if (err instanceof Error) {
        console.error("Failed to write Markdown file:", err.message);
    } else {
        console.error("Failed to write Markdown file:", err);
    }
}
