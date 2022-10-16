import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
  const { photo, folder } = params;

  const name = photo.replace(/\.jpg/, "");

  // @ts-ignore
  const photos = import.meta.glob('../../../../files/photos/*.jpg')

  return {
    folder,
    name,
  };
}
