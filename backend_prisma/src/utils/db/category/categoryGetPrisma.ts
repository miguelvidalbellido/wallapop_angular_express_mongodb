import prisma from "../prisma";

export default async function categoryGetPrisma(name: string) {
  const category = await prisma.categories.findFirst({
    where: {
      name: name
    }
  });
  return category;
}
