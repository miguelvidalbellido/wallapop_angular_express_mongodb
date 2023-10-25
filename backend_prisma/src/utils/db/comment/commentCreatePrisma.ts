import prisma from "../prisma";

export default async function commentCreatePrisma(
    body: string,
    commentOwner: string,
    productId: string
) {
    const comment = await prisma.comments.create({
        data: {body: body, commentOwner: commentOwner, productId: productId}
    });
    return comment;
}