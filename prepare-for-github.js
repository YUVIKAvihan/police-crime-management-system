const fs = require('fs');
const path = require('path');

console.log('🚀 Preparing Police Crime Management System for GitHub...\n');

// 1. Replace the main README with GitHub version
try {
  if (fs.existsSync('README-GITHUB.md')) {
    fs.copyFileSync('README-GITHUB.md', 'README.md');
    console.log('✅ Updated README.md with GitHub version');
  }
} catch (error) {
  console.log('❌ Error updating README:', error.message);
}

// 2. Create screenshots directory
try {
  if (!fs.existsSync('screenshots')) {
    fs.mkdirSync('screenshots');
    console.log('✅ Created screenshots directory');
  }
  
  // Create placeholder files for screenshots
  const screenshots = [
    'login.png',
    'dashboard.png', 
    'crimes.png',
    'criminals.png',
    'add-crime.png'
  ];
  
  screenshots.forEach(screenshot => {
    const screenshotPath = path.join('screenshots', screenshot);
    if (!fs.existsSync(screenshotPath)) {
      fs.writeFileSync(screenshotPath, '# Placeholder for ' + screenshot);
    }
  });
  
  console.log('✅ Created screenshot placeholders');
} catch (error) {
  console.log('❌ Error creating screenshots:', error.message);
}

// 3. Update package.json with GitHub info
try {
  const packagePath = 'package.json';
  if (fs.existsSync(packagePath)) {
    const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
    
    // Update with your GitHub info
    packageJson.repository.url = 'https://github.com/yourusername/police-crime-management.git';
    packageJson.bugs.url = 'https://github.com/yourusername/police-crime-management/issues';
    packageJson.homepage = 'https://github.com/yourusername/police-crime-management#readme';
    
    fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2));
    console.log('✅ Updated package.json with repository info');
  }
} catch (error) {
  console.log('❌ Error updating package.json:', error.message);
}

// 4. Create LICENSE file
try {
  const licenseContent = `MIT License

Copyright (c) 2024 Your Name

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`;

  fs.writeFileSync('LICENSE', licenseContent);
  console.log('✅ Created LICENSE file');
} catch (error) {
  console.log('❌ Error creating LICENSE:', error.message);
}

// 5. Clean up temporary files
const tempFiles = [
  'register-admin.js',
  'create-sample-data.js',
  'populate-sample-data.js',
  'create-crimes-properly.js',
  'create-admin.js',
  'access-info.js',
  'share-info.js',
  'share-with-friend.md'
];

tempFiles.forEach(file => {
  try {
    if (fs.existsSync(file)) {
      fs.unlinkSync(file);
      console.log(`✅ Removed temporary file: ${file}`);
    }
  } catch (error) {
    console.log(`❌ Error removing ${file}:`, error.message);
  }
});

console.log('\n🎉 GitHub preparation completed!');
console.log('\n📋 Next steps:');
console.log('1. Initialize git repository: git init');
console.log('2. Add files: git add .');
console.log('3. Commit: git commit -m "Initial commit: Police Crime Management System"');
console.log('4. Create GitHub repository');
console.log('5. Add remote: git remote add origin https://github.com/yourusername/police-crime-management.git');
console.log('6. Push: git push -u origin main');
console.log('\n📸 Don\'t forget to:');
console.log('• Take screenshots of your application');
console.log('• Replace placeholder images in screenshots/ folder');
console.log('• Update README.md with your GitHub username');
console.log('• Update author information in package.json');
console.log('\n🌐 For deployment:');
console.log('• Check DEPLOYMENT.md for detailed instructions');
console.log('• Set up MongoDB Atlas for cloud database');
console.log('• Deploy frontend to Vercel/Netlify');
console.log('• Deploy backend to Railway/Heroku');