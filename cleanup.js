import fs from 'fs';
import path from 'path';

function cleanupDir(dirPath, prefix, extensionMap = null) {
  const files = fs.readdirSync(dirPath);
  const seenSizes = new Set();
  
  // Sort files so that those ending with (1) come later and can be detected as dupes
  files.sort();
  
  let counter = 1;
  const renames = [];

  for (const file of files) {
    const fullPath = path.join(dirPath, file);
    if (!fs.statSync(fullPath).isFile()) continue;
    
    const size = fs.statSync(fullPath).size;
    
    if (seenSizes.has(size)) {
      console.log(`Duplicate found (size ${size}): deleting ${file}`);
      fs.unlinkSync(fullPath);
      continue;
    }
    
    seenSizes.add(size);
    
    // Rename
    let ext = path.extname(file).toLowerCase();
    if (extensionMap && extensionMap[ext]) {
        ext = extensionMap[ext];
    }
    // If it's something like .jpeg, change to .jpg
    if (ext === '.jpeg') ext = '.jpg';

    const newName = `${prefix}_${counter}${ext}`;
    const newPath = path.join(dirPath, newName);
    
    if (fullPath !== newPath) {
      renames.push({ old: fullPath, new: newPath, oldName: file, newName });
    }
    
    counter++;
  }
  
  // Apply renames
  for (const { old, new: newPath, oldName, newName } of renames) {
    // If destination exists, we need a temp name or just skip if it's already perfectly named? 
    // It's safer to rename all to a temp name first, then to final name.
    const tempPath = old + '.tmp';
    fs.renameSync(old, tempPath);
  }
  for (const { old, new: newPath, oldName, newName } of renames) {
    fs.renameSync(old + '.tmp', newPath);
    console.log(`Renamed: "${oldName}" -> "${newName}"`);
  }
  
  return renames;
}

// 1. Cleanup images
console.log('Cleaning up images...');
cleanupDir(path.join(process.cwd(), 'public', 'images', 'instagram'), 'post');

// 2. Cleanup videos
console.log('\nCleaning up videos...');
const videoRenames = cleanupDir(path.join(process.cwd(), 'public', 'videos', 'projects'), 'video');

// 3. Output mapping for projects.ts
console.log('\nVideo Renaming Map:');
const mapping = {};
for (const r of videoRenames) {
  mapping[r.oldName] = r.newName;
}
fs.writeFileSync('video-mapping.json', JSON.stringify(mapping, null, 2));
console.log('Saved video-mapping.json');
