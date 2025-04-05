import React, { useState } from 'react';
import Arweave from 'arweave';
import * as crypto from 'crypto';

// Initialize Arweave
const arweave = Arweave.init({
    host: 'arweave.net',
    port: 443,
    protocol: 'https'
});

// Encryption Configuration (same as in your script)
const ALGORITHM = 'aes-256-gcm';
const KEY_BYTES = 32; // 256 bits
const IV_BYTES = 12; // Standard for GCM
const AUTH_TAG_BYTES = 16; // Standard for GCM

const ArweaveEncryptPage: React.FC = () => {
    // State hooks
    const [walletKey, setWalletKey] = useState<any>(null);
    const [walletAddress, setWalletAddress] = useState<string>('');
    const [jsonData, setJsonData] = useState<any>(null);
    const [encryptionKey, setEncryptionKey] = useState<Buffer | null>(null);
    const [transactionId, setTransactionId] = useState<string>('');
    const [status, setStatus] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [result, setResult] = useState<any>(null);

    // Load wallet function
    const handleWalletUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            setStatus('Loading wallet...');
            const file = e.target.files?.[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = async (event) => {
                try {
                    const walletData = event.target?.result as string;
                    const jwk = JSON.parse(walletData);
                    setWalletKey(jwk);

                    const address = await arweave.wallets.jwkToAddress(jwk);
                    setWalletAddress(address);
                    setStatus(`Wallet loaded. Address: ${address}`);
                } catch (error) {
                    setStatus(`Error parsing wallet: ${error}`);
                }
            };
            reader.readAsText(file);
        } catch (error) {
            setStatus(`Error loading wallet: ${error}`);
        }
    };

    // Load JSON file
    const handleJsonUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            setStatus('Loading JSON file...');
            const file = e.target.files?.[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const jsonString = event.target?.result as string;
                    const jsonObject = JSON.parse(jsonString);
                    setJsonData(jsonObject);
                    setStatus('JSON file loaded successfully');
                } catch (error) {
                    setStatus(`Error parsing JSON: ${error}`);
                }
            };
            reader.readAsText(file);
        } catch (error) {
            setStatus(`Error loading JSON: ${error}`);
        }
    };

    // Generate encryption key
    const generateKey = () => {
        const key = crypto.randomBytes(KEY_BYTES);
        setEncryptionKey(key);
        setStatus('Encryption key generated');

        // Display the key as hex for user to save
        const hexKey = key.toString('hex');
        return hexKey;
    };

    // Encrypt data using AES-256-GCM
    const encryptData = (data: Buffer, key: Buffer): { iv: Buffer; encryptedData: Buffer; authTag: Buffer } => {
        const iv = crypto.randomBytes(IV_BYTES);
        const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
        const encryptedData = Buffer.concat([cipher.update(data), cipher.final()]);
        const authTag = cipher.getAuthTag();
        return { iv, encryptedData, authTag };
    };

    // Decrypt data using AES-256-GCM
    const decryptData = (encryptedData: Buffer, key: Buffer, iv: Buffer, authTag: Buffer): Buffer => {
        const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
        decipher.setAuthTag(authTag);
        const decryptedData = Buffer.concat([decipher.update(encryptedData), decipher.final()]);
        return decryptedData;
    };

    // Process to encrypt and upload
    const handleEncryptAndUpload = async () => {
        if (!walletKey || !jsonData) {
            setStatus('Please load both wallet and JSON file first');
            return;
        }

        setLoading(true);
        setStatus('Starting encryption and upload process...');

        try {
            // Generate encryption key if not already done
            let keyHex = '';
            if (!encryptionKey) {
                keyHex = generateKey();
            } else {
                keyHex = encryptionKey.toString('hex');
            }

            // Convert JSON to buffer
            const originalJsonString = JSON.stringify(jsonData);
            const originalDataBuffer = Buffer.from(originalJsonString);

            // Encrypt the data
            setStatus('Encrypting data...');
            const { iv, encryptedData, authTag } = encryptData(originalDataBuffer, encryptionKey!);

            // Combine for storage (IV + AuthTag + Ciphertext)
            const dataToUpload = Buffer.concat([iv, authTag, encryptedData]);

            // Create and submit Arweave transaction
            setStatus('Creating Arweave transaction...');
            const transaction = await arweave.createTransaction({ data: dataToUpload }, walletKey);

            // Add tags
            transaction.addTag('Content-Type', 'application/octet-stream');
            transaction.addTag('App-Name', 'ArweaveEncryptApp');
            transaction.addTag('Encryption-Algorithm', ALGORITHM);
            transaction.addTag('IV-Length', IV_BYTES.toString());
            transaction.addTag('AuthTag-Length', AUTH_TAG_BYTES.toString());

            // Sign transaction
            setStatus('Signing transaction...');
            await arweave.transactions.sign(transaction, walletKey);

            // Post the transaction
            setStatus('Uploading to Arweave...');
            const uploader = await arweave.transactions.getUploader(transaction);

            while (!uploader.isComplete) {
                await uploader.uploadChunk();
                setStatus(`${uploader.pctComplete}% complete, ${uploader.uploadedChunks}/${uploader.totalChunks}`);
            }

            setTransactionId(transaction.id);
            setStatus(`Upload successful! Transaction ID: ${transaction.id}`);
            setLoading(false);

            // Save the key, transaction ID, etc. to display to user
            const uploadResult = {
                transactionId: transaction.id,
                encryptionKey: keyHex,
                viewBlockLink: `https://viewblock.io/arweave/tx/${transaction.id}`
            };
            setResult(uploadResult);

        } catch (error) {
            setStatus(`Error during process: ${error}`);
            setLoading(false);
        }
    };

    // Process to retrieve and decrypt
    const handleRetrieveAndDecrypt = async () => {
        if (!encryptionKey || !transactionId) {
            setStatus('Please provide both an encryption key and transaction ID');
            return;
        }

        setLoading(true);
        setStatus(`Retrieving data for transaction: ${transactionId}`);

        try {
            // Retrieve data from Arweave
            const retrievedRawData = await arweave.transactions.getData(transactionId, { decode: true });

            // Fix for TypeScript error - ensure we have a proper Buffer
            // The issue was here - we need to properly handle the retrieved data type
            let retrievedBuffer: Buffer;
            if (typeof retrievedRawData === 'string') {
                retrievedBuffer = Buffer.from(retrievedRawData, 'utf8');
            } else {
                retrievedBuffer = Buffer.from(retrievedRawData);
            }

            setStatus(`Retrieved ${retrievedBuffer.length} bytes from Arweave.`);

            // Extract IV, AuthTag, and Ciphertext
            if (retrievedBuffer.length < IV_BYTES + AUTH_TAG_BYTES) {
                throw new Error("Retrieved data is too short to contain IV and AuthTag.");
            }

            const retrievedIv = retrievedBuffer.slice(0, IV_BYTES);
            const retrievedAuthTag = retrievedBuffer.slice(IV_BYTES, IV_BYTES + AUTH_TAG_BYTES);
            const retrievedEncryptedData = retrievedBuffer.slice(IV_BYTES + AUTH_TAG_BYTES);

            setStatus("Decrypting retrieved data...");

            // Decrypt the data
            const decryptedBuffer = decryptData(
                retrievedEncryptedData,
                encryptionKey,
                retrievedIv,
                retrievedAuthTag
            );

            const decryptedJsonString = decryptedBuffer.toString('utf-8');
            const decryptedJsonObject = JSON.parse(decryptedJsonString);

            setStatus("Data decrypted successfully!");
            setResult(decryptedJsonObject);
            setLoading(false);
        } catch (error) {
            setStatus(`Error during retrieval or decryption: ${error}`);
            if (error instanceof Error &&
                (error.message.includes('Transaction not found') ||
                    error.message.includes('404'))) {
                setStatus("Note: It can take several minutes for a transaction to become available on the network.");
            }
            setLoading(false);
        }
    };

    // Handle manual key input (for decryption)
    const handleKeyInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            const keyHex = e.target.value;
            if (keyHex.length === KEY_BYTES * 2) { // Hex string is twice the length of bytes
                const key = Buffer.from(keyHex, 'hex');
                setEncryptionKey(key);
                setStatus('Encryption key loaded from input');
            }
        } catch (error) {
            setStatus(`Invalid key format: ${error}`);
        }
    };

    // Handle transaction ID input
    const handleTransactionIdInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTransactionId(e.target.value);
    };

    return (
        <div className="p-6 max-w-4xl mx-auto text-black">
            <h1 className="text-2xl font-bold mb-6">Arweave Encryption App</h1>

            <div className="bg-gray-100 p-4 rounded-lg mb-6">
                <h2 className="text-xl font-semibold mb-4">Upload & Encrypt</h2>

                <div className="mb-4">
                    <label className="block mb-2">Select Arweave Wallet (JWK)</label>
                    <input
                        type="file"
                        onChange={handleWalletUpload}
                        className="border p-2 w-full rounded"
                    />
                    {walletAddress && (
                        <div className="mt-2 text-sm bg-green-100 p-2 rounded">
                            Wallet loaded: {walletAddress}
                        </div>
                    )}
                </div>

                <div className="mb-4">
                    <label className="block mb-2">Select JSON File</label>
                    <input
                        type="file"
                        onChange={handleJsonUpload}
                        accept=".json"
                        className="border p-2 w-full rounded"
                    />
                    {jsonData && (
                        <div className="mt-2 text-sm bg-green-100 p-2 rounded">
                            JSON loaded successfully
                        </div>
                    )}
                </div>

                <button
                    onClick={handleEncryptAndUpload}
                    disabled={loading || !walletKey || !jsonData}
                    className="bg-blue-500 text-white py-2 px-4 rounded disabled:bg-gray-400"
                >
                    {loading ? 'Processing...' : 'Encrypt & Upload to Arweave'}
                </button>
            </div>

            <div className="bg-gray-100 p-4 rounded-lg mb-6">
                <h2 className="text-xl font-semibold mb-4">Retrieve & Decrypt</h2>

                <div className="mb-4">
                    <label className="block mb-2">Transaction ID</label>
                    <input
                        type="text"
                        value={transactionId}
                        onChange={handleTransactionIdInput}
                        placeholder="Enter Arweave transaction ID"
                        className="border p-2 w-full rounded"
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-2">Encryption Key (hex)</label>
                    <input
                        type="text"
                        onChange={handleKeyInput}
                        placeholder="Enter encryption key (hex format)"
                        className="border p-2 w-full rounded"
                    />
                </div>

                <button
                    onClick={handleRetrieveAndDecrypt}
                    disabled={loading || !transactionId || !encryptionKey}
                    className="bg-green-500 text-white py-2 px-4 rounded disabled:bg-gray-400"
                >
                    {loading ? 'Processing...' : 'Retrieve & Decrypt from Arweave'}
                </button>
            </div>

            <div className="bg-gray-100 p-4 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Status & Result</h2>

                <div className="mb-4 p-2 bg-white rounded border">
                    <p><strong>Status:</strong> {status}</p>
                </div>

                {result && (
                    <div className="p-2 bg-white rounded border overflow-auto max-h-96">
                        <h3 className="font-semibold mb-2">Result:</h3>
                        <pre className="whitespace-pre-wrap">{JSON.stringify(result, null, 2)}</pre>

                        {result.viewBlockLink && (
                            <div className="mt-2">
                                <a
                                    href={result.viewBlockLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 hover:underline"
                                >
                                    View transaction on ViewBlock
                                </a>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ArweaveEncryptPage;