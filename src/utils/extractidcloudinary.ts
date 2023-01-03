export const extractpublicidcloudianry = (url: string | undefined) => {
  let convert_to_array = url ? url.split("/") : "";

  const result = convert_to_array[convert_to_array.length - 1].split(".")[0];

  return result;
};
