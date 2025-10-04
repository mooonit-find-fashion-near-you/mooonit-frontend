// listComponentsTree.ts
// Usage:
//   tsx listComponentsTree.ts            -> scans 'src' for .tsx,.ts,.jsx,.js
//   tsx listComponentsTree.ts myFolder   -> scan 'myFolder'
//   tsx listComponentsTree.ts --all      -> include ALL files
//   tsx listComponentsTree.ts --ext=.ts,.tsx,.js

import fs from "fs";
import path from "path";

const args = process.argv.slice(2);
const DEFAULT_ROOT = "src";
const rootArg = args.find((a) => !a.startsWith("--") && !a.includes("="));
const rootDir = rootArg || DEFAULT_ROOT;

const ALL_FLAG = args.includes("--all");
const extArg = args.find((a) => a.startsWith("--ext="));
const defaultExts = [".tsx", ".ts", ".jsx", ".js"];
const extensions = ALL_FLAG
    ? null
    : extArg
        ? extArg.split("=")[1].split(",").map((e) => e.trim())
        : defaultExts;

const IGNORE = new Set([
    "node_modules",
    ".git",
    ".next",
    "dist",
    "build",
    "out",
]);

function readDirSorted(p: string): string[] {
    try {
        return fs
            .readdirSync(p)
            .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }));
    } catch {
        return [];
    }
}

interface TreeNode {
    name: string;
    type: "dir" | "file";
    children?: TreeNode[];
}

// returns null if directory contains no matched files/subdirs
function scanDir(dir: string): TreeNode[] | null {
    if (!fs.existsSync(dir)) return null;
    const entries = readDirSorted(dir);
    const children: TreeNode[] = [];

    for (const entry of entries) {
        if (IGNORE.has(entry)) continue;
        const full = path.join(dir, entry);

        let stat: fs.Stats;
        try {
            stat = fs.statSync(full);
        } catch {
            continue;
        }

        if (stat.isDirectory()) {
            const sub = scanDir(full);
            if (sub) children.push({ name: entry, type: "dir", children: sub });
        } else {
            if (!extensions || extensions.includes(path.extname(entry).toLowerCase())) {
                children.push({ name: entry, type: "file" });
            }
        }
    }

    return children.length ? children : null;
}

function renderTree(nodes: TreeNode[], prefix = ""): string {
    let out = "";
    nodes.forEach((node, idx) => {
        const isLast = idx === nodes.length - 1;
        const pointer = isLast ? "└── " : "├── ";
        if (node.type === "dir") {
            out += `${prefix}${pointer}${node.name}/\n`;
            out += renderTree(node.children ?? [], prefix + (isLast ? "    " : "│   "));
        } else {
            out += `${prefix}${pointer}${node.name}\n`;
        }
    });
    return out;
}

const scanned = scanDir(rootDir);
const header = `📂 Project tree for "${rootDir}"\nGenerated: ${new Date().toISOString()}\n\n`;
let output: string;

if (!scanned) {
    output = header + "(no matching files found)\n";
} else {
    output = header + renderTree(scanned);
}

console.log(output);

// write to file (markdown fenced block so you can drop in docs)
const outFile = "COMPONENTS_TREE.md";
try {
    fs.writeFileSync(outFile, "```\n" + output + "\n```");
    console.log(`Saved tree to ./${outFile}`);
} catch (err: unknown) {
    if (err instanceof Error) {
        console.error("Failed to write file:", err.message);
    } else {
        console.error("Failed to write file:", err);
    }
}
