import {
  StorageSharedKeyCredential,
  BlobSASPermissions,
  generateBlobSASQueryParameters,
} from "@azure/storage-blob";
import { DefaultAzureCredential } from "@azure/identity";

const TWENTYFOUR_HOURS: any = 24 * 60 * 60 * 1000;

export async function createSASTokenREAD(
  accountName: string,
  blobClient: any,
  containerClient: any,
  blobName: string,
  auth: any
) {
  const PRODUCTION = process.env.NODE_ENV === "production";

  const sasOptions: any = {
    containerName: containerClient.containerName,
    blobName: blobName,
    startsOn: new Date(new Date().valueOf() - TWENTYFOUR_HOURS),
    expiresOn: new Date(new Date().valueOf() + TWENTYFOUR_HOURS),
    permissions: BlobSASPermissions.parse("r"),
  };

  const userDelegationKey = PRODUCTION
    ? await blobClient.getUserDelegationKey(
      new Date(new Date().valueOf() - TWENTYFOUR_HOURS),
      new Date(new Date().valueOf() + TWENTYFOUR_HOURS)
    )
    : null;

  const sasToken = generateBlobSASQueryParameters(
    sasOptions,
    PRODUCTION ? userDelegationKey : auth,
    accountName
  ).toString();
  return sasToken;
}

export async function createSASTokenREADWRITE(
  accountName: string,
  blobClient: any,
  containerClient: any,
  blobName: string,
  auth: any
) {
  const PRODUCTION = process.env.NODE_ENV === "production";

  const sasOptions: any = {
    containerName: containerClient.containerName,
    blobName: blobName,
    startsOn: new Date(new Date().valueOf() - TWENTYFOUR_HOURS),
    expiresOn: new Date(new Date().valueOf() + TWENTYFOUR_HOURS),
    permissions: BlobSASPermissions.parse("rw"),
  };

  const userDelegationKey = PRODUCTION
    ? await blobClient.getUserDelegationKey(
      new Date(new Date().valueOf() - TWENTYFOUR_HOURS),
      new Date(new Date().valueOf() + TWENTYFOUR_HOURS)
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
  const PRODUCTION = process.env.NODE_ENV === "production";
  let auth = null;
  if (PRODUCTION) {
    // Use managed identity in production for our static web app
    auth = new DefaultAzureCredential();
  } else {
    // Use Azurite account key in development
    const AZURITEACCOUNTKEY: any = process.env.AZURITEACCOUNTKEY;
    auth = new StorageSharedKeyCredential(accountName, AZURITEACCOUNTKEY);
  }
  return auth;
}
