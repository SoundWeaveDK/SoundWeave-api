import {
  StorageSharedKeyCredential,
  BlobSASPermissions,
  generateBlobSASQueryParameters,
} from "@azure/storage-blob";
import { DefaultAzureCredential } from "@azure/identity";

const ONE_HOUR: any = 1 * 60 * 60 * 1000;
const PRODUCTION: boolean = process.env.NODE_ENV === "production";
const AZURITEACCOUNTKEY: any = process.env.AZURITEACCOUNTKEY;

// Create a service SAS for a blob
export async function createSASToken(
  accountName: string,
  blobClient: any,
  containerClient: any,
  blobName: string,
  auth: any
) {
  const sasOptions: any = {
    containerName: containerClient.containerName,
    blobName: blobName,
    startsOn: new Date(new Date().valueOf() - ONE_HOUR),
    expiresOn: new Date(new Date().valueOf() + ONE_HOUR),
    permissions: BlobSASPermissions.parse("r"),
  };
  // If we're in prod that means we're using managed identity, so we need to get a user delegation key by using the blob client
  // This function does not work after compilation since it is ONLY AVAILABLE IN NODE.JS RUNTIME.
  // I don't know how to fix this, so I'm just going to leave it as is. pog
  const userDelegationKey = PRODUCTION
    ? await blobClient.getUserDelegationKey(
        new Date(new Date().valueOf() - ONE_HOUR),
        new Date(new Date().valueOf() + ONE_HOUR)
      )
    : null;

  const sasToken = generateBlobSASQueryParameters(
    sasOptions,
    PRODUCTION ? userDelegationKey : auth,
    accountName
  ).toString();
  return sasToken;
}

export async function azureAuth(accountName: string) {
  let auth = null;
  if (PRODUCTION) {
    // Use managed identity in production for our static web app
    auth = new DefaultAzureCredential();
  } else {
    // Use Azurite account key in development
    auth = new StorageSharedKeyCredential(accountName, AZURITEACCOUNTKEY);
  }
  return auth;
}
