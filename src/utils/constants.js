import { utils } from 'ethers';

export const constants = {
    // 'CONTRACT_ADDRESS': "0x66B752174CE801c2b828227371D55959abc1C55c", // DEV
    // 'CHAIN_ID': utils.hexValue(80001), // DEV
    // 'CHAIN_RPC': 'https://matic-mumbai.chainstacklabs.com/', // DEV
    'CONTRACT_ADDRESS': "0x689AA6761BB78501f15B49B5f54C7dc86d069C04", // PROD
    'CHAIN_ID': utils.hexValue(137), // PROD
    'CHAIN_RPC': 'https://polygon-rpc.com/', //PROD
    'PRICE': "2.99",
    'CHAIN_NAME': 'Polygon Mainnet',
    'CHAIN_SCAN': 'https://polygonscan.com/',
    'NATIVE_TOKEN': { name: "MATIC", symbol: "MATIC", decimals: 18 },
    'OFFSET': 15,
}
