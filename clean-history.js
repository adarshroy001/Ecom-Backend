import { exec } from "node:child_process";

const filePath = "src/config/ecom-ef53d-firebase-adminsdk-fbsvc-893ae7744c.json";

// Run Git commands to clean the file from history
const commands = [
    `git filter-branch --force --index-filter "git rm --cached --ignore-unmatch ${filePath}" --prune-empty --tag-name-filter cat -- --all`,
    "git reflog expire --expire=now --all",
    "git gc --prune=now --aggressive",
];

const runCommand = (command) => {
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error: ${stderr}`);
                return reject(stderr);
            }
            console.log(stdout);
            resolve(stdout);
        });
    });
};

(async () => {
    try {
        for (const command of commands) {
            console.log(`Running: ${command}`);
            await runCommand(command);
        }
        console.log("Git history cleaned successfully.");
        console.log("Don't forget to force push your changes:");
        console.log("git push origin --force --all");
    } catch (error) {
        console.error("Failed to clean Git history:", error);
    }
})();

