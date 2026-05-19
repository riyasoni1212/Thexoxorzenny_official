const fs = require('fs');
const path = require('path');

const logPath = 'C:\\Users\\AC\\.gemini\\antigravity\\brain\\e9dbb835-26e3-4eb8-a1f1-205cad8c1918\\.system_generated\\logs\\overview.txt';

try {
  const content = fs.readFileSync(logPath, 'utf8');
  // The file has one JSON object per line
  const lines = content.split('\n');
  for (const line of lines) {
    if (!line.trim()) continue;
    try {
      const obj = JSON.parse(line);
      if (obj.step_index === 0) {
        console.log("FOUND CARD CODE:\n");
        console.log(obj.content);
        fs.writeFileSync('card_code.txt', obj.content);
        break;
      }
    } catch (e) {
      // ignore parse errors for partially written lines
    }
  }
} catch (err) {
  console.error("Error reading file:", err);
}
