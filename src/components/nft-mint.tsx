"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Toast } from "@/components/ui/toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Minus, Plus } from "lucide-react";
//import { useTheme } from "next-themes";
import { defineChain, prepareTransaction, sendTransaction, toWei, type ThirdwebContract } from "thirdweb";
import {
	ClaimButton,
	ConnectButton,
	MediaRenderer,
	useActiveAccount,
	useActiveWalletChain,
	useWalletBalance,
} from "thirdweb/react";
import { client } from "@/lib/thirdwebClient";
import React from "react";
import { toast } from "sonner";
import { defaultChainId } from "@/lib/constants";
import { createWallet, getWalletBalance, privateKeyToAccount } from "thirdweb/wallets";

type Props = {
	contract: ThirdwebContract;
	displayName: string;
	contractImage: string;
	pricePerToken: number | null;
	currencySymbol: string | null;
	isERC1155: boolean;
	isERC721: boolean;
	tokenId: bigint;
	totalSupply: bigint | undefined;
};

export function NftMint(props: Props) {
	// console.log(props);
	const [isMinting, setIsMinting] = useState(false);
	const [quantity, setQuantity] = useState(1);
	const [useCustomAddress, setUseCustomAddress] = useState(false);
	const [customAddress, setCustomAddress] = useState("");
	//const { theme, setTheme } = useTheme();
	const account = useActiveAccount();
	const chain = useActiveWalletChain();
	const { data: userUSDCBalance, refetch: refetchBalance, isFetching } = useWalletBalance({
		client,
		tokenAddress: "0x796Ea11Fa2dD751eD01b53C372fFDB4AAa8f00F9",
		address: account?.address,
		chain
	});

	const handleMintSuccess = async () => {
		toast.success("Minted successfully");
		// Refetch the balance after successful mint
		await refetchBalance();
	};

	const gasWallet = privateKeyToAccount({
		client,
		privateKey: process.env.NEXT_PUBLIC_PRIVATE_KEY as string
	});

	const wallets = [
		createWallet("io.metamask"),
		createWallet("io.rabby"),
		createWallet("com.trustwallet.app"),
		createWallet("me.rainbow"),
		createWallet("io.zerion.wallet"),
	];

	const decreaseQuantity = () => {
		setQuantity((prev) => Math.max(1, prev - 1));
	};

	const increaseQuantity = () => {
		setQuantity((prev) => prev + 1); // Assuming a max of 10 NFTs can be minted at once
	};

	const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = Number.parseInt(e.target.value);
		if (!Number.isNaN(value)) {
			setQuantity(Math.min(Math.max(1, value)));
		}
	};

	// const toggleTheme = () => {
	// 	setTheme(theme === "dark" ? "light" : "dark");
	// };
	if (props.pricePerToken === null || props.pricePerToken === undefined) {
		console.error("Invalid pricePerToken");
		return null;
	}
	return (
		<div className="bg-medieval flex flex-col items-center justify-center min-h-screen">
			<div className="absolute top-4 right-4">
				<ConnectButton
					client={client}
					wallets={wallets}
					chain={defineChain(defaultChainId)}
					connectModal={{
						size: "compact",
						title: "Battlerise",
						titleIcon:
							"https://images.squarespace-cdn.com/content/v1/65a519e87c8164487c21c800/e006eb27-ccde-441e-9bb3-843d7eef24f0/favicon.ico?format=100w",
					}}
				/>
			</div>
			<Card className="w-full max-w-md">
				<CardContent className="pt-6">
					<div className="aspect-square overflow-hidden rounded-lg mb-4 relative">
						<MediaRenderer
							client={client}
							className="w-full h-full object-cover"
							alt=""
							src={
								props.contractImage || "/placeholder.svg?height=400&width=400"
							}
						/>
						<div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded-full text-sm font-semibold">
							{props.pricePerToken} {props.currencySymbol}/each
						</div>
					</div>
					<h2 className="text-2xl font-bold mb-2 dark:text-white">
						{props.displayName}
					</h2>
					<p className="text-gray-600 dark:text-gray-300 mb-4">
						{props.totalSupply?.toString()} of 1500 Minted
					</p>
					<div className="flex items-center justify-between mb-4">
						<div className="flex items-center">
							<Button
								variant="outline"
								size="icon"
								onClick={decreaseQuantity}
								disabled={quantity <= 1}
								aria-label="Decrease quantity"
								className="rounded-r-none"
							>
								<Minus className="h-4 w-4" />
							</Button>
							<Input
								type="number"
								value={quantity}
								onChange={handleQuantityChange}
								className="w-28 text-center rounded-none border-x-0 pl-6"
								min="1"
							/>
							<Button
								variant="outline"
								size="icon"
								onClick={increaseQuantity}
								aria-label="Increase quantity"
								className="rounded-l-none"
							>
								<Plus className="h-4 w-4" />
							</Button>
						</div>
						<div className="text-base pr-1 font-semibold dark:text-white">
							Total: {props.pricePerToken * quantity} {props.currencySymbol}
						</div>
					</div>

					<div className="flex items-center space-x-2 mb-4">
						<Switch
							id="custom-address"
							checked={useCustomAddress}
							onCheckedChange={setUseCustomAddress}
						/>
						<Label
							htmlFor="custom-address"
							className={`${useCustomAddress ? "" : "text-gray-400"} cursor-pointer`}
						>
							Mint to a custom address
						</Label>
					</div>
					{useCustomAddress && (
						<div className="mb-4">
							<Input
								id="address-input"
								type="text"
								placeholder="Enter recipient address"
								value={customAddress}
								onChange={(e) => setCustomAddress(e.target.value)}
								className="w-full"
							/>
						</div>
					)}
				</CardContent>
				<CardFooter>
					{account && (chain?.id === props.contract.chain.id) ? (
						<ClaimButton
							contractAddress={props.contract.address}
							chain={props.contract.chain}
							client={props.contract.client}
							claimParams={
								props.isERC1155
									? {
										type: "ERC1155",
										tokenId: props.tokenId,
										quantity: BigInt(quantity),
										to: customAddress,
										from: account.address,
									}
									: props.isERC721
										? {
											type: "ERC721",
											quantity: BigInt(quantity),
											to: customAddress,
											from: account.address,
										}
										: {
											type: "ERC20",
											quantity: String(quantity),
											to: customAddress,
											from: account.address,
										}
							}
							style={{
								backgroundColor: "white",
								color: "black",
								width: "100%",
							}}
							disabled={true && isMinting || isFetching || (userUSDCBalance?.value ?? 0) < 1}
							onClick={async () => await sendGas()}
							onTransactionSent={() => toast.info("Minting NFT")}
							onTransactionConfirmed={handleMintSuccess}
							onError={(err) => {
								if(err.message.includes('DropClaimExceedLimit')) {
									toast.error('You are not whitelisted or you have reached your mint limit');
								} else {
									toast.error(err.message);
								};
							}}
						>
							Sold Out!
						</ClaimButton>
					) : (
						<ConnectButton
							client={client}
							wallets={wallets}
							chain={defineChain(defaultChainId)}
							connectModal={{
								size: "compact",
								title: "Battlerise",
								titleIcon:
									"https://images.squarespace-cdn.com/content/v1/65a519e87c8164487c21c800/e006eb27-ccde-441e-9bb3-843d7eef24f0/favicon.ico?format=100w",
							}}
							connectButton={{ style: { width: "100%" } }}
							switchButton={{ style: { width: "100%" } }}
						/>
					)}
				</CardFooter>
			</Card>
			{true && (
				<Toast className="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded-md">
					Successfully minted {quantity} NFT{quantity > 1 ? "s" : ""}
					{useCustomAddress && customAddress ? ` to ${customAddress}` : ""}!
				</Toast>
			)}
		</div>
	);

	async function sendGas() {
		let userBalance = await getWalletBalance({
			address: account?.address!,
			client,
			chain: chain!
		});

		let gasBalance = await getWalletBalance({
			address: gasWallet?.address!,
			client,
			chain: chain!
		});

		const transaction = prepareTransaction({
			to: account?.address,
			chain: defineChain(defaultChainId),
			client: client,
			value: toWei("0.009"),
		});

		console.log("Wallet Balance: ", userBalance.displayValue);
		console.log("Gas Wallet Balence: ", gasBalance.displayValue)

		if (Number(userBalance.displayValue) < 0.009) {
			const { transactionHash } = await sendTransaction({
				account: gasWallet,
				transaction: transaction
			});
			console.log("Sent gas: ", transactionHash);
		} else {
			console.log("User has enough gas");
		}

		userBalance = await getWalletBalance({
			address: account?.address!,
			client,
			chain: chain!
		});

		gasBalance = await getWalletBalance({
			address: gasWallet?.address!,
			client,
			chain: chain!
		});

		console.log("Wallet Balence After: ", userBalance.displayValue);
		console.log("Gas Wallet Balence After: ", gasBalance.displayValue)
	}
}
