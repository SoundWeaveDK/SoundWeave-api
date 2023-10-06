import { AccountSASPermissions, AccountSASResourceTypes, AccountSASServices, BlobServiceClient, SASProtocol, generateAccountSASQueryParameters } from "@azure/storage-blob";
import { createSASTokenREAD, azureAuth } from "./azure-storage-helpers";

export const GetSingleImage = async (blobName: string): Promise<string> => {
  try {
    const PRODUCTION: boolean = process.env.NODE_ENV === "production";

    // devstoreaccount1 is the default account name created for Azurite emulator.
    const ACCOUNTNAME = PRODUCTION ? "soundweavestorage" : "devstoreaccount1";
    // The service endpoints for Azurite are different from the endpoints of an Azure Storage account. The local computer doesn't do domain name resolution, requiring Azurite endpoints to be local addresses.
    const ACCOUNTURL = PRODUCTION
      ? `https://${ACCOUNTNAME}.blob.core.windows.net`
      : `http://127.0.0.1:10000/${ACCOUNTNAME}`;

    const container = "images";
    const auth = await azureAuth(ACCOUNTNAME);
    const blobClient = new BlobServiceClient(ACCOUNTURL, auth);
    const containerClient = blobClient.getContainerClient(container);

    const sasToken = await createSASTokenREAD(
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
    const PRODUCTION: boolean = process.env.NODE_ENV === "production";

    // devstoreaccount1 is the default account name created for Azurite emulator.
    const ACCOUNTNAME = PRODUCTION ? "soundweavestorage" : "devstoreaccount1";
    // The service endpoints for Azurite are different from the endpoints of an Azure Storage account. The local computer doesn't do domain name resolution, requiring Azurite endpoints to be local addresses.
    const ACCOUNTURL = PRODUCTION
      ? `https://${ACCOUNTNAME}.blob.core.windows.net`
      : `http://127.0.0.1:10000/${ACCOUNTNAME}`;

    const container = "podcasts";
    const auth = await azureAuth(ACCOUNTNAME);
    const blobClient = new BlobServiceClient(ACCOUNTURL, auth);
    const containerClient = blobClient.getContainerClient(container);

    const sasToken = await createSASTokenREAD(
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

// Generate a SAS token for uploading blobs from the frontend
export const UploadSASToken = async (containerName: string) => {
  try {
    const PRODUCTION: boolean = process.env.NODE_ENV === "production";

    // devstoreaccount1 is the default account name created for Azurite emulator.
    const ACCOUNTNAME = PRODUCTION ? "soundweavestorage" : "devstoreaccount1";
    // The service endpoints for Azurite are different from the endpoints of an Azure Storage account. The local computer doesn't do domain name resolution, requiring Azurite endpoints to be local addresses.
    const ACCOUNTURL = PRODUCTION
      ? `https://${ACCOUNTNAME}.blob.core.windows.net`
      : `http://127.0.0.1:10000/${ACCOUNTNAME}`;

    const auth: any = await azureAuth(ACCOUNTNAME);

    const sasOptions = {

      services: AccountSASServices.parse("b").toString(),          // blobs
      resourceTypes: AccountSASResourceTypes.parse("sco").toString(), // service, container, object
      permissions: AccountSASPermissions.parse("wu"),          // permissions: write, update, options
      protocol: SASProtocol.HttpsAndHttp,
      startsOn: new Date(),
      expiresOn: new Date(new Date().valueOf() + (10 * 60 * 1000)),   // 10 minutes
    };

    const sasToken = generateAccountSASQueryParameters(
      sasOptions,
      auth
    ).toString();

    console.log(`sasToken = '${sasToken}'\n`);

    // return the full sas url
    return `${ACCOUNTURL}/?${sasToken}`;

  } catch (err: any) {
    throw new Error(err);
  }
};
