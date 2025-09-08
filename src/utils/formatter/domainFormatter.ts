export const getHttpsUrl = (url?: string) => {
    if (!url) return "";

    // decode کامل رشته (برای اینکه اگر encode شده بود درست بررسی بشه)
    const decoded = decodeURIComponent(url);
    // جایگزینی همه http:// با https://
    const replaced = decoded.replace(/http:\/\//g, "https://");
    // دوباره encode برای استفاده در query string Next.js Image
    const finalUrl = encodeURI(replaced);

    return finalUrl;

};

