import prisma from "../prisma";


export default async function productDeletePrisma(
  slug: string
) {

  // Delete the comment from the database.
  const deleteProduct = await prisma.products.delete({
    where: { slug: slug }
  });
  return deleteProduct;
};