export function translateRole(role: string): string {
    switch (role) {
        case "admin":
            return "ادمین";
        case "customer":
            return "کاربر";
        default:
            return role; // برای نقش‌های احتمالی دیگر
    }
}
