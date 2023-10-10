import { BlobServiceClient } from "@azure/storage-blob";
import { createSASTokenREAD, azureAuth, createSASTokenWRITE } from "./azure-storage-helpers";

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
    throw new Error("Error in retrieving image from Azure Storage");
  }
};

export const GetMultipleImages = async (blobNames: string[]): Promise<string[]> => {
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

    const blobSasUris: string[] = [];

    await Promise.all(blobNames.map(async (blobName) => {
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
      blobSasUris.push(blobSasUri);
    }));

    return blobSasUris;

  } catch (err: any) {
    throw new Error("Error in retrieving image from Azure Storage");
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

export const GetMultiplePodcasts = async (blobNames: string[]): Promise<string[]> => {
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

    const blobSasUris: string[] = [];

    await Promise.all(blobNames.map(async (blobName) => {
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
      blobSasUris.push(blobSasUri);
    }));

    return blobSasUris;

  }
  catch (err: any) {
    throw new Error(err);
  }
}

// Generate a SAS token for uploading blobs from the frontend
export const GetUploadSASURL = async (containerName: string, blobName: string) => {
  try {
    const PRODUCTION: boolean = process.env.NODE_ENV === "production";

    // devstoreaccount1 is the default account name created for Azurite emulator.
    const ACCOUNTNAME = PRODUCTION ? "soundweavestorage" : "devstoreaccount1";
    // The service endpoints for Azurite are different from the endpoints of an Azure Storage account. The local computer doesn't do domain name resolution, requiring Azurite endpoints to be local addresses.
    const ACCOUNTURL = PRODUCTION
      ? `https://${ACCOUNTNAME}.blob.core.windows.net`
      : `http://127.0.0.1:10000/${ACCOUNTNAME}`;

    const auth: any = await azureAuth(ACCOUNTNAME);
    const blobClient = new BlobServiceClient(ACCOUNTURL, auth);
    const containerClient = blobClient.getContainerClient(containerName);

    const sasToken = await createSASTokenWRITE(
      ACCOUNTNAME,
      blobClient,
      containerClient,
      blobName,
      auth
    );

    return ACCOUNTURL + "/" + containerName + "/" + blobName + "?" + sasToken;

  } catch (err: any) {
    throw new Error(err);
  }
};
