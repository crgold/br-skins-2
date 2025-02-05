import * as fs from 'fs';
import * as path from 'path';

const imagesPath = path.join(process.cwd(), 'images.json');
const outputPath = path.join(process.cwd(), 'metadata.json');

(async () => {
    try {
        // Read and parse images.json
        const imagesData = JSON.parse(await fs.promises.readFile(imagesPath, 'utf8'));
        
        // Create metadata array
        const metadata = imagesData.map((item, index) => {
            const parts = item.file.replace('.png', '').split(' ');
            // Remove "Etherlink" and get rarity
            parts.shift(); // Remove "Etherlink"
            const rarity = parts.shift(); // Get rarity
            // Join remaining parts for name
            const name = parts.join(' ');
            
            return {
                name,
                rarity,
                id: (354 + index).toString()
            };
        });
        
        // Write metadata to file
        await fs.promises.writeFile(
            outputPath,
            JSON.stringify(metadata, null, 2)
        );
        
        console.log('✅ Metadata created successfully');
        return metadata;
    } catch (error) {
        console.error('Failed to create metadata:', error);
        throw error;
    }
})()