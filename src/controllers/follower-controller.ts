import { FastifyReply, FastifyRequest } from "fastify";
import { followAUser, unfollowAUser, readUsersfollowers } from "../services/follower-service";
import { FollowerSchema, ReadUserFollowerSchema } from "../schemas/follower-schema";
import { AddSasUrlToBlobs, GetMultipleImages, GetSingleImage } from "../utils/azure-storage";
import { AzureBlob } from "../interfaces/azure-blob";


export async function userFollowHandler(request: FastifyRequest<{ Body: FollowerSchema }>, reply: FastifyReply) {
    const body = request.body;
    try {
        const followUser = await followAUser(body)
        return reply.code(200).send(followUser)
    } catch (error) {
        return reply.code(400).send(error);
    }
}


export async function userUnFollowHandler(request: FastifyRequest<{ Body: FollowerSchema }>, reply: FastifyReply) {
    const body = request.body;
    try {
        const unfollowUser = await unfollowAUser(body)
        return reply.code(200).send(unfollowUser)
    } catch (error) {
        return reply.code(400).send(error);
    }
}


export async function readSingleUserFollowerHandler(request: FastifyRequest<{ Params: ReadUserFollowerSchema }>, reply: FastifyReply) {
    const param = request.params;
    try {
        const readUserFollowers = await readUsersfollowers(param)
        if (readUserFollowers == null) {
            return reply.code(404).send({
                messages: "Users not found"
            });
        }

        const profile_pictures = readUserFollowers.map((user: any) => {
            const outerProfilePicture = user.profile_picture;
            const followingProfilePictures = user.following.map((user: any) => user.profile_picture);
            return [outerProfilePicture, ...followingProfilePictures];
        }).flat().filter((profilePicture: any) => profilePicture != null);

        try {
            if (profile_pictures.length != 0) {
                const profilePictureBlobs = await GetMultipleImages(profile_pictures);

                const profilePictureToBlobMap = new Map();
                profilePictureBlobs.forEach((blob: AzureBlob) => {
                    profilePictureToBlobMap.set(blob.blobName, blob.blobSasUri);
                });

                console.log(profilePictureToBlobMap);

                readUserFollowers.forEach((user: any) => {
                    if (user.profile_picture != null) {
                        user.profile_picture = profilePictureToBlobMap.get(user.profile_picture);
                    }
                    user.following.forEach((user: any) => {
                        if (user.profile_picture != null) {
                            user.profile_picture = profilePictureToBlobMap.get(user.profile_picture);
                        }
                    });
                });
            }

        }
        catch (err) {
            return reply.code(404).send({
                messages: "Profile picture not found for 1 or more users"
            });
        }

        return reply.code(200).send(readUserFollowers);
    } catch (error) {
        return reply.code(400).send(error);
    }
}