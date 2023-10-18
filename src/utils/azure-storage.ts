import { BlobServiceClient } from "@azure/storage-blob";
import { createSASTokenREAD, azureAuth, createSASTokenWRITE } from "./azure-storage-helpers";
import { AzureBlob } from "../interfaces/azure-blob";
import { Watchlater } from "../schemas/watch-later-schema";

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

export const GetMultipleImages = async (blobNames: string[]): Promise<AzureBlob[]> => {
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

    const blobs: AzureBlob[] = [];

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
      blobs.push({
        blobName: blobName,
        blobSasUri: blobSasUri
      });
    }
    ));

    return blobs;

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

export const GetMultiplePodcasts = async (blobNames: string[]): Promise<AzureBlob[]> => {
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

    const blobs: AzureBlob[] = [];

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
      blobs.push({
        blobName: blobName,
        blobSasUri: blobSasUri
      });
    }
    ));

    return blobs;
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

export const DeleteBlob = async (containerName: string, blobName: string) => {
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

    const blob = containerClient.getBlockBlobClient(blobName);

    const exists = await blob.exists();

    if (!exists) {
      throw new Error("Blob does not exist");
    }

    await blob.delete();

    return true;

  }
  catch (err: any) {
    throw new Error(err);
  }
};

export const AddSasUrlToBlobs = async (objects: object[]): Promise<object[]> => {

  const thumbnails = objects.map((object: any) => object.fk_podcast_id.thumbnail)
  const podcast_files = objects.map((object: any) => object.fk_podcast_id.podcast_file)

  try {
    const thumbnailBlobs = await GetMultipleImages(thumbnails);
    const podcastFileBlobs = await GetMultiplePodcasts(podcast_files);

    const thumbnailToBlobMap = new Map();
    thumbnailBlobs.forEach((blob: AzureBlob) => {
      thumbnailToBlobMap.set(blob.blobName, blob.blobSasUri);
    });

    const podcastFileToBlobMap = new Map();
    podcastFileBlobs.forEach((blob: AzureBlob) => {
      podcastFileToBlobMap.set(blob.blobName, blob.blobSasUri);
    });

    objects.forEach((object: any) => {
      if (thumbnailToBlobMap.has(object.fk_podcast_id.thumbnail)) {
        object.fk_podcast_id.thumbnail = thumbnailToBlobMap.get(object.fk_podcast_id.thumbnail);
      }
      if (podcastFileToBlobMap.has(object.fk_podcast_id.podcast_file)) {
        object.fk_podcast_id.podcast_file = podcastFileToBlobMap.get(object.fk_podcast_id.podcast_file);
      }
    });
  }
  catch (err: any) {
    throw new Error(err);
  }
  return objects;
};

