import prisma from "../prisma";

export default async function commentCreatePrisma(
    body: string//,
    //productOwner: string,
    //productId: string
) {
    const comment = await prisma.comments.create({
        data: {body: body, }
    });
    return comment;
}