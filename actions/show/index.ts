'use server'

import { db } from "@/actions/config";
import { auth } from "@/auth";
import { Prisma } from '@prisma/client';

const { QueryMode } = Prisma;

export async function getUserById(id: string){
    try{
        const user = await db.user.findUnique({ where: { id }
        })
        return user;
    }catch(err){
        return null;
    }
}

export async function getAvatars(){
    try{

        const users = await db.user.findMany({
            where: {
                image: {
                    not: null
                }
            },
            take: 4
        });

        return users;

    }catch(err){
        console.log(err)
        return "failed";
    }
}

export async function checkContact(){
    try{

        const user = await getLoggedUser();
        if(!user) return false;

        const promise = await db.user.findFirst({
            where: {
                id: user.id
            },
            select: {
                contact: true
            }
        });

        if(!promise) return false;

        if(promise.contact) return true;
        else return false;

    }catch(err){
        console.log(err)
        return false;
    }
}

export async function getAllUsers({ 
    name,
    page = 1,
    limit = 9,
    minFollowers,
    maxFollowers 
}: {
    name?: string;
    page?: number | string;  
    limit?: number | string;
    minFollowers?: number;
    maxFollowers?: number;
}) {
    try {
        const validPage = Math.max(1, Number(page) || 1);
        const validLimit = Math.max(1, Number(limit) || 9);
        
        const skip = (validPage - 1) * validLimit;

        let whereClause: any = {};

        if (name) {
            whereClause.name = {
                contains: name,
                mode: 'insensitive'
            };
        }

        if (minFollowers !== undefined || maxFollowers !== undefined) {
            whereClause.followers = {
                _count: {
                    gte: Number(minFollowers) || undefined,
                    lte: Number(maxFollowers) || undefined
                }
            };
        }

        const total = await db.user.count({
            where: whereClause
        });

        const users = await db.user.findMany({
            where: whereClause,
            skip,
            take: validLimit,
        });

        const totalPages = Math.ceil(total / validLimit);

        // Calculate if there are previous and next pages
        const hasPreviousPage = validPage > 1;
        const hasNextPage = validPage < totalPages;

        return {
            users,
            pagination: {
                total,
                totalPages,
                currentPage: validPage,
                limit: validLimit,
                hasPreviousPage,
                hasNextPage
            }
        };

    } catch (err) {
        console.error("Error fetching users:", err);
        throw new Error("Failed to fetch users");
    }
}

export async function getLoggedUser(){
    try{

        const session = await auth();

        if(session && session.user && session.user.email){
            const promise = await db.user.findUnique({
                where: {
                    email: session.user.email
                },
            });

            if(!promise) return null;
        
            return promise;
        }

        return null;

    }catch(err){
        console.log(err);
        return null;
    }
}

export async function getGalleryById(id: string){
    try{

        const gallery = await db.gallery.findFirst({
            where: {
                code: id
            },
            include: {
                images: true,
                folders: true,
                messages: true
            }
        });

        return gallery;

    }catch(err){
        return null;
    }
}

export async function getGalleryImages(id: string){
    try{

        const images = await db.gallery.findFirst({
            where: {
                code: id
            },
            include: {
                images: true,
                folders: true
            }
        });

        return images;

    }catch(err){
        return null;
    }
}

export async function getMyGalleries(){
    try{

        const user = await getLoggedUser();
        if(!user) return null;

        const promise = await db.gallery.findMany({
            where: {
                userId: user.id
            },
            include: {
                members: true,
                images: true,
                folders: true,
                messages: true
            }
        });
        
        return promise;

    }catch(err){
        return null;
    }
}

export async function getGalleryFolders(id: string){
    try{

        const folders = await db.gallery.findFirst({
            where: {
                code: id
            },
            include: {
                folders: true
            }
        });

        return folders;

    }catch(err){
        return null;
    }
}