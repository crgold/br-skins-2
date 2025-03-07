"use client";

import { NftMint } from "@/components/nft-mint";
import {
	defaultChainId,
	defaultNftContractAddress,
	defaultTokenId,
} from "@/lib/constants";
import { client } from "@/lib/thirdwebClient";
import { defineChain, getContract, NATIVE_TOKEN_ADDRESS, toTokens } from "thirdweb";
import { getContractMetadata } from "thirdweb/extensions/common";
import {
	getActiveClaimCondition as getActiveClaimCondition1155,
	getNFT,
	isERC1155,
} from "thirdweb/extensions/erc1155";
import { getCurrencyMetadata } from "thirdweb/extensions/erc20";
import {
	getActiveClaimCondition as getActiveClaimCondition721,
	isERC721,
	getTotalClaimedSupply
} from "thirdweb/extensions/erc721";
import { getActiveClaimCondition as getActiveClaimCondition20 } from "thirdweb/extensions/erc20";
import { useReadContract } from "thirdweb/react";
import { privateKeyToAccount } from "thirdweb/wallets";
//import {  } from "/Users/cgold/Projects/br-skins/src/thirdweb/128123/0x56ced5373deeb41ecbb8db2090fe0b452dab7cd1"

// This page renders on the client.
// If you are looking for a server-rendered version, checkout src/ssr/page.tsx
export default function Home() {
	const tokenId = defaultTokenId;
	const chain = defineChain(defaultChainId);
	const contract = getContract({
		address: defaultNftContractAddress,
		chain,
		client,
	});
	const isERC721Query = useReadContract(isERC721, { contract });
	const isERC1155Query = useReadContract(isERC1155, { contract });
	const contractMetadataQuery = useReadContract(getContractMetadata, {
		contract,
	});

	const nftQuery = useReadContract(getNFT, {
		contract,
		tokenId,
		queryOptions: { enabled: isERC1155Query.data },
	});

	const claimCondition1155 = useReadContract(getActiveClaimCondition1155, {
		contract,
		tokenId,
		queryOptions: {
			enabled: isERC1155Query.data,
		},
	});

	const claimCondition721 = useReadContract(getActiveClaimCondition721, {
		contract,
		queryOptions: { enabled: isERC721Query.data },
	});

	const claimCondition20 = useReadContract(getActiveClaimCondition20, {
		contract,
		queryOptions: { enabled: !isERC721Query.data && !isERC1155Query.data },
	});

	const displayName = isERC1155Query.data
		? nftQuery.data?.metadata.name
		: contractMetadataQuery.data?.name;

	const priceInWei = isERC1155Query.data
		? claimCondition1155.data?.pricePerToken
		: isERC721Query.data
			? claimCondition721.data?.pricePerToken
			: claimCondition20.data?.pricePerToken;

	const currency = isERC1155Query.data
	? claimCondition1155.data?.currency
	: isERC721Query.data
		? claimCondition721.data?.currency
		: claimCondition20.data?.currency;

	const currencyContract = getContract({
		client,
		chain,
		address: NATIVE_TOKEN_ADDRESS || "",
	});

	const currencyMetadata = useReadContract(getCurrencyMetadata, {
		contract: currencyContract,
		queryOptions: { enabled: !!currency },
	});

	const currencySymbol = currencyMetadata.data?.symbol || "";

	const claimedSupply = useReadContract(getTotalClaimedSupply, {
		contract
	});

	const pricePerToken =
		currencyMetadata.data && priceInWei !== null && priceInWei !== undefined
			? Number(toTokens(priceInWei, currencyMetadata.data.decimals))
			: null;

	return (
		<NftMint
			contract={contract}
			displayName={displayName || ""}
			contractImage={contractMetadataQuery.data?.image || ""}
			currencySymbol={currencySymbol}
			pricePerToken={pricePerToken}
			isERC1155={!!isERC1155Query.data}
			isERC721={!!isERC721Query.data}
			tokenId={tokenId}
			totalSupply={claimedSupply.data}
		/>
	);
}
