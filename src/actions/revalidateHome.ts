"use server";

import {revalidatePath} from "next/cache";

export const revalidateHome = async (path: string) => revalidatePath(path);
