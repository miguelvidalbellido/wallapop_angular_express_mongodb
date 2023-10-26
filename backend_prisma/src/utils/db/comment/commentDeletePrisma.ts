import prisma from "../prisma";


export default async function commentDeletePrisma(
  id: string
) {

  // Delete the comment from the database.
  const deletedComment = await prisma.comments.delete({
    where: { id }
  });
  return deletedComment;
}