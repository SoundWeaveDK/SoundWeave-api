import { BlobServiceClient } from "@azure/storage-blob";
import { createSASToken, azureAuth } from "./azure-storage-helpers";

const PRODUCTION: boolean = process.env.NODE_ENV === "production";

// devstoreaccount1 is the default account name created for Azurite emulator.
const ACCOUNTNAME = PRODUCTION ? "soundweavestorage" : "devstoreaccount1";
// The service endpoints for Azurite are different from the endpoints of an Azure Storage account. The local computer doesn't do domain name resolution, requiring Azurite endpoints to be local addresses.
const ACCOUNTURL = PRODUCTION
  ? `https://${ACCOUNTNAME}.blob.core.windows.net`
  : `http://127.0.0.1:10000/${ACCOUNTNAME}`;

export const GetSingleImage = async (blobName: string): Promise<string> => {
  try {
    const container = "images";
    const auth = await azureAuth(ACCOUNTNAME);
    const blobClient = new BlobServiceClient(ACCOUNTURL, auth);
    const containerClient = blobClient.getContainerClient(container);

    const sasToken = await createSASToken(
      ACCOUNTNAME,
      blobClient,
      containerClient,
      blobName,
      auth
    );

    const blob = containerClient.getBlockBlobClient(blobName).url;

    const exists = await containerClient.getBlockBlobClient(blobName).exists();

    if (!exists) {
      throw new Error("Blob does not exist");
    }

    const blobSasUri = `${blob}?${sasToken}`;
    return blobSasUri;
  } catch (err: any) {
    throw new Error(err);
  }
};

export const GetSinglePodcast = async (blobName: string): Promise<string> => {
  try {
    const container = "podcasts";
    const auth = await azureAuth(ACCOUNTNAME);
    const blobClient = new BlobServiceClient(ACCOUNTURL, auth);
    const containerClient = blobClient.getContainerClient(container);

    const sasToken = await createSASToken(
      ACCOUNTNAME,
      blobClient,
      containerClient,
      blobName,
      auth
    );

    const blob = containerClient.getBlockBlobClient(blobName).url;

    const exists = await containerClient.getBlockBlobClient(blobName).exists();
    if (!exists) {
      throw new Error("Blob does not exist");
    }

    const blobSasUri = `${blob}?${sasToken}`;
    return blobSasUri;
  } catch (err: any) {
    throw new Error(err);
  }
};

// Generate a SAS token for uploading blobs for the frontend
export const UploadImageSasToken = async (blobName: string) => {
  try {
    const container = "images";
    const auth = await azureAuth(ACCOUNTNAME);
    const blobClient = new BlobServiceClient(ACCOUNTURL, auth);
    const containerClient = blobClient.getContainerClient(container);

    const sasToken = await createSASToken(
      ACCOUNTNAME,
      blobClient,
      containerClient,
      blobName,
      auth
    );

    return sasToken;
  } catch (err: any) {
    throw new Error(err);
  }
};

// Generate a SAS token for uploading blobs for the frontend
export const UploadPodcastSasToken = async (blobName: string) => {
  try {
    const container = "podcasts";
    const auth = await azureAuth(ACCOUNTNAME);
    const blobClient = new BlobServiceClient(ACCOUNTURL, auth);
    const containerClient = blobClient.getContainerClient(container);

    const sasToken = await createSASToken(
      ACCOUNTNAME,
      blobClient,
      containerClient,
      blobName,
      auth
    );

    return sasToken;
  } catch (err: any) {
    throw new Error(err);
  }
};
