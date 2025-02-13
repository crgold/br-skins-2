import { privateKeyToAccount } from "thirdweb/wallets";
import { client } from "./thirdwebClient";

export const gasWallet = privateKeyToAccount({
    client,
    privateKey: process.env.PRIVATE_KEY!
});