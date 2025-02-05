import { ThirdwebStorage } from "@thirdweb-dev/storage";
import * as fs from "fs";
import * as path from "path";


// Here we get the IPFS URI of where our metadata has been uploaded
    //const uri = await storage.upload(metadata);
    // This will log a URL like ipfs://QmWgbcjKWCXhaLzMz4gNBxQpAHktQK6MkLvBkKXbsoWEEy/0
    //console.info(uri);

    // Here we a URL with a gateway that we can look at in the browser
    //const url = await storage.resolveScheme(uri);
    // This will log a URL like https://ipfs.thirdwebstorage.com/ipfs/QmWgbcjKWCXhaLzMz4gNBxQpAHktQK6MkLvBkKXbsoWEEy/0
    //console.info(url);

    // You can also download the data from the uri
    //const data = await storage.downloadJSON(uri);

const outputDir = "/Users/cgold/Projects/br-skins/src/assets/etherlink_images";
const jsonPath = path.join("/Users/cgold/Projects/br-skins/src/scripts", "images.json");

(async () => {
    const storage = new ThirdwebStorage({
        secretKey: "EdHXxgajrV6rlc8sxIpTuZhBswNQ0EtWm0KRmRLF1VXx2o1Oq0PFn3CvT7eMIwvt_rRpIj_hCtduvALzEGf_ZA",
    });
    const results = [];

    console.log(process.env.THIRDWEB_SECRET_KEY);

    try {
        // Use promise-based fs.promises.readdir instead of callback
        const files = await fs.promises.readdir(outputDir);
        
        for (const file of files) {
            try {
                const fullPath = path.join(outputDir, file);
                console.log("Filename: ", fullPath);
                const fileData = await fs.promises.readFile(fullPath);
                const uri = await storage.upload(fileData);
                results.push({ file, uri });
                console.info(`Uploaded ${file}: ${uri}`);
            } catch (uploadError) {
                console.error(`Failed to upload ${file}:`, uploadError);
                throw uploadError; // This throw will be caught by outer try-catch
            }
        }

        // Write results to JSON file
        await fs.promises.writeFile(
            jsonPath,
            JSON.stringify(results, null, 2)
        );
        console.info(`✅ URLs written to ${jsonPath}`);
    } catch (error) {
        console.error("Error reading directory or uploading files:", error);
        throw error; // Propagate error to caller
    }
})();
