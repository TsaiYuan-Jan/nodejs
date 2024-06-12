const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// 設置靜態文件夾
app.use(express.static(path.join(__dirname, 'public')));

// 啟動伺服器
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
