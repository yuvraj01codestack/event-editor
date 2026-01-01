export async function mockUploadImage(file: File): Promise<string> {
    await new Promise((r) => setTimeout(r, 250));
    return URL.createObjectURL(file);
}