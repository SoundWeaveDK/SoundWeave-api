import {
  BlobServiceClient,
  StorageSharedKeyCredential,
  BlobSASPermissions,
  generateBlobSASQueryParameters,
} from "@azure/storage-blob";
import { DefaultAzureCredential } from "@azure/identity";
import { createSASToken, azureAuth } from "./azure-storage-helpers";

const ONE_HOUR: any = 1 * 60 * 60 * 1000;
const PRODUCTION: boolean = process.env.NODE_ENV === "production";
const AZURITEACCOUNTKEY: any = process.env.AZURITEACCOUNTKEY;

// devstoreaccount1 is the default account name created by Azurite.
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

    // Append SAS token to blob URI and return
    const blobSasUri = `${
      containerClient.getBlockBlobClient(blobName).url
    }?${sasToken}`;
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

    // Append SAS token to blob URI and return
    const blobSasUri = `${
      containerClient.getBlockBlobClient(blobName).url
    }?${sasToken}`;
    return blobSasUri;
  } catch (err: any) {
    throw new Error(err);
  }
};
